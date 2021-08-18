import Head from "next/head";
import { memo } from "react";
import { Footer } from "src/components/layouts/Footer";
import { Header } from "src/components/layouts/Header";
import { useValidateLoginUser } from "src/libs/hooks/users/useValidateLoginUser";

type Props = {
  meta?: {
    pageName?: string;
    descriptions?: string;
  };
  spHeaderTitle: string;
};

export const Layout: React.FC<Props> = memo((props) => {
  // ログインユーザーの検証を行う
  const { loginUserData } = useValidateLoginUser();
  const meta = {
    title: props.meta?.pageName ? `${props.meta.pageName} | ハルスマイル` : "ハルスマイル",
    description: props.meta?.descriptions ? props.meta.descriptions : "ハルスマイルは、・・・",
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:url" content="https://harusmile.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:site_name" content="ハルスマイル" />
        <meta property="og:image" content="/images/logo.png" />

        <meta name="twitter:card" content="Summary Card" />
        {/* <meta name="twitter:site" content="@mayo1201blog" /> */}

        {/* PWA */}
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/pwa/icons/apple-touch-icon-180x180.png"
        />
        <link rel="icon" sizes="512x512" href="/pwa/icons/icon-512x512.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
        {/* <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" /> */}
        {/* <meta name="msapplication-wide310x150logo" content="/site-tile-310x150.png" /> */}
        <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
        <meta name="msapplication-TileColor" content="#000" />
        {/* safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
        <meta name="apple-mobile-web-app-title" content="harusmile" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/pwa/icons/apple-touch-icon-180x180.png"
        />
        {/* 一般 */}
        <meta name="application-name" content="harusmile" />
        <meta name="theme-color" content="#000" />
        <meta name="description" content="harusmile app" />
        <link rel="icon" sizes="512x512" href="/pwa/icons/icon-512x512.png" />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="manifest" href="/pwa/icons/manifest.json" />
      </Head>
      <Header spHeaderTitle={props.spHeaderTitle} profileImagePath={loginUserData.profileImage} />
      <main className="mx-2 md:mx-32 pb-4">{props.children}</main>
      <Footer />
    </div>
  );
});
Layout.displayName = "Layout";
