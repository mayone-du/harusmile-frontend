import { useReactiveVar } from "@apollo/client";
import { loginUserVar, openTalkRoomIdVar } from "src/apollo/cache";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { fixDateFormat } from "src/libs/fixDateFormat";

type Props = {
  talkRoomsData: any;
};

// 自分が参加しているトークルームの一覧
export const TalkList: React.VFC<Props> = (props) => {
  const openTalkRoomId = useReactiveVar(openTalkRoomIdVar);
  // どのトークルームを開くかのstate ボタンのIDに付与する相手のユーザーID
  const handleOpenTalkRoomChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    openTalkRoomIdVar(e.currentTarget.id);
  };
  const loginUserData = useReactiveVar(loginUserVar);
  return (
    <div>
      {props.talkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom: any, index: any) => {
        return (
          // 自分が参加しているトークルームの一覧を返す
          <li className="border-t border-b relative" key={index}>
            {/* {talkRoom?.node?.talkingRoom.edges.slice(-1)[0]?.node?.sender.email} */}
            {talkRoom?.node?.id ? (
              <button
                className={`flex items-center py-2 md:px-4 px-2 w-full focus:outline-none ${
                  openTalkRoomId === talkRoom.node.id && "bg-pink-100 dark:bg-pink-400"
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
                      {/* 自分以外のプロフィールを表示 */}
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
};
