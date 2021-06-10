import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useSearchProfileNameQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/posts/ProfilesWrapper";

const Results: NextPage = () => {
  const router = useRouter();
  const searchKeyword = typeof router.query.keyword === "string" ? router.query.keyword : "";
  const {
    data,
    error,
    loading: isLoading,
  } = useSearchProfileNameQuery({
    variables: {
      keyword: searchKeyword,
    },
  });

  // TODO: マウント時に、受け取ったkeywordで検索するqueryを実行

  return (
    <div>
      <Layout metaTitle={searchKeyword}>
        <h2 className="py-4 text-2xl text-center">
          {'"'}
          {searchKeyword}
          {'"'}の検索結果
        </h2>
        <section>
          {data && <ProfilesWrapper profilesData={data} />}
          {error && <h3>{error.message}</h3>}
          {isLoading && <h3>Loading...</h3>}
        </section>
      </Layout>
    </div>
  );
};

export default Results;
