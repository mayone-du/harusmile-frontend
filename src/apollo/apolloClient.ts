import type { NormalizedCacheObject } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import type { NextPageContext } from "next";
import nookies from "nookies";
import { cache } from "src/apollo/cache";
import type { Cookies } from "src/types/types";
import { GRAPHQL_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const createApolloClient = (context: NextPageContext) => {
  const cookies = nookies.get(context);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createUploadLink({
      uri: GRAPHQL_API_ENDPOINT,
      headers: {
        authorization: cookies.accessToken ? `JWT ${cookies.accessToken}` : "",
      },
    }),
    cache: cache,
  });
};
export const initializeApollo = (
  _initialState = null,
  cookies: Cookies,
  context: NextPageContext,
) => {
  const _apolloClient = apolloClient ?? createApolloClient(context);
  // SSR時は新しいclientを作成
  if (typeof window === "undefined") return _apolloClient;
  // accessTokenがないときも新しいclientを作成
  if (!cookies.accessToken) return _apolloClient;
  // CSR時は同じクライアントを使い回す
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};
