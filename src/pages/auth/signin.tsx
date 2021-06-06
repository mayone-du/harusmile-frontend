import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/Layout";
import { useAuth } from "src/libs/hooks/useAuth";

const SignIn: NextPage = () => {
  const { inputEmail, inputPassword, handleEmailChange, handlePasswordChange, handleSignIn } =
    useAuth();
  return (
    <Layout metaTitle="SignIn">
      <h2 className="text-5xl">ログイン</h2>
      <form className="border" onSubmit={handleSignIn}>
        <div>
          <input
            type="email"
            className="border"
            placeholder="email"
            value={inputEmail}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <input
            type="password"
            className="border"
            placeholder="password"
            value={inputPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="border" type="submit">
          SignIn
        </button>
      </form>
      <Link href="/auth/signup">
        <a>SignUp</a>
      </Link>
    </Layout>
  );
};

export default SignIn;
