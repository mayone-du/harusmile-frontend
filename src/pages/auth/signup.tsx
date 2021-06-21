import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layouts/Layout";
import { useAuth } from "src/libs/hooks/useAuth";

const SignUp: NextPage = () => {
  const { inputEmail, inputPassword, handleEmailChange, handlePasswordChange, handleSignUp } =
    useAuth();
  return (
    <Layout metaTitle="ハルスマイル | 新規登録">
      <h2 className="text-5xl text-center py-10 mt-6">新規登録</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <input
            type="email"
            className="border focus:outline-none block w-1/3 p-2 rounded-sm mx-auto"
            placeholder="email"
            value={inputEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <input
            type="password"
            className="border focus:outline-none block w-1/3 p-2 rounded-sm mx-auto"
            placeholder="password"
            value={inputPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="border block w-1/6 p-2 rounded-sm my-4 mx-auto" type="submit">
          新規登録
        </button>
      </form>
      <div className="flex items-center justify-center my-8">
        <Link href="/auth/signin">
          <a className="block border p-2">ログインはこちら</a>
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
