import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import type { GetPlanQuery } from "src/apollo/schema";
import { useUpdatePlanMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

export const useUpdatePlan = (planData: GetPlanQuery | undefined) => {
  const router = useRouter();
  const [updatePlanMutation] = useUpdatePlanMutation();
  const { handleRefreshToken } = useRefreshTokens();

  const [inputTitle, setInputTitle] = useState(planData?.plan?.title ? planData.plan.title : "");
  const [inputContent, setInputContent] = useState(
    planData?.plan?.content ? planData.plan.content : "",
  );
  const [inputPrice, setInputPrice] = useState(
    planData?.plan?.price === 0 ? planData.plan.price.toString() : "0",
  );

  // TODO: 仕様確認
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert("タイトルは変更できません");
    return;
    setInputTitle(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alert("料金は変更できません。");
    return;
    setInputPrice(event.target.value);
  };

  const handleUpdatePlan = async () => {
    // エラーチェック
    if (inputTitle === "" || inputContent === "") {
      alert("現在開発中です");
      return;
    }

    if (planData) {
      try {
        await handleRefreshToken();
        await updatePlanMutation({
          variables: {
            id: planData?.plan?.id ? planData.plan.id : "",
            title: inputTitle,
            content: inputContent,
            price: typeof inputPrice === "string" ? parseFloat(inputPrice) : inputPrice,
            isPublished: true,
          },
        });
        alert("プランを更新しました。");
        router.push("/plans");
      } catch (error) {
        alert(error);
        return;
      }
    }
  };
  return {
    inputTitle,
    inputContent,
    inputPrice,
    setInputTitle,
    setInputContent,
    setInputPrice,
    handleTitleChange,
    handleContentChange,
    handlePriceChange,
    handleUpdatePlan,
  };
};
