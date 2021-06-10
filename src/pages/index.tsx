import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/profiles/ProfilesWrapper";
import { SearchBox } from "src/components/SearchBox";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
  });

  return addApolloState(apolloClient, {
    props: { profilesData },
    revalidate: 60 * 60,
  });
};
type PropsGetAllProfilesQuery<T> = {
  profilesData: T;
};
const Index: NextPage<PropsGetAllProfilesQuery<GetAllProfilesQuery>> = (props) => {
  return (
    <Layout metaTitle="Index Page">
      <section className="py-10 mt-10 mb-20 bg-pink-200">
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          全く新しい大学受験メンタリングの形
        </h2>
        <h3 className="py-2 text-xl text-center">憧れの先輩に直接質問する時代</h3>
        <div className="flex justify-center">
          <div className="mx-10 w-full h-20 text-center bg-white">static image</div>
          <div className="mx-10 w-full h-20 text-center bg-white">static image</div>
          <div className="mx-10 w-full h-20 text-center bg-white">static image</div>
        </div>
      </section>

      {/* 検索窓 */}
      <SearchBox />

      <section className="pb-20">
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          一覧から探す
        </h2>
        <ProfilesWrapper profilesData={props.profilesData} />
      </section>
    </Layout>
  );
};

export default Index;
