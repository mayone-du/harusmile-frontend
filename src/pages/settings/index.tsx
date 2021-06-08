import { useReactiveVar } from "@apollo/client";
import type { NextPage } from "next";
import { loginUserVar } from "src/apollo/cache";
import { Layout } from "src/components/layouts/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

const Settings: NextPage = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
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
                className="block object-cover mx-6 w-32 h-32 rounded-full"
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
                  value={loginUserData.email}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="profileName"
                  value={loginUserData.profileName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="profileText"
                  value={loginUserData.profileText}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="schoolName"
                  value={loginUserData.schoolName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="genderName"
                  value={loginUserData.genderName}
                  className="block p-2 border"
                />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="addressName"
                  value={loginUserData.addressName}
                  className="block p-2 border"
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
