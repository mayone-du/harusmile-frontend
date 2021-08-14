import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const Footer: React.VFC = memo(() => {
  return (
    <footer className="md:px-32 px-2 md:pb-0 pb-28 pt-4 border-t-2 border-gray-700">
      <nav className="md:flex justify-between items-center">
        <div className="text-center my-2">
          <Link href="/">
            <a className="w-2/3 flex items-center justify-center mx-auto">
              <Image src="/images/logo.png" width={375} height={80} objectFit="cover" />
            </a>
          </Link>
        </div>
        <ul className="flex items-center justify-center md:text-base text-xs md:py-0 py-4">
          <li className="mx-2">
            <Link href="/static/privacy-policy">
              <a>利用規約</a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/static/about">
              <a>運営会社</a>
            </Link>
          </li>
          <li className="mx-2">
            <Link href="/static/contact">
              <a>お問い合わせ</a>
            </Link>
          </li>
        </ul>
      </nav>
      <p className="md:py-6 py-2 text-center">copyright&copy;&nbsp;harusmile</p>
    </footer>
  );
});

Footer.displayName = "Footer";
