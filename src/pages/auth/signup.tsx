import type { NextPage } from "next";
import Link from "next/link";
import { AuthForm } from "src/components/AuthForm";
import { Layout } from "src/components/layouts/Layout";

const SignUp: NextPage = () => {
  return (
    <Layout spHeaderTitle="新規登録" metaTitle="ハルスマイル | 新規登録">
      <h2 className="text-5xl text-center py-10 mt-6">新規登録</h2>
      <AuthForm pageContext="signup" />
      <div className="flex items-center justify-center my-8">
        <Link href="/auth/signin">
          <a className="block border p-2">ログインはこちら</a>
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
