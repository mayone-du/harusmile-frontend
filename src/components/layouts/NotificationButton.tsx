import { useState } from "react";
import Modal from "react-modal";
import {
  useGetLoginUserNotificationQuery,
  useUpdateNotificationsMutation,
} from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { fixDateFormat } from "src/libs/fixDateFormat";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

export const NotificationButton: React.VFC = () => {
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

  // 本番時のみ5秒ごとにポーリング
  const { data: notificationsData } = useGetLoginUserNotificationQuery({
    fetchPolicy: "network-only",
    pollInterval: process.env.NODE_ENV === "development" ? 1000 * 60 : 1000 * 5,
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
      alert(error);
    }
  };
  return (
    <div>
      <button
        className={`md:block w-full flex flex-col items-center relative focus:outline-none`}
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
        <span className="block text-xs text-gray-600">お知らせ</span>
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
          {notificationsData?.loginUserNotifications?.edges.map((notification, index) => {
            return (
              <li key={index} className="border-b border-gray-300 flex h-10 px-2 items-center">
                <ProfileImageIcon
                  className="border rounded-full object-cover w-8 h-8"
                  profileImagePath={notification?.node?.notificator?.targetUser?.profileImage}
                />

                <p className="text-sm">
                  <span className="font-bold">
                    {notification?.node?.notificator.targetUser?.profileName}
                  </span>
                  さんが
                  <span className="font-bold">{notification?.node?.notificationType}</span>
                  をしました。
                  <span className="text-xs text-gray-700">
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
