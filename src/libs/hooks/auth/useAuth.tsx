import { useRouter } from "next/dist/client/router";
import { setCookie } from "nookies";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { initialLoginUserVar, loginUserVar } from "src/graphql/apollo/cache";
import {
  useCreateProfileMutation,
  useCreateUserMutation,
  useGetTokensMutation,
} from "src/graphql/apollo/schemas/schema";
import { calcDate } from "src/libs/functions/calcDate";

export const useAuth = () => {
  const router = useRouter();

  const [createUserMutation] = useCreateUserMutation();
  const [getTokensMutation] = useGetTokensMutation();
  const [createProfileMutation] = useCreateProfileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isCollegeStudent, setIsCollegeStudent] = useState(false);
  const [inputProfileName, setInputProfileName] = useState("");
  const [inputSchoolName, setInputSchoolName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSetCollegeStudent = useCallback(() => {
    setIsCollegeStudent(true);
  }, []);
  const handleSetHighSchoolStudent = useCallback(() => {
    setIsCollegeStudent(false);
  }, []);
  const handleProfileNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputProfileName(event.target.value);
  }, []);
  const handleSchoolNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSchoolName(event.target.value);
  }, []);
  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  }, []);
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  }, []);

  // 入力欄のバリデーション 問題があればtrueを返す
  const validateSignInInputs = useCallback((): { isFormError: boolean } => {
    // メールアドレスが空文字
    if (inputEmail === "") {
      toast.error("正しい形式でメールアドレスを入力してください。");
      return { isFormError: true };
      // パスワードが4文字以下
    } else if (inputPassword.length <= 4) {
      toast.error("パスワードは5文字以上で入力してください。");
      return { isFormError: true };
    } else {
      return { isFormError: false };
    }
  }, [inputEmail, inputPassword]);

  // signUpの入力欄のバリデーション 問題があればtrueを返す
  const validateSignUpInputs = useCallback((): { isFormError: boolean } => {
    if (inputProfileName === "") {
      toast.error("ユーザーネームを入力してください。");
      return { isFormError: true };
    }
    if (inputSchoolName === "") {
      toast.error("学校名を入力してください。");
      return { isFormError: true };
    }
    // メールアドレスが空文字
    if (inputEmail === "") {
      toast.error("正しい形式でメールアドレスを入力してください。");
      return { isFormError: true };
      // パスワードが4文字以下
    } else if (inputPassword.length <= 4) {
      toast.error("パスワードは5文字以上で入力してください。");
      return { isFormError: true };
    } else {
      // 問題なければfalstoken
      return { isFormError: false };
    }
  }, [inputProfileName, inputSchoolName, inputEmail, inputPassword]);

  // signIn
  const handleSignIn = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 入力欄の検証を避けるために値をセット。ログインには必要ない。
    const { isFormError } = validateSignInInputs();

    // フォームのエラーがなければtokenを取得
    if (!isFormError) {
      try {
        setIsLoading(true);
        // tokenを取得
        const { data: tokenData } = await getTokensMutation({
          variables: {
            email: inputEmail,
            password: inputPassword,
          },
        });

        // 正常にレスポンスが帰ってきていたらCookieにトークンを保存
        if (tokenData?.tokenAuth) {
          setCookie(null, "accessToken", tokenData.tokenAuth.token, {
            path: "/",
            maxAge: calcDate(tokenData.tokenAuth.payload.exp),
          });
          setCookie(null, "refreshToken", tokenData.tokenAuth.refreshToken, {
            path: "/",
            maxAge: calcDate(tokenData.tokenAuth.refreshExpiresIn),
          });
        }
        // ユーザーのstateを更新
        loginUserVar(initialLoginUserVar);
        setInputProfileName("");
        setInputEmail("");
        setInputPassword("");
        setIsLoading(false);
        await router.push("/");
        toast.success("ログインに成功しました。");
      } catch (error) {
        setIsLoading(false);
        // TODO: 本人確認が済んでいるか、パスワードの検証など
        toast.error("ログインに失敗しました。");
        return;
      }
    }
  };

  // signUp
  const handleSignUp = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isFormError } = validateSignUpInputs();
    if (!isFormError) {
      try {
        setIsLoading(true);

        // ユーザーを作成
        const { data } = await createUserMutation({
          variables: { email: inputEmail, password: inputPassword },
        });
        const userId = data?.createUser?.user?.id ? data.createUser.user.id : "";

        // プロフィールを作成
        await createProfileMutation({
          variables: {
            targetUserId: userId,
            profileName: inputProfileName,
            isCollegeStudent: isCollegeStudent,
            schoolName: inputSchoolName,
          },
        });

        setIsLoading(false);
        await router.push("/");
        toast.success("仮登録が完了しました。メールを確認して本登録してください。");
      } catch (error) {
        setIsLoading(false);
        // TODO: エラー内容によってエラー文を出し分け
        toast.error("メールアドレスが既に登録されています。");
        console.error(error);
        return;
      }
    }
  };
  return {
    isLoading,
    isCollegeStudent,
    handleSetCollegeStudent,
    handleSetHighSchoolStudent,
    inputProfileName,
    inputSchoolName,
    handleSchoolNameChange,
    inputEmail,
    inputPassword,
    handleProfileNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleSignIn,
  };
};
