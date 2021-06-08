import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback } from "react";
import { loginUserVar } from "src/apollo/cache";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileImagePath: string;
};
export const Header: React.VFC<Props> = memo((props) => {
  const loginUserData = useReactiveVar(loginUserVar);
  const handleBellClick = useCallback(() => {
    alert("通知は現在開発中です");
  }, []);
  return (
    <div>
      <header className="px-2 md:px-32 shadow-md">
        <nav className="flex justify-between items-center">
          <div className="mx-2">
            <Link href="/">
              <a>
                <Image src="/images/logo.png" width={200} height={70} className="object-cover" />
              </a>
            </Link>
          </div>
          <ul className="flex items-center">
            {loginUserData.isLogin ? (
              <li>
                <Link href="/auth/signout">
                  <a>ログアウト</a>
                </Link>
              </li>
            ) : (
              <>
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
              </>
            )}

            {loginUserData.isLogin ? (
              <>
                <li className="flex items-center px-2 m-2">
                  <Link href="/settings">
                    <a>
                      {props.profileImagePath ? (
                        <div>
                          <img
                            src={`${MEDIAFILE_API_ENDPOINT}${props.profileImagePath}`}
                            alt="Profile"
                            className="block object-cover w-10 h-10"
                          />
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10"
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
                  <div>
                    <p className="text-sm">
                      {loginUserData.isCollegeStudent ? "大学生" : "高校生"}
                    </p>
                    <p className="text-sm">{loginUserData.email}</p>
                  </div>
                </li>
                <li className="px-2 border-l-2 border-gray-300">
                  <button className="block" onClick={handleBellClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="block w-10 h-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </header>
    </div>
  );
});
Header.displayName = "Header";
