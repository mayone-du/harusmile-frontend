import Link from "next/link";

export const InitialTalkDetail: React.VFC = () => {
  return (
    <div>
      <h2 className="py-4 text-2xl font-bold text-center">トークを始めましょう</h2>
      <div className="text-blue-700">
        <p>
          <Link href="/profiles/college">
            <a>大学生一覧から探す</a>
          </Link>
        </p>
        <p>
          <Link href="/profiles/high-school">
            <a>高校生一覧から探す</a>
          </Link>
        </p>
        <p>
          <Link href="/profiles/all-profiles">
            <a>全てのプロフィールから探す</a>
          </Link>
        </p>
      </div>
    </div>
  );
};
