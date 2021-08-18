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
            <a className="flex border-b">
              <span className="block">新規登録はこちら</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
