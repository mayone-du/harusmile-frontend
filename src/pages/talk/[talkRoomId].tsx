import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { loginUserVar } from "src/apollo/cache";
import { Layout } from "src/components/layouts/Layout";
import { TalkDisplay } from "src/components/talks/talkDisplay";
import { TalkRooms } from "src/components/talks/TalkRooms";

const TalkDetail: NextPage = () => {
  // TODO: トークルームに参加していない人たちがいる場合はアクセスできないようにする
  const router = useRouter();
  const loginUserData = useReactiveVar(loginUserVar);

  useEffect(() => {
    if (loginUserData.isLogin && loginUserData.profileName === "") {
      alert("プロフィールを設定してください。");
      router.push("/settings");
    } else if (
      loginUserData.joinTalkRooms.length === 0 ||
      !loginUserData.joinTalkRooms.includes(router.asPath.replace("/talk/", ""))
    ) {
      alert("error");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout metaTitle="Talk Page">
        <div className="flex">
          <aside className="block p-4 w-1/3">
            <div className="border shadow-md">
              <input type="search" className="block p-2 border" placeholder="search" />
              <div>
                <div>
                  <TalkRooms />
                </div>
              </div>
            </div>
          </aside>

          {/* talk */}
          <TalkDisplay />
        </div>
      </Layout>
    </div>
  );
};

export default TalkDetail;
