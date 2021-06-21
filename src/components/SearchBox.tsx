import Link from "next/link";
import { useSearch } from "src/libs/hooks/useSearch";

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
        <h2 className="md:py-10 py-4 md:text-5xl text-lg font-bold text-center text-gray-700 dark:text-white">
          条件から探す
        </h2>
        <div className="mx-2 md:mx-32">
          <div className="md:py-10 py-4 md:px-6 px-2 bg-blue-100">
            <p className="md:text-base text-sm">フリーワード検索</p>
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                className="block md:p-4 p-2 w-full rounded-none border-t border-b border-l focus:outline-none"
                type="search"
                placeholder="大学名、出身高校名、部活など"
                value={inputSearchKeyword}
                onChange={handleSearchKeywordChange}
              />
              <button className="md:p-4 p-2 bg-white border-t border-r border-b">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            <div>
              <button type="submit" className="text-blue-700" onClick={handleConditionsToggle}>
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
                      <Link href="/profiles/collage">
                        <a className="text-blue-500">大学生のみを検索</a>
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
