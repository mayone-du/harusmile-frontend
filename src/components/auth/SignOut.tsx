import { useReactiveVar } from "@apollo/client";
import { Button } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { destroyCookie, parseCookies } from "nookies";
import { loginUserVar } from "src/apollo/cache";

export const SignOut: React.VFC = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const router = useRouter();
  const handleSignOut = () => {
    const cookies = parseCookies();
    if (cookies.accessToken) destroyCookie(null, "accessToken", { path: "/", maxAge: -1 });
    if (cookies.refreshToken) destroyCookie(null, "refreshToken", { path: "/", maxAge: -1 });
    alert("ログアウトしました。");
    router.push("/");
    router.reload();
  };

  if (!loginUserData.isLogin) {
    return <div>ログインしてください</div>;
  }
  return (
    <div>
      <section className="border-b my-4">
        <h2 className="text-lg">{loginUserData.profileName}からログアウトしますか？</h2>
      </section>
      <div className="p-4 flex justify-center">
        <Button variant="outlined" color="primary" onClick={handleSignOut}>
          ログアウト
        </Button>
      </div>
    </div>
  );
};
