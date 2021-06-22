import { Layout } from "src/components/layouts/Layout";

const NotFoundPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="404 Not Found" metaTitle="404 Not Found">
        指定されたページは存在しませんでした。
      </Layout>
    </div>
  );
};

export default NotFoundPage;
