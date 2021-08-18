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
          <a className="flex border-b">
            <span className="block">ログインはこちら</span>
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
    </Layout>
  );
};

export default SignUp;
