import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layouts/Layout";
import { useAuth } from "src/libs/hooks/useAuth";

const SignIn: NextPage = () => {
  const { inputEmail, inputPassword, handleEmailChange, handlePasswordChange, handleSignIn } =
    useAuth();
  return (
    <Layout metaTitle="SignIn">
      <h2 className="text-5xl text-center py-10 mt-6">ログイン</h2>
      <form onSubmit={handleSignIn}>
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
          ログイン
        </button>
      </form>
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
