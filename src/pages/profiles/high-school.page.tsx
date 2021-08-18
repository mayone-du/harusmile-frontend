import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/client";
import type {
  GetHighSchoolProfilesQuery,
  GetHighSchoolProfilesQueryVariables,
} from "src/apollo/schema";
import { GetHighSchoolProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";

// 高校生の情報をSSG
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetHighSchoolProfilesQuery,
    GetHighSchoolProfilesQueryVariables
  >({
    query: GetHighSchoolProfilesDocument,
  });

  // return { props: { profilesData: profilesData } };
  return addApolloState(apolloClient, {
    props: {
      profilesData,
      // fallback: false,
    },
    revalidate: 5, // 5seconds
  });
};
type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};

const HighSchool: NextPage<PropsGetAllProfilesQuery<GetHighSchoolProfilesQuery>> = (props) => {
  return (
    <Layout
      spHeaderTitle="高校生プロフィール一覧"
      meta={{ pageName: "ハルスマイル | 高校生プロフィール一覧" }}
    >
      <p className="py-10 px-2 text-xl text-center">
        高校生のプロフィール: {props.profilesData?.highSchoolProfiles?.edges.length.toString()}件
      </p>
      <section>
        <ul className="flex flex-wrap">
          {props.profilesData.highSchoolProfiles?.edges.map((profile, index) => {
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
                admissionFormat={profile?.node?.admissionFormat ? profile.node.admissionFormat : ""}
                favoriteSubject={profile?.node?.favoriteSubject ? profile.node.favoriteSubject : ""}
                problem={profile?.node?.problem ? profile.node.problem : ""}
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
      </section>
    </Layout>
  );
};

export default HighSchool;
