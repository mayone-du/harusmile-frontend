import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import type { NextPageContext } from "next";
import nookies, { parseCookies } from "nookies";
import { cache } from "src/apollo/cache";
import { GRAPHQL_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = createUploadLink({
  uri: GRAPHQL_API_ENDPOINT,
});

const authLink = setContext((operation, { headers }) => {
  const cookies = parseCookies();
  const accessToken = cookies.accessToken;
  // console.log("setContextが呼ばれました。accessToken: ", accessToken);
  // console.log("operation", operation);

  // return the headers to the context so httpLink can read them
  return accessToken
    ? { headers: { ...headers, authorization: `JWT ${accessToken}` } }
    : { headers };
});

const createApolloClient = () => {
  // console.log("createApolloClient");

  // accessTokenがあればJWTにセット
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: typeof window === "undefined" ? httpLink : authLink.concat(httpLink),
    cache: cache,
  });
};
export const initializeApollo = (_initialState = null, context: NextPageContext) => {
  const cookies = nookies.get(context);
  // console.log("initializeApollo", cookies);

  const _apolloClient = apolloClient ?? createApolloClient();
  // SSR時は新しいclientを作成
  if (typeof window === "undefined") return _apolloClient;
  // accessTokenがないときも新しいclientを作成
  if (!cookies.accessToken) return _apolloClient;
  // CSR時は同じクライアントを使い回す
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};
