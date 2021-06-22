import Link from "next/link";
import { NotificationButton } from "src/components/layouts/NotificationButton";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";

type Props = {
  isLogin: boolean;
  isCollegeStudent: boolean;
};
export const BottomNavigation: React.VFC<Props> = (props) => {
  return (
    <div>
      {/* スマホ時 */}
      <nav className="md:hidden fixed border py-2 bottom-0 w-full z-50 bg-white">
        {/* ログイン時 */}
        {props.isLogin ? (
          <ul className="flex items-center justify-around">
            {/* ホーム */}
            <li className="w-1/5">
              <Link href="/">
                <a className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="block text-xs text-gray-600">ホーム</span>
                </a>
              </Link>
            </li>
            {/* メッセージ */}
            <li className="w-1/5">
              <Link href="/talk">
                <a className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                  <span className="block text-xs text-gray-600">メッセージ</span>
                </a>
              </Link>
            </li>
            {/* 中央 */}
            {props.isCollegeStudent ? (
              <li className="w-1/5 relative">
                <Link href="/">
                  <a className="flex flex-col items-center justify-center bg-blue-600 rounded-full w-20 h-20 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="block text-xs text-white">プラン作成</span>
                  </a>
                </Link>
              </li>
            ) : (
              <li className="w-1/5 relative">
                <Link href="/">
                  <a className="flex flex-col items-center justify-center bg-blue-600 rounded-full w-20 h-20 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="block text-xs text-white">検索</span>
                  </a>
                </Link>
              </li>
            )}

            {/* お知らせ */}
            <li className="w-1/5">
              <NotificationButton />
            </li>
            {/* プロフィール */}
            <li className="w-1/5">
              <Link href="/profiles">
                <a className="flex flex-col items-center">
                  <ProfileImageIcon className="w-6 h-6" profileImagePath="" />
                  <span className="block text-xs text-gray-600">プロフィール</span>
                </a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center justify-around">
            <li>
              <Link href="/auth/signin">
                <a className="block py-2 px-6 rounded-3xl border-2 border-blue-600 text-blue-600 font-bold">
                  ログイン
                </a>
              </Link>
            </li>
            <li>
              <Link href="/auth/signup">
                <a className="block py-2 px-6 rounded-3xl border bg-blue-600 text-white font-bold">
                  新規登録
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
