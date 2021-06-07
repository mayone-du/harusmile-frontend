import Head from "next/head";
import { memo } from "react";
import { Footer } from "src/components/layouts/Footer";
import { Header } from "src/components/layouts/Header";
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
      <main className="mx-2 md:mx-32">{props.children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
