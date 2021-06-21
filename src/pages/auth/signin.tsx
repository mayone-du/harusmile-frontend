import type { NextPage } from "next";
import Link from "next/link";
import { AuthForm } from "src/components/AuthForm";
import { Layout } from "src/components/layouts/Layout";

const SignIn: NextPage = () => {
  return (
    <Layout metaTitle="ハルスマイル | ログイン">
      <h2 className="text-5xl text-center py-10 mt-6">ログイン</h2>
      <AuthForm pageContext="signin" />
      <div className="flex items-center justify-center">
        <div>
          <Link href="/auth/signup">
            <a className="block p-2 border">新規登録はこちら</a>
          </Link>
        </div>
        <div>
          <Link href="/auth/signout">
            <a className="block p-2 border">ログアウトはこちら</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
