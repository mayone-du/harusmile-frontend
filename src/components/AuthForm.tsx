import { useAuth } from "src/libs/hooks/useAuth";

type Props = {
  pageContext: "signin" | "signup";
};
export const AuthForm: React.VFC<Props> = (props) => {
  const {
    inputEmail,
    inputPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
    handleSignUp,
  } = useAuth();
  const handleAuth = async (e: React.ChangeEvent<HTMLFormElement>) => {
    if (props.pageContext === "signin") {
      await handleSignIn(e);
    } else if (props.pageContext === "signup") {
      await handleSignUp(e);
    }
  };
  return (
    <form onSubmit={handleAuth}>
      <div>
        <input
          type="email"
          className="border focus:outline-none block md:w-1/3 w-2/3 p-2 rounded-sm mx-auto"
          placeholder="email"
          value={inputEmail}
          onChange={handleEmailChange}
          autoComplete="email"
        />
      </div>
      <div>
        <input
          type="password"
          className="border focus:outline-none block md:w-1/3 w-2/3 p-2 rounded-sm mx-auto"
          placeholder="password"
          value={inputPassword}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
      </div>
      <button className="border block md:w-1/6 w-1/3 p-2 rounded-sm my-4 mx-auto" type="submit">
        {props.pageContext === "signin" ? "ログイン" : "新規登録"}
      </button>
    </form>
  );
};
