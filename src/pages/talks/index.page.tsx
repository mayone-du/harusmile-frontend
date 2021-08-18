import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { loginUserVar } from "src/apollo/cache";
import { Layout } from "src/components/layouts/Layout";
import { TalkWrapper } from "src/components/talks/TalkWrapper";

const Talk: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);

  if (loginUserData.isLoading) {
    return (
      <Layout spHeaderTitle="トーク一覧" meta={{ pageName: "トーク一覧" }}>
        Loading...
      </Layout>
    );
  }
  if (!loginUserData.isLogin && !loginUserData.isLoading) {
    return (
      <Layout spHeaderTitle="トーク一覧" meta={{ pageName: "トーク一覧" }}>
        ログイン後に使用可能です。
      </Layout>
    );
  }
  return (
    <div>
      <Layout spHeaderTitle="トーク一覧" meta={{ pageName: "トーク一覧" }}>
        <TalkWrapper />
      </Layout>
    </div>
  );
};

export default Talk;
