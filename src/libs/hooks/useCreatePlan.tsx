import { useCallback, useState } from "react";
import { useCreatePlanMutation } from "src/apollo/schema";

export const useCreatePlan = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [createPlanMutation] = useCreatePlanMutation();

  const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  }, []);

  const handleContentChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(event.target.value);
  }, []);

  const handlePriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  }, []);

  const handlePlanCreate = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPlanMutation({
        variables: {
          title: inputTitle,
          content: inputContent,
          price: parseFloat(inputPrice),
          isPublished: true,
        },
      });
    } catch (error) {
      alert(error);
      return;
    }
  };
  return {
    inputTitle,
    inputContent,
    inputPrice,
    handleTitleChange,
    handleContentChange,
    handlePriceChange,
    handlePlanCreate,
  };
};
