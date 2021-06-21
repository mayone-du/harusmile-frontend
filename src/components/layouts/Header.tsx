import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import Modal from "react-modal";
import { loginUserVar } from "src/apollo/cache";
import {
  useGetLoginUserNotificationQuery,
  useUpdateNotificationsMutation,
} from "src/apollo/schema";
import { BottomNavigation } from "src/components/layouts/BottomNavigation";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

type Props = {
  profileImagePath: string;
};
export const Header: React.VFC<Props> = memo((props) => {
  const loginUserData = useReactiveVar(loginUserVar);

  // モーダル用style
  const customStyles = {
    content: {
      top: "8.2%",
      left: "auto",
      right: "8%",
      bottom: "auto",
      width: "300px",
    },
    overlay: {
      background: "rgba(255, 255, 255, 0.2)",
    },
  };

  const { data: notificationsData } = useGetLoginUserNotificationQuery({
    fetchPolicy: "network-only",
    pollInterval: 1000 * 5,
  });
  const [updateNotifications] = useUpdateNotificationsMutation();
  const { handleRefreshToken } = useRefreshTokens();
  // 通知用モーダル
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleBellClick = () => {
    setIsNotificationOpen(true);
  };

  // 通知モーダルを閉じるときに更新
  const handleNotificationClose = async () => {
    setIsNotificationOpen(false);
    // 未読の通知があれば更新する
    if (notificationsData?.loginUserNotifications === undefined) return;
    if (notificationsData.loginUserNotifications?.edges.length === 0) return;
    try {
      await handleRefreshToken();
      await updateNotifications({
        variables: {
          notificationIds: notificationsData?.loginUserNotifications
            ? notificationsData.loginUserNotifications.edges.map((notification) => {
                return notification?.node ? notification?.node?.id : "";
              })
            : "",
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <header className="px-2 md:px-32 border-b shadow-md">
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
                  <Link href="/talk">
                    <a className="flex items-center">
                      <div className="px-2 hidden md:block">トーク画面</div>
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
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
                <li className="px-4 border-l-2 border-gray-300">
                  <button className="block relative focus:outline-none" onClick={handleBellClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="block md:w-10 md:h-10 w-6 h-6"
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
                    {/* 通知マーク */}
                    {notificationsData?.loginUserNotifications &&
                      notificationsData.loginUserNotifications.edges.length > 0 && (
                        <div className="absolute w-2 h-2 bg-red-500 rounded-full top-0 right-0"></div>
                      )}
                  </button>
                  {/* 通知用モーダル */}
                  <Modal
                    isOpen={isNotificationOpen}
                    onRequestClose={handleNotificationClose}
                    style={customStyles}
                    contentLabel={`Notification Modal`}
                    ariaHideApp={false}
                  >
                    {/* 通知を表示 */}
                    <ul>
                      {/* {<li className="animate-pulse bg-gray-200 w-full h-10"></li>} */}
                      {notificationsData?.loginUserNotifications?.edges.length === 0 && (
                        <li className="border-b border-gray-300 flex h-10 px-2 items-center">
                          通知はありません。
                        </li>
                      )}
                      {notificationsData?.loginUserNotifications?.edges.map(
                        (notification, index) => {
                          return (
                            <li
                              key={index}
                              className="border-b border-gray-300 flex h-10 px-2 items-center"
                            >
                              <ProfileImageIcon
                                className="border rounded-full object-cover w-8 h-8"
                                profileImagePath={
                                  notification?.node?.notificator?.targetUser?.profileImage
                                }
                              />

                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification?.node?.notificator.targetUser?.profileName}
                                </span>
                                さんが
                                <span className="font-bold">
                                  {notification?.node?.notificationType}
                                </span>
                                をしました。
                                <span className="text-xs text-gray-700">
                                  {fixDateFormat(notification?.node?.createdAt)}
                                </span>
                              </p>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </Modal>
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
        <nav className="flex md:hidden items-center">
          <Link href="/">
            <a className="flex">
              <Image
                width={120}
                height={40}
                objectFit="cover"
                className="block"
                src="/images/logo.png"
              />
            </a>
          </Link>
          <h2>ページタイトル</h2>
          <Link href="/settings">
            <a className="block">
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
      <BottomNavigation isLogin={loginUserData.isLogin} />
    </div>
  );
});
Header.displayName = "Header";
