import { useAuth } from "src/libs/hooks/auth/useAuth";

type Props = {
  pageContext: "signin" | "signup";
};
export const AuthForm: React.VFC<Props> = (props) => {
  const {
    isLoading,
    isCollegeStudent,
    handleSetCollegeStudent,
    handleSetHighSchoolStudent,
    inputProfileName,
    inputSchoolName,
    inputEmail,
    inputPassword,
    handleProfileNameChange,
    handleSchoolNameChange,
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

  const labelClassName = "md:w-1/3 w-2/3 mx-auto block text-sm";
  const inputClassName = "border focus:outline-none block md:w-1/3 w-2/3 p-2 rounded mb-2 mx-auto";
  return (
    <form onSubmit={handleAuth}>
      {/* ローディング */}
      {isLoading && <div>loading</div>}
      {/* 新規登録画面だった場合 */}
      {props.pageContext === "signup" && (
        <div>
          <label htmlFor="username" className={labelClassName}>
            ユーザー名
          </label>
          <input
            id="username"
            type="text"
            className={inputClassName}
            placeholder="ユーザーネーム"
            value={inputProfileName}
            onChange={handleProfileNameChange}
            autoComplete="name"
          />
          {/* 大学生か高校生で登録 */}
          <p className={labelClassName}>身分情報</p>
          <div className="flex items-center justify-center mb-2">
            <button
              type="button"
              onClick={handleSetCollegeStudent}
              className={`focus:outline-none py-2 px-4 block border ${
                isCollegeStudent && "bg-pink-400"
              }`}
            >
              大学生で登録
            </button>
            <button
              type="button"
              onClick={handleSetHighSchoolStudent}
              className={`focus:outline-none py-2 px-4 block border ${
                isCollegeStudent || "bg-pink-400"
              }`}
            >
              高校生で登録
            </button>
          </div>
          <div>
            <label htmlFor="schoolName" className={labelClassName}>
              学校名
            </label>
            <input
              id="schoolName"
              type="text"
              className={inputClassName}
              placeholder="通っている大学、高校名"
              value={inputSchoolName}
              onChange={handleSchoolNameChange}
            />
          </div>
        </div>
      )}

      {/* ログイン時は以下のみ表示 */}
      <div>
        <label htmlFor="email" className={labelClassName}>
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          className={inputClassName}
          placeholder="メールアドレス"
          value={inputEmail}
          onChange={handleEmailChange}
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="password" className={labelClassName}>
          パスワード
        </label>
        <input
          id="password"
          type="password"
          className={inputClassName}
          placeholder="パスワード"
          value={inputPassword}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
      </div>
      <button className="border block md:w-1/6 w-1/3 p-2 rounded-3xl my-4 mx-auto" type="submit">
        {props.pageContext === "signin" ? "ログイン" : "新規登録"}
      </button>
    </form>
  );
};
