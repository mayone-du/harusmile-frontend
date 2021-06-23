import type { GetStaticProps, NextPage } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetCollegeProfilesQuery, GetCollegeProfilesQueryVariables } from "src/apollo/schema";
import { GetCollegeProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { CollegeProfilesWrapper } from "src/components/profiles/CollegeProfilesWrapper";

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
    <Layout
      spHeaderTitle="大学生プロフィール一覧"
      metaTitle="ハルスマイル | 大学生プロフィール一覧"
    >
      <p className="py-10 px-2 text-xl text-center">
        大学生のプロフィール：{props.profilesData?.collegeProfiles?.edges.length.toString()}件
      </p>

      <section>
        {props.profilesData && <CollegeProfilesWrapper profilesData={props.profilesData} />}
      </section>
    </Layout>
  );
};

export default College;
