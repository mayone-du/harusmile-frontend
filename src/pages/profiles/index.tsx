import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useGetLoginUserReviewsQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/useSetLoginUserData";

const ProfilesIndex: NextPage = () => {
  const router = useRouter();
  const { loginUserData } = useSetLoginUserData();
  const { data: reviewData } = useGetLoginUserReviewsQuery();
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
          <div className="flex items-center justify-between bg-gray-200">
            <p className="px-2">基本情報</p>
            <Link href="/settings">
              <a className="px-2 bg-pink-400">編集</a>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <ProfileImageIcon profileImagePath="" className="w-20 h-20" />
            <div>
              <h3>{loginUserData.profileName}</h3>
              <h4>{loginUserData.schoolName}</h4>
              <p>{loginUserData.age}</p>
            </div>
          </div>
          <div className="border my-4">
            <h4 className="text-center font-bold py-2">一言コメント</h4>
            <p>{loginUserData.profileText}</p>
          </div>
        </section>

        {!loginUserData.isCollegeStudent && (
          <div>
            {/* プラン一覧 */}
            <section>
              <div className="flex items-center justify-between bg-gray-200">
                <p className="px-2">プラン一覧</p>
                <Link href="/">
                  <a className="px-2 bg-pink-400">編集</a>
                </Link>
              </div>
              <ul>
                <li className="bg-blue-500">プラン１</li>
                <li className="bg-pink-400">プラン２</li>
                <li className="bg-pink-400">プラン３</li>
              </ul>
            </section>
            {/* レビュー */}
            <section>
              <h2 className="text-2xl font-bold text-center">レビュー</h2>
              <div>
                {reviewData?.loginUserReviews?.edges.map((review, index) => {
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
                })}
              </div>
            </section>
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
        )}
      </Layout>
    </div>
  );
};

export default ProfilesIndex;
