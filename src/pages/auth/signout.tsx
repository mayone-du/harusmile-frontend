import type { NextPage } from "next";
import { SignOut as SignOutComponent } from "src/components/auth/SignOut";
import { Layout } from "src/components/layouts/Layout";

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
