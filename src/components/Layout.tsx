import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { useRefreshTokensMutation } from "src/apollo/schema";
import { useGetLoginUserQuery } from "src/apollo/schema";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { calcDate } from "src/libs/calcDate";

type Props = {
  metaTitle: string;
};

export const Layout: React.FC<Props> = (props) => {
  const [refreshTokenMutation] = useRefreshTokensMutation();
  const { data: loginUserData } = useGetLoginUserQuery();
  const [profileImagePath, setProfileImagePath] = useState("");

  const cookies = parseCookies();
  // accessTokenの更新
  useEffect(() => {
    (async () => {
      // accessTokenがなく、refreshTokenがある場合にaccessTokenを更新
      if (!cookies.accessToken && cookies.refreshToken) {
        const { data } = await refreshTokenMutation({
          variables: { refreshToken: cookies.refreshToken },
        });
        data?.refreshToken &&
          setCookie(null, "accessToken", data?.refreshToken?.token, {
            path: "/",
            maxAge: calcDate(data.refreshToken.payload.exp),
          });
      }

      if (loginUserData?.loginUser?.targetUser?.profileImage) {
        setProfileImagePath(loginUserData?.loginUser?.targetUser?.profileImage);
      }
    })();
  }, [cookies.accessToken, cookies.refreshToken, refreshTokenMutation, loginUserData]);

  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={profileImagePath} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};
