import { useReactiveVar } from "@apollo/client";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { memo, useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useRefreshTokensMutation } from "src/apollo/schema";
import { useGetLoginUserQuery } from "src/apollo/schema";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { calcDate } from "src/libs/calcDate";

type Props = {
  metaTitle: string;
};

export const Layout: React.FC<Props> = memo((props) => {
  const cookies = parseCookies();
  const loginUserData = useReactiveVar(loginUserVar);

  const [refreshTokenMutation] = useRefreshTokensMutation();
  const { data: queryData, loading: isLoading } = useGetLoginUserQuery();
  // CSRかつ、localStorageに保存してる画像のパスがnullでなければ初期値として設定
  const [profileImagePath, setProfileImagePath] = useState(
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("loginUserImage") || "") : "",
  );

  useEffect(() => {
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
      })();
      console.log("アクセストークンが更新されました");
    }
  }, [cookies.accessToken, cookies.refreshToken, refreshTokenMutation, queryData]);

  useEffect(() => {
    // クエリで取得したデータが存在し、ローカルストレージに画像のパスを保存してない時の処理
    if (queryData && profileImagePath === "") {
      localStorage.setItem(
        "loginUserImage",
        JSON.stringify(queryData.loginUser?.targetUser?.profileImage),
      );
      const defaultLocalData = localStorage.getItem("loginUserImage");
      const parsedLocalData = defaultLocalData !== null && JSON.parse(defaultLocalData);
      setProfileImagePath(parsedLocalData);
      console.log(
        "localStorageにパスを保存していなかったので、クエリで取得したデータを設定しました",
      );
    }
  }, [queryData, profileImagePath]);

  useEffect(() => {
    // キャッシュのログイン状態がfalseかつ、クエリーデータがある場合に値をセット
    if (loginUserData.isLogin === false && queryData) {
      loginUserVar({
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
        isLogin: queryData ? true : false,
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

  const handleClick = () => {
    console.log(loginUserData);
  };
  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={profileImagePath} />
      <main>{props.children}</main>
      {isLoading && <div className="text-7xl text-red-500">loading</div>}
      <button className="border" onClick={handleClick}>
        button
      </button>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
