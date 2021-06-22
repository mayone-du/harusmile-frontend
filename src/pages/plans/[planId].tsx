import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useGetPlanQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";

const PlanDetail: NextPage = () => {
  const router = useRouter();
  const planId = router.asPath.replace("/plans/", "");
  const { data: planData } = useGetPlanQuery({ variables: { planId: planId } });

  return (
    <Layout metaTitle="ハルスマイル | プラン詳細" spHeaderTitle="プラン詳細">
      <div>このプランの作成者：{planData?.plan?.planAuthor.targetUser?.profileName}</div>
      <div>{planData?.plan?.title}</div>
      <div>{planData?.plan?.content}</div>
      <div>{planData?.plan?.price.toString()}円</div>
    </Layout>
  );
};

export default PlanDetail;
