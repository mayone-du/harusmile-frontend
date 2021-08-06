import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";

// ユーザーの本登録時のページ
const VerifyPage: NextPage = () => {
  // クエリパラメーターでtokenを取得 https://test.com/auth/verify?token=nakamidesu...
  const router = useRouter();
  const token = router.query.token?.toString();
  const [updateUserMutation] = useUpdateUserMutation();
  useEffect(() => {
    // tokenが存在する場合
    if (token) {
      (async () => {
        // トークンを取得する必要あり？
        const is_ok = await updateUserMutation({
          variables: {
            token: token,
          },
        });
        // 問題なく更新出来た場合
        if (is_ok) {
          toast.success("本登録が完了しました。");
          // トップページに遷移
          router.push("/");
          return;
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <Layout meta={{ pageName: "本登録ページ", descriptions: "" }} spHeaderTitle="本登録ページ">
      本登録用のページです。
    </Layout>
  );
};

export default VerifyPage;
