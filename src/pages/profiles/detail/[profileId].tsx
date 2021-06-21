import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { loginUserVar } from "src/apollo/cache";
import {
  useCreateTalkRoomMutation,
  useGetLoginUserJoinTalkRoomQuery,
  useGetProfileQuery,
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";

const ProfileDetail: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);

  // 開いてる相手のプロフィールのIDからデータを取得
  const router = useRouter();
  const opponentProfileId = router.asPath.replace("/profiles/detail/", "");
  const { data: profileData, loading: isLoading } = useGetProfileQuery({
    variables: { profileId: opponentProfileId },
  });

  const opponentUserId = profileData?.profile?.targetUser.id
    ? profileData.profile.targetUser.id
    : "";

  const { data: joinTalkRoomsData } = useGetLoginUserJoinTalkRoomQuery({
    variables: {
      loginUserId: loginUserData.userId,
    },
  });

  const [createTalkRoomMutation] = useCreateTalkRoomMutation();

  // TODO: リファクタ＆自分にも作れるから修正＆成功後、失敗後のハンドリング

  // 相手と自分が含まれているトークルームがなければ作成
  // 自分が参加しているTalkRoomsの中に相手のユーザーIDがあればトークルームは作成せず、なければ作成
  const handleTalkRoomCreate = async () => {
    if (!loginUserData.isLogin) {
      alert("ログインが必要です。");
      return;
    }
    // ログインユーザーが参加してるトークルームのユーザーID（自分含む）
    const userIds = joinTalkRoomsData?.allTalkRooms?.edges.map((talkRoom) => {
      return talkRoom?.node?.joinUsers.edges.map((user) => {
        return user?.node?.id;
      });
    });
    // ログインユーザーが参加してるトークルームの相手のユーザーID
    const loginUserTalkRoomOpponentUserIds = userIds?.map((user) => {
      if (user) {
        const newArry = user.filter((item) => {
          return item && !item.match(loginUserData.userId);
        });
        return newArry;
      }
    });

    // ログインユーザーが参加しているトークルームの相手のユーザーIDと、開いてるページのユーザーIDがマッチするかを検証
    const validateArray = loginUserTalkRoomOpponentUserIds?.map((userId) => {
      return userId ? (userId[0]?.match(opponentUserId) ? true : false) : "";
    });

    // すでにトークルームが存在する場合はトーク画面へ遷移
    if (validateArray?.includes(true)) {
      router.push("/talk");
      return;
    } else {
      await createTalkRoomMutation({
        variables: {
          loginUserId: loginUserData.userId,
          opponentUserId: opponentUserId,
          talkRoomDescription: `${loginUserData.profileName} & ${profileData?.profile?.profileName}`,
        },
      });
      router.push("/talk");
    }
  };

  return (
    <Layout metaTitle={`${profileData?.profile?.profileName} のプロフィール`}>
      <h2 className="py-4 text-3xl text-center">Profile Detail</h2>

      {isLoading && (
        <div className="flex items-center p-4 border shadow-md">
          {/* 左 */}
          <div className="flex items-center w-1/2 border-r">
            <div className="mx-6 w-32 h-32 bg-gray-100 rounded-full border animate-pulse"></div>
            <div>
              <div className="my-2 w-52 h-6 bg-gray-100 animate-pulse"></div>
              <div className="my-2 w-52 h-6 bg-gray-100 animate-pulse"></div>
            </div>
          </div>
          {/* 右 */}
          <div className="flex flex-col justify-center w-1/2 h-16 font-bold text-center">
            <h3 className="text-2xl">
              {profileData?.profile?.isCollegeStudent
                ? "これまでに相談したコウハイの数"
                : "これまでに相談したセンパイの数"}
            </h3>
            <p>{profileData?.profile?.targetUser.provider.edges.length.toString()}</p>
          </div>
        </div>
      )}

      {profileData?.profile && (
        <div>
          <section>
            {/* 上部のプロフィールバー */}
            <div className="flex items-center p-4 border shadow-md">
              {/* 左 */}
              <div className="flex items-center w-1/2 border-r">
                <ProfileImageIcon
                  profileImagePath={profileData.profile.profileImage}
                  className="block object-cover mx-6 w-32 h-32 rounded-full border"
                />

                <div>
                  <p>{profileData.profile.profileName}</p>
                  <p>{profileData.profile.schoolName}</p>
                </div>
              </div>
              {/* 右 */}
              <div className="flex flex-col justify-center w-1/2 h-16 font-bold text-center">
                <h3 className="text-2xl">これまでに相談したセンパイの数</h3>
                <p>{profileData.profile.targetUser.provider.edges.length.toString()}</p>
              </div>
            </div>
          </section>
          {/* トーク開始を促すボタン */}
          <div>
            {loginUserData.profileId === opponentProfileId ? (
              "自分のプロフィールです"
            ) : (
              <button className="block p-2 border" onClick={handleTalkRoomCreate}>
                メッセージを送る
              </button>
            )}
          </div>
          <section>
            <ul className="py-6">
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.profileText}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.age} 歳
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.undergraduate}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.department}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.clubActivities}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.favoriteSubject}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.wantHear}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {profileData.profile.problem}
              </li>
            </ul>
          </section>
          <section className="py-10">
            <h2 className="text-center text-xl font-bold">レビュー一覧</h2>
            {profileData.profile.targetUser.provider.edges.map((review, index) => {
              return (
                <div key={index} className="my-4 flex items-center border-b">
                  <div>
                    <ProfileImageIcon
                      profileImagePath={review?.node?.customer.targetUser?.profileImage}
                      className="block border rounded-full w-20 h-20 object-cover"
                    />
                    <p>{review?.node?.customer.targetUser?.profileName}</p>
                  </div>
                  <div>
                    <div>{review?.node?.reviewText}</div>
                    <div>{review?.node?.stars.toString()}</div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )}
    </Layout>
  );
};

export default ProfileDetail;
