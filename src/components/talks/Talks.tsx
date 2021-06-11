import { useRouter } from "next/dist/client/router";
import type { GetLoginUserMessagesQuery } from "src/apollo/schema";

type Props<T> = {
  messagesData: T;
};

export const Talks: React.VFC<Props<GetLoginUserMessagesQuery>> = (props) => {
  const arry: any = [];
  const paths = props.messagesData.loginUserMessages?.edges.map((message) => {
    arry.push(message?.node?.destination.id);
    arry.push(message?.node?.sender.id);
    // arry.push(message?.node?.sender.id);
    // const destinationIds = Array.from(new Set(arry));
    // const destinationIds = Array.from(new Set(message?.node?.destination.id));
    // const destinationIds = message?.node?.destination.id;
    // const senderIds = Array.from(new Set(message?.node?.sender.id));
    // return destinationIds;
    return;
  });
  const newarry = Array.from(new Set(arry));

  console.log("paths", newarry);
  console.log("props", props.messagesData.loginUserMessages?.edges);

  const router = useRouter();
  return (
    <div>
      <ul>
        {props.messagesData.loginUserMessages?.edges.map((message, index) => {
          return (
            <li key={index}>
              <div>{message?.node?.text}</div>
              <div>sender: {message?.node?.sender.targetUser?.profileName}</div>
              <div>destination: {message?.node?.destination.targetUser?.profileName}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
