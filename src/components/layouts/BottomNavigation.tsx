import Link from "next/link";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { HomeSvg } from "src/components/icons/svgs/HomeSvg";
import { SearchSvg } from "src/components/icons/svgs/SearchSvg";
import { TalkSvg } from "src/components/icons/svgs/TalkSvg";
import { CreatePlanButton } from "src/components/layouts/CreatePlanButton";
import { NotificationButton } from "src/components/layouts/NotificationButton";
import { BottomNavigationLoading } from "src/components/loadings/BottomNavigationLoading";

type Props = {
  isLoading: boolean;
  isLogin: boolean;
  isCollegeStudent: boolean;
  profileImagePath: string;
};
export const BottomNavigation: React.VFC<Props> = (props) => {
  // スマホ時

  return (
    <div>
      <nav className="md:hidden fixed border-t border-b bottom-0 w-full z-10 bg-white">
        {/* ローディング */}
        {props.isLoading && <BottomNavigationLoading />}

        {/* 非ログイン時 */}
        {!props.isLogin && !props.isLoading && (
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

        {/* ログイン時 */}
        {props.isLogin && !props.isLoading && (
          <ul className="flex items-center justify-around py-2">
            {/* ホーム */}
            <li className="w-1/5">
              <Link href="/">
                <a className={`flex flex-col items-center`}>
                  <HomeSvg className="h-6 w-6" />
                  <span className="block text-xs text-gray-600">ホーム</span>
                </a>
              </Link>
            </li>
            {/* メッセージ */}
            <li className="w-1/5">
              <Link href="/talks">
                <a className="flex flex-col items-center">
                  <TalkSvg className="h-6 w-6" />
                  <span className="block text-xs text-gray-600">メッセージ</span>
                </a>
              </Link>
            </li>
            {/* 中央 */}
            {props.isCollegeStudent ? (
              <li className="w-1/5 relative">
                <CreatePlanButton />
              </li>
            ) : (
              <li className="w-1/5 relative">
                <Link href="/">
                  <a className="flex flex-col items-center justify-center bg-blue-600 rounded-full w-20 h-20 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-md">
                    <SearchSvg className="h-10 w-10 text-white" />
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
                  <ProfileImageIcon
                    className="w-6 h-6 rounded-full object-cover"
                    profileImagePath={props.profileImagePath}
                  />
                  <span className="block text-xs text-gray-600">マイページ</span>
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
