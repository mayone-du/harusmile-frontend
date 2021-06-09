import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { loginUserVar } from "src/apollo/cache";

export const useProfileUpdate = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const [inputLoginUserData, setInputLoginUserData] = useState(loginUserData);

  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...loginUserData, profileName: e.target.value });
  };
  const handleProfileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...loginUserData, profileText: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return { handleProfileNameChange, handleProfileTextChange, handleSubmit, inputLoginUserData };
};
