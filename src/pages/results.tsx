import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSearchProfilesLazyQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/posts/ProfilesWrapper";

const Results: NextPage = () => {
  const router = useRouter();
  const searchKeyword = typeof router.query.keyword === "string" ? router.query.keyword : "";
  const searchCondition = router.query.condition;

  const [searchProfileName, { data: profileNameData }] = useSearchProfilesLazyQuery();

  useEffect(() => {
    // TODO: 条件の個数によって分岐
    // profileNameが含まれる場合
    if (searchCondition === "profileName") {
      searchProfileName({
        variables: { inputProfileName: searchKeyword },
      });
    } else if (searchCondition === "schoolName") {
      searchProfileName({
        variables: { inputSchoolName: searchKeyword },
      });
    }
  }, [searchCondition]);

  return (
    <div>
      <Layout metaTitle={searchKeyword}>
        <h2 className="py-4 text-2xl text-center">
          {'"'}
          {searchKeyword}
          {'"'}の検索結果
        </h2>
        <p>検索した条件: {searchCondition}</p>
        <section>
          {profileNameData && <ProfilesWrapper profilesData={profileNameData} />}
          {/* {error && <h3>{error.message}</h3>}
          {isLoading && <h3>Loading...</h3>} */}
        </section>
      </Layout>
    </div>
  );
};

export default Results;
