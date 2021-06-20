import { useState } from "react";
import { useCreateMessageMutation, useCreateNotificationMutation } from "src/apollo/schema";

export const useCreateMessages = () => {
  const [createMessageMutation] = useCreateMessageMutation();
  const [inputText, setInputText] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  // 通知作成
  const [createNotificationMutation] = useCreateNotificationMutation();

  return {
    createMessageMutation,
    inputText,
    setInputText,
    handleInputChange,
    createNotificationMutation,
  };
};
