import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { loginUserVar } from "src/apollo/cache";
import { Layout } from "src/components/layouts/Layout";
import { TalkWrapper } from "src/components/talks/TalkWrapper";

const Talk: NextPage = () => {
  const router = useRouter();
  const loginUserData = useReactiveVar(loginUserVar);
  const cookies = parseCookies();
  useEffect(() => {
    if (!cookies.refreshToken) {
      alert("ログイン後に使用可能です。");
      router.push("/");
    }
    if (loginUserData.isLogin && loginUserData.profileName === "") {
      alert("プロフィールを設定してください。");
      router.push("/settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout spHeaderTitle="トーク一覧" metaTitle="ハルスマイル | トーク一覧">
        <TalkWrapper />
      </Layout>
    </div>
  );
};

export default Talk;