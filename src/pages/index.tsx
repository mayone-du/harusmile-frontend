import type { NextPage } from "next";
import { useGetAllPostsQuery } from "src/apollo/schema";
import { Layout } from "src/components/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";

const Index: NextPage = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <Layout metaTitle="Index Page">
      <div className="flex flex-col justify-center items-center h-40">
        <div className="text-5xl">Index Page</div>
        <ThemeChanger />
      </div>
      <ul>
        {data?.allPosts?.edges.map((post) => {
          return (
            <li key={post?.node?.id} className="m-2">
              {post?.node && post?.node.title}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Index;
