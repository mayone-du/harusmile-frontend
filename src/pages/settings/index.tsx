import type { NextPage } from "next";
import Link from "next/link";
import { useGetAllAdressesQuery, useGetAllGendersQuery } from "src/apollo/schema";
import { ProfileImageIcon } from "src/components/icons/ProfileImageIcon";
import { Layout } from "src/components/layouts/Layout";
import { Input } from "src/components/profiles/Input";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/users/useSetLoginUserData";
import { useProfileUpdate } from "src/libs/hooks/useUpdateProfile";

const Settings: NextPage = () => {
  const { loginUserData } = useSetLoginUserData();
  const { data: allAdressesData } = useGetAllAdressesQuery();
  const { data: allGendersData } = useGetAllGendersQuery();

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

  if (loginUserData.isLoading) {
    return (
      <Layout spHeaderTitle="プロフィール編集" metaTitle="ハルスマイル | 設定画面">
        <div className="text-xl font-bold text-center">loading</div>
      </Layout>
    );
  }
  if (!loginUserData.isLogin) {
    return (
      <Layout spHeaderTitle="プロフィール編集" metaTitle="ハルスマイル | 設定画面">
        <div>ログイン後に使用可能です。</div>
      </Layout>
    );
  }
  return (
    <Layout spHeaderTitle="プロフィール編集" metaTitle="ハルスマイル | 設定画面">
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

      <form onSubmit={handleSubmit}>
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
              <Input
                type="text"
                placeholder="ユーザーネーム"
                value={inputLoginUserData.profileName}
                onChange={handleProfileNameChange}
                label="ユーザーネーム"
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
              <Input
                type="tel"
                placeholder="telephoneNumber"
                value={inputLoginUserData.telephoneNumber}
                onChange={handleTelephoneNumberChange}
                label="電話番号"
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
                {inputLoginUserData.addressId === "" && (
                  <option value={""} disabled>
                    未設定
                  </option>
                )}
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
                {inputLoginUserData.genderId === "" && (
                  <option value={""} disabled>
                    未設定
                  </option>
                )}
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
              <Input
                type="number"
                max={50}
                min={0}
                placeholder="age"
                value={inputLoginUserData.age}
                onChange={handleAgeChange}
                label="年齢"
              />
            </li>
          </div>

          <div className="w-full">
            <li className="my-4 mx-auto w-full">
              <Input
                type="text"
                placeholder="schoolName"
                value={inputLoginUserData.schoolName}
                onChange={handleSchoolNameChange}
                label="学校名"
              />
            </li>
            {loginUserData.isCollegeStudent && (
              <div>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="undergraduate"
                    value={inputLoginUserData.undergraduate}
                    onChange={handleUndergraduateChange}
                    label="学部"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="department"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.department}
                    onChange={handleDepartmentChange}
                    label="学科"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="clubActivities"
                    value={inputLoginUserData.clubActivities}
                    onChange={handleClubActivitiesChange}
                    label="部活動・サークル"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="admissionFormat"
                    className="block p-2 mx-auto w-2/3 border-b border-pink-500 focus:outline-none"
                    value={inputLoginUserData.admissionFormat}
                    onChange={handleAdmissionFormatChange}
                    label="入試形態"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="favoriteSubject"
                    value={inputLoginUserData.favoriteSubject}
                    onChange={handleFavoriteSubjectChange}
                    label="好きな科目"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="wantHear"
                    value={inputLoginUserData.wantHear}
                    onChange={handleWantHearChange}
                    label="聞きたいこと"
                  />
                </li>
                <li className="my-4 mx-auto w-full">
                  <Input
                    type="text"
                    placeholder="problem"
                    value={inputLoginUserData.problem}
                    onChange={handleProblemChange}
                    label="悩み"
                  />
                </li>
              </div>
            )}

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
        <div className="flex justify-center">
          <button className="block py-2 px-8 rounded-md border border-pink-500" type="submit">
            更新する
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center px-2 my-10 mx-4">
        <Link href="/auth/signout">
          <a className="p-2 border rounded-sm ">ログアウト</a>
        </Link>
      </div>
      <div className="py-6">
        <ThemeChanger />
      </div>
    </Layout>
  );
};

export default Settings;
