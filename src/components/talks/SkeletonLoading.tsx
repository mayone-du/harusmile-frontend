export const SkeletonLoading: React.VFC = () => {
  return (
    <div className="py-2 px-4 mx-auto w-full border border-gray-100 shadow">
      <div className="flex space-x-4 animate-pulse">
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        <div className="flex-1 py-1 space-y-4">
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
