import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";
import { SignOut as SignOutComponent } from "src/components/SignOut";

const SignOut: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="ログアウト" metaTitle="ハルスマイル | ログアウト">
        <SignOutComponent />
      </Layout>
    </div>
  );
};

export default SignOut;
