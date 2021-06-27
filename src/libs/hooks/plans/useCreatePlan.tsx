import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { GetLoginUserPlansDocument, useCreatePlanMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

export const useCreatePlan = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [planImageFile, setPlanImageFile] = useState<File | null>(null);
  const [createPlanMutation] = useCreatePlanMutation({
    refetchQueries: [{ query: GetLoginUserPlansDocument }],
  });

  const { handleRefreshToken } = useRefreshTokens();

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  }, []);

  const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  }, []);

  const handlePriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  }, []);

  // プロフ画像のイベントハンドラ
  const handlePlanImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPlanImageFile(e.target.files[0]);
  };
  const handlePlanCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTitle === "") {
      alert("プランのタイトルを入力してください。");
      return;
    }
    if (inputContent === "") {
      alert("プランの内容を入力してください。");
      return;
    }
    if (inputPrice === "") {
      alert("料金を入力してください。");
      return;
    }
    try {
      await handleRefreshToken();
      await createPlanMutation({
        variables: {
          title: inputTitle,
          content: inputContent,
          price: parseFloat(inputPrice),
          isPublished: true,
          planImage: planImageFile,
        },
      });
      toast.success("プランが作成されました。");
      setInputTitle("");
      setInputContent("");
      setInputPrice("");
      setPlanImageFile(null);
    } catch (error) {
      alert(error);
      return;
    }
  };
  return {
    inputTitle,
    inputContent,
    inputPrice,
    planImageFile,
    handleTitleChange,
    handleContentChange,
    handlePriceChange,
    handlePlanImageChange,
    handlePlanCreate,
  };
};
