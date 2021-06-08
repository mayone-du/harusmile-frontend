import { useRouter } from "next/dist/client/router";
import { destroyCookie, parseCookies } from "nookies";
import { initialLoginUserVar, loginUserVar } from "src/apollo/cache";

export const SignOut: React.VFC = () => {
  const router = useRouter();
  const handleSignOut = () => {
    const cookies = parseCookies();
    if (cookies.accessToken) destroyCookie(null, "accessToken", { path: "/", maxAge: -100 });
    if (cookies.refreshToken) destroyCookie(null, "refreshToken", { path: "/", maxAge: -100 });
    loginUserVar(initialLoginUserVar);
    alert("サインアウトしました。");
    router.push("/");
  };
  return (
    <div>
      <button onClick={handleSignOut}>SignOut</button>
    </div>
  );
};
