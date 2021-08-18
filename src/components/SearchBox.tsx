import Link from "next/link";
import { CheckSvg } from "src/components/icons/svgs/CheckSvg";
import { SearchSvg } from "src/components/icons/svgs/SearchSvg";
import { useSearch } from "src/libs/hooks/useSearch";

// トップページに使用している検索窓
export const SearchBox: React.VFC = () => {
  const {
    inputSearchKeyword,
    handleSearchKeywordChange,
    isConditionsOpen,
    handleConditionsToggle,
    handleSearch,
  } = useSearch();
  return (
    <div>
      <section className="md:pb-20 pb-6">
        <h2 className="flex justify-center items-center">
          <CheckSvg className="md:mx-6 mx-2 md:w-12 md:h-12 w-6 h-6 text-gray-600 dark:text-white" />
          <div className="md:py-10 py-4 md:text-5xl text-lg font-bold text-center text-gray-600 dark:text-white">
            条件から探す
          </div>
        </h2>
        <div className="md:mx-32">
          <div className="md:py-10 py-4 md:px-6 px-2 bg-blue-100 dark:bg-gray-700 rounded">
            <p className="md:text-base text-sm">フリーワード検索</p>
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                className="block md:p-4 p-2 w-full dark:bg-gray-800 rounded-l border-t border-b border-l focus:outline-none"
                type="search"
                placeholder="大学名、高校名で検索"
                value={inputSearchKeyword}
                onChange={handleSearchKeywordChange}
              />
              <button className="md:p-4 p-2 dark:bg-gray-800 bg-white rounded-r border-t border-r border-b">
                <SearchSvg className="w-6 h-6" />
              </button>
            </form>

            <div>
              <button
                type="submit"
                className="text-blue-700 dark:text-blue-500"
                onClick={handleConditionsToggle}
              >
                検索条件を開く
              </button>
              {/* 検索条件 */}
              {isConditionsOpen && (
                <div>
                  <ul>
                    {/* <li>
                      <label className="flex items-center">
                        <p>ユーザー名で検索</p>
                        <input className="block" type="checkbox" value="profileName" />
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center">
                        <p>学校名で検索</p>
                        <input className="block" type="checkbox" value="schoolName" />
                      </label>
                    </li> */}
                    <li>
                      <Link href="/profiles/high-school">
                        <a className="text-blue-500">高校生のみを検索</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profiles/college">
                        <a className="text-blue-500">大学生のみを検索</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profiles/all-profiles">
                        <a className="text-blue-500">すべてのプロフィールを検索</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
