import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const Footer: React.VFC = memo(() => {
  return (
    <div>
      <footer className="md:px-32 px-2 md:pb-0 pb-28 border-t-2 border-gray-700">
        <nav className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a>
                <Image src="/images/logo.png" width={200} height={70} />
              </a>
            </Link>
          </div>
          <ul className="flex items-center md:text-base text-xs">
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
        <p className="py-6 text-center">copyright&copy;</p>
      </footer>
    </div>
  );
});
Footer.displayName = "Footer";
