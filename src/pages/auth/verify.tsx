import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";
import { useVerify } from "src/libs/hooks/auth/useVerify";

// ユーザーの本登録時のページ クエリパラメーターでtokenを受け取り、それを使ってユーザー情報を更新
const VerifyPage: NextPage = () => {
  // 本登録
  const { verifyMessage } = useVerify();
  return (
    <Layout meta={{ pageName: "本登録ページ", descriptions: "" }} spHeaderTitle="本登録ページ">
      {verifyMessage}
    </Layout>
  );
};

export default VerifyPage;
