import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables } from "src/apollo/schema";
import { GetCollegeProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetCollegeProfilesQuery,
    GetCollegeProfilesQueryVariables
  >({
    query: GetCollegeProfilesDocument,
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
const College: NextPage<PropsGetAllProfilesQuery<GetCollegeProfilesQuery>> = (props) => {
  return (
    <Layout spHeaderTitle="大学生プロフィール一覧" meta={{ pageName: "大学生プロフィール一覧" }}>
      <p className="py-10 px-2 text-xl text-center">
        大学生のプロフィール：{props.profilesData?.collegeProfiles?.edges.length.toString()}件
      </p>

      <section>
        <ul className="flex flex-wrap">
          {props.profilesData.collegeProfiles?.edges.map((profile, index) => {
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

export default College;
