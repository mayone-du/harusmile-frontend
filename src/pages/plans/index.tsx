import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserPlansQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";

const PlansIndex: NextPage = () => {
  // プラン一覧の表示
  const { data } = useGetLoginUserPlansQuery();
  const loginUserData = useReactiveVar(loginUserVar);

  // TODO: プランの作成
  const handlePlanCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Layout metaTitle="マイプラン一覧" spHeaderTitle="マイプラン一覧">
      {loginUserData.isCollegeStudent && (
        <div>
          <form onSubmit={handlePlanCreate}>
            <input type="text" className="border p-2 block w-full" placeholder="プランタイトル" />
            <input
              type="number"
              min={0}
              max={50000}
              className="border p-2 block w-full"
              placeholder="金額を入力"
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
            {data?.loginUserPlans?.edges.map((plan, index) => {
              return (
                <div className="border" key={index}>
                  <div>{plan?.node?.title}</div>
                  <div>{plan?.node?.content}</div>
                </div>
              );
            })}
          </section>
        </div>
      )}
    </Layout>
  );
};

export default PlansIndex;
