import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { loginUserVar } from "src/apollo/cache";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
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
                <Image src="/images/logo.png" width={200} height={70} className="object-cover" />
              </a>
            </Link>
          </div>
          <ul className="flex items-center">
            {/* ログインしている場合 */}
            {loginUserData.isLogin ? (
              <>
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
                    <p className="text-sm">
                      {loginUserData.isCollegeStudent ? "大学生" : "高校生"}
                    </p>
                    <p className="md:text-sm text-xs">{loginUserData.email}</p>
                  </div>
                </li>
                {/* 通知 */}
                <li className="px-4 border-l-2 border-gray-300">
                  <NotificationButton />
                </li>
              </>
            ) : (
              <>
                {/* ログインしていない場合 */}
                <li className="mx-4">
                  <Link href="/auth/signin">
                    <a className="text-blue-700 ">ログイン</a>
                  </Link>
                </li>
                <li className="mx-4">
                  <Link href="/auth/signup">
                    <a className="py-3 px-8 font-bold text-white bg-blue-700 rounded-3xl">
                      新規登録
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* スマホ時 */}
        <nav className="flex md:hidden items-center relative">
          {/* <Link href="/">
            <a className="flex w-1/3">
              <Image
                width={120}
                height={40}
                objectFit="cover"
                className="block"
                src="/images/logo.png"
              />
            </a>
          </Link> */}
          <h2 className="font-bold text-center w-full py-2 text-xl text-gray-700">
            {props.spHeaderTitle}
          </h2>
          <Link href="/settings">
            <a className="block absolute right-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </Link>
        </nav>
      </header>
      {/* スマホ時 */}
      <BottomNavigation
        isLogin={loginUserData.isLogin}
        isCollegeStudent={loginUserData.isCollegeStudent}
      />
    </div>
  );
});
Header.displayName = "Header";
