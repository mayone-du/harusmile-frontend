import { useReactiveVar } from "@apollo/client";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { memo, useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserLazyQuery, useRefreshTokensMutation } from "src/apollo/schema";
import { useGetLoginUserQuery } from "src/apollo/schema";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { calcDate } from "src/libs/calcDate";
import { useValidateLoginUser } from "src/libs/hooks/useValidateLoginUser";

type Props = {
  metaTitle: string;
};

export const Layout: React.FC<Props> = memo((props) => {
  // const cookies = parseCookies();
  // const loginUserData = useReactiveVar(loginUserVar);

  // const [refreshTokenMutation] = useRefreshTokensMutation();
  // const [getLoginUserLazyQuery, { data: queryData, loading: isLoading, called }] =
  //   useGetLoginUserLazyQuery();
  // const [profileImagePath, setProfileImagePath] = useState("");

  // useEffect(
  //   () => {
  //     // accessTokenがなく、refreshTokenがある場合にaccessTokenを更新
  //     if (!cookies.accessToken && cookies.refreshToken) {
  //       (async () => {
  //         const { data } = await refreshTokenMutation({
  //           variables: { refreshToken: cookies.refreshToken },
  //         });
  //         data?.refreshToken &&
  //           setCookie(null, "accessToken", data?.refreshToken?.token, {
  //             path: "/",
  //             maxAge: calcDate(data.refreshToken.payload.exp),
  //           });
  //         console.log(
  //           "非同期即時関数内。アクセストークンが更新されました。accessToken",
  //           cookies.accessToken,
  //         );
  //         console.log("getLoginUserを実行");
  //         getLoginUserLazyQuery();
  //         setProfileImagePath(loginUserData.profileImage);
  //         console.log("queryData: ", queryData, "isLoading", isLoading, "called", called);
  //       })();
  //       console.log("同期。accessToken", cookies.accessToken);
  //     }
  //   },
  //   [
  //     // cookies.accessToken, cookies.refreshToken, refreshTokenMutation, queryData
  //   ],
  // );

  // // useEffect(() => {
  // //   console.log("getLoginUserを実行");
  // //   getLoginUserLazyQuery();
  // //   setProfileImagePath(queryData?.loginUser?.targetUser?.profileImage);
  // //   console.log("queryData: ", queryData);
  // // }, []);

  // useEffect(() => {
  //   // キャッシュのログイン状態がfalseかつ、クエリーデータがある場合に値をセット
  //   if (loginUserData.isLogin === false && queryData) {
  //     console.log("queryで取得したデータが変更されました。");

  //     loginUserVar({
  //       userId: queryData.loginUser?.id ? queryData.loginUser.id : "",
  //       email: queryData.loginUser?.email ? queryData.loginUser.email : "",
  //       profileId: queryData.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
  //       profileName: queryData.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
  //       profileImage: queryData.loginUser?.targetUser?.profileImage
  //         ? queryData.loginUser.targetUser?.profileImage
  //         : "",
  //       profileText: queryData.loginUser?.targetUser?.profileText
  //         ? queryData.loginUser.targetUser?.profileText
  //         : "",
  //       telephoneNumber: 0,
  //       isCollegeStudent: false,
  //       schoolName: queryData.loginUser?.targetUser?.schoolName
  //         ? queryData.loginUser.targetUser?.schoolName
  //         : "",
  //       genderName: queryData.loginUser?.targetUser?.selectedGender.genderName
  //         ? queryData.loginUser.targetUser?.selectedGender.genderName
  //         : "",
  //       addressName: queryData.loginUser?.targetUser?.selectedAddress.addressName
  //         ? queryData.loginUser.targetUser?.selectedAddress.addressName
  //         : "",
  //       isLogin: queryData ? true : false,
  //       tags: queryData.loginUser?.targetUser?.tags.edges
  //         ? queryData.loginUser?.targetUser?.tags.edges.map((tag) => {
  //             return tag?.node?.tagName ? tag?.node?.tagName : "";
  //           })
  //         : [],
  //       sendMessages: queryData.loginUser?.sender
  //         ? queryData.loginUser?.sender.edges.map((sender) => {
  //             return {
  //               distinationId: sender?.node?.destination.id ? sender?.node?.destination.id : "",
  //               text: sender?.node?.text ? sender.node.text : "",
  //               createdAt: sender?.node?.createdAt ? sender?.node?.createdAt : "",
  //             };
  //           })
  //         : [],
  //       followingUsers: queryData.loginUser?.targetUser?.followingUsers
  //         ? queryData.loginUser?.targetUser?.followingUsers.edges.map((followingUser) => {
  //             return {
  //               followingId: followingUser?.node?.id ? followingUser?.node?.id : "",
  //               followingName: followingUser?.node?.targetUser?.profileName
  //                 ? followingUser?.node?.targetUser?.profileName
  //                 : "",
  //               followingImage: followingUser?.node?.targetUser?.profileImage
  //                 ? followingUser?.node?.targetUser?.profileImage
  //                 : "",
  //             };
  //           })
  //         : [],
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [queryData]);

  const { loginUserData } = useValidateLoginUser();

  const handleClick = () => {
    // getLoginUserLazyQuery();
    // setProfileImagePath(loginUserData.profileImage);
    // console.log(loginUserData);
    console.log("click");
  };
  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={loginUserData.profileImage} />
      <main>{props.children}</main>
      {/* {isLoading && <div className="text-7xl text-red-500">loading</div>} */}
      <button className="border" onClick={handleClick}>
        button
      </button>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
