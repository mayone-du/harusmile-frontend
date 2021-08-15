import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="404 Not Found" meta={{ pageName: "404 Not Found" }}>
        <h2 className="font-bold text-center py-4">お探しのページは見つかりませんでした。</h2>
      </Layout>
    </div>
  );
};

export default NotFoundPage;
