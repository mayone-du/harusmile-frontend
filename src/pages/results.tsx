import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
// import { useEffect } from "react";
import { Layout } from "src/components/layouts/Layout";

const Results: NextPage = () => {
  const router = useRouter();
  const searchKeyword = typeof router.query.keyword === "string" ? router.query.keyword : "";
  // TODO: マウント時に、受け取ったkeywordで検索するqueryを実行

  return (
    <div>
      <Layout metaTitle={searchKeyword}>
        <h2 className="py-4 text-2xl text-center">
          {'"'}
          {searchKeyword}
          {'"'}の検索結果
        </h2>
        <section></section>
      </Layout>
    </div>
  );
};

export default Results;
