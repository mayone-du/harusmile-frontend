import { useReactiveVar } from "@apollo/client";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserLazyQuery } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

export const useValidateLoginUser = () => {
  const loginUserData = useReactiveVar(loginUserVar);

  const { handleRefreshToken } = useRefreshTokens();
  const [getLoginUserLazyQuery, { data: queryData }] = useGetLoginUserLazyQuery();

  const cookies = parseCookies();
  useEffect(
    () => {
      // ログインしてなければログイン情報を取得
      (async () => {
        await handleRefreshToken();
        if (!loginUserData.isLogin && !cookies.refreshToken) return;
        getLoginUserLazyQuery();
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    // Reactive変数のログイン状態がfalseかつ、クエリーデータがある場合に値をセット
    if (!loginUserData.isLogin && queryData) {
      loginUserVar({
        isLoading: queryData ? false : true,
        isLogin: queryData ? true : false,
        userId: queryData.loginUser?.id ? queryData.loginUser.id : "",
        email: queryData.loginUser?.email ? queryData.loginUser.email : "",
        profileId: queryData.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
        profileName: queryData.loginUser?.targetUser?.profileName
          ? queryData.loginUser?.targetUser?.profileName
          : "",
        profileImage: queryData.loginUser?.targetUser?.profileImage
          ? queryData.loginUser.targetUser?.profileImage
          : "",
        profileText: queryData.loginUser?.targetUser?.profileText
          ? queryData.loginUser.targetUser?.profileText
          : "",
        telephoneNumber: queryData.loginUser?.targetUser?.telephoneNumber
          ? queryData.loginUser.targetUser.telephoneNumber
          : "",
        isCollegeStudent: queryData.loginUser?.targetUser?.isCollegeStudent ? true : false,
        schoolName: queryData.loginUser?.targetUser?.schoolName
          ? queryData.loginUser.targetUser?.schoolName
          : "",
        genderId: queryData.loginUser?.targetUser?.selectedGender?.id
          ? queryData.loginUser.targetUser.selectedGender.id
          : "",
        genderName: queryData.loginUser?.targetUser?.selectedGender?.genderName
          ? queryData.loginUser.targetUser.selectedGender.genderName
          : "",
        addressId: queryData.loginUser?.targetUser?.selectedAddress?.id
          ? queryData.loginUser.targetUser.selectedAddress.id
          : "",
        addressName: queryData.loginUser?.targetUser?.selectedAddress?.addressName
          ? queryData.loginUser.targetUser.selectedAddress.addressName
          : "",
        age: queryData.loginUser?.targetUser?.age ? queryData.loginUser.targetUser?.age : 0,
        undergraduate: queryData.loginUser?.targetUser?.undergraduate
          ? queryData.loginUser.targetUser?.undergraduate
          : "",
        department: queryData.loginUser?.targetUser?.department
          ? queryData.loginUser.targetUser?.department
          : "",
        clubActivities: queryData.loginUser?.targetUser?.clubActivities
          ? queryData.loginUser.targetUser?.clubActivities
          : "",
        admissionFormat: queryData.loginUser?.targetUser?.admissionFormat
          ? queryData.loginUser.targetUser?.admissionFormat
          : "",
        favoriteSubject: queryData.loginUser?.targetUser?.favoriteSubject
          ? queryData.loginUser.targetUser?.favoriteSubject
          : "",
        wantHear: queryData.loginUser?.targetUser?.wantHear
          ? queryData.loginUser.targetUser?.wantHear
          : "",
        problem: queryData.loginUser?.targetUser?.problem
          ? queryData.loginUser.targetUser?.problem
          : "",
        stars: queryData.loginUser?.provider
          ? queryData.loginUser.provider.edges.map((star) => {
              return star?.node ? star.node.stars : 0;
            })
          : [],
        tags: queryData.loginUser?.targetUser?.tags.edges
          ? queryData.loginUser?.targetUser?.tags.edges.map((tag) => {
              return tag?.node?.tagName ? tag?.node?.tagName : "";
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
    } else if (!cookies.refreshToken) {
      loginUserVar({
        ...loginUserData,
        isLoading: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  return { loginUserData };
};
