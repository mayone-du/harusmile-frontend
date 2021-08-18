import { parseCookies, setCookie } from "nookies";
import {
  useRefreshTokensMutation,
  useRevokeRefreshTokenMutation,
} from "src/graphql/apollo/schemas/schema";
import { calcDate } from "src/libs/calcDate";

export const useRefreshTokens = () => {
  const [refreshTokensMutation] = useRefreshTokensMutation();
  const [revokerefreshTokenMutation] = useRevokeRefreshTokenMutation();

  // 送信用関数
  const handleRefreshToken = async () => {
    try {
      // tokenの確認と更新
      const cookies = parseCookies();
      if (!cookies.accessToken && cookies.refreshToken) {
        const { data } = await refreshTokensMutation({
          variables: {
            refreshToken: cookies.refreshToken,
          },
        });
        if (data?.refreshToken) {
          const oldRefreshToken = cookies.refreshToken;

          // accessTokenをセット
          setCookie(null, "accessToken", data.refreshToken.token, {
            path: "/",
            maxAge: calcDate(data?.refreshToken?.payload.exp),
          });

          // refreshTokenをセット
          setCookie(null, "refreshToken", data?.refreshToken?.refreshToken, {
            path: "/",
            maxAge: calcDate(data?.refreshToken?.refreshExpiresIn),
          });

          // 古いrefreshTokenを無効化
          await revokerefreshTokenMutation({
            variables: { refreshToken: oldRefreshToken },
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`useRefreshTokensError: ${error}`);
      return;
    }
  };

  return {
    handleRefreshToken,
  };
};
