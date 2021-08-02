import { useState } from "react";
import { toast } from "react-hot-toast";
import { useCreateNotificationMutation, useCreateReviewMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

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
  const [createNotificationMutation] = useCreateNotificationMutation();
  const { handleRefreshToken } = useRefreshTokens();
  // モーダル管理
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleReviewTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRevewText(event.target.value);
  };
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputStars(event.target.value);
  };

  // レビュー作成
  const handleCreateReview = async (providerId: string) => {
    if (inputRevewText === "" || inputStars === "") {
      toast.error("レビューを入力してください。");
      return;
    }

    try {
      await handleRefreshToken();
      // レビュー作成
      await createReviewMutation({
        variables: {
          providerId: providerId,
          reviewText: inputRevewText,
          stars: parseFloat(inputStars),
        },
      });
      // 通知作成
      await createNotificationMutation({
        variables: {
          recieverId: providerId,
          notificationType: "レビュー",
        },
      });
      toast.success("レビューが送信されました。");
      setInputRevewText("");
      setInputStars("");
      setIsOpen(false);
    } catch (error) {
      toast.error("レビューの送信に失敗しました。もう一度お試しください。");
      console.error(error);
      return;
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
