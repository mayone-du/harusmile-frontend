import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { BlueButton } from "src/components/buttons/BlueButton";
import { Layout } from "src/components/layouts/Layout";
import { Plan } from "src/components/plans/Plan";
import { loginUserVar } from "src/graphql/apollo/cache";
import { useGetLoginUserPlansQuery } from "src/graphql/apollo/schemas/schema";
import { useCreatePlan } from "src/libs/hooks/plans/useCreatePlan";

const PlansIndex: NextPage = () => {
  // 自分のプラン一覧の表示と作成欄
  const { data } = useGetLoginUserPlansQuery({ fetchPolicy: "network-only" });
  const loginUserData = useReactiveVar(loginUserVar);

  const {
    inputTitle,
    inputContent,
    inputPrice,
    handleTitleChange,
    handleContentChange,
    handlePriceChange,
    handlePlanImageChange,
    handlePlanCreate,
  } = useCreatePlan();

  return (
    <Layout meta={{ pageName: "マイプラン一覧" }} spHeaderTitle="マイプラン一覧">
      {/* ローディング時 */}
      {loginUserData.isLoading && <div>Loading</div>}

      {/* 非ログイン時 */}
      {!loginUserData.isLoading && !loginUserData.isLogin && <div>ログイン後に使用可能です。</div>}

      {/* ユーザーが高校生の場合は表示しない */}
      {!loginUserData.isCollegeStudent && <div>大学生のみプランの作成が可能です。</div>}

      {/* ユーザーが大学生ならプランの一覧を表示 */}
      {loginUserData.isCollegeStudent && (
        <div className="py-8">
          <h2 className="text-center font-bold">プランの作成</h2>
          <form className="mb-8" onSubmit={handlePlanCreate}>
            <input
              type="text"
              className="border p-2 block w-full"
              value={inputTitle}
              onChange={handleTitleChange}
              placeholder="プランタイトル"
            />
            <textarea
              value={inputContent}
              onChange={handleContentChange}
              className="block border p-2 resize-none w-full"
              placeholder="内容"
            ></textarea>
            <input
              type="number"
              min={0}
              max={50000}
              className="border p-2 block w-full"
              placeholder="金額を入力"
              value={inputPrice}
              onChange={handlePriceChange}
            />
            <input
              type="file"
              className="border p-2 block w-full"
              onChange={handlePlanImageChange}
            />
            <div className="flex justify-center">
              <BlueButton type="submit" color="primary">
                作成
              </BlueButton>
            </div>
          </form>
          <section>
            <h2 className="text-lg font-bold text-center">マイプラン一覧</h2>
            <ul>
              {data?.loginUserPlans?.edges.map((plan, index) => {
                return (
                  <Plan
                    key={index}
                    planId={plan?.node?.id ? plan.node.id : ""}
                    title={plan?.node?.title ? plan.node.title : ""}
                    content={plan?.node?.content ? plan.node.content : ""}
                    price={plan?.node?.price ? plan.node.price : 0}
                    planImage={plan?.node?.planImage ? plan.node.planImage : ""}
                  />
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default PlansIndex;
