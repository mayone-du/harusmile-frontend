import type { NextPage } from "next";
import { SignOut as SignOutComponent } from "src/components/auth/SignOut";
import { Layout } from "src/components/layouts/Layout";

const SignOut: NextPage = () => {
  return (
    <Layout spHeaderTitle="ログアウト" meta={{ pageName: "ログアウト" }}>
      <div className="pt-4">
        <SignOutComponent />
      </div>
    </Layout>
  );
};

export default SignOut;
