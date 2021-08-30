import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import {
  useGetLoginUserNotificationQuery,
  useUpdateNotificationsMutation,
} from "src/graphql/apollo/schemas/schema";
import { fixDateFormat } from "src/libs/functions/fixDateFormat";
import { useRefreshTokens } from "src/libs/hooks/auth/useRefreshTokens";

export const NotificationButton: React.VFC = () => {
  // 本番時のみ3秒ごとにポーリング
  const { data: notificationsData } = useGetLoginUserNotificationQuery({
    fetchPolicy: "network-only",
    pollInterval: process.env.NODE_ENV === "development" ? 1000 * 60 : 1000 * 3,
  });
  const [updateNotifications] = useUpdateNotificationsMutation();
  const { handleRefreshToken } = useRefreshTokens();
  // 通知用モーダル
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleBellClick = () => {
    setIsNotificationOpen((prev) => {
      return !prev;
    });
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
      toast.error("何らかのエラーが発生しました。");
      console.error(error);
      return;
    }
  };
  return (
    <div>
      <button
        className={`md:block w-full flex flex-col items-center relative focus:outline-none ${
          isNotificationOpen && "text-yellow-500"
        }`}
        onClick={handleBellClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="md:block md:w-10 md:h-10 w-6 h-6"
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
        <span
          className={`block text-xs text-gray-600 dark:text-white ${
            isNotificationOpen && "text-yellow-500"
          }`}
        >
          お知らせ
        </span>
        {/* 通知マーク */}
        {notificationsData?.loginUserNotifications &&
          notificationsData.loginUserNotifications.edges.length > 0 && (
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-0 md:right-0 right-4"></div>
          )}
      </button>
      {/* 通知用モーダル */}
      <Modal
        isOpen={isNotificationOpen}
        onRequestClose={handleNotificationClose}
        className="dark:bg-gray-700 absolute top-20 p-4 md:w-96 w-5/6 rounded-md left-1/2 transform -translate-x-1/2 bg-white border"
        contentLabel={`Notification Modal`}
        ariaHideApp={false}
      >
        {/* 通知を表示 */}
        <ul className="max-h-80 overflow-y-scroll">
          {/* {<li className="animate-pulse bg-gray-200 w-full h-10"></li>} */}
          {notificationsData?.loginUserNotifications?.edges.length === 0 && (
            <li className="border-b border-gray-300 flex h-10 px-2 items-center">
              通知はありません。
            </li>
          )}
          {notificationsData?.loginUserNotifications?.edges.map((notification, index) => {
            return (
              // 通知の内容
              <li
                key={index}
                className={`border-b border-gray-300 flex w-full h-12 px-1 my-2 items-center relative ${
                  notification?.node?.notificationType === "プラン申し込み" && "bg-pink-200"
                }`}
              >
                <ProfileImageIcon
                  className="border rounded-full object-cover h-10 mx-2 w-1/6"
                  profileImagePath={notification?.node?.notificator?.targetUser?.profileImage}
                />

                <p className="text-sm w-5/6">
                  <span className="font-bold">
                    {notification?.node?.notificator.targetUser?.profileName}
                  </span>
                  さんから
                  <span className="font-bold">{notification?.node?.notificationType}</span>
                  がありました。
                  <span className="text-xs text-gray-500 absolute right-2 bottom-1">
                    {fixDateFormat(notification?.node?.createdAt)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </Modal>
    </div>
  );
};
