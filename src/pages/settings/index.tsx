import type { NextPage } from "next";
import Link from "next/link";
import {
  useGetAllAdressesQuery,
  useGetAllGendersQuery,
  useGetLoginUserReviewsQuery,
} from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { ProfileImageIcon } from "src/components/ProfileImageIcon";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/useSetLoginUserData";
import { useProfileUpdate } from "src/libs/hooks/useUpdateProfile";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

const Settings: NextPage = () => {
  const { loginUserData } = useSetLoginUserData();
  const { data: allAdressesData } = useGetAllAdressesQuery();
  const { data: allGendersData } = useGetAllGendersQuery();
  const { data: reviewData } = useGetLoginUserReviewsQuery();

  // TODO: プロフィール画像周りのバグ修正

  const {
    inputLoginUserData,
    handleProfileNameChange,
    handleProfileTextChange,
    handleAgeChange,
    handleSchoolNameChange,
    handleTelephoneNumberChange,
    handleUndergraduateChange,
    handleAdmissionFormatChange,
    handleDepartmentChange,
    handleClubActivitiesChange,
    handleFavoriteSubjectChange,
    handleProblemChange,
    handleWantHearChange,
    handleAddressBlur,
    handleGenderBlur,
    handleStudentBlur,
    handleProfileImageChange,
    handleSubmit,
  } = useProfileUpdate();

  return (
    <div>
      <Layout metaTitle="settings">
        <h2 className="py-10 text-3xl text-center">Settings</h2>

        <section>
          {/* 枠 */}
          <div className="flex items-center p-4 border shadow-md">
            {/* 左 */}
            <div className="flex items-center w-1/2 border-r">
              <ProfileImageIcon
                className="block object-cover mx-6 w-32 h-32 rounded-full border"
                profileImagePath={loginUserData.profileImage}
              />

              <div>
                <p>{loginUserData.email}</p>
                <p>{loginUserData.schoolName}</p>
              </div>
            </div>
            {/* 右 */}
            <div className="flex flex-col justify-center w-1/2 h-16 font-bold text-center">
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

        <form onSubmit={handleSubmit}>
          {loginUserData.isLogin ? (
            <ul className="flex">
              <div className="w-full">
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">高校生 or 大学生</div>
                  <select
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.isCollegeStudent.toString()}
                    onChange={handleStudentBlur}
                    onBlur={handleStudentBlur}
                  >
                    <option value={"true"}>大学生</option>
                    <option value={"false"}>高校生</option>
                  </select>
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">ユーザーネーム</div>
                  <input
                    type="text"
                    placeholder="profileName"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.profileName}
                    onChange={handleProfileNameChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">自己紹介文</div>
                  <textarea
                    placeholder="profileText"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none resize-none"
                    value={inputLoginUserData.profileText}
                    onChange={handleProfileTextChange}
                  ></textarea>
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">電話番号</div>
                  <input
                    type="tel"
                    placeholder="telephoneNumber"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.telephoneNumber}
                    onChange={handleTelephoneNumberChange}
                  />
                </li>

                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">住んでいる場所</div>
                  <select
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.addressId}
                    onChange={handleAddressBlur}
                    onBlur={handleAddressBlur}
                  >
                    {allAdressesData?.allAddresses?.edges.map((address) => {
                      return (
                        <option key={address?.node?.id} value={address?.node?.id}>
                          {address?.node?.addressName}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">性別</div>
                  <select
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.genderId}
                    onChange={handleGenderBlur}
                    onBlur={handleGenderBlur}
                  >
                    {allGendersData?.allGenders?.edges.map((gender) => {
                      return (
                        <option key={gender?.node?.id} value={gender?.node?.id}>
                          {gender?.node?.genderName}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">年齢</div>
                  <input
                    type="number"
                    max={50}
                    min={0}
                    placeholder="age"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.age}
                    onChange={handleAgeChange}
                  />
                </li>
              </div>

              <div className="w-full">
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">学校名</div>
                  <input
                    type="text"
                    placeholder="schoolName"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.schoolName}
                    onChange={handleSchoolNameChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">学部</div>
                  <input
                    type="text"
                    placeholder="undergraduate"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.undergraduate}
                    onChange={handleUndergraduateChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">学科</div>
                  <input
                    type="text"
                    placeholder="department"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.department}
                    onChange={handleDepartmentChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">部活動・サークル</div>
                  <input
                    type="text"
                    placeholder="clubActivities"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.clubActivities}
                    onChange={handleClubActivitiesChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">入試形式</div>
                  <input
                    type="text"
                    placeholder="admissionFormat"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.admissionFormat}
                    onChange={handleAdmissionFormatChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">好きな科目</div>
                  <input
                    type="text"
                    placeholder="favoriteSubject"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.favoriteSubject}
                    onChange={handleFavoriteSubjectChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">聞きたいこと</div>
                  <input
                    type="text"
                    placeholder="wantHear"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.wantHear}
                    onChange={handleWantHearChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">悩み</div>
                  <input
                    type="text"
                    placeholder="problem"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.problem}
                    onChange={handleProblemChange}
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <div className="mx-auto w-2/3 text-sm">プロフィール画像</div>
                  <input
                    type="file"
                    placeholder="profileImage"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    onChange={handleProfileImageChange}
                  />
                </li>
              </div>
            </ul>
          ) : (
            <h3>ログインしてください</h3>
          )}
          <div className="flex justify-center">
            <button className="block py-2 px-8 rounded-md border border-pink-500" type="submit">
              更新する
            </button>
          </div>
        </form>

        <section>
          <h2 className="text-2xl font-bold text-center">レビュー</h2>
          <div>
            {reviewData?.loginUserReviews?.edges.map((review, index) => {
              return (
                <div key={index} className="border my-4 flex items-center">
                  <div>
                    <img
                      src={`${MEDIAFILE_API_ENDPOINT}${review?.node?.customer.targetUser?.profileImage}`}
                      alt=""
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

export default Settings;
