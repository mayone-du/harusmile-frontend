import { useReactiveVar } from "@apollo/client";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserTalkRoomsLazyQuery } from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { InitialTalkDetail } from "src/components/talks/InitialTalkDetail";
import { Message } from "src/components/talks/Message";
import { SkeletonLoading } from "src/components/talks/SkeletonLoading";
import { useCreateMessages } from "src/libs/hooks/useCreateMessages";
import { useCreateReview } from "src/libs/hooks/useCreateReview";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";
import { useValidateLoginUser } from "src/libs/hooks/useValidateLoginUser";

export const TalkWrapper: React.VFC = () => {
  const cookies = parseCookies();
  const { handleRefreshToken } = useRefreshTokens();
  const loginUserData = useReactiveVar(loginUserVar);

  const { loginUserData: validatedLoginUserData } = useValidateLoginUser();
  // ログインユーザーが参加しているトークルームのデータを取得
  const [
    getLoginUserTalkRooms,
    {
      data: talkRoomsData,
      // error: messagesError,
      loading: isLoading,
    },
  ] = useGetLoginUserTalkRoomsLazyQuery({
    fetchPolicy: "network-only",
    // 本番時のみ5秒ごとにポーリング
    pollInterval: process.env.NODE_ENV === "development" ? 1000 * 60 : 1000 * 5,
  });

  useEffect(() => {
    (async () => {
      if (validatedLoginUserData.isLogin) {
        if (!cookies.accessToken) {
          await handleRefreshToken();
        }
      }
      getLoginUserTalkRooms();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // どのトークルームを開くかのstate ボタンのIDに付与する相手のユーザーID
  const [openTalkRoomId, setOpenTalkRoomId] = useState("");
  const handleOpenTalkRoomChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenTalkRoomId(e.currentTarget.id);
  };

  // メッセージ作成
  // 通知作成

  const {
    createMessageMutation,
    inputText,
    setInputText,
    handleInputChange,
    createNotificationMutation,
  } = useCreateMessages();
  const handleSubmit = async (receiverId: string) => {
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
    await createNotificationMutation({
      variables: {
        recieverId: receiverId,
        notificationType: "メッセージ",
      },
    });
    setInputText("");
  };

  useEffect(() => {
    setInputText("");
  }, [openTalkRoomId, setInputText]);

  // モーダル
  const {
    customStyles,
    handleModalOpen,
    handleModalClose,
    handleCreateReview,
    isModalOpen,
    inputRevewText,
    handleReviewTextChange,
    inputStars,
    handleStarsChange,
  } = useCreateReview();
  // TODO: トークルームを最新順に並べ替え (Query自体を書き直す必要ありかも？)

  // トーク履歴がない場合
  if (talkRoomsData?.loginUserTalkRooms?.edges.length === 0) {
    return <InitialTalkDetail />;
  }

  return (
    <div className="md:flex">
      <aside className="block md:p-4 mt-4 md:w-1/3 w-full">
        {isLoading && (
          <div>
            <SkeletonLoading />
            <SkeletonLoading />
          </div>
        )}

        {/* <div>{messagesError && messagesError.message}</div> */}
        <ul className="border shadow-md">
          {talkRoomsData?.loginUserTalkRooms?.edges.map((talkRooms, index) => {
            return (
              // 自分が参加しているトークルームの一覧を返す
              <li className="border-t border-b" key={index}>
                {/* {talkRooms?.node?.talkingRoom.edges.slice(-1)[0]?.node?.sender.email} */}
                {talkRooms?.node?.id ? (
                  <button
                    className={`flex items-center py-2 md:px-4 px-2 w-full focus:outline-none ${
                      openTalkRoomId === talkRooms.node.id && "bg-pink-100"
                    }`}
                    value={talkRooms.node.id}
                    onClick={handleOpenTalkRoomChange}
                    id={talkRooms.node.id}
                  >
                    {/* トークルームの相手を表示 */}
                    {talkRooms.node.opponentUser && (
                      // 自分を除外したプロフィール
                      <div className="flex items-center">
                        <ProfileImageIcon
                          className="block w-14 h-14 rounded-full border"
                          profileImagePath={talkRooms.node.opponentUser.targetUser?.profileImage}
                        />
                        <div className="px-4 text-left">
                          {/* 相手のプロフィールが設定されていなければemailを返す */}

                          {/* TODO: 説明用コメント */}
                          <div>
                            {talkRooms.node.opponentUser.id === loginUserData.userId
                              ? talkRooms.node.selectedPlan?.planAuthor.targetUser?.profileName
                              : talkRooms.node.opponentUser.targetUser?.profileName}
                          </div>
                          {/* 最後にやり取りしたメッセージ */}
                          <div>
                            {talkRooms.node?.talkingRoom.edges
                              .slice(-1)[0]
                              ?.node?.text.slice(0, 10)}
                            {talkRooms.node?.talkingRoom.edges.length === 0 &&
                              "トークを始めましょう"}

                            {/* TODO: type narrowing */}
                            {/* {talkRooms.node?.talkingRoom.edges.slice(-1)[0]?.node?.text
                                  .length !== undefined &&
                                talkRooms.node.talkingRoom.edges.slice(-1)[0].node.text.length >= 10
                                  ? "..."
                                  : ""} */}
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ) : (
                  <div>error</div>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="md:p-4 md:mt-0 mt-4 md:w-2/3 w-full">
        <div>
          {/* トークルーム詳細 */}
          {talkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom, talkRoomIndex) => {
            return (
              openTalkRoomId === talkRoom?.node?.id && (
                <div className="border shadow-md" key={talkRoomIndex}>
                  <div className="flex justify-between items-center py-2 md:px-10 px-4 border-b border-gray-500">
                    {/* 会話相手のプロフィール */}

                    {/* {talkRoom.node.opponentUser && ( */}
                    <div className="flex items-center">
                      {/* レビューモーダル */}
                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={handleModalClose}
                        style={customStyles}
                        contentLabel={`${talkRoom?.node?.opponentUser?.email} Modal`}
                        ariaHideApp={false}
                      >
                        <div className="py-2 px-12 pb-6 w-96">
                          <h4 className="py-2 text-lg font-bold">
                            {talkRoom?.node?.opponentUser?.targetUser?.profileName}にレビューする
                          </h4>
                          <form
                            className="block"
                            // eslint-disable-next-line react/jsx-handler-names
                            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                              e.preventDefault();
                              return (
                                talkRoom.node?.opponentUser?.id &&
                                handleCreateReview(talkRoom.node.opponentUser.id)
                              );
                            }}
                          >
                            <input
                              type="text"
                              className="block p-2 w-full border"
                              placeholder="レビューを記載"
                              value={inputRevewText}
                              onChange={handleReviewTextChange}
                            />
                            <input
                              type="number"
                              max={5}
                              min={1}
                              value={inputStars}
                              onChange={handleStarsChange}
                              className="block p-2 w-full border"
                              placeholder="1~5で評価する"
                            />

                            <button className="block p-2 mx-auto mt-4 border" type="submit">
                              レビューを送信
                            </button>
                          </form>
                        </div>
                      </Modal>

                      <ProfileImageIcon
                        className="w-10 h-10"
                        profileImagePath={talkRoom?.node?.opponentUser?.targetUser?.profileImage}
                      />
                      <div className="px-6">
                        <p className="text-lg font-bold">
                          {talkRoom?.node?.opponentUser?.targetUser?.profileName}
                        </p>
                        <p>{talkRoom?.node?.opponentUser?.targetUser?.schoolName}</p>
                      </div>
                    </div>
                    {/* )} */}

                    {loginUserData.isCollegeStudent ? (
                      <div>高校生のみレビューができます</div>
                    ) : (
                      <button
                        className="block p-2 text-white bg-yellow-500"
                        onClick={handleModalOpen}
                      >
                        レビューを書く
                      </button>
                    )}
                  </div>
                  {/* トーク部分 */}
                  <div className="overflow-y-scroll max-h-96">
                    <div>
                      <div>
                        プランのタイトル：{talkRoom.node.selectedPlan?.title} <br /> 料金：
                        {talkRoom.node.selectedPlan?.price.toString()}
                      </div>
                      <ul>
                        {talkRoom.node.talkingRoom.edges.length === 0 && (
                          <p className="py-4 text-center">トークを開始しましょう</p>
                        )}
                        {/* トークメッセージ */}
                        {talkRoom.node.talkingRoom.edges.map((message, messageIndex) => {
                          return (
                            <Message
                              senderId={message?.node ? message.node.sender.id : ""}
                              loginUserId={loginUserData.userId}
                              text={message?.node ? message.node.text : ""}
                              createdAt={message?.node?.createdAt}
                              key={messageIndex}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  </div>
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

                      {/* 引数に相手のuserIdを渡して通知を作成 */}
                      {talkRoom.node.opponentUser && (
                        <button
                          className="flex items-center bg-pink-400 md:py-4 py-2 justify-center text-white w-1/5"
                          // eslint-disable-next-line react/jsx-handler-names
                          onClick={() => {
                            talkRoom.node?.opponentUser?.id &&
                              handleSubmit(talkRoom.node.opponentUser.id);
                          }}
                        >
                          <span className="block px-2 md:text-lg text-sm md:py-0 py-2">送信</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 transform rotate-90"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};
