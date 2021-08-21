import Link from "next/link";

type Props = {
  currentPageNumber: number;
  maxPageCount: number;
};

// TODO: ページ数が多い場合の処理
export const Pagenation: React.VFC<Props> = (props) => {
  const pagenation: { isCurrentPage: boolean }[] = [];
  for (let i = 1; i < props.maxPageCount + 1; i++) {
    // 現在のページと同じであればtrueを返す
    if (props.currentPageNumber === i) {
      pagenation.push({ isCurrentPage: true });
    } else {
      pagenation.push({ isCurrentPage: false });
    }
  }

  return (
    <ul className="flex">
      {pagenation.map((item, index) => {
        return (
          <li key={index} className="mx-1">
            <Link href={`/profiles/all-profiles/${index + 1}`}>
              <a
                className={`flex w-8 h-8 items-center justify-center border ${
                  item.isCurrentPage ? "bg-gray-400" : null
                }`}
              >
                {index + 1}
              </a>
            </Link>
          </li>
        );
      })}
      <li></li>
    </ul>
  );
};
