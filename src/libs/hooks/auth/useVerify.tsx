import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/graphql/apollo/cache";
import { useUpdateUserMutation } from "src/graphql/apollo/schemas/schema";

// 本登録のhooks
export const useVerify = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  // クエリパラメーターでtokenを取得 https://test.com/auth/verify?token=nakamidesu...
  const router = useRouter();
  const token = router.query.token?.toString();
  const [updateUserMutation] = useUpdateUserMutation();
  // 更新したときの状態
  const [verifyMessage, setVerifyMessage] = useState("");
  useEffect(() => {
    // tokenが存在し、ログイン状態がfalseのとき
    if (token && !loginUserData.isLogin) {
      (async () => {
        try {
          // 本登録
          await updateUserMutation({
            variables: {
              token: token,
            },
          });
          setVerifyMessage("本登録が完了しました。ログイン画面よりログインして下さい。");
        } catch (error) {
          // TODO: エラーハンドリングなど
          setVerifyMessage("既に本登録が済んでいるか、認証用トークンが無効です。");
          console.error(error);
          return;
        }
      })();
    } else if (token === undefined) {
      setVerifyMessage("メールアドレスに送信されたURLをクリックして本登録を済ませてください。");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return {
    verifyMessage,
  };
};
