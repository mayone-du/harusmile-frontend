import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";
import { SignOut as SignOutComponent } from "src/components/SignOut";

const SignOut: NextPage = () => {
  return (
    <div>
      <Layout metaTitle="SignOut">
        <div className="flex justify-center items-center min-h-screen">
          <SignOutComponent />
        </div>
      </Layout>
    </div>
  );
};

export default SignOut;
