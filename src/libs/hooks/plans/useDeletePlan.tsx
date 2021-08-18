import { useRouter } from "next/dist/client/router";
import { useDeletePlanMutation } from "src/graphql/apollo/schemas/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

export const useDeletePlan = () => {
  const router = useRouter();
  // パスからプランのIDを取得
  const planId = router.asPath.replace("/plans/", "");
  const [deletePlanMutation] = useDeletePlanMutation();
  const { handleRefreshToken } = useRefreshTokens();
  const handleDeletePlan = async () => {
    try {
      await handleRefreshToken();
      await deletePlanMutation({ variables: { id: planId } });
      alert("プランを削除しました。");
      router.push("/plans");
    } catch (error) {
      alert(error);
      return;
    }
  };
  return { handleDeletePlan };
};
