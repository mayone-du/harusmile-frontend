import { useReactiveVar } from "@apollo/client";
import { Button } from "@material-ui/core";
import { loginUserVar } from "src/graphql/apollo/cache";
import { useCreateReview } from "src/libs/hooks/useCreateReview";

type Props = {
  talkRoom: any;
};

// レビューモーダルの中身
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
    <div className="py-2 px-12 pb-6 w-96 mx-auto dark:bg-gray-600">
      <h4 className="py-2 md:text-lg text-base font-bold">
        {/* 相手のプロフィール名を表示 */}
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
            // 相手のIDを設定
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
          <div className="flex justify-center mt-4">
            <Button type="submit" variant="contained" color="primary">
              レビューを送信
            </Button>
          </div>
        ) : (
          <div className="text-center font-bold py-2">トークを開始したらレビューができます。</div>
        )}
      </form>
    </div>
  );
};
