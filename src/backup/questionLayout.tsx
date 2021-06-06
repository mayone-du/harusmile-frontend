import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { memo, useEffect, useState } from "react";
import { useGetLoginUserLazyQuery, useRefreshTokensMutation } from "src/apollo/schema";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { calcDate } from "src/libs/calcDate";

type Props = {
  metaTitle: string;
};

// export const Layout: React.FC<Props> = memo((props, context: NextPageContext) => {
export const Layout: React.FC<Props> = memo((props) => {
  const cookies = parseCookies();

  const [refreshTokenMutation] = useRefreshTokensMutation();
  const [getLoginUserLazyQuery, { data: loginUserData, loading: isLoading }] =
    useGetLoginUserLazyQuery();
  const [profileImagePath, setProfileImagePath] = useState(
    typeof loginUserData?.loginUser?.targetUser?.profileImage === "string"
      ? loginUserData?.loginUser?.targetUser?.profileImage
      : "",
  );

  useEffect(() => {
    // accessTokenがなく、refreshTokenがある場合にaccessTokenを更新
    // その後、ログインユーザーを取得するクエリを実行
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
      // クエリを実行
      getLoginUserLazyQuery();
      console.log("query: ", loginUserData);

      // 存在する場合は画像をローカルステートにセット
      if (loginUserData?.loginUser?.targetUser?.profileImage) {
        setProfileImagePath(loginUserData?.loginUser?.targetUser?.profileImage);
      }
    }
  }, [
    cookies.accessToken,
    cookies.refreshToken,
    refreshTokenMutation,
    loginUserData,
    getLoginUserLazyQuery,
  ]);

  // const handleClick = () => {
  //   console.log("click");
  //   console.log(loginUserData);
  // };

  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={profileImagePath} />
      <main>{props.children}</main>
      {isLoading && <div className="text-7xl text-red-500">loading</div>}
      {/* <button className="border" onClick={handleClick}>
        button
      </button> */}
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
