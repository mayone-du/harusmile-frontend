import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback } from "react";
import { useState } from "react";
import Modal from "react-modal";
import { CreatePlanButton } from "src/components/buttons/CreatePlanButton";
import { SearchButton } from "src/components/buttons/SearchButton";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { HomeSvg } from "src/components/icons/svgs/HomeSvg";
import { SearchSvg } from "src/components/icons/svgs/SearchSvg";
import { TalkSvg } from "src/components/icons/svgs/TalkSvg";
import { BottomNavigationLoading } from "src/components/layouts/BottomNavigationLoading";
import { NotificationButton } from "src/components/layouts/NotificationButton";
import { SearchBox } from "src/components/SearchBox";

type Props = {
  isLoading: boolean;
  isLogin: boolean;
  isCollegeStudent: boolean;
  profileImagePath: string;
};

// スマホの下タブ
export const BottomNavigation: React.VFC<Props> = (props) => {
  const router = useRouter();
  const currentPath = router.pathname;

  // 検索モーダルの開閉
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const handleClickModalOpen = useCallback(() => {
    setIsSearchModalOpen((prev) => {
      return !prev;
    });
  }, []);
  const handleModalClose = useCallback(() => {
    setIsSearchModalOpen(false);
  }, []);

  // ローディング中
  if (props.isLoading) {
    return (
      <nav className="md:hidden fixed border-t border-b dark:border-b-0 bottom-0 w-full z-10 bg-white">
        {props.isLoading && <BottomNavigationLoading />}
      </nav>
    );
  }
  return (
    <div>
      <nav className="md:hidden fixed border-t border-b dark:border-b-0 bottom-0 w-full z-10 bg-white dark:bg-black">
        {/* 非ログイン時 */}
        {!props.isLogin && !props.isLoading && (
          <ul className="flex items-center justify-around pt-2 pb-4">
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
          <ul className="flex items-center justify-around pt-2 pb-4">
            {/* ホーム */}
            <li className="w-1/5">
              <Link href="/">
                <a className={`flex flex-col items-center`}>
                  <HomeSvg
                    className={`h-6 w-6
                      ${currentPath === "/" && "text-yellow-500"}
                  `}
                  />
                  <span
                    className={`block text-xs text-gray-600 dark:text-white ${
                      currentPath === "/" && "text-yellow-500"
                    }`}
                  >
                    ホーム
                  </span>
                </a>
              </Link>
            </li>
            {/* メッセージ */}
            <li className="w-1/5">
              <Link href="/talks">
                <a className={`flex flex-col items-center`}>
                  <TalkSvg
                    className={`h-6 w-6 
                      ${currentPath === "/talks" && "text-yellow-500"}
                  `}
                  />
                  <span
                    className={`block text-xs text-gray-600 dark:text-white ${
                      currentPath === "/talks" && "text-yellow-500"
                    }`}
                  >
                    メッセージ
                  </span>
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
                {/* 検索 */}
                <SearchButton onClick={handleClickModalOpen}>
                  <div className="flex flex-col items-center justify-center">
                    <SearchSvg className="h-10 w-10 text-white" />
                    <span className="block text-xs text-white">検索</span>
                  </div>
                </SearchButton>
                {/* <button
                  onClick={handleClickModalOpen}
                  className="flex flex-col items-center justify-center bg-blue-600 rounded-full w-20 h-20 absolute -top-16 left-1/2 transform -translate-x-1/2 shadow-md"
                >
                  <SearchSvg className="h-10 w-10 text-white" />
                  <span className="block text-xs text-white">検索</span>
                </button> */}
                <Modal
                  isOpen={isSearchModalOpen}
                  onRequestClose={handleModalClose}
                  className="dark:bg-gray-700 absolute top-20 p-4 md:w-96 w-5/6 rounded-md left-1/2 transform -translate-x-1/2 bg-white border"
                  contentLabel={`Search Modal`}
                  ariaHideApp={false}
                >
                  <div>
                    <SearchBox />
                  </div>
                </Modal>
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
                    className={`w-6 h-6 rounded-full object-cover
                      ${currentPath === "/profiles" && "text-yellow-500"}
                    `}
                    profileImagePath={props.profileImagePath}
                  />
                  <span
                    className={`block text-xs text-gray-600 dark:text-white
                  ${currentPath === "/profiles" && "text-yellow-500"}
                  `}
                  >
                    マイページ
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
