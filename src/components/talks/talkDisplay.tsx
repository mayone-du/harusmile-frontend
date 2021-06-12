import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useCreateMessageMutation, useGetTalkRoomQuery } from "src/apollo/schema";
import { fixDateFormat } from "src/libs/fixDateFormat";

export const TalkDisplay: React.VFC = () => {
  const router = useRouter();
  const talkRoomId = router.asPath.replace("/talk/", "");
  const { data } = useGetTalkRoomQuery({ variables: { talkRoomId: talkRoomId } });

  const loginUserData = useReactiveVar(loginUserVar);

  // メッセージ作成
  const [createMessageMutation] = useCreateMessageMutation();
  const [inputText, setInputText] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleSubmit = async () => {
    await createMessageMutation({
      variables: {
        talkingRoomId: talkRoomId,
        text: inputText,
      },
    });
    setInputText("");
  };

  return (
    <div className="p-4 w-2/3">
      <div className="border shadow-md">
        {/* 会話相手のプロフィール */}
        <div className="flex justify-between items-center py-2 px-10 border-b border-gray-500">
          <div className="flex items-center">
            <img src="" alt="Profile" className="block w-10 h-10 rounded-full border" />
            <div className="mx-4">
              <p className="text-lg">プロフィール</p>
              <p>相手の学校</p>
            </div>
          </div>
          <button className="block p-2 bg-yellow-500">レビューを書く</button>
        </div>

        {/* トーク部分 */}
        <div className="overflow-y-scroll">
          {/* メッセージ */}

          <ul>
            {data?.talkRoom &&
              data.talkRoom.talkingRoom.edges.map((message, index) => {
                return (
                  <li
                    className={`my-4 border flex ${
                      message?.node?.sender.id === loginUserData.userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={index}
                  >
                    <div>
                      <div
                        className={`inline-block p-2 rounded-sm ${
                          message?.node?.sender.id === loginUserData.userId
                            ? "bg-pink-200"
                            : "bg-blue-200"
                        }`}
                      >
                        {message?.node?.text}
                      </div>
                      <div>{fixDateFormat(message?.node?.createdAt)}</div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* 入力欄や送信ボタン */}
        <div className="flex items-center">
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
        </div>
      </div>
    </div>
  );
};
