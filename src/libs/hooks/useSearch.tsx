import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  // 入力欄のstate
  const [inputSearchKeyword, setInputSearchKeyword] = useState("");
  // 検索条件の表示のstate
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const [inputCondition, setCondition] = useState("");

  const handleSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchKeyword(e.target.value);
  };

  // TODO: 検索条件が変更されたときのハンドラ
  // const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCondition(e.target.value);
  // };

  // 検索条件の開閉用イベントハンドラ
  const handleConditionsToggle = () => {
    setIsConditionsOpen((prev) => {
      return !prev;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/results",
      query: {
        keyword: inputSearchKeyword,
        condition: inputCondition ? inputCondition : "schoolName",
      },
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
