import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useGetProfileQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { MEDIAFILE_API_ENDPOINT } from "src/utils/API_ENDPOINTS";

const ProfileDetail: NextPage = () => {
  const router = useRouter();

  const { data, loading: isLoading } = useGetProfileQuery({
    variables: { profileId: router.asPath.replace("/profiles/", "") },
  });

  return (
    <Layout metaTitle="profile detail">
      <h2 className="py-4 text-3xl text-center">Profile Detail</h2>

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
            <h3 className="text-2xl">これまでに相談したセンパイの数</h3>
          </div>
        </div>
      )}

      {data?.profile && (
        <div>
          <section>
            <div className="flex items-center p-4 border shadow-md">
              {/* 左 */}
              <div className="flex items-center w-1/2 border-r">
                {data.profile.profileImage ? (
                  <img
                    src={`${MEDIAFILE_API_ENDPOINT}${data.profile.profileImage}`}
                    alt="Profile"
                    className="block object-cover mx-6 w-32 h-32 rounded-full border"
                  />
                ) : (
                  <div className="mx-6 w-32 h-32 rounded-full border">null</div>
                )}

                <div>
                  <p>{data.profile.profileName}</p>
                  <p>{data.profile.schoolName}</p>
                </div>
              </div>
              {/* 右 */}
              <div className="flex flex-col justify-center w-1/2 h-16 font-bold text-center">
                <h3 className="text-2xl">これまでに相談したセンパイの数</h3>
                <p>{data.profile.targetUser.provider.edges.length.toString()}</p>
              </div>
            </div>
          </section>

          <section>
            <ul className="py-6">
              <li className="py-2 mx-40 border-b-2 border-pink-100">{data.profile.profileText}</li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">{data.profile.age} 歳</li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {data.profile.undergraduate}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">{data.profile.department}</li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {data.profile.clubActivities}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">
                {data.profile.favoriteSubject}
              </li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">{data.profile.wantHear}</li>
              <li className="py-2 mx-40 border-b-2 border-pink-100">{data.profile.problem}</li>
            </ul>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default ProfileDetail;
