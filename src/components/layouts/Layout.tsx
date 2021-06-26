import Head from "next/head";
import { memo } from "react";
import { Footer } from "src/components/layouts/Footer";
import { Header } from "src/components/layouts/Header";
import { useValidateLoginUser } from "src/libs/hooks/users/useValidateLoginUser";

type Props = {
  metaTitle: string;
  spHeaderTitle: string;
};

export const Layout: React.FC<Props> = memo((props) => {
  const { loginUserData } = useValidateLoginUser();

  return (
    <div>
      <Head>
        <title>{props.metaTitle}</title>
        <meta property="og:url" content="https://" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Test Title" />
        <meta property="og:description" content="Test Description" />
        <meta property="og:site_name" content="Test SiteName" />
        <meta property="og:image" content="/images/sample-image.jpg" />

        <meta name="twitter:card" content="Summary Card" />
        {/* <meta name="twitter:site" content="@mayo1201blog" /> */}
      </Head>
      <Header spHeaderTitle={props.spHeaderTitle} profileImagePath={loginUserData.profileImage} />
      <main className="mx-2 md:mx-32">{props.children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
