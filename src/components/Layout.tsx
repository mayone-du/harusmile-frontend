import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { memo, useEffect, useState } from "react";
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

  const [refreshTokenMutation] = useRefreshTokensMutation();
  const { data: loginUserData, loading: isLoading } = useGetLoginUserQuery();
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
    }
  }, [cookies.accessToken, cookies.refreshToken, refreshTokenMutation, loginUserData]);

  useEffect(() => {
    // クエリで取得したデータが存在し、ローカルストレージに画像のパスを保存してない時の処理
    if (loginUserData && profileImagePath === "") {
      localStorage.setItem(
        "loginUserImage",
        JSON.stringify(loginUserData.loginUser?.targetUser?.profileImage),
      );
      const defaultLocalData = localStorage.getItem("loginUserImage");
      const parsedLocalData = defaultLocalData !== null && JSON.parse(defaultLocalData);
      setProfileImagePath(parsedLocalData);
    }
  }, [loginUserData, profileImagePath]);

  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={profileImagePath} />
      <main>{props.children}</main>
      {isLoading && <div className="text-7xl text-red-500">loading</div>}
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
