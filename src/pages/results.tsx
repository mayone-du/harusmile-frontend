import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useSearchProfilesLazyQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";

const Results: NextPage = () => {
  const router = useRouter();
  // 検索したキーワードを取得
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
      <Layout spHeaderTitle="検索結果" meta={{ pageName: `${searchKeyword}の検索結果` }}>
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
          <ul className="flex flex-wrap">
            {searchProfileData?.allProfiles?.edges.map((profile, index) => {
              return (
                <Profile
                  key={index}
                  profileId={profile?.node?.id ? profile.node.id : ""}
                  profileName={profile?.node?.profileName ? profile.node.profileName : ""}
                  profileText={profile?.node?.profileText ? profile.node.profileText : ""}
                  profileImage={profile?.node?.profileImage ? profile.node.profileImage : ""}
                  schoolName={profile?.node?.schoolName ? profile.node.schoolName : ""}
                  age={profile?.node?.age ? profile.node.age : 0}
                  undergraduate={profile?.node?.undergraduate ? profile.node.undergraduate : ""}
                  department={profile?.node?.department ? profile.node.department : ""}
                  clubActivities={profile?.node?.clubActivities ? profile.node.clubActivities : ""}
                  admissionFormat={
                    profile?.node?.admissionFormat ? profile.node.admissionFormat : ""
                  }
                  favoriteSubject={
                    profile?.node?.favoriteSubject ? profile.node.favoriteSubject : ""
                  }
                  // tags={profile?.node?.tags ? profile.node.tags : []}
                  isCollegeStudent={
                    profile?.node?.isCollegeStudent ? profile.node.isCollegeStudent : false
                  }
                  stars={
                    profile?.node?.targetUser
                      ? profile.node.targetUser.provider.edges.map((review) => {
                          return review?.node?.stars;
                        })
                      : [0]
                  }
                />
              );
            })}
          </ul>
          {/* {error && <h3>{error.message}</h3>}
          {isLoading && <h3>Loading...</h3>} */}
        </section>
      </Layout>
    </div>
  );
};

export default Results;
