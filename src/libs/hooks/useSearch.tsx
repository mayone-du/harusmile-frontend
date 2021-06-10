import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  // 入力欄のstate
  const [inputSearchKeyword, setInputSearchKeyword] = useState("");
  // 検索条件の表示のstate
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const handleSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchKeyword(e.target.value);
  };

  // 検索条件の開閉
  const handleConditionsToggle = () => {
    setIsConditionsOpen((prev) => {
      return !prev;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: { keyword: inputSearchKeyword },
    });
  };

  return {
    inputSearchKeyword,
    handleSearchKeywordChange,
    isConditionsOpen,
    handleConditionsToggle,
    handleSearch,
  };
};
