import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { Layout } from "src/components/layouts/Layout";
import { Profile } from "src/components/profiles/Profile";
import { addApolloState, initializeApollo } from "src/graphql/apollo/client";
import type {
  GetAllProfilesCountQuery,
  GetAllProfilesQuery,
  GetAllProfilesQueryVariables,
} from "src/graphql/apollo/schemas/schema";
import {
  GetAllProfilesCountDocument,
  GetAllProfilesDocument,
} from "src/graphql/apollo/schemas/schema";

//TODO: 【要検討】/profiles/all-profilesで表示できるように[pageNumber]だけでなくindexページも追加している。 でもいらないかもしれない

// 1ページあたりで表示するプロフィールの件数
// 他のページでも使用するために環境変数か、utilファイルに設定するのもありかも。
const ONE_PAGE_COUNT = 10;

// 1ページに付き10件ごとプロフィールを表示
export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo(null);

  // 全てのプロフィールを取得（上限100件）
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
    variables: {
      first: ONE_PAGE_COUNT, // 最初から10件のみ取得（ページネーション）
    },
  });

  // 全てのプロフィールの件数を取得
  const { data: profilesCount } = await apolloClient.query<GetAllProfilesCountQuery>({
    query: GetAllProfilesCountDocument,
  });

  // return { props: { profilesData: profilesData } };
  return addApolloState(apolloClient, {
    props: {
      profilesData,
      profilesCount,
      // fallback: false,
    },
    revalidate: 5, // 5seconds
  });
};

type Props<T, U> = {
  profilesData: T;
  profilesCount: U;
};

// 高校生・大学生のプロフィールを表示するページ
const AllProfilesIndex: NextPage<Props<GetAllProfilesQuery, GetAllProfilesCountQuery>> = (
  props,
) => {
  // https://harusmile.vercel.app/all-profiles?page=2 のクエリパラメーターの形式で受け取る
  // 存在しない場合などは、1を渡して初期のページを表示する
  // const pageNumber = router.query.page ? parseFloat(router.query.page.toString()) : 1;
  // console.log(pageNumber);

  // 全てのプロフィールの件数
  const profilesCount = props.profilesCount.allProfilesCount
    ? props.profilesCount.allProfilesCount
    : 0;

  // 全てのプロフィールの件数と1ページごとに表示する件数からページ数を算出 小数点は切り上げ。j
  const pageCount = Math.ceil(profilesCount / ONE_PAGE_COUNT);

  // クエリパラメーターでページの番号を受け取り、存在しなければgetStaticPropsで受け取ったページを表示する
  return (
    <Layout
      spHeaderTitle="全てのプロフィール"
      meta={{
        pageName: "全てのプロフィール",
      }}
    >
      <p className="py-10 px-2 text-xl text-center">
        すべてのプロフィール：{profilesCount.toString()}件
      </p>

      <section>
        <ul className="flex flex-wrap">
          {props.profilesData.allProfiles?.edges.map((profile, index) => {
            return (
              <Profile
                key={index}
                profileId={profile?.node?.id ? profile.node.id : ""}
                profileName={profile?.node?.profileName ? profile.node.profileName : ""}
                profileText={profile?.node?.profileText ? profile.node.profileText : ""}
                profileImage={profile?.node?.profileImage ? profile.node.profileImage : ""}
                schoolName={profile?.node?.schoolName ? profile.node.schoolName : ""}
                age={profile?.node?.age ? profile.node.age : 0}
                undergraduate={profile?.node?.undergraduate ? profile.node.undergraduate : ""}
                department={profile?.node?.department ? profile.node.department : ""}
                clubActivities={profile?.node?.clubActivities ? profile.node.clubActivities : ""}
                admissionFormat={profile?.node?.admissionFormat ? profile.node.admissionFormat : ""}
                favoriteSubject={profile?.node?.favoriteSubject ? profile.node.favoriteSubject : ""}
                problem={profile?.node?.problem ? profile.node.problem : ""}
                // tags={profile?.node?.tags ? profile.node.tags : []}
                isCollegeStudent={
                  profile?.node?.isCollegeStudent ? profile.node.isCollegeStudent : false
                }
                stars={
                  profile?.node?.targetUser
                    ? profile.node.targetUser.provider.edges.map((review) => {
                        return review?.node?.stars;
                      })
                    : [0]
                }
              />
            );
          })}
        </ul>
      </section>

      {/* ページネーション */}
      <div>
        <h3>ページネーション</h3>
        <p>全部で{pageCount.toString()}ページ</p>
        <ul>
          <li>
            <Link href="/">
              <a>次のページ</a>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default AllProfilesIndex;
