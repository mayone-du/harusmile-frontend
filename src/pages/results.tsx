import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSearchProfilesLazyQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/profiles/ProfilesWrapper";

const Results: NextPage = () => {
  const router = useRouter();
  const searchKeyword = typeof router.query.keyword === "string" ? router.query.keyword : "";
  const searchCondition = router.query.condition;

  const [searchProfileQuery, { data: searchProfileData }] = useSearchProfilesLazyQuery();

  useEffect(() => {
    // TODO: 条件や個数によって分岐
    if (searchCondition === "profileName") {
      searchProfileQuery({
        variables: { inputProfileName: searchKeyword },
      });
    } else if (searchCondition === "schoolName") {
      searchProfileQuery({
        variables: { inputSchoolName: searchKeyword },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCondition]);

  return (
    <div>
      <Layout spHeaderTitle="検索結果" metaTitle={`${searchKeyword}の検索結果`}>
        <h2 className="py-4 text-2xl text-center">
          {'"'}
          {searchKeyword}
          {'"'}を含む
          {searchCondition === "schoolName"
            ? "大学名"
            : searchCondition === "profileName"
            ? "ユーザー名"
            : ""}
          の検索結果
        </h2>
        <p>取得件数: {searchProfileData?.allProfiles?.edges.length.toString()}件</p>
        <section>
          {searchProfileData && <ProfilesWrapper profilesData={searchProfileData} />}
          {/* {error && <h3>{error.message}</h3>}
          {isLoading && <h3>Loading...</h3>} */}
        </section>
      </Layout>
    </div>
  );
};

export default Results;
