import { useReactiveVar } from "@apollo/client";
import { loginUserVar } from "src/apollo/cache";
import { useCreateReview } from "src/libs/hooks/useCreateReview";

type Props = {
  talkRoom: any;
};

export const InnerReviewModal: React.VFC<Props> = (props) => {
  const loginUserData = useReactiveVar(loginUserVar);
  const {
    handleCreateReview,
    inputRevewText,
    handleReviewTextChange,
    inputStars,
    handleStarsChange,
  } = useCreateReview();
  return (
    <div className="py-2 px-12 pb-6 w-96 dark:bg-gray-600">
      <h4 className="py-2 md:text-lg text-base font-bold">
        {props.talkRoom?.node?.opponentUser?.id === loginUserData.userId
          ? props.talkRoom.node.selectedPlan?.planAuthor.targetUser?.profileName
          : props.talkRoom?.node?.opponentUser?.targetUser?.profileName}
        にレビューする
      </h4>
      <form
        className="block"
        // eslint-disable-next-line react/jsx-handler-names
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
          event.preventDefault();
          const providerId =
            props.talkRoom?.node?.opponentUser?.id === loginUserData.userId
              ? props.talkRoom.node.selectedPlan?.planAuthor.id
              : props.talkRoom?.node?.opponentUser?.id;
          return handleCreateReview(providerId ? providerId : "");
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
        {props.talkRoom.node.isApprove ? (
          <button className="block p-2 mx-auto mt-4 border" type="submit">
            レビューを送信
          </button>
        ) : (
          <div className="text-center font-bold py-2">トークを開始したらレビューができます。</div>
        )}
      </form>
    </div>
  );
};
