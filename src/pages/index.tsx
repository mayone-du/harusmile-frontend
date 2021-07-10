import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables } from "src/apollo/schema";
import { GetCollegeProfilesDocument } from "src/apollo/schema";
import { CheckSvg } from "src/components/icons/svgs/CheckSvg";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";
import { SearchBox } from "src/components/SearchBox";
// 大学生一覧
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
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

type PropsGetCollegeProfilesQuery<T> = {
  profilesData: T;
};
const Index: NextPage<PropsGetCollegeProfilesQuery<GetCollegeProfilesQuery>> = (props) => {
  return (
    <Layout spHeaderTitle="ホーム">
      <section className="md:py-10 py-4 md:mt-10 md:mb-20 my-4 md:block hidden bg-pink-50 rounded-xl">
        <h2 className="md:py-10 py-2 md:text-4xl text-xl font-bold text-center text-gray-600 dark:text-white">
          全く新しい大学受験メンタリングの形
        </h2>
        <h3 className="py-4 md:text-2xl text-base md:font-bold text-center text-gray-500">
          憧れの先輩に直接質問する時代
        </h3>
        <div className="flex justify-center">
          <div className="md:mx-10 mx-2 w-full text-center">
            <Image src="/images/top-sample01.png" width={300} height={300}></Image>
          </div>
          <div className="md:mx-10 mx-2 w-full text-center">
            <Image src="/images/top-sample02.png" width={300} height={300}></Image>
          </div>
          <div className="md:mx-10 mx-2 w-full text-center">
            <Image src="/images/top-sample03.png" width={300} height={300}></Image>
          </div>
        </div>
      </section>

      {/* 検索窓 */}
      <SearchBox />

      <section className="md:pb-20 pb-6">
        <h2 className="flex justify-center items-center">
          <CheckSvg className="md:mx-6 mx-2 md:w-12 md:h-12 w-6 h-6 text-gray-600 dark:text-white" />
          <div className="md:py-10 py-4 md:text-5xl text-lg font-bold text-center text-gray-600 dark:text-white">
            一覧から探す
          </div>
        </h2>
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

export default Index;
