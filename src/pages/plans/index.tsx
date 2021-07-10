import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserPlansQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Plan } from "src/components/plans/Plan";
import { useCreatePlan } from "src/libs/hooks/plans/useCreatePlan";

const PlansIndex: NextPage = () => {
  // プラン一覧の表示
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
  // TODO: プランの更新

  return (
    <Layout meta={{ pageName: "マイプラン一覧" }} spHeaderTitle="マイプラン一覧">
      {/* ローディング時 */}
      {loginUserData.isLoading && <div>Loading</div>}

      {/* 非ログイン時 */}
      {!loginUserData.isLoading && !loginUserData.isLogin && <div>ログイン後に使用可能です。</div>}

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
            <button
              type="submit"
              className="block w-1/2 mx-auto bg-blue-600 text-white rounded-3xl py-2"
            >
              作成
            </button>
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
