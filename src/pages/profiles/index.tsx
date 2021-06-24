import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useGetLoginUserPlansQuery, useGetLoginUserReviewsQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { Plan } from "src/components/plans/Plan";
import { NormalProfile } from "src/components/profiles/NormalProfile";
import { Review } from "src/components/reviews/Review";
import { useSetLoginUserData } from "src/libs/hooks/users/useSetLoginUserData";

const ProfilesIndex: NextPage = () => {
  const router = useRouter();
  const { loginUserData } = useSetLoginUserData();
  const { data: reviewData } = useGetLoginUserReviewsQuery();
  const { data: plansData } = useGetLoginUserPlansQuery();
  const cookies = parseCookies();
  useEffect(() => {
    if (!cookies.refreshToken) {
      alert("ログイン後に使用可能です。");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Layout spHeaderTitle="プロフィール" metaTitle="ハルスマイル | プロフィール">
        <section className="pt-6">
          <NormalProfile
            targetProfileId={loginUserData.profileId}
            targetProfileName={loginUserData.profileName}
            targetProfileText={loginUserData.profileText}
            targetProfileImage={loginUserData.profileImage}
            targetSchoolName={loginUserData.schoolName}
            targetAge={loginUserData.age}
            targetUndergraduate={loginUserData.undergraduate}
            targetDepartment={loginUserData.department}
            targetClubActivities={loginUserData.clubActivities}
            targetFavoriteSubject={loginUserData.favoriteSubject}
            targetWantHear={loginUserData.wantHear}
            targetProblem={loginUserData.problem}
          />
        </section>

        <div className="pb-10">
          {/* プラン一覧 */}
          {/* ユーザーが大学生ならプランとレビューを表示 */}
          {loginUserData.isCollegeStudent && (
            <div>
              <section className="py-10">
                <div className="flex items-center justify-between bg-gray-200">
                  <p className="px-2 text-gray-600 text-sm">プラン一覧</p>
                  <Link href="/plans">
                    <a className="py-2 px-4 text-white text-sm bg-pink-400">編集</a>
                  </Link>
                </div>
                <ul>
                  {plansData?.loginUserPlans && plansData.loginUserPlans.edges.length > 0 ? (
                    plansData.loginUserPlans.edges.map((plan, index) => {
                      return (
                        <Plan
                          key={index}
                          planId={plan?.node?.id ? plan.node.id : ""}
                          title={plan?.node?.title ? plan.node.title : ""}
                          content={plan?.node?.content ? plan.node.content : ""}
                          price={plan?.node?.price ? plan.node.price : 0}
                          planImage={plan?.node?.planImage ? plan.node.planImage : ""}
                        />
                      );
                    })
                  ) : (
                    <div>プランはまだ作成していません。</div>
                  )}
                </ul>
              </section>

              {/* レビュー */}
              <section>
                <div className="flex items-center justify-between bg-gray-200">
                  <p className="p-2 text-sm text-gray-600">レビュー一覧</p>
                </div>
                <ul>
                  {/* レビューがある場合 */}
                  {reviewData?.loginUserReviews?.edges &&
                  reviewData.loginUserReviews.edges.length > 0 ? (
                    reviewData.loginUserReviews.edges.map((review, index) => {
                      return (
                        <Review
                          key={index}
                          customerImagePath={review?.node?.customer.targetUser?.profileImage}
                          customerName={
                            review?.node?.customer?.targetUser?.profileName
                              ? review.node.customer.targetUser.profileName
                              : ""
                          }
                          reviewText={review?.node?.reviewText ? review.node.reviewText : ""}
                          reviewStars={review?.node?.stars ? review.node.stars : 0}
                        />
                      );
                    })
                  ) : (
                    <li>レビューはまだありません</li>
                  )}
                </ul>
              </section>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default ProfilesIndex;
