import { fixDateFormat } from "src/libs/fixDateFormat";

type Props = {
  senderId: string;
  loginUserId: string;
  text: string;
  createdAt: string;
};
export const Message: React.VFC<Props> = (props) => {
  return (
    <li
      className={`my-4 flex ${
        props.senderId === props.loginUserId ? "justify-end" : "justify-start"
      }`}
    >
      <div className="px-4">
        <div
          className={`inline-block py-2 px-4 rounded-3xl ${
            props.senderId === props.loginUserId
              ? "bg-pink-200 dark:bg-pink-400"
              : "bg-blue-200 dark:bg-blue-400"
          }`}
        >
          {props.text}
        </div>
        {/* 送信時刻 */}
        <div className="text-xs text-right text-gray-500">{fixDateFormat(props.createdAt)}</div>
      </div>
    </li>
  );
};
