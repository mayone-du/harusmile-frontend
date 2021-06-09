import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";
import { useSetLoginUserData } from "src/libs/hooks/useSetLoginUserData";
import { useProfileUpdate } from "src/libs/hooks/useUpdateProfile";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

const Settings: NextPage = () => {
  const { loginUserData } = useSetLoginUserData();
  const {
    inputLoginUserData,
    handleProfileNameChange,
    handleProfileTextChange,
    handleFavoriteSubjectChange,
    handleProblemChange,
    handleWantHearChange,
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
              <img
                src={`${MEDIAFILE_API_ENDPOINT}${loginUserData.profileImage}`}
                alt="Profile"
                className="block object-cover mx-6 w-32 h-32 rounded-full border"
              />
              <div>
                <p>{loginUserData.email}</p>
                <p>{loginUserData.schoolName}</p>
              </div>
            </div>
            {/* 右 */}
            <div className="flex flex-col justify-center w-1/2 h-16 font-bold text-center">
              <h3>これまでに相談したセンパイの数</h3>
              <p>サンプルテキスト</p>
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit}>
          {loginUserData.isLogin ? (
            <ul>
              <li>
                <input
                  type="email"
                  placeholder="email"
                  value={inputLoginUserData.email}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="profileName"
                  value={inputLoginUserData.profileName}
                  className="block p-2 border"
                  onChange={handleProfileNameChange}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="profileText"
                  className="block overflow-y-scroll p-2 max-h-32 border"
                  value={inputLoginUserData.profileText}
                  onChange={handleProfileTextChange}
                />
              </li>
              <li>
                <input
                  type="tel"
                  placeholder="telephoneNumber"
                  className="block overflow-y-scroll p-2 max-h-32 border"
                  value={inputLoginUserData.telephoneNumber}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="schoolName"
                  value={inputLoginUserData.schoolName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="genderName"
                  value={inputLoginUserData.genderName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="addressName"
                  value={inputLoginUserData.addressName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="age"
                  value={inputLoginUserData.age}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="undergraduate"
                  value={inputLoginUserData.undergraduate}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="department"
                  value={inputLoginUserData.department}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="clubActivities"
                  value={inputLoginUserData.clubActivities}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="admissionFormat"
                  value={inputLoginUserData.admissionFormat}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="favoriteSubject"
                  value={inputLoginUserData.favoriteSubject}
                  className="block p-2 border"
                  onChange={handleFavoriteSubjectChange}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="wantHear"
                  value={inputLoginUserData.wantHear}
                  className="block p-2 border"
                  onChange={handleWantHearChange}
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="problem"
                  value={inputLoginUserData.problem}
                  className="block p-2 border"
                  onChange={handleProblemChange}
                />
              </li>
              <li>
                <input
                  type="file"
                  placeholder="profileImage"
                  className="block p-2 border"
                  onChange={handleProfileImageChange}
                />
              </li>
            </ul>
          ) : (
            <h3>ログインしてください</h3>
          )}
          <button className="block py-2 px-8 border" type="submit">
            更新する
          </button>
        </form>

        <ThemeChanger />
      </Layout>
    </div>
  );
};

export default Settings;
