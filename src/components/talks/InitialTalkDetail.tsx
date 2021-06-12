export const InitialTalkDetail: React.VFC = () => {
  // TODO: ユーザーを検索し、メッセージを送れるようにする
  return (
    <div>
      <h2 className="py-4 text-2xl font-bold text-center">トークを始めましょう</h2>
      <input type="search" className="block p-2 border" placeholder="ユーザーを検索" />
    </div>
  );
};
