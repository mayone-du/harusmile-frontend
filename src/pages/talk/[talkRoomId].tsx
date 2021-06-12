// import type { GetStaticPaths } from "next";
// import { addApolloState, initializeApollo } from "src/apollo/apolloClient";
// import type {
//   GetLoginUserMessagesQuery,
//   GetLoginUserMessagesQueryVariables,
// } from "src/apollo/schema";
// import { GetLoginUserMessagesDocument } from "src/apollo/schema";

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apolloClient = initializeApollo(null);
//   const { data: messagesData } = await apolloClient.query<
//     GetLoginUserMessagesQuery,
//     GetLoginUserMessagesQueryVariables
//   >({
//     query: GetLoginUserMessagesDocument,
//   });
//   const paths = messagesData.loginUserMessages?.edges.map((message) => {
//     return message?.node?.destination.id;
//   });
//   const filteredPaths = Array.from(new Set(paths));

//   console.log(paths);

//   return addApolloState(apolloClient, {
//     params: {
//       userId: typeof filteredPaths === "object" && { filteredPaths },
//       fallback: true,
//     },
//   });
// };

// export const getStaticProps: GetStaticProps = () => {
//   return {};
// };

import { useRouter } from "next/dist/client/router";
import { useGetTalkRoomQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";

const TalkDetail: React.VFC = () => {
  const router = useRouter();
  const path = router.asPath.replace("/talk/", "");
  const { data } = useGetTalkRoomQuery({ variables: { talkRoomId: path } });
  return (
    <Layout metaTitle="talk detail">
      <div>
        <ul>
          {data?.talkRoom &&
            data.talkRoom.talkingRoom.edges.map((message, index) => {
              return (
                <li className="my-4 border" key={index}>
                  <div>{message?.node?.sender.email}</div>
                  <div>{message?.node?.text}</div>
                  <div>{message?.node?.createdAt}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </Layout>
  );
};

export default TalkDetail;
