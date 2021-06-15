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

  return addApolloState(apolloClient, {
    props: { profilesData },
    revalidate: 60 * 60,
  });
};
type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};
const Collage: NextPage<PropsGetAllProfilesQuery<GetCollageProfilesQuery>> = (props) => {
  return (
    <Layout metaTitle="Collage">
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
