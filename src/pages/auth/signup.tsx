import type { NextPage } from "next";
import Link from "next/link";
import { AuthForm } from "src/components/auth/AuthForm";
import { Layout } from "src/components/layouts/Layout";

const SignUp: NextPage = () => {
  return (
    <Layout spHeaderTitle="新規登録" meta={{ pageName: "新規登録" }}>
      <div className="py-8">
        <AuthForm pageContext="signup" />
      </div>

      <div className="flex items-center justify-center my-8">
        <Link href="/auth/signin">
          <a className="block border p-2">ログインはこちら</a>
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
