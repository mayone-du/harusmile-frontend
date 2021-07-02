import { useReactiveVar } from "@apollo/client";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import { loginUserVar, openTalkRoomIdVar } from "src/apollo/cache";
import {
  GetLoginUserTalkRoomsDocument,
  useGetLoginUserTalkRoomsLazyQuery,
  useUpdateTalkRoomMutation,
} from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { InitialTalkDetail } from "src/components/talks/InitialTalkDetail";
import { Message } from "src/components/talks/Message";
import { InnerReviewModal } from "src/components/talks/ReviewInnerModal";
import { SkeletonLoading } from "src/components/talks/SkeletonLoading";
import { TalkList } from "src/components/talks/TalkList";
import { useCreateMessages } from "src/libs/hooks/useCreateMessages";
import { useCreateReview } from "src/libs/hooks/useCreateReview";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";
import { useValidateLoginUser } from "src/libs/hooks/users/useValidateLoginUser";

export const TalkWrapper: React.VFC = () => {
  const cookies = parseCookies();
  const { handleRefreshToken } = useRefreshTokens();
  const loginUserData = useReactiveVar(loginUserVar);
  const openTalkRoomId = useReactiveVar(openTalkRoomIdVar);

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
      toast.error("メッセージを入力してください。");
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
  const { customStyles, handleModalOpen, handleModalClose, isModalOpen } = useCreateReview();
  // TODO: トークルームを最新順に並べ替え (Query自体を書き直す必要ありかも？)

  const [updateTalkRoomMutation] = useUpdateTalkRoomMutation({
    refetchQueries: [{ query: GetLoginUserTalkRoomsDocument }],
  });
  const handleUpdateTalkRoom = async (talkRoomId: string, recieverId: string) => {
    try {
      await handleRefreshToken();
      await updateTalkRoomMutation({ variables: { talkRoomId: talkRoomId, isApprove: true } });
      await createNotificationMutation({
        variables: {
          recieverId: recieverId,
          notificationType: "プランの承認",
        },
      });
      toast.success("承認しました。");
    } catch (error) {
      toast.error("失敗しました。");
      alert(error);
    }
  };

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
        <ul className="border shadow-md max-h-72 overflow-y-scroll">
          <TalkList talkRoomsData={talkRoomsData} />
        </ul>
      </aside>

      <div className="md:p-4 md:mt-0 mt-4 mb-20 md:w-2/3 w-full">
        <div>
          {/* トークルーム詳細 */}
          {talkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom, talkRoomIndex) => {
            return (
              openTalkRoomId === talkRoom?.node?.id && (
                <div className="border shadow-md" key={talkRoomIndex}>
                  <div className="flex justify-between items-center p-2 md:px-10 border-b border-gray-500">
                    {/* 会話相手のプロフィール */}
                    <Link
                      href={`/profiles/detail/${
                        talkRoom?.node?.selectedPlan?.planAuthor.id === loginUserData.userId
                          ? talkRoom.node.opponentUser?.targetUser?.id
                          : talkRoom.node.selectedPlan?.planAuthor?.targetUser?.id
                      }`}
                    >
                      <a>
                        <div className="flex items-center">
                          <ProfileImageIcon
                            className="w-10 h-10 object-cover"
                            // 相手のプロフィール画像を渡す
                            profileImagePath={
                              talkRoom?.node?.selectedPlan?.planAuthor.id === loginUserData.userId
                                ? talkRoom.node.opponentUser?.targetUser?.profileImage
                                : talkRoom.node.selectedPlan?.planAuthor.targetUser?.profileImage
                            }
                          />
                          <div className="md:px-6 px-2">
                            <p className="md:text-lg font-bold">
                              {/* トークルームのプラン作成者が自分と同じだったら相手のプロフィールを表示 */}
                              {talkRoom?.node?.selectedPlan?.planAuthor.id === loginUserData.userId
                                ? talkRoom.node.opponentUser?.targetUser?.profileName
                                : talkRoom.node.selectedPlan?.planAuthor.targetUser?.profileName}
                            </p>
                            <p className="md:text-base text-sm text-gray-600 dark:text-white">
                              {talkRoom?.node?.opponentUser?.targetUser?.schoolName}
                            </p>
                          </div>
                        </div>
                      </a>
                    </Link>
                    {/* レビューモーダル */}
                    <Modal
                      isOpen={isModalOpen}
                      onRequestClose={handleModalClose}
                      style={customStyles}
                      contentLabel={`${talkRoom?.node?.opponentUser?.email} Modal`}
                      ariaHideApp={false}
                    >
                      <InnerReviewModal talkRoom={talkRoom} />
                    </Modal>

                    {/* 高校生のみレビューを書ける */}
                    {!loginUserData.isCollegeStudent && (
                      <button
                        className="block md:text-base text-sm p-2 text-white bg-yellow-500"
                        onClick={handleModalOpen}
                      >
                        レビューを書く
                      </button>
                    )}
                  </div>
                  {/* トーク部分 */}
                  <div className="overflow-y-scroll max-h-96">
                    <div>
                      <Link href={`/plans/${talkRoom.node.selectedPlan?.id}`}>
                        <a className="block border m-2">
                          <p>プランのタイトル：{talkRoom.node.selectedPlan?.title}</p>
                          <p className="text-xs">{talkRoom.node.selectedPlan?.content}</p>
                          <p className="text-sm">
                            料金：
                            {talkRoom.node.selectedPlan?.price.toString()}
                          </p>
                        </a>
                      </Link>

                      <ul>
                        {/* {talkRoom.node.talkingRoom.edges.length === 0 && (
                          <p className="py-4 text-center">トークを開始しましょう</p>
                        )} */}
                        {!talkRoom.node.isApprove && (
                          <div>
                            {talkRoom.node.selectedPlan?.planAuthor.id === loginUserData.userId ? (
                              <button
                                className="border block p-2 mx-auto my-4"
                                // eslint-disable-next-line react/jsx-handler-names
                                onClick={() => {
                                  handleUpdateTalkRoom(
                                    talkRoom.node?.id ? talkRoom.node.id : "",
                                    talkRoom.node?.opponentUser?.id
                                      ? talkRoom.node.opponentUser.id
                                      : "",
                                  );
                                }}
                              >
                                このユーザーからの申込を承認する
                              </button>
                            ) : (
                              "プラン作成者が承認した後、メッセージを送信できます。"
                            )}
                          </div>
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
                        className="block px-2 h-12 w-5/6 border"
                        placeholder="メッセージを入力"
                        value={inputText}
                        onChange={handleInputChange}
                      />

                      {/* 引数に相手のuserIdを渡して通知を作成 */}
                      {talkRoom.node.opponentUser && talkRoom.node.isApprove && (
                        <button
                          className="flex items-center border bg-pink-400 h-12 justify-center text-white w-1/5"
                          // eslint-disable-next-line react/jsx-handler-names
                          onClick={() => {
                            {
                              /* トークルームのプラン作成者が自分だったら相手のIDを渡す */
                            }
                            if (
                              talkRoom?.node?.selectedPlan?.planAuthor.id === loginUserData.userId
                            ) {
                              handleSubmit(
                                talkRoom?.node?.opponentUser?.id
                                  ? talkRoom.node.opponentUser.id
                                  : "",
                              );
                            } else {
                              handleSubmit(
                                talkRoom?.node?.selectedPlan?.planAuthor?.id
                                  ? talkRoom.node.selectedPlan.planAuthor.id
                                  : "",
                              );
                            }
                          }}
                        >
                          <span className="block px-2 md:text-lg text-sm md:py-0">送信</span>
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
                      {talkRoom.node.opponentUser && !talkRoom.node.isApprove && (
                        <button disabled className="border p-2 text-xs">
                          申込みが承認された後に送信できます
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
