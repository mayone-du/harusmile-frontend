import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetCollageProfilesQuery, GetCollageProfilesQueryVariables } from "src/apollo/schema";
import { GetCollageProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { CollageProfilesWrapper } from "src/components/profiles/CollageProfilesWrapper";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetCollageProfilesQuery,
    GetCollageProfilesQueryVariables
  >({
    query: GetCollageProfilesDocument,
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
const Collage: NextPage<PropsGetAllProfilesQuery<GetCollageProfilesQuery>> = (props) => {
  return (
    <Layout
      spHeaderTitle="大学生プロフィール一覧"
      metaTitle="ハルスマイル | 大学生プロフィール一覧"
    >
      <p className="py-10 px-2 text-xl text-center">
        大学生のプロフィール：{props.profilesData?.collageProfiles?.edges.length.toString()}件
      </p>

      <section>
        {props.profilesData && <CollageProfilesWrapper profilesData={props.profilesData} />}
      </section>
    </Layout>
  );
};

export default Collage;
