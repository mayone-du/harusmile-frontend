import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/profiles/ProfilesWrapper";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
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
  return (
    <Layout
      spHeaderTitle="大学生プロフィール一覧"
      metaTitle="ハルスマイル | 大学生プロフィール一覧"
    >
      <p className="py-10 px-2 text-xl text-center">
        すべてのプロフィール：{props.profilesData?.allProfiles?.edges.length.toString()}件
      </p>

      <section>
        {props.profilesData && <ProfilesWrapper profilesData={props.profilesData} />}
      </section>
    </Layout>
  );
};

export default AllProfiles;
