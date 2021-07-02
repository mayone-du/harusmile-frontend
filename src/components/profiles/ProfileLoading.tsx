export const ProfileLoading: React.VFC = () => {
  return (
    <div>
      <div className="flex items-center justify-between my-4 bg-gray-200">
        <p className="p-2 text-sm text-gray-600 dark:text-white">基本情報</p>
      </div>
      <div className="flex items-center justify-center py-2">
        <div className="w-20 h-20 mx-2 bg-gray-200 animate-pulse rounded-full">
          {/* プロフィールアイコン */}
        </div>
        <div className="h-auto w-1/2">
          <div className="text-lg font-bold h-5 bg-gray-300 animate-pulse">{/* なまえ */}</div>
          <div className="w-1/2 h-3 my-2 bg-gray-200 animate-pulse">{/* 大学名 */}</div>
          <p className="w-1/4 h-3 bg-gray-200 animate-pulse">{/* 年齢 */}</p>
        </div>
      </div>
      <div className="flex items-center justify-between my-2 bg-gray-200">
        <p className="p-2 text-sm text-gray-600 dark:text-white">プロフィール</p>
      </div>
      <div className="border my-4">
        <div className="h-4 my-1 bg-gray-200 animate-pulse"></div>
        <div className="h-4 my-1 bg-gray-200 animate-pulse"></div>
        <div className="h-4 my-1 bg-gray-200 animate-pulse"></div>
      </div>
      <ul className="break-words">
        {/* 大学生かによって表示するデータを変更 */}
        <li className="flex items-center border-b bg-gray-200 animate-pulse"></li>
      </ul>
    </div>
  );
};
