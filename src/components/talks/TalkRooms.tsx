import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { loginUserVar } from "src/apollo/cache";
import type { GetLoginUserJoinTalkRoomQuery } from "src/apollo/schema";

type Props<T> = {
  talkRoomsData: T;
};

export const TalkRooms: React.VFC<Props<GetLoginUserJoinTalkRoomQuery>> = (props) => {
  const loginUserData = useReactiveVar(loginUserVar);

  const paths = props.talkRoomsData.allTalkRooms?.edges.map((message) => {
    return message?.node?.talkingRoom.edges;
  });

  const router = useRouter();

  // TODO: トークルームを最新順に並べ替え (Query自体を書き直す必要ありかも？)

  return (
    <div>
      <ul>
        {props.talkRoomsData.allTalkRooms?.edges.map((talkRooms, index) => {
          return (
            // 自分が参加しているトークルームの一覧を返す
            <li className="border-t border-b" key={index}>
              {/* {talkRooms?.node?.talkingRoom.edges.slice(-1)[0]?.node?.sender.email} */}
              {talkRooms?.node?.id ? (
                <Link href={`/talk/${talkRooms?.node?.id}`}>
                  <a className="flex items-center py-2 px-4 ">
                    {/* トークルームの相手を表示 */}
                    {talkRooms.node.joinUsers.edges.map((user) => {
                      return (
                        // 自分を除外したプロフィール
                        user?.node?.id !== loginUserData.userId && (
                          <div className="flex items-center" key={user?.node?.id}>
                            {user?.node?.targetUser?.profileImage ? (
                              <img
                                src={user.node.targetUser.profileImage}
                                alt=""
                                className="block w-14 h-14 rounded-full border"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full border">img</div>
                            )}
                            <div>
                              {/* 相手のプロフィールが設定されていなければemailを返す */}

                              <div>
                                {user?.node?.targetUser?.profileName
                                  ? user.node.targetUser.profileName
                                  : user?.node?.id !== loginUserData.userId && user?.node?.email}
                              </div>
                              {/* 最後にやり取りしたメッセージ */}
                              <div>
                                {talkRooms.node?.talkingRoom.edges.slice(-1)[0]?.node?.text}
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </a>
                </Link>
              ) : (
                <div>error</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
