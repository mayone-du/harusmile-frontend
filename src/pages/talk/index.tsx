import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserJoinTalkRoomQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { TalkRooms } from "src/components/talks/TalkRooms";

const Talk: NextPage = () => {
  const router = useRouter();
  const loginUserData = useReactiveVar(loginUserVar);

  // 自分に関係するメッセージを定期的に取得
  const {
    data: talkRoomsData,
    error: messagesError,
    loading: isLoading,
  } = useGetLoginUserJoinTalkRoomQuery({
    fetchPolicy: "network-only",
    pollInterval: 60 * 60,
    variables: {
      loginUserId: loginUserData.userId,
    },
  });

  useEffect(() => {
    if (loginUserData.isLogin && loginUserData.profileName === "") {
      alert("プロフィールを設定してください。");
      router.push("/settings");
    }
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
                  {messagesError && messagesError.message}
                  {isLoading && <div>loading</div>}
                  {talkRoomsData && <TalkRooms talkRoomsData={talkRoomsData} />}
                </div>

                <ul>
                  <li className="flex items-center py-2 px-4 border-t border-b">
                    <img
                      src="/images/logo.png"
                      alt=""
                      className="block mx-4 w-14 h-14 rounded-full border"
                    />
                    <div>
                      <div className="flex justify-between">
                        <h4>なまえ</h4>
                        <div>11:57</div>
                      </div>

                      <p>最後のメッセージ</p>
                    </div>
                  </li>

                  {/* サンプルトーク履歴リスト */}
                  <li className="flex items-center py-2 px-4 border-t border-b">
                    <img
                      src="/images/logo.png"
                      alt=""
                      className="block mx-4 w-14 h-14 rounded-full border"
                    />
                    <div>
                      <div className="flex justify-between">
                        <h4>なまえ</h4>
                        <div>11:57</div>
                      </div>

                      <p>最後のメッセージ</p>
                    </div>
                  </li>
                  <li className="flex items-center py-2 px-4 border-t border-b">
                    <img
                      src="/images/logo.png"
                      alt=""
                      className="block mx-4 w-14 h-14 rounded-full border"
                    />
                    <div>
                      <div className="flex justify-between">
                        <h4>なまえ</h4>
                        <div>11:57</div>
                      </div>

                      <p>最後のメッセージ</p>
                    </div>
                  </li>

                  {/* サンプル終わり */}
                </ul>
              </div>
            </div>
          </aside>

          {/* talk */}

          <div className="p-4 w-2/3">
            <div className="border shadow-md">
              {/* 会話相手のプロフィール */}
              <div className="flex justify-between items-center py-2 px-10 border-b border-gray-500">
                <div className="flex items-center">
                  <img src="" alt="Profile" className="block w-10 h-10 rounded-full border" />
                  <div className="mx-4">
                    <p className="text-lg">相手の名前</p>
                    <p>相手の学校</p>
                  </div>
                </div>
                <button className="block p-2 bg-yellow-500">レビューを書く</button>
              </div>

              {/* トーク部分 */}
              <div className="overflow-y-scroll">
                {/* メッセージ */}
                <div className="flex justify-end m-4">
                  <p className="py-2 px-4 bg-pink-300">自分からのメッセージ</p>
                </div>
                <div className="flex m-4">
                  <p className="py-2 px-4 border">相手からのメッセージ</p>
                </div>
                <div className="flex justify-end m-4">
                  <p className="py-2 px-4 bg-pink-300">自分からのメッセージ</p>
                </div>
                <div className="flex justify-end m-4">
                  <p className="py-2 px-4 bg-pink-300">
                    自分からのメッセージ自分からのメッセージ自分からのメッセージ
                  </p>
                </div>
              </div>

              {/* 入力欄や送信ボタン */}
              <div className="flex items-center">
                <input
                  type="text"
                  className="block p-2 border border-black"
                  placeholder="メッセージを入力"
                />
                <button className="block py-2 px-4 bg-pink-400 ">送信</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Talk;
