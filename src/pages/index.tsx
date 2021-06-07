import type { NextPage } from "next";
import type { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
import type { GetAllPostsQuery, GetAllPostsQueryVariables } from "src/apollo/schema";
import { GetAllPostsDocument } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { PostsWrapper } from "src/components/posts/PostsWrapper";

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);
  await apolloClient.query<GetAllPostsQuery, GetAllPostsQueryVariables>({
    query: GetAllPostsDocument,
  });
  return addApolloState(apolloClient, { props: {}, revalidate: 60 * 60 });
};
const Index: NextPage = () => {
  return (
    <Layout metaTitle="Index Page">
      <div className="py-10 bg-pink-200">
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          全く新しい大学受験メンタリングの形
        </h2>
        <h3 className="py-2 text-xl text-center">憧れの先輩に直接質問する時代</h3>
        <div className="flex justify-center">
          <div className="mx-10 w-full h-20 text-center bg-white">img</div>
          <div className="mx-10 w-full h-20 text-center bg-white">img</div>
          <div className="mx-10 w-full h-20 text-center bg-white">img</div>
        </div>
      </div>

      <div>
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          条件から探す
        </h2>
        <div className="py-10 bg-blue-100">
          <p>フリーワード検索</p>
          <input className="border" type="search" placeholder="大学名、出身高校名、部活など" />
        </div>
      </div>

      <div>
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          一覧から探す
        </h2>
        <PostsWrapper />
      </div>
    </Layout>
  );
};

export default Index;
