import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { loginUserVar } from "src/apollo/cache";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { SettingSvg } from "src/components/icons/svgs/SettingSvg";
import { TalkSvg } from "src/components/icons/svgs/TalkSvg";
import { BottomNavigation } from "src/components/layouts/BottomNavigation";
import { NotificationButton } from "src/components/layouts/NotificationButton";

type Props = {
  profileImagePath: string;
  spHeaderTitle: string;
};
export const Header: React.VFC<Props> = memo((props) => {
  const loginUserData = useReactiveVar(loginUserVar);

  return (
    <div>
      <header className="px-2 md:px-32 md:py-0 py-2 border-b shadow-md">
        {/* PC時 */}
        <nav className="md:flex hidden justify-between items-center">
          <div className="mx-2">
            <Link href="/">
              <a>
                <Image src="/images/logo.png" width={235} height={50} objectFit="cover" />
              </a>
            </Link>
          </div>

          {/* ローディング中は非表示 */}
          {/* ログインしていない場合 */}
          {!loginUserData.isLogin && !loginUserData.isLoading && (
            <ul className="h-16">
              <li className="mx-4">
                <Link href="/auth/signin">
                  <a className="text-blue-700 ">ログイン</a>
                </Link>
              </li>
              <li className="mx-4">
                <Link href="/auth/signup">
                  <a className="py-3 px-8 font-bold text-white bg-blue-700 rounded-3xl">新規登録</a>
                </Link>
              </li>
            </ul>
          )}

          {/* ログインしている場合 */}
          {loginUserData.isLogin && !loginUserData.isLoading && (
            <ul className="flex items-center">
              <li className="flex items-center px-2 md:mx-4 mx-2">
                <Link href="/talks">
                  <a className="flex items-center">
                    <div className="px-2 hidden md:block">トーク画面</div>
                    <TalkSvg className="h-10 w-10 text-white" />
                  </a>
                </Link>
              </li>

              <li className="flex items-center px-2 md:mx-4 mx-2">
                <Link href="/settings">
                  <a>
                    <ProfileImageIcon
                      profileImagePath={props.profileImagePath}
                      className="block object-cover mx-2 md:w-10 md:h-10 w-6 h-6 rounded-full border"
                    />
                  </a>
                </Link>
                <div className="md:block hidden">
                  <p className="text-sm">{loginUserData.isCollegeStudent ? "大学生" : "高校生"}</p>
                  <p className="md:text-sm text-xs">{loginUserData.email}</p>
                </div>
              </li>
              {/* 通知 */}
              <li className="px-4 border-l-2 border-gray-300">
                <NotificationButton />
              </li>
            </ul>
          )}
        </nav>

        {/* スマホ時 */}
        <nav className="flex md:hidden items-center relative">
          <Link href="/">
            <a className="block w-10 h-10 absolute left-2">
              <Image
                width={256}
                height={256}
                objectFit="cover"
                className="block"
                src="/images/logo-icon.png"
              />
            </a>
          </Link>
          <h2 className="font-bold dark:text-white text-center w-full py-2 text-xl text-gray-700">
            {props.spHeaderTitle}
          </h2>
          {loginUserData.isLogin && (
            <Link href="/settings">
              <a className="block absolute right-2">
                <SettingSvg className="w-8 h-8" />
              </a>
            </Link>
          )}
        </nav>
      </header>
      {/* スマホ時 */}
      <BottomNavigation
        isLoading={loginUserData.isLoading}
        isLogin={loginUserData.isLogin}
        isCollegeStudent={loginUserData.isCollegeStudent}
        profileImagePath={loginUserData.profileImage}
      />
    </div>
  );
});
Header.displayName = "Header";
