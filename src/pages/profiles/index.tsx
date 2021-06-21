import type { NextPage } from "next";
import Link from "next/link";
import { useGetLoginUserReviewsQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/useSetLoginUserData";

const ProfilesIndex: NextPage = () => {
  const { loginUserData } = useSetLoginUserData();
  const { data: reviewData } = useGetLoginUserReviewsQuery();

  return (
    <div>
      <Layout metaTitle="settings">
        <section className="pt-6">
          {/* 枠 */}
          <div className="md:flex items-center p-4 border shadow-md">
            {/* 左 */}
            <div className="flex items-center md:w-1/2 w-full md:border-r">
              <ProfileImageIcon
                className="block object-cover mx-6 md:w-32 md:h-32 w-10 h-10 rounded-full border"
                profileImagePath={loginUserData.profileImage}
              />

              <div>
                <p>{loginUserData.email}</p>
                <p>{loginUserData.schoolName}</p>
              </div>
            </div>
            {/* 右 */}
            <div className="hidden md:flex flex-col justify-center w-1/2 h-16 font-bold text-center">
              <h3>
                {" "}
                {loginUserData.isCollegeStudent
                  ? "これまでに相談したコウハイの数"
                  : "これまでに相談したセンパイの数"}{" "}
              </h3>
              <p>{loginUserData.stars.length.toString()}</p>
            </div>
          </div>
        </section>
        <section className="py-10">
          <ul>
            <li>
              ユーザー名：{loginUserData.profileName === "" ? "未設定" : loginUserData.profileName}
            </li>
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
      </Layout>
    </div>
  );
};

export default ProfilesIndex;
