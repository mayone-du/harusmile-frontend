import type { NextPage } from "next";
import Link from "next/link";
import { AuthForm } from "src/components/auth/AuthForm";
import { Layout } from "src/components/layouts/Layout";

const SignIn: NextPage = () => {
  return (
    <Layout spHeaderTitle="ログイン" meta={{ pageName: "ハルスマイル | ログイン" }}>
      <div className="py-8">
        <AuthForm pageContext="signin" />
      </div>
      <div className="flex items-center justify-center">
        <div>
          <Link href="/auth/signup">
            <a className="block p-2 border">新規登録はこちら</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
