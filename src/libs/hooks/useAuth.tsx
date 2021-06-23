import { useRouter } from "next/dist/client/router";
import { setCookie } from "nookies";
import { useCallback, useState } from "react";
import { initialLoginUserVar, loginUserVar } from "src/apollo/cache";
import {
  useCreateProfileMutation,
  useCreateUserMutation,
  useGetTokensMutation,
} from "src/apollo/schema";
import { calcDate } from "src/libs/calcDate";

export const useAuth = () => {
  const router = useRouter();

  const [createUserMutation] = useCreateUserMutation();
  const [getTokensMutation] = useGetTokensMutation();
  const [createProfileMutation] = useCreateProfileMutation();
  const [isCollegeStudent, setIsCollegeStudent] = useState(false);
  const [inputProfileName, setInputProfileName] = useState("");
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
  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  }, []);
  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  }, []);

  // 入力欄のバリデーション
  const validateInputs = useCallback((): { isFormError: boolean } => {
    if (inputProfileName === "") {
      alert("ユーザーネームを入力してください。");
      return { isFormError: true };
    }
    // メールアドレスが空文字
    if (inputEmail === "") {
      alert("正しい形式でメールアドレスを入力してください。");
      return { isFormError: true };
      // パスワードが4文字以下
    } else if (inputPassword.length <= 4) {
      alert("パスワードは5文字以上で入力してください。");
      return { isFormError: true };
    } else {
      return { isFormError: false };
    }
  }, [inputProfileName, inputEmail, inputPassword]);

  // signIn
  const handleSignIn = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { isFormError } = validateInputs();

    if (!isFormError) {
      try {
        const { data: tokenData } = await getTokensMutation({
          variables: {
            email: inputEmail,
            password: inputPassword,
          },
        });

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

        loginUserVar(initialLoginUserVar);
        setInputProfileName("");
        setInputEmail("");
        setInputPassword("");
        alert("ログインが完了しました。");
        await router.push("/");
        router.reload();
      } catch (error) {
        alert(error);
        return;
      }
    }
  };

  // signUp
  const handleSignUp = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isFormError } = validateInputs();
    if (!isFormError) {
      try {
        await createUserMutation({ variables: { email: inputEmail, password: inputPassword } });

        // サインイン
        const { data: tokenData } = await getTokensMutation({
          variables: {
            email: inputEmail,
            password: inputPassword,
          },
        });

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

        loginUserVar(initialLoginUserVar);
        setInputEmail("");
        setInputPassword("");

        // プロフィールを作成
        await createProfileMutation({
          variables: {
            profileName: inputProfileName,
            isCollegeStudent: isCollegeStudent,
          },
        });

        await router.push("/");
        alert("登録が完了しました。");
        router.reload();
      } catch (error) {
        alert(error);
        return;
      }
    }
  };
  return {
    isCollegeStudent,
    handleSetCollegeStudent,
    handleSetHighSchoolStudent,
    inputProfileName,
    setInputProfileName,
    inputEmail,
    setInputEmail,
    inputPassword,
    setInputPassword,
    handleProfileNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
    handleSignIn,
  };
};
