import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { GetLoginUserPlansDocument, useCreatePlanMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

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
  const handlePlanImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setPlanImageFile(event.target.files[0]);
  };
  const handlePlanCreate = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputTitle === "") {
      toast.error("プランのタイトルを入力してください。");
      return;
    }
    if (inputContent === "") {
      toast.error("プランの内容を入力してください。");
      return;
    }
    if (inputPrice === "") {
      toast.error("料金を入力してください。");
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
