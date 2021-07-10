import type { GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";
import { useGetMoreAllProfiles } from "src/libs/hooks/useGetMoreAllProfiles";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
    // TODO: 無限スクロールの実装
    variables: {
      first: 5,
    },
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
const AllProfiles: NextPage<PropsGetAllProfilesQuery<GetAllProfilesQuery>> = (props) => {
  const [profilesLength, setProfilesLength] = useState<number>(
    props.profilesData.allProfiles?.edges.length ? props.profilesData.allProfiles.edges.length : 0,
  );
  // const [moreProfiles, setMoreProfiles] = useState<GetAllProfilesQuery>();
  const { getMoreAllProfiles, isLoading, data } = useGetMoreAllProfiles();
  const handleClickGetMoreAllProfiles = () => {
    getMoreAllProfiles();
    // setMoreProfiles(data);
  };

  // プロフィールの件数が変わるごとにセット
  useEffect(() => {
    const moreDataLength = data?.allProfiles?.edges.length;
    const propsDataLength = props.profilesData.allProfiles?.edges.length;
    if (typeof moreDataLength === "number" && typeof propsDataLength === "number") {
      setProfilesLength(moreDataLength + propsDataLength);
    }
  }, [data?.allProfiles?.edges.length, props.profilesData.allProfiles?.edges.length]);

  return (
    <Layout
      spHeaderTitle="大学生プロフィール一覧"
      meta={{
        pageName: "大学生プロフィール一覧",
      }}
    >
      <p className="py-10 px-2 text-xl text-center">
        すべてのプロフィール：{profilesLength.toString()}件
      </p>

      <section>
        <ul className="flex flex-wrap">
          {props.profilesData.allProfiles?.edges.map((profile, index) => {
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

        <ul className="flex flex-wrap">
          {data?.allProfiles?.edges.map((profile: any, index: any) => {
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
                    ? profile.node.targetUser.provider.edges.map((review: any) => {
                        return review?.node?.stars;
                      })
                    : [0]
                }
              />
            );
          })}
        </ul>
        {isLoading && <div>Loading</div>}
        <button
          className="px-4 py-2 block my-8 mx-auto text-center border rounded-md"
          type="button"
          onClick={handleClickGetMoreAllProfiles}
        >
          もっと読み込む
        </button>
      </section>
    </Layout>
  );
};

export default AllProfiles;
