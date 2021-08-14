import { useReactiveVar } from "@apollo/client";
import { memo } from "react";
import { loginUserVar, openTalkRoomIdVar } from "src/apollo/cache";
import type { GetLoginUserTalkRoomsQuery } from "src/apollo/schema";
import { useUpdateMessagesMutation } from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

type Props = {
  talkRoomsData: GetLoginUserTalkRoomsQuery;
};

// 自分が参加しているトークルームの一覧
// TODO: 未読のメッセージを上にし、開いたら相手のメッセージのみ確認フラグをTrueに更新する
export const TalkList: React.VFC<Props> = memo((props) => {
  const loginUserData = useReactiveVar(loginUserVar);
  const openTalkRoomId = useReactiveVar(openTalkRoomIdVar);
  const [updateMessages] = useUpdateMessagesMutation();
  const { handleRefreshToken } = useRefreshTokens();

  // 未読のメッセージを取得
  const unViewedMessages = props.talkRoomsData.loginUserTalkRooms?.edges.map((talkRoom) => {
    const resultArray = talkRoom?.node?.talkingRoom.edges.map((message) => {
      // 相手が送った未読のメッセージのIDのみを返す
      const result =
        message?.node?.isViewed === false &&
        message.node.sender.id !== loginUserData.userId &&
        message.node.id;
      return result;
    });
    const filteredArray = resultArray?.filter(Boolean);
    const talkRoomId = talkRoom?.node?.id ? talkRoom.node.id : "undefined";
    // 紐付いているトークルームのIDをオブジェクトのkeyにして返す
    // TODO: ↓データの保持する形式を変更して可読性を上げる
    // return { id: talkRoomId, data: filteredArray };
    return { [talkRoomId]: filteredArray };
  });

  const unViewedMessagesObject = unViewedMessages
    ? // ? unViewedMessages.reduce((obj, data) => {
      //     obj[data] = data;
      //     return obj;
      //   }, {})
      unViewedMessages.reduce((obj, item) => {
        obj[item.id] = item.data;
        return obj;
      }, {})
    : {};
  console.log(unViewedMessagesObject);

  // どのトークルームを開くかのReactiveVariables ボタンのIDに付与する相手のユーザーIDをセット
  // トークルームのリストをクリックした時に呼ぶ関数
  const handleOpenTalkRoomChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentOpenTalkRoomId = openTalkRoomIdVar(e.currentTarget.id);

    // 現在開いているトークルームから自分が未読のメッセージのIDを取得
    const [currentUnViewedMessage] = unViewedMessages
      ? unViewedMessages
          .map((obj) => {
            const newObj = obj[currentOpenTalkRoomId];
            if (newObj && newObj.length > 0) {
              return newObj;
            }
            // obj = {トークルームのID: ['メッセージのID' or false] | undefined}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return false;
          })
          .filter(Boolean)
      : [];

    // 未読のメッセージがある場合は既読に更新する
    if (currentUnViewedMessage) {
      // (string | false)[]の型の状態からfalseを取り除く
      const messageIds = currentUnViewedMessage.filter(
        (item): item is Exclude<typeof item, false> => {
          return item !== false;
        },
      );

      // メッセージを既読に更新
      (async () => {
        try {
          await handleRefreshToken();
          await updateMessages({
            variables: {
              messageIds: messageIds,
            },
          });
        } catch (error) {
          console.error(error);
        }
      })();
    }
  };

  return (
    <div>
      {/* 各トークルームをリスト形式で表示 */}
      {props.talkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom, index) => {
        return (
          // 自分が参加しているトークルームの一覧を返す
          <li className="border-t border-b relative" key={index}>
            {/* {talkRoom?.node?.talkingRoom.edges.slice(-1)[0]?.node?.sender.email} */}
            {talkRoom?.node?.id ? (
              <button
                className={`flex items-center py-2 md:px-4 px-2 w-full focus:outline-none ${
                  // 現在開いているトークルームの色を変更
                  openTalkRoomId === talkRoom.node.id && "bg-gray-200 dark:bg-gray-700"
                }`}
                onClick={handleOpenTalkRoomChange}
                // idをstate管理し、どのトークルームを選択しているか取得
                id={talkRoom.node.id}
              >
                {/* トークルームの相手を表示 */}
                {talkRoom.node.opponentUser && (
                  // 自分を除外したプロフィール
                  <div className="flex items-center">
                    <ProfileImageIcon
                      className="block w-14 h-14 object-cover rounded-full border"
                      // 相手のプロフィール画像を取得
                      profileImagePath={
                        talkRoom.node.opponentUser.id === loginUserData.userId
                          ? talkRoom.node.selectedPlan?.planAuthor.targetUser?.profileImage
                          : talkRoom.node.opponentUser.targetUser?.profileImage
                      }
                    />
                    <div className="px-4 text-left">
                      {/* 未読のメッセージの件数 */}
                      <div className="absolute h-4 w-4 rounded-full bg-gray-400">
                        {/* {unViewedMessages&&  } */}
                        {unViewedMessages?.map((obj, index) => {
                          if (talkRoom?.node) {
                            // トークルームのIDをオブジェクトのキーとしているためそれで取得
                            if (obj[talkRoom.node.id]?.length !== 0) {
                              return (
                                <div key={index} className="bg-red-400">
                                  {obj[talkRoom.node.id]?.length}
                                </div>
                              );
                            }
                          }
                        })}
                      </div>
                      {/* 相手（自分以外）のプロフィールを表示 */}
                      <div>
                        {talkRoom.node.opponentUser.id === loginUserData.userId
                          ? talkRoom.node.selectedPlan?.planAuthor.targetUser?.profileName
                          : talkRoom.node.opponentUser.targetUser?.profileName}
                      </div>
                      <div>
                        {/* 最後にやり取りしたメッセージ 最初の10文字だけ表示 */}
                        {talkRoom.node?.talkingRoom.edges.slice(-1)[0]?.node?.text.slice(0, 10)}
                        {talkRoom.node?.talkingRoom.edges.length === 0 && "トークを始めましょう"}

                        {/* TODO: type narrowing */}
                        {/* {talkRoom.node?.talkingRoom.edges.slice(-1)[0]?.node?.text
                                  .length !== undefined &&
                                talkRoom.node.talkingRoom.edges.slice(-1)[0].node.text.length >= 10
                                  ? "..."
                                  : ""} */}
                        {talkRoom.node?.talkingRoom.edges.length !== 0 && (
                          <span className="absolute text-gray-500 text-xs right-4 bottom-4">
                            {fixDateFormat(
                              talkRoom.node?.talkingRoom.edges.slice(-1)[0]?.node?.createdAt,
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ) : (
              <div>トークルームで何らかのエラーが発生しました。運営にお問い合わせください。</div>
            )}
          </li>
        );
      })}
    </div>
  );
});

TalkList.displayName = "TalkList";
