import { useRouter } from "next/dist/client/router";
import { useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  // 入力欄のstate
  const [inputSearchKeyword, setInputSearchKeyword] = useState("");
  // 検索条件の表示のstate
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const handleSearchKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchKeyword(event.target.value);
  };

  // 検索条件の開閉用イベントハンドラ
  const handleConditionsToggle = () => {
    setIsConditionsOpen((prev) => {
      return !prev;
    });
  };

  // TODO: 検索条件が変更されたときのハンドラ（チェックボックスとかで検索条件を絞ったりできるように）

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputSearchKeyword === "") {
      return;
    }
    router.push({
      pathname: "/results",
      query: {
        keyword: inputSearchKeyword,
        condition: "schoolName",
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
