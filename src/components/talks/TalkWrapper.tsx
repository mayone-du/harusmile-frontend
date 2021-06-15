import { useReactiveVar } from "@apollo/client";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserJoinTalkRoomLazyQuery } from "src/apollo/schema";
import { useCreateMessageMutation } from "src/apollo/schema";
import { InitialTalkDetail } from "src/components/talks/InitialTalkDetail";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";
import { useValidateLoginUser } from "src/libs/hooks/useValidateLoginUser";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

export const TalkWrapper: React.VFC = () => {
  const cookies = parseCookies();
  const { handleRefreshToken } = useRefreshTokens();
  const loginUserData = useReactiveVar(loginUserVar);

  const { loginUserData: validatedLoginUserData } = useValidateLoginUser();
  // ログインユーザーが参加しているトークルームのデータを取得
  const [
    getLoginUserJoinTalkRoom,
    {
      data: talkRoomsData,
      // error: messagesError,
      loading: isLoading,
    },
  ] = useGetLoginUserJoinTalkRoomLazyQuery({
    fetchPolicy: "network-only",
    pollInterval: 1000 * 60,
    variables: {
      loginUserId: loginUserData.userId,
    },
  });

  useEffect(() => {
    (async () => {
      if (validatedLoginUserData.isLogin) {
        if (!cookies.accessToken) {
          await handleRefreshToken();
        }
      }
      getLoginUserJoinTalkRoom();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // どのトークルームを開くかのstate
  const [openTalkRoomId, setOpenTalkRoomId] = useState("");
  const handleOpenTalkRoomChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenTalkRoomId(e.currentTarget.id);
  };

  // メッセージ作成
  const [createMessageMutation] = useCreateMessageMutation();
  const [inputText, setInputText] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    // TODO: 入力欄の検証
    if (inputText === "") {
      alert("メッセージを入力してください。");
      return;
    }
    await handleRefreshToken();
    await createMessageMutation({
      variables: {
        talkingRoomId: openTalkRoomId,
        text: inputText,
      },
    });
    setInputText("");
  };

  // TODO: レビューの作成
  const handleCreateReview = () => {
    alert("レビュー機能は現在開発中です。");
  };

  useEffect(() => {
    setInputText("");
  }, [openTalkRoomId]);

  // TODO: トークルームを最新順に並べ替え (Query自体を書き直す必要ありかも？)

  // トーク履歴がない場合
  if (talkRoomsData?.allTalkRooms?.edges.length === 0) {
    return <InitialTalkDetail />;
  }

  return (
    <div className="flex">
      <aside className="block p-4 w-1/3">
        {isLoading && (
          <div>
            <div className="py-2 px-4 mx-auto w-full border border-gray-100 shadow">
              <div className="flex space-x-4 animate-pulse">
                <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                <div className="flex-1 py-1 space-y-4">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2 px-4 mx-auto w-full border border-gray-100 shadow">
              <div className="flex space-x-4 animate-pulse">
                <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                <div className="flex-1 py-1 space-y-4">
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div>{messagesError && messagesError.message}</div> */}
        <ul className="border shadow-md">
          {talkRoomsData?.allTalkRooms?.edges.map((talkRooms, index) => {
            return (
              // 自分が参加しているトークルームの一覧を返す
              <li className="border-t border-b" key={index}>
                {/* {talkRooms?.node?.talkingRoom.edges.slice(-1)[0]?.node?.sender.email} */}
                {talkRooms?.node?.id ? (
                  <button
                    className="flex items-center py-2 px-4 w-full focus:outline-none"
                    value={talkRooms.node.id}
                    onClick={handleOpenTalkRoomChange}
                    id={talkRooms.node.id}
                  >
                    {/* トークルームの相手を表示 */}
                    {talkRooms.node.joinUsers.edges.map((user) => {
                      return (
                        // 自分を除外したプロフィール
                        user?.node?.id !== loginUserData.userId && (
                          <div className="flex items-center" key={user?.node?.id}>
                            {user?.node?.targetUser?.profileImage ? (
                              <img
                                src={`${MEDIAFILE_API_ENDPOINT}${user.node.targetUser.profileImage}`}
                                alt=""
                                className="block w-14 h-14 rounded-full border"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full border">img</div>
                            )}
                            <div>
                              {/* 相手のプロフィールが設定されていなければemailを返す */}

                              <div className="px-4">
                                {user?.node?.targetUser?.profileName
                                  ? user.node.targetUser.profileName
                                  : user?.node?.id !== loginUserData.userId && user?.node?.email}
                              </div>
                              {/* 最後にやり取りしたメッセージ */}
                              <div>
                                {talkRooms.node?.talkingRoom.edges
                                  .slice(-1)[0]
                                  ?.node?.text.slice(0, 10)}

                                {/* TODO: type narrowing */}
                                {talkRooms.node?.talkingRoom.edges.slice(-1)[0]?.node?.text
                                  .length !== undefined &&
                                talkRooms.node.talkingRoom.edges.slice(-1)[0].node.text.length >= 10
                                  ? "..."
                                  : ""}
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </button>
                ) : (
                  <div>error</div>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="p-4 w-2/3">
        <div>
          {/* トークルーム詳細 */}
          {talkRoomsData?.allTalkRooms?.edges.map((talkRoom, talkRoomIndex) => {
            return (
              openTalkRoomId === talkRoom?.node?.id && (
                <div className="border shadow-md" key={talkRoomIndex}>
                  <div className="flex justify-between items-center py-2 px-10 border-b border-gray-500">
                    {/* 会話相手のプロフィール */}

                    {talkRoom.node.joinUsers.edges.map((user, userIndex) => {
                      return (
                        user?.node?.id !== loginUserData.userId && (
                          <div className="flex items-center" key={userIndex}>
                            {/* 相手のデータのみ表示 */}
                            {user?.node?.targetUser?.profileImage === "" ? (
                              <div className="w-10 h-10 rounded-full border">noimage</div>
                            ) : (
                              user?.node?.targetUser?.profileImage !== null && (
                                <img
                                  src={`${MEDIAFILE_API_ENDPOINT}${user?.node?.targetUser?.profileImage}`}
                                  alt=""
                                  className="block w-10 h-10 rounded-full border"
                                />
                              )
                            )}
                            <div className="mx-4">
                              <p className="text-lg">{user?.node?.targetUser?.profileName}</p>
                              <p>{user?.node?.targetUser?.schoolName}</p>
                            </div>
                          </div>
                        )
                      );
                    })}
                    <button className="block p-2 bg-yellow-500" onClick={handleCreateReview}>
                      レビューを書く
                    </button>
                  </div>
                  {/* トーク部分 */}
                  <div className="overflow-y-scroll max-h-96">
                    <div>
                      <ul>
                        {talkRoom.node.talkingRoom.edges.map((message, messageIndex) => {
                          return (
                            <li
                              className={`my-4 flex ${
                                message?.node?.sender.id === loginUserData.userId
                                  ? "justify-end"
                                  : "justify-start"
                              }`}
                              key={messageIndex}
                            >
                              <div className="px-4">
                                <div
                                  className={`inline-block py-2 px-4 rounded-3xl ${
                                    message?.node?.sender.id === loginUserData.userId
                                      ? "bg-pink-200"
                                      : "bg-blue-200"
                                  }`}
                                >
                                  {message?.node?.text}
                                </div>
                                {/* 送信時刻 */}
                                <div className="text-xs text-right text-gray-500">
                                  {fixDateFormat(message?.node?.createdAt)}
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            );
          })}
          {/* 入力欄や送信ボタン */}
          {/* トークルームが選択されていなければ非表示 */}
          {openTalkRoomId !== "" && (
            <div className="flex items-center">
              <input
                type="text"
                className="block p-4 w-5/6 border"
                placeholder="メッセージを入力"
                value={inputText}
                onChange={handleInputChange}
              />
              <button
                className="flex justify-center items-center p-4 w-1/6 bg-pink-200"
                onClick={handleSubmit}
              >
                <span className="block px-2 text-lg">送信</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-2 w-5 h-5 transform rotate-45"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 入力欄や送信ボタン */}
      {/* <div className="flex items-center">
        <input
          type="text"
          className="block p-2 border border-black"
          placeholder="メッセージを入力"
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="block py-2 px-4 bg-pink-400" onClick={handleSubmit}>
          送信
        </button>
      </div> */}
      {/* </div> */}
    </div>
    // </div>
  );
};
