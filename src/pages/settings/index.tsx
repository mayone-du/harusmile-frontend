import type { NextPage } from "next";
import { useGetLoginUserQuery } from "src/apollo/schema";
import { Layout } from "src/components/Layout";

const Settings: NextPage = () => {
  const { data } = useGetLoginUserQuery({ fetchPolicy: "network-only" });
  return (
    <div>
      <Layout metaTitle="settings">
        <h2>Settings</h2>
        <div>
          {data?.loginUser && (
            <ul>
              <li>UserID: {data.loginUser.id}</li>
              <li>{data.loginUser.email}</li>
              <li>{data.loginUser.targetUser?.id}</li>
              <li>{data.loginUser.targetUser?.profileName}</li>
              <li>{data.loginUser.targetUser?.profileText}</li>
            </ul>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Settings;
