import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type {
  GetHighSchoolProfilesQuery,
  GetHighSchoolProfilesQueryVariables,
} from "src/apollo/schema";
import { GetHighSchoolProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { HighSchoolProfilesWrapper } from "src/components/profiles/HighSchoolProfilesWrapper";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetHighSchoolProfilesQuery,
    GetHighSchoolProfilesQueryVariables
  >({
    query: GetHighSchoolProfilesDocument,
  });

  return addApolloState(apolloClient, {
    props: { profilesData },
    revalidate: 60 * 60,
  });
};
type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};

const HighSchool: NextPage<PropsGetAllProfilesQuery<GetHighSchoolProfilesQuery>> = (props) => {
  return (
    <Layout metaTitle="HighSchool">
      <p className="py-10 px-2 text-xl text-center">
        高校生のプロフィール: {props.profilesData?.highSchoolProfiles?.edges.length.toString()}件
      </p>
      <section>
        {props.profilesData && <HighSchoolProfilesWrapper profilesData={props.profilesData} />}
      </section>
    </Layout>
  );
};

export default HighSchool;
