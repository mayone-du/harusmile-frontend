import Head from "next/head";
import { memo } from "react";
import { Footer } from "src/components/Footer";
import { Header } from "src/components/Header";
import { useValidateLoginUser } from "src/libs/hooks/useValidateLoginUser";

type Props = {
  metaTitle: string;
};

export const Layout: React.FC<Props> = memo((props) => {
  const { loginUserData } = useValidateLoginUser();

  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
      </Head>
      <Header profileImagePath={loginUserData.profileImage} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
