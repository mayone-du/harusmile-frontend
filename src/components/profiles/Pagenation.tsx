import Link from "next/link";

export const Pagenation: React.VFC = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <a className="flex w-8 h-8 items-center justify-center border">1</a>
        </Link>
      </li>
    </ul>
  );
};
