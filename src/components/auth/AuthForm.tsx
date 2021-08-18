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
    <form onSubmit={handleAuth} className="relative">
      {/* ローディング */}
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full absolute bg-gray-300 opacity-50">
          <svg
            className="w-6 h-6 text-black animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
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
          <div className="flex items-center justify-center w-2/3 mb-2 mx-auto">
            <button
              type="button"
              onClick={handleSetCollegeStudent}
              className={`focus:outline-none py-2 px-4 block border text-sm rounded-l w-1/2 ${
                isCollegeStudent && "bg-pink-400"
              }`}
            >
              大学生で登録
            </button>
            <button
              type="button"
              onClick={handleSetHighSchoolStudent}
              className={`focus:outline-none py-2 px-4 block border text-sm rounded-r w-1/2 ${
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
