import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { loginUserVar } from "src/apollo/cache";
import {
  useCreateTalkRoomMutation,
  useGetLoginUserTalkRoomsQuery,
  useGetPlanQuery,
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";

const PlanDetail: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const router = useRouter();
  const planId = router.asPath.replace("/plans/", "");
  const { data: planData } = useGetPlanQuery({ variables: { planId: planId } });
  const { data: loginUserTalkRoomsData } = useGetLoginUserTalkRoomsQuery();

  // 参加しているトークルームのplanIdとuserIdを使って、同じものがあるか比較
  const talkRoomIds = loginUserTalkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom) => {
    return [talkRoom?.node?.selectedPlan?.id, talkRoom?.node?.opponentUser?.id];
  });

  const [createTalkRoomMutation] = useCreateTalkRoomMutation();
  // TODO: トークルームの作成とバリデーション 要検証
  const handleCreateTalkRoom = async () => {
    const isValidatedArray = talkRoomIds?.map((ids) => {
      // プランのIDとユーザーのIDがどちらも含まれている（既にトークルームが存在している）場合にはtrueを返す
      if (ids.includes(loginUserData.userId) && ids.includes(planId)) {
        return true;
      }
      return false;
    });

    if (isValidatedArray?.includes(true)) {
      alert("すでに存在します。");
      return;
    }
    try {
      await createTalkRoomMutation({
        variables: {
          opponentUserId: loginUserData.userId,
          selectedPlanId: planId,
          talkRoomDescription: `${planData?.plan?.planAuthor.targetUser?.profileName} | ${loginUserData.profileName}`,
        },
      });
      alert("トークルームが作成されました。");
      router.push("/talks");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout metaTitle="ハルスマイル | プラン詳細" spHeaderTitle="プラン詳細">
      <div>このプランの作成者：{planData?.plan?.planAuthor.targetUser?.profileName}</div>
      <div>{planData?.plan?.title}</div>
      <div>{planData?.plan?.content}</div>
      <div>{planData?.plan?.price.toString()}円</div>
      {loginUserData.isCollegeStudent ? (
        <div>高校生のみメッセージを送れます</div>
      ) : (
        <button className="p-2 border" onClick={handleCreateTalkRoom}>
          トークルームを作成する
        </button>
      )}
      {planData?.plan?.planAuthor.id === loginUserData.userId && (
        <button className="border p-2">編集する</button>
      )}
    </Layout>
  );
};

export default PlanDetail;
