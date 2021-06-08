import { useReactiveVar } from "@apollo/client";
import { parseCookies, setCookie } from "nookies";
import { useEffect } from "react";
import { initialLoginUserVar, loginUserVar } from "src/apollo/cache";
import { useGetLoginUserLazyQuery, useRefreshTokensMutation } from "src/apollo/schema";
import { calcDate } from "src/libs/calcDate";

export const useValidateLoginUser = () => {
  const cookies = parseCookies();
  const loginUserData = useReactiveVar(loginUserVar);

  const [refreshTokenMutation] = useRefreshTokensMutation();
  const [getLoginUserLazyQuery, { data: queryData }] = useGetLoginUserLazyQuery();

  useEffect(
    () => {
      // accessTokenがなく、refreshTokenがある場合にaccessTokenを更新
      if (!cookies.accessToken && cookies.refreshToken) {
        (async () => {
          const { data } = await refreshTokenMutation({
            variables: { refreshToken: cookies.refreshToken },
          });
          data?.refreshToken &&
            setCookie(null, "accessToken", data?.refreshToken?.token, {
              path: "/",
              maxAge: calcDate(data.refreshToken.payload.exp),
            });
          getLoginUserLazyQuery();
        })();

        // tokenがどちらもない場合
      } else if (!cookies.accessToken && !cookies.refreshToken) {
        loginUserVar(initialLoginUserVar);
        alert("ログインしてください。");
      } else {
        getLoginUserLazyQuery();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    // キャッシュのログイン状態がfalseかつ、クエリーデータがある場合に値をセット
    if (loginUserData.isLogin === false && queryData) {
      loginUserVar({
        isLogin: queryData ? true : false,
        userId: queryData.loginUser?.id ? queryData.loginUser.id : "",
        email: queryData.loginUser?.email ? queryData.loginUser.email : "",
        profileId: queryData.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
        profileName: queryData.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
        profileImage: queryData.loginUser?.targetUser?.profileImage
          ? queryData.loginUser.targetUser?.profileImage
          : "",
        profileText: queryData.loginUser?.targetUser?.profileText
          ? queryData.loginUser.targetUser?.profileText
          : "",
        telephoneNumber: 0,
        isCollegeStudent: false,
        schoolName: queryData.loginUser?.targetUser?.schoolName
          ? queryData.loginUser.targetUser?.schoolName
          : "",
        genderName: queryData.loginUser?.targetUser?.selectedGender.genderName
          ? queryData.loginUser.targetUser?.selectedGender.genderName
          : "",
        addressName: queryData.loginUser?.targetUser?.selectedAddress.addressName
          ? queryData.loginUser.targetUser?.selectedAddress.addressName
          : "",
        age: queryData.loginUser?.targetUser?.age ? queryData.loginUser.targetUser?.age : 0,
        undergraduate: queryData.loginUser?.targetUser?.undergraduate
          ? queryData.loginUser.targetUser?.undergraduate
          : "",
        department: queryData.loginUser?.targetUser?.department
          ? queryData.loginUser.targetUser?.undergraduate
          : "",
        clubActivities: queryData.loginUser?.targetUser?.clubActivities
          ? queryData.loginUser.targetUser?.clubActivities
          : "",
        admissionFormat: queryData.loginUser?.targetUser?.admissionFormat
          ? queryData.loginUser.targetUser?.admissionFormat
          : "",
        favoriteSubject: queryData.loginUser?.targetUser?.clubActivities
          ? queryData.loginUser.targetUser?.clubActivities
          : "",
        tags: queryData.loginUser?.targetUser?.tags.edges
          ? queryData.loginUser?.targetUser?.tags.edges.map((tag) => {
              return tag?.node?.tagName ? tag?.node?.tagName : "";
            })
          : [],
        sendMessages: queryData.loginUser?.sender
          ? queryData.loginUser?.sender.edges.map((sender) => {
              return {
                distinationId: sender?.node?.destination.id ? sender?.node?.destination.id : "",
                text: sender?.node?.text ? sender.node.text : "",
                createdAt: sender?.node?.createdAt ? sender?.node?.createdAt : "",
              };
            })
          : [],
        followingUsers: queryData.loginUser?.targetUser?.followingUsers
          ? queryData.loginUser?.targetUser?.followingUsers.edges.map((followingUser) => {
              return {
                followingId: followingUser?.node?.id ? followingUser?.node?.id : "",
                followingName: followingUser?.node?.targetUser?.profileName
                  ? followingUser?.node?.targetUser?.profileName
                  : "",
                followingImage: followingUser?.node?.targetUser?.profileImage
                  ? followingUser?.node?.targetUser?.profileImage
                  : "",
              };
            })
          : [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  return { loginUserData };
};
