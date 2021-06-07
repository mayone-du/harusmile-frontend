import type { NextPage } from "next";
import { Layout } from "src/components/Layout";
import { SignOut as SignOutComponent } from "src/components/SignOut";

const SignOut: NextPage = () => {
  return (
    <div>
      <Layout metaTitle="SignOut">
        <SignOutComponent />
      </Layout>
    </div>
  );
};

export default SignOut;
