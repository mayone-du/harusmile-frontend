import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileImagePath: string;
};
export const Header: React.VFC<Props> = memo((props) => {
  return (
    <div>
      <header className="px-2 md:px-32">
        <nav className="flex justify-between items-center">
          <div className="m-2">
            <Link href="/">
              <a>
                <Image src="/images/logo.png" width={200} height={70} className="object-cover" />
              </a>
            </Link>
          </div>
          <ul className="flex items-center">
            <li className="m-2">
              <Link href="/auth/signin">
                <a>ログイン</a>
              </Link>
            </li>
            <li className="m-2">
              <Link href="/auth/signup">
                <a>新規登録</a>
              </Link>
            </li>
            <li className="m-2">
              <Link href="/settings">
                <a>
                  {props.profileImagePath ? (
                    <img
                      src={`${MEDIAFILE_API_ENDPOINT}${props.profileImagePath}`}
                      alt="Profile"
                      className="object-cover w-10 h-10"
                    />
                  ) : (
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
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
});
Header.displayName = "Header";
