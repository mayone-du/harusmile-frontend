import type { GetStaticProps, NextPage } from "next";
import {
  // useEffect,
  useState,
} from "react";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
// import { useGetAllProfilesLazyQuery } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";

// TODO: 無限スクロールかページネーションの実装
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
    // variables: {
    //   first: 10, // 最初から10件のみ取得（ページネーション）
    // },
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
  // const initialProfilesCount = 2;
  // // 追加で取得したプロフィールを管理するstate
  // const [moreProfiles, setMoreProfiles] = useState<GetAllProfilesQuery>();
  // // 追加で取得する件数などの管理用state
  // const [moreNumber, setMoreNumber] = useState(initialProfilesCount);
  // const [getAllProfilesLazyQuery, { data, loading: isLoading }] = useGetAllProfilesLazyQuery();
  // // const handleClickGetMoreAllProfiles = (moreCount: number) => {
  //   getAllProfilesLazyQuery({
  //     variables: {
  //       offset: moreCount,
  //       first: initialProfilesCount,
  //     },
  //   });
  //   if (data !== undefined) {
  //     setMoreProfiles(data);
  //   }
  //   setMoreNumber((prev) => {
  //     return prev + initialProfilesCount;
  //   });
  // };

  const [
    profilesLength,
    // setProfilesLength
  ] = useState<number>(
    props.profilesData.allProfiles?.edges.length ? props.profilesData.allProfiles.edges.length : 0,
  );

  // プロフィールの件数が変わるごとにセット
  // useEffect(() => {
  //   const moreDataLength = data?.allProfiles?.edges.length;
  //   const propsDataLength = props.profilesData.allProfiles?.edges.length;
  //   if (typeof moreDataLength === "number" && typeof propsDataLength === "number") {
  //     setProfilesLength(moreDataLength + propsDataLength);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data?.allProfiles?.edges.length, props.profilesData.allProfiles?.edges.length]);

  return (
    <Layout
      spHeaderTitle="全てのプロフィール"
      meta={{
        pageName: "全てのプロフィール",
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

        {/* 追加で取得したプロフィール
        <ul className="flex flex-wrap">
          {moreProfiles?.allProfiles?.edges.map((profile: any, index: any) => {
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
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() => {
            handleClickGetMoreAllProfiles(moreNumber);
          }}
        >
          もっと読み込む
        </button> */}
      </section>
    </Layout>
  );
};

export default AllProfiles;
