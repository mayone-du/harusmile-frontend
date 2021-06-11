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

const TalkDetail: React.VFC = () => {
  return <div></div>;
};

export default TalkDetail;
