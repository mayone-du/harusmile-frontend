import { useRouter } from "next/dist/client/router";
import { destroyCookie, parseCookies } from "nookies";
import { initialLoginUserVar, loginUserVar } from "src/apollo/cache";

export const SignOut: React.VFC = () => {
  const router = useRouter();
  const handleSignOut = () => {
    const cookies = parseCookies();
    if (cookies.accessToken) destroyCookie(null, "accessToken", { path: "/", maxAge: -1 });
    if (cookies.refreshToken) destroyCookie(null, "refreshToken", { path: "/", maxAge: -1 });
    loginUserVar(initialLoginUserVar);
    alert("ログアウトしました。");
    router.push("/");
  };
  return (
    <div>
      <button className="py-2 px-4 border" onClick={handleSignOut}>
        ログアウト
      </button>
    </div>
  );
};
