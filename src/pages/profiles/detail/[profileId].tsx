import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useGetProfileQuery } from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { Layout } from "src/components/layouts/Layout";
import { NormalProfile } from "src/components/profiles/NormalProfile";
import { Plan } from "src/components/profiles/Plan";

const ProfileDetail: NextPage = () => {
  // 開いてる相手のプロフィールのIDからデータを取得
  const router = useRouter();
  const targetProfileId = router.asPath.replace("/profiles/detail/", "");
  const { data: profileData, loading: isLoading } = useGetProfileQuery({
    variables: { profileId: targetProfileId },
  });

  return (
    <Layout
      spHeaderTitle="プロフィール詳細"
      metaTitle={`${profileData?.profile?.profileName} のプロフィール`}
    >
      {/* スケルトンローディング */}
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
          <section className="py-4">
            <NormalProfile
              targetProfileId={targetProfileId}
              targetProfileName={profileData.profile.profileName}
              targetProfileText={profileData.profile.profileText}
              targetSchoolName={profileData.profile.schoolName}
              targetAge={profileData.profile.age ? profileData.profile.age : 0}
              targetUndergraduate={
                profileData?.profile?.undergraduate ? profileData.profile.undergraduate : ""
              }
              targetDepartment={
                profileData?.profile?.department ? profileData.profile.department : ""
              }
              targetClubActivities={
                profileData?.profile?.clubActivities ? profileData.profile.clubActivities : ""
              }
              targetFavoriteSubject={
                profileData?.profile?.favoriteSubject ? profileData.profile.favoriteSubject : ""
              }
              targetWantHear={profileData?.profile?.wantHear ? profileData.profile.wantHear : ""}
              targetProblem={profileData?.profile?.problem ? profileData.profile.problem : ""}
            />
          </section>

          {/* プラン一覧 */}
          <section className="py-10">
            <h2 className="bg-gray-200 p-2 text-sm">プラン一覧</h2>
            <div>
              <ul>
                {profileData.profile.targetUser.planAuthor.edges ? (
                  profileData.profile.targetUser.planAuthor.edges.map((plan, index) => {
                    return (
                      plan?.node && (
                        <Plan
                          key={index}
                          planId={plan.node.id}
                          title={plan.node.title}
                          content={plan.node.content}
                          price={plan.node.price}
                          planImage={plan.node.planImage ? plan.node.planImage : ""}
                        />
                      )
                    );
                  })
                ) : (
                  <div>no plans</div>
                )}
              </ul>
            </div>
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
