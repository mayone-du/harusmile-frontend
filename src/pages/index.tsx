import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllProfilesQuery, GetAllProfilesQueryVariables } from "src/apollo/schema";
import { GetAllProfilesDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfilesWrapper } from "src/components/profiles/ProfilesWrapper";
import { SearchBox } from "src/components/SearchBox";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
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
const Index: NextPage<PropsGetAllProfilesQuery<GetAllProfilesQuery>> = (props) => {
  return (
    <Layout metaTitle="ハルスマイル | 大学生と高校生のマッチングサービス">
      <section className="md:py-10 py-4 md:mt-10 mt-8 md:mb-20 mb-8 bg-pink-50 rounded-xl">
        <h2 className="md:py-10 py-4 md:text-4xl text-xl font-bold text-center text-gray-600 dark:text-white">
          全く新しい大学受験メンタリングの形
        </h2>
        <h3 className="py-4 md:text-2xl text-lg font-bold text-center text-gray-500">
          憧れの先輩に直接質問する時代
        </h3>
        <div className="flex justify-center">
          <div className="mx-10 w-full text-center">
            <Image src="/images/top-sample01.png" width={300} height={300}></Image>
          </div>
          <div className="mx-10 w-full text-center">
            <Image src="/images/top-sample02.png" width={300} height={300}></Image>
          </div>
          <div className="mx-10 w-full text-center">
            <Image src="/images/top-sample03.png" width={300} height={300}></Image>
          </div>
        </div>
      </section>

      {/* 検索窓 */}
      <SearchBox />

      <section className="md:pb-20 pb-6">
        <h2 className="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-6 md:w-12 md:h-12 w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="md:py-10 py-4 md:text-5xl text-lg font-bold text-center text-gray-600 dark:text-white">
            一覧から探す
          </div>
        </h2>
        <ProfilesWrapper profilesData={props.profilesData} />
      </section>
    </Layout>
  );
};

export default Index;
