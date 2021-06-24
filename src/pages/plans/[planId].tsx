import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import {
  useCreateTalkRoomMutation,
  useGetLoginUserTalkRoomsQuery,
  useGetPlanQuery,
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { useDeletePlan } from "src/libs/hooks/plans/useDeletePlan";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

const PlanDetail: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const router = useRouter();
  const planId = router.asPath.replace("/plans/", "");
  const { data: planData } = useGetPlanQuery({ variables: { planId: planId } });
  const { data: loginUserTalkRoomsData } = useGetLoginUserTalkRoomsQuery();
  const { handleRefreshToken } = useRefreshTokens();
  const [createTalkRoomMutation] = useCreateTalkRoomMutation();
  const { handleDeletePlan } = useDeletePlan();
  const handleCreateTalkRoom = async () => {
    await handleRefreshToken();
    // 参加しているトークルームのplanIdとuserIdを使って、同じものがあるか比較
    const talkRoomIds = loginUserTalkRoomsData?.loginUserTalkRooms?.edges.map((talkRoom) => {
      return [talkRoom?.node?.selectedPlan?.id, talkRoom?.node?.opponentUser?.id];
    });

    if (talkRoomIds === undefined) {
      alert("何らかのエラーが発生しました。運営にお問い合わせください。");
      return;
    }

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

  const [isEditMode, setIsEditMode] = useState(false);

  const handleModeChange = () => {
    setIsEditMode((prev) => {
      return !prev;
    });
  };

  // TODO: プランの更新、削除 料金は変更できないようにする
  const handlePlanUpdate = async () => {
    alert("プランの更新は現在開発中です。");
  };

  return (
    <Layout metaTitle="ハルスマイル | プラン詳細" spHeaderTitle="プラン詳細">
      {planData?.plan?.planAuthor?.targetUser?.isCollegeStudent ? (
        <div>
          <div>このプランの作成者：{planData?.plan?.planAuthor.targetUser?.profileName}</div>

          {isEditMode ? (
            <div>
              <input
                type="text"
                className="border block w-full p-2"
                placeholder="title"
                value={planData?.plan?.title}
              />
              <input
                type="text"
                className="border block w-full p-2"
                placeholder="content"
                value={planData?.plan?.content}
              />
              <input
                type="number"
                className="border block w-full p-2"
                placeholder="price"
                value={planData?.plan?.price.toString()}
              />
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={handlePlanUpdate}
                  className="block border p-2 bg-blue-500"
                >
                  更新する
                </button>
                <button
                  type="button"
                  onClick={handleDeletePlan}
                  className="block border p-2 bg-red-500"
                >
                  削除する
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div>{planData?.plan?.title}</div>
              <div>{planData?.plan?.content}</div>
              <div>{planData?.plan?.price.toString()}円</div>
            </div>
          )}

          {/* 高校生の場合 */}
          {!loginUserData.isCollegeStudent && loginUserData.isLogin && (
            <button className="p-2 border" onClick={handleCreateTalkRoom}>
              トークルームを作成する
            </button>
          )}
          {/* ログインしていない場合 */}
          {!loginUserData.isLogin && <div className="font-bold">ログイン後に使用可能です。</div>}

          {/* 作成者がログインユーザー（自分）の場合 */}
          {planData?.plan?.planAuthor.id === loginUserData.userId && (
            <button onClick={handleModeChange} className="border p-2">
              {isEditMode ? "切り替える" : "編集する"}
            </button>
          )}
        </div>
      ) : (
        <div>現在閉鎖中のプランです。</div>
      )}
    </Layout>
  );
};
export default PlanDetail;
