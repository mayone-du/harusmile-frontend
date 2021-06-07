import { destroyCookie, parseCookies } from "nookies";
import { initialLoginUserVar, loginUserVar } from "src/apollo/cache";

export const SignOut: React.VFC = () => {
  const cookies = parseCookies();
  const handleSignOut = () => {
    cookies.accessToken && destroyCookie(null, "accessToken");
    cookies.refreshToken && destroyCookie(null, "refreshToken");
    loginUserVar(initialLoginUserVar);
  };
  return (
    <div>
      <button onClick={handleSignOut}>SignOut</button>
    </div>
  );
};
