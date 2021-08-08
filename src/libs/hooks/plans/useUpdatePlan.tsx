import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import toast from "react-hot-toast";
import type { GetPlanQuery } from "src/apollo/schema";
import { useUpdatePlanMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

export const useUpdatePlan = (planData: GetPlanQuery | undefined) => {
  const router = useRouter();
  const [updatePlanMutation] = useUpdatePlanMutation();
  const { handleRefreshToken } = useRefreshTokens();

  const [inputTitle, setInputTitle] = useState(planData?.plan?.title ? planData.plan.title : "");
  const [inputContent, setInputContent] = useState(
    planData?.plan?.content ? planData.plan.content : "",
  );
  // プランの料金を文字列型で保持
  const [inputPrice, setInputPrice] = useState(
    planData?.plan?.price === 0 ? planData.plan.price.toString() : "0",
  );

  //TODO: プランの仕様をどうするかによって検討
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast.error("タイトルは変更できません");
    return;
    setInputTitle(event.target.value);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputContent(event.target.value);
  };
  //TODO: 有料版が検討されたら修正
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toast.error("料金は変更できません。");
    return;
    setInputPrice(event.target.value);
  };

  const handleUpdatePlan = async () => {
    // エラーチェック
    if (inputTitle === "" || inputContent === "") {
      toast.error("現在開発中です");
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
        toast.success("プランを更新しました。");
        router.push("/plans");
      } catch (error) {
        toast.error("プランが更新できませんでした。");
        console.error(error);
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
