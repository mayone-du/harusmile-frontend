import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { Layout } from "src/components/layouts/Layout";

const Results: NextPage = () => {
  const router = useRouter();
  const searchKeyword = typeof router.query.keyword === "string" ? router.query.keyword : "";
  return (
    <div>
      <Layout metaTitle={searchKeyword}>
        <h2>"{searchKeyword}"の検索結果</h2>
      </Layout>
    </div>
  );
};

export default Results;
