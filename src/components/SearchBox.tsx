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
      <section className="pb-20">
        <h2 className="py-10 text-5xl font-bold text-center text-gray-700 dark:text-white">
          条件から探す
        </h2>
        <div className="mx-2 md:mx-32">
          <div className="py-10 px-6 bg-blue-100">
            <p>フリーワード検索</p>
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                className="block p-4 w-full rounded-none border-t border-b border-l focus:outline-none"
                type="search"
                placeholder="大学名、出身高校名、部活など"
                value={inputSearchKeyword}
                onChange={handleSearchKeywordChange}
              />
              <button className="p-4 bg-white border-t border-r border-b">
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
                    <li>
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
