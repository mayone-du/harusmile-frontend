import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { loginUserVar } from "src/apollo/cache";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";

const Settings: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  return (
    <div>
      <Layout metaTitle="settings">
        <h2>Settings</h2>
        <div>
          {loginUserData.isLogin ? (
            <ul>
              <li>Email: {loginUserData.email}</li>
              <li>Email: {loginUserData.profileName}</li>
              <li>Email: {loginUserData.profileText}</li>
            </ul>
          ) : (
            <h3>ログインしてください</h3>
          )}
        </div>
        <ThemeChanger />
      </Layout>
    </div>
  );
};

export default Settings;
