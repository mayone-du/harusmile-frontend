import { useGetAllPostsQuery } from "src/apollo/schema";
import { Post } from "src/components/posts/Post";

export const PostsWrapper: React.VFC = () => {
  const { data, loading: isLoading, error } = useGetAllPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div> {error.message} </div>;
  return (
    <div className="md:flex md:flex-wrap">
      {data?.allPosts?.edges &&
        data.allPosts.edges.map((post) => {
          return (
            <div className="p-4 md:w-1/3" key={post?.node?.id}>
              <Post
                title={post?.node?.title ? post.node.title : ""}
                content={post?.node?.content ? post.node.content : ""}
              />
            </div>
          );
        })}
    </div>
  );
};
