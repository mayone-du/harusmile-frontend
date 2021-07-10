import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="404 Not Found" meta={{ pageName: "404 Not Found" }}>
        指定されたページは存在しませんでした。
      </Layout>
    </div>
  );
};

export default NotFoundPage;
