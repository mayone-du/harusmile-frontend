import { memo } from "react";

export const PlanLoading = memo(() => {
  return (
    <div className="py-4">
      <div className="flex items-center text-sm">
        {/* タブ */}
        <div className={`p-2 block h-12 border w-1/2 rounded-l bg-gray-400 animate-pulse`}></div>
        <div className={`p-2 block h-12 border w-1/2 rounded-r bg-gray-400 animate-pulse`}></div>
      </div>
      {/* プラン詳細 */}
      <div className="w-full my-2 p-2 h-68 bg-gray-400 animate-pulse rounded">
        {/* プランのタイトル */}
        <div className="w-3/4 h-6 my-2 mx-auto bg-gray-500 animate-pulse rounded"></div>
        {/* サムネイル画像 */}
        <div className="bg-gray-500 rounded animate-pulse w-full h-32"></div>
        {/* プランのテキスト */}
        <div className="bg-gray-500 rounded my-2 animate-pulse w-full h-4"></div>
        <div className="bg-gray-500 rounded my-2 animate-pulse w-full h-4"></div>
        <div className="bg-gray-500 rounded my-2 animate-pulse w-full h-4"></div>
        {/* プランの料金 */}
        <div className="bg-gray-500 rounded my-2 animate-pulse w-1/3 h-4"></div>
      </div>
    </div>
  );
});

PlanLoading.displayName = "PlanLoading";
