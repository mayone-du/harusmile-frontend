import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const [inputSearchKeyword, setInputSearchKeyword] = useState("");

  const handleSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchKeyword(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: { keyword: inputSearchKeyword },
    });
  };

  return { inputSearchKeyword, handleSearchKeywordChange, handleSearch };
};
