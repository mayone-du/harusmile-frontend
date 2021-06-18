import { useState } from "react";
import { useCreateReviewMutation } from "src/apollo/schema";

export const useCreateReview = () => {
  // モーダル用style
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  const [isModalOpen, setIsOpen] = useState(false);
  const [inputRevewText, setInputRevewText] = useState("");
  const [inputStars, setInputStars] = useState("");

  const [createReviewMutation] = useCreateReviewMutation();

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRevewText(e.target.value);
  };
  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputStars(e.target.value);
  };

  // レビュー作成
  const handleCreateReview = async (providerId: string) => {
    if (inputRevewText === "" || inputStars === "") {
      alert("レビューを入力してください。");
      return;
    }
    try {
      await createReviewMutation({
        variables: {
          providerId: providerId,
          reviewText: inputRevewText,
          stars: parseFloat(inputStars),
        },
      });
      alert("レビューが送信されました。");
      setInputRevewText("");
      setInputStars("");
      setIsOpen(false);
    } catch (error) {
      alert(error);
    }
    return;
  };

  return {
    customStyles,
    handleModalOpen,
    handleModalClose,
    handleCreateReview,
    inputRevewText,
    handleReviewTextChange,
    inputStars,
    handleStarsChange,
    isModalOpen,
  };
};
