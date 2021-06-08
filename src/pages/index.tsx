import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/posts/ProfilesWrapper";

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

      <section className="pb-20">
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          条件から探す
        </h2>
        <div className="mx-32">
          <div className="py-10 px-6 bg-blue-100">
            <p>フリーワード検索</p>
            <div className="flex items-center">
              <input
                className="block p-4 w-full rounded-none border-t border-b border-l focus:outline-none"
                type="search"
                placeholder="大学名、出身高校名、部活など"
              />
              <button className="p-4 bg-white border-t border-r border-b">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <button className="text-blue-700">検索条件を開く</button>
            </div>
          </div>
        </div>
      </section>

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
