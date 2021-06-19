import { useReactiveVar } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import Modal from "react-modal";
import { loginUserVar } from "src/apollo/cache";
import {
  useGetLoginUserNotificationQuery,
  useUpdateNotificationsMutation,
} from "src/apollo/schema";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

type Props = {
  profileImagePath: string;
};
export const Header: React.VFC<Props> = memo((props) => {
  const loginUserData = useReactiveVar(loginUserVar);

  // 通知用モーダル
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
  };

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
    pollInterval: 1000 * 60,
  });
  const [updateNotifications] = useUpdateNotificationsMutation();

  // TODO: tokenの検証、通知確認後の処理
  const handleBellClick = async () => {
    setIsNotificationOpen(true);

    // 未読の通知があれば更新する
    if (notificationsData?.loginUserNotifications === undefined) return;
    if (notificationsData.loginUserNotifications?.edges.length === 0) return;
    try {
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
        <nav className="flex justify-between items-center">
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
                <li className="flex items-center px-2 mx-4">
                  <Link href="/talk">
                    <a className="flex items-center">
                      <div className="px-2">トーク画面</div>
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

                <li className="flex items-center px-2 mx-4">
                  <Link href="/settings">
                    <a>
                      {/* プロフ画像の設定の有無によって分ける */}
                      {props.profileImagePath ? (
                        <div>
                          <img
                            src={`${MEDIAFILE_API_ENDPOINT}${props.profileImagePath}`}
                            alt="Profile"
                            className="block object-cover mx-2 w-10 h-10 rounded-full border border-gray-500"
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
                <li className="px-4 border-l-2 border-gray-300">
                  <button className="block relative focus:outline-none" onClick={handleBellClick}>
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
                    {/* 通知のアニメーション */}
                    {notificationsData?.loginUserNotifications?.edges.length !== 0 && (
                      <div className="absolute w-2 h-2 animate-ping bg-red-500 rounded-full top-0 right-0"></div>
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
                              {notification?.node?.notificator.targetUser?.profileImage ? (
                                <img
                                  src={`${MEDIAFILE_API_ENDPOINT}${notification?.node?.notificator.targetUser?.profileImage}`}
                                  alt=""
                                  className="border rounded-full object-cover w-8 h-8"
                                />
                              ) : (
                                <div className="border rounded-full object-cover w-8 h-8">none</div>
                              )}

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
      </header>
    </div>
  );
});
Header.displayName = "Header";
