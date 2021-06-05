import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/Layout";
import { useAuth } from "src/libs/hooks/useAuth";

const SignUp: NextPage = () => {
  const { inputEmail, inputPassword, handleEmailChange, handlePasswordChange, handleSignUp } =
    useAuth();
  return (
    <Layout metaTitle="SignUp">
      <form className="border" onSubmit={handleSignUp}>
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
          SignUp
        </button>
      </form>
      <Link href="/auth/signin">
        <a>SignIn</a>
      </Link>
    </Layout>
  );
};

export default SignUp;
