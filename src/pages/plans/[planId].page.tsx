import { useReactiveVar } from "@apollo/client";
import { Button } from "@material-ui/core";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Layout } from "src/components/layouts/Layout";
import { PlanLoading } from "src/components/plans/PlanLoading";
import { PlanTab } from "src/components/plans/PlanTab";
import { loginUserVar } from "src/graphql/apollo/cache";
import {
  useCreateTalkRoomMutation,
  useGetLoginUserTalkRoomsQuery,
  useGetPlanQuery,
} from "src/graphql/apollo/schemas/schema";
import { useCreateNotificationMutation } from "src/graphql/apollo/schemas/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";
import { useDeletePlan } from "src/libs/hooks/plans/useDeletePlan";
import { useUpdatePlan } from "src/libs/hooks/plans/useUpdatePlan";

const PlanDetail: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const router = useRouter();
  // パスからプランのIDを取得
  const planId = router.asPath.replace("/plans/", "");
  // プランを取得
  const {
    data: planData,
    loading: isPlanLoading,
    error,
  } = useGetPlanQuery({
    variables: { planId: planId },
  });
  // 自分が参加しているトークルームの情報を取得
  const { data: loginUserTalkRoomsData } = useGetLoginUserTalkRoomsQuery();
  const { handleRefreshToken } = useRefreshTokens();
  const [createTalkRoomMutation] = useCreateTalkRoomMutation();
  const [createNotificationMutation] = useCreateNotificationMutation();
  const { handleDeletePlan } = useDeletePlan();
  const {
    inputTitle,
    inputContent,
    inputPrice,
    handleUpdatePlan,
    handleTitleChange,
    handleContentChange,
    handlePriceChange,
  } = useUpdatePlan(planData);
  // トークルームの作成（メッセージ送信の承認申請）
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
      toast.error("すでに申込済みです。");
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
      await createNotificationMutation({
        variables: {
          recieverId: planData?.plan?.planAuthor.id ? planData.plan.planAuthor.id : "",
          notificationType: "プラン申し込み",
        },
      });
      router.push("/talks");
      toast.success("プランに申し込みました。");
    } catch (error) {
      toast.error("プランに申し込みできませんでした。");
      console.error(error);
    }
  };
  // タブや編集切り替えのstate
  const [isEditMode, setIsEditMode] = useState(false);
  const handleEditModeChange = () => {
    setIsEditMode((prev) => {
      return !prev;
    });
  };

  return (
    <Layout meta={{ pageName: "プラン詳細" }} spHeaderTitle="プラン詳細">
      {/* ローディング */}
      {isPlanLoading ? (
        <PlanLoading />
      ) : error ? (
        // エラー
        <div>エラーが発生しました。プランが存在しません。</div>
      ) : (
        <div>
          {/* このプランの作成者が大学生かどうか */}
          {planData?.plan?.planAuthor?.targetUser?.isCollegeStudent ? (
            <div className="py-4">
              {/* 編集モードかそれ以外か */}
              {isEditMode ? (
                <div>
                  <input
                    type="text"
                    className="border block w-full p-2"
                    placeholder="プランのタイトル"
                    value={inputTitle}
                    onChange={handleTitleChange}
                  />
                  <input
                    type="text"
                    className="border block w-full p-2"
                    placeholder="内容や詳細"
                    value={inputContent}
                    onChange={handleContentChange}
                  />
                  <input
                    type="number"
                    className="border block w-full p-2"
                    placeholder="金額を入力してください。"
                    value={inputPrice}
                    onChange={handlePriceChange}
                  />
                  <div className="flex items-center">
                    <Button
                      variant="outlined"
                      type="button"
                      onClick={handleUpdatePlan}
                      color="primary"
                    >
                      更新する
                    </Button>
                    {/* プランにトークルームが存在していれば削除不可にする */}
                    {planData.plan.selectedPlan.edges.length === 0 ? (
                      <Button
                        type="button"
                        onClick={handleDeletePlan}
                        color="secondary"
                        variant="outlined"
                      >
                        削除する
                      </Button>
                    ) : (
                      <Button type="button" color="secondary" variant="outlined" disabled>
                        トークルームが存在する場合は削除できません
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                // 通常時
                <div>
                  {/* プランの詳細とプラン作成者をタブで表示 */}
                  <PlanTab {...planData}></PlanTab>
                </div>
              )}

              {/* ログインしていない場合 */}
              {!loginUserData.isLogin ? (
                <Button className="font-bold" variant="contained" color="primary">
                  ログイン後にメッセージを送信可能です。
                </Button>
              ) : // ↓高校生の場合
              !loginUserData.isCollegeStudent && loginUserData.isLogin ? (
                <Button color="secondary" variant="outlined" onClick={handleCreateTalkRoom}>
                  このプランに申し込む
                </Button>
              ) : planData.plan.planAuthor.id === loginUserData.userId ? (
                <Button variant="contained" onClick={handleEditModeChange}>
                  {/* 作成者がログインユーザー（自分）の場合はプランを編集可能 */}
                  {isEditMode ? "切り替える" : "編集する"}
                </Button>
              ) : (
                // それ以外
                <button className="border p-2 border-black" disabled>
                  高校生のみ申込可能です。
                </button>
              )}
            </div>
          ) : (
            // 作成者が大学生ではない
            <div className="py-2 text-center">
              {loginUserData.isLogin && "プランが削除されたか、非公開の設定になっています。"}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};
export default PlanDetail;
