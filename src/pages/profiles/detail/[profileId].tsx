import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useGetProfileQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Plan } from "src/components/plans/Plan";
import { NormalProfile } from "src/components/profiles/NormalProfile";
import { ProfileLoading } from "src/components/profiles/ProfileLoading";
import { Review } from "src/components/reviews/Review";

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
      meta={{ pageName: `${profileData?.profile?.profileName} のプロフィール` }}
    >
      {/* スケルトンローディング */}
      {isLoading && <ProfileLoading />}

      {profileData?.profile && (
        <div className="pb-8">
          <section className="py-4">
            <NormalProfile
              targetProfileId={targetProfileId}
              targetProfileName={profileData.profile.profileName}
              targetProfileText={
                profileData.profile.profileText ? profileData.profile.profileText : ""
              }
              targetProfileImage={
                profileData.profile.profileImage ? profileData.profile.profileImage : ""
              }
              targetSchoolName={
                profileData.profile.schoolName ? profileData.profile.schoolName : ""
              }
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
          {profileData.profile.isCollegeStudent && (
            <div>
              <section className="py-10">
                <h2 className="bg-gray-200 p-2 text-sm dark:text-gray-600">プラン一覧</h2>
                <div>
                  <ul>
                    {/* プランがない場合 */}
                    {profileData.profile.targetUser.planAuthor.edges.length === 0 && (
                      <li>プランはまだありません。</li>
                    )}
                    {/* プランがある場合 */}
                    {profileData.profile.targetUser.planAuthor.edges.length !== 0 &&
                      profileData.profile.targetUser.planAuthor.edges &&
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
                      })}
                  </ul>
                </div>
              </section>

              <section className="py-10">
                <h2 className="flex p-2 text-sm items-center justify-between bg-gray-200 dark:text-gray-600">
                  レビュー一覧
                </h2>
                <ul>
                  {/* レビューがない場合 */}
                  {profileData.profile.targetUser.provider.edges.length === 0 && (
                    <li>レビューはまだありません。</li>
                  )}
                  {/* レビューがある場合 */}
                  {profileData.profile.targetUser.provider.edges.length !== 0 &&
                    profileData.profile.targetUser.provider.edges.map((review, index) => {
                      return (
                        <Review
                          key={index}
                          customerImagePath={review?.node?.customer.targetUser?.profileImage}
                          customerName={
                            review?.node?.customer.targetUser?.profileName
                              ? review.node.customer.targetUser.profileName
                              : ""
                          }
                          reviewStars={review?.node?.stars ? review.node.stars : 0}
                          reviewText={review?.node?.reviewText ? review.node.reviewText : ""}
                        />
                      );
                    })}
                </ul>
              </section>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProfileDetail;
