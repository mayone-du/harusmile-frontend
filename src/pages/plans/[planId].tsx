import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import {
  useCreateTalkRoomMutation,
  useGetLoginUserTalkRoomsQuery,
  useGetPlanQuery,
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Review } from "src/components/reviews/Review";
import { useDeletePlan } from "src/libs/hooks/plans/useDeletePlan";
import { useUpdatePlan } from "src/libs/hooks/plans/useUpdatePlan";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

const PlanDetail: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const router = useRouter();
  const planId = router.asPath.replace("/plans/", "");
  const { data: planData, loading: isPlanLoading } = useGetPlanQuery({
    variables: { planId: planId },
  });
  const { data: loginUserTalkRoomsData } = useGetLoginUserTalkRoomsQuery();
  const { handleRefreshToken } = useRefreshTokens();
  const [createTalkRoomMutation] = useCreateTalkRoomMutation();
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
  const [pickOpenTab, setPickOpenTab] = useState<"plan" | "review">("plan");
  const handleEditModeChange = () => {
    setIsEditMode((prev) => {
      return !prev;
    });
  };
  const handlePlanTabOpen = useCallback(() => {
    setPickOpenTab("plan");
  }, []);
  const handleReviewTabOpen = useCallback(() => {
    setPickOpenTab("review");
  }, []);

  return (
    <Layout metaTitle="ハルスマイル | プラン詳細" spHeaderTitle="プラン詳細">
      {isPlanLoading ? (
        <div>Loading</div>
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
                    placeholder="title"
                    value={inputTitle}
                    onChange={handleTitleChange}
                  />
                  <input
                    type="text"
                    className="border block w-full p-2"
                    placeholder="content"
                    value={inputContent}
                    onChange={handleContentChange}
                  />
                  <input
                    type="number"
                    className="border block w-full p-2"
                    placeholder="price"
                    value={inputPrice}
                    onChange={handlePriceChange}
                  />
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={handleUpdatePlan}
                      className="block border p-2 bg-blue-500"
                    >
                      更新する
                    </button>
                    {/* プランにトークルームが存在していれば削除不可にする */}
                    {planData.plan.selectedPlan.edges.length === 0 ? (
                      <button
                        type="button"
                        onClick={handleDeletePlan}
                        className="block border p-2 bg-red-500"
                      >
                        削除する
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="block border p-2 bg-red-500 text-xs line-through"
                        disabled
                      >
                        トークルームが存在する場合は削除できません
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                // 通常時
                <div>
                  <div className="flex items-center text-sm">
                    <button
                      className={`p-2 block border w-1/2 ${
                        pickOpenTab === "plan" && "bg-blue-300"
                      }`}
                      onClick={handlePlanTabOpen}
                    >
                      このプランについて
                    </button>
                    <button
                      className={`p-2 block border w-1/2 ${
                        pickOpenTab === "review" && "bg-blue-300"
                      }`}
                      onClick={handleReviewTabOpen}
                    >
                      この人のレビューを見る
                    </button>
                  </div>
                  <div>
                    このプランの作成者：{planData?.plan?.planAuthor.targetUser?.profileName}
                  </div>
                  {pickOpenTab === "plan" ? (
                    <div className="my-2 p-2 border">
                      <h2 className="text-center text-lg py-2 font-bold">
                        {planData?.plan?.title}
                      </h2>
                      <p className="text-sm">{planData?.plan?.content}</p>
                      <div>{planData?.plan?.price.toString()}円</div>
                    </div>
                  ) : (
                    <div>
                      <div>名前：{planData.plan.planAuthor.targetUser.profileName}</div>
                      <h3 className="bg-gray-200 my-2 p-2">この人のレビュー</h3>
                      <ul>
                        {planData.plan.planAuthor.provider.edges.map((review, index) => {
                          return (
                            <Review
                              key={index}
                              customerImagePath={review?.node?.customer.targetUser?.profileImage}
                              customerName={
                                review?.node?.customer.targetUser?.profileName
                                  ? review.node.customer.targetUser.profileName
                                  : ""
                              }
                              reviewText={review?.node?.reviewText ? review.node.reviewText : ""}
                              reviewStars={review?.node?.stars ? review.node.stars : 0}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* 高校生の場合 */}
              {!loginUserData.isCollegeStudent && loginUserData.isLogin ? (
                <button className="p-2 border" onClick={handleCreateTalkRoom}>
                  トークルームを作成する
                </button>
              ) : (
                <button className="border p-2" disabled>
                  高校生のみ申込可能です。
                </button>
              )}
              {/* ログインしていない場合 */}
              {!loginUserData.isLogin && (
                <div className="font-bold">ログイン後メッセージを送信可能です。</div>
              )}

              {/* 作成者がログインユーザー（自分）の場合 */}
              {planData?.plan?.planAuthor.id === loginUserData.userId && (
                <button onClick={handleEditModeChange} className="border p-2">
                  {isEditMode ? "切り替える" : "編集する"}
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
