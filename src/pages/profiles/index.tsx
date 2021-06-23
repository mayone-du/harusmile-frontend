import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useGetLoginUserPlansQuery, useGetLoginUserReviewsQuery } from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { Layout } from "src/components/layouts/Layout";
import { NormalProfile } from "src/components/profiles/NormalProfile";
import { Plan } from "src/components/profiles/Plan";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/useSetLoginUserData";

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

        <div>
          {/* プラン一覧 */}
          {/* ユーザーが大学生ならプランとレビューを表示 */}
          {loginUserData.isCollegeStudent && (
            <div>
              <section>
                <div className="flex items-center justify-between bg-gray-200">
                  <p className="px-2 text-gray-600 text-sm">プラン一覧</p>
                  <Link href="/">
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
                <div>
                  {/* レビューがある場合 */}
                  {reviewData?.loginUserReviews?.edges &&
                  reviewData.loginUserReviews.edges.length > 0 ? (
                    reviewData.loginUserReviews.edges.map((review, index) => {
                      return (
                        <div key={index} className="border my-4 flex items-center">
                          <div>
                            <ProfileImageIcon
                              profileImagePath={review?.node?.customer.targetUser?.profileImage}
                              className="border rounded-full w-20 h-20"
                            />
                            <div className="font-bold text-lg">
                              {review?.node?.customer.targetUser?.profileName}
                            </div>
                          </div>
                          <div>
                            <div>{review?.node?.reviewText}</div>
                            <div>{review?.node?.stars.toString()}</div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div>レビューはまだありません</div>
                  )}
                </div>
              </section>
            </div>
          )}
          {loginUserData.isLogin && (
            <div className="flex items-center justify-center px-2 my-10 mx-4">
              <Link href="/auth/signout">
                <a className="p-2 border rounded-sm ">ログアウト</a>
              </Link>
            </div>
          )}
          <div className="py-6">
            <ThemeChanger />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProfilesIndex;
