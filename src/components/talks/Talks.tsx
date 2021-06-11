import { useRouter } from "next/dist/client/router";
import type { GetLoginUserMessagesQuery } from "src/apollo/schema";

type Props<T> = {
  messagesData: T;
};

export const Talks: React.VFC<Props<GetLoginUserMessagesQuery>> = (props) => {
  const paths = props.messagesData.loginUserMessages?.edges.map((message) => {
    console.log(message?.node?.talkingRoom.joinUsers);
    return;
  });

  const router = useRouter();
  return (
    <div>
      <ul>
        {props.messagesData.loginUserMessages?.edges.map((message, index) => {
          return (
            <li key={index}>
              <div>{message?.node?.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
