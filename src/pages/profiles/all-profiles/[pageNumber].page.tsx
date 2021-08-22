import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
// import toast from "react-hot-toast";
import { Layout } from "src/components/layouts/Layout";
import { Pagenation } from "src/components/profiles/Pagenation";
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

// TODO: 存在しないページ数に遷移したときのエラーハンドリング

// 1ページあたりで表示するプロフィールの件数
// 他のページでも使用するために環境変数か、utilファイルに設定するのもありかも。
const ONE_PAGE_COUNT = 10;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo(null);

  // 全てのプロフィールの件数を取得
  const { data: profilesCount } = await apolloClient.query<GetAllProfilesCountQuery>({
    query: GetAllProfilesCountDocument,
  });
  // ページ数を取得 全てのプロフィール / 1ページごとの表示数 ex)123 / 10 = 12.3→切り上げで13ページ
  const pageCount = profilesCount.allProfilesCount
    ? Math.ceil(profilesCount.allProfilesCount / ONE_PAGE_COUNT)
    : 1;

  // ↓の形式でpathsを返却
  // [
  //   { params: { pageNumber: 1 } },
  //   { params: { pageNumber: 2 } },
  // ];
  const paths: { params: { pageNumber: string } }[] = [];
  // 合計ページ数分pathを作成
  for (let index = 1; index < pageCount + 1; index++) {
    paths.push({ params: { pageNumber: index.toString() } });
  }

  return { paths, fallback: false };
};

// 1ページに付き10件ごとプロフィールを表示
export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo(null);
  const pageNumber = context.params?.pageNumber ? context.params.pageNumber.toString() : "1";

  // 全てのプロフィールを取得（上限100件）
  const { data: profilesData } = await apolloClient.query<
    GetAllProfilesQuery,
    GetAllProfilesQueryVariables
  >({
    query: GetAllProfilesDocument,
    variables: {
      first: ONE_PAGE_COUNT, // 最初から10件のみ取得（ページネーション）
      // 以前のページ分スキップ 3ページ目の場合は20件分スキップ
      offset: (parseFloat(pageNumber) - 1) * ONE_PAGE_COUNT,
    },
  });

  // 全てのプロフィールの件数を取得
  const { data: profilesCount } = await apolloClient.query<GetAllProfilesCountQuery>({
    query: GetAllProfilesCountDocument,
  });

  // エラーの場合は404へ
  // if (error || errors) {
  //   return { notFound: true };
  // }

  // // ページの番号が最大のページ数を超えていたらエラー
  // if (maxPageCount < parseFloat(pageNumber)) {
  //   toast.error("エラーが発生しました。");
  //   console.error(error);
  //   // return;
  // }

  return addApolloState(apolloClient, {
    props: {
      profilesData,
      profilesCount,
      pageNumber: parseFloat(pageNumber),
    },
    revalidate: 5, // 5seconds
  });
};

type Props<T, U> = {
  profilesData: T;
  profilesCount: U;
  pageNumber: number;
};

// 高校生・大学生のプロフィールを表示するページ
const AllProfilesPageNumbers: NextPage<Props<GetAllProfilesQuery, GetAllProfilesCountQuery>> = (
  props,
) => {
  // https://harusmile.vercel.app/all-profiles?page=2 のクエリパラメーターの形式で受け取る
  // 存在しない場合などは、1を渡して初期のページを表示する
  // const pageNumber = router.query.page ? parseFloat(router.query.page.toString()) : 1;
  // console.log(pageNumber);

  // 全てのプロフィールの件数
  const profilesCount = props.profilesCount?.allProfilesCount
    ? props.profilesCount.allProfilesCount
    : 0;

  const maxPageCount = profilesCount ? Math.ceil(profilesCount / ONE_PAGE_COUNT) : 1;

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
          {props.profilesData?.allProfiles?.edges.map((profile, index) => {
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
      <div className="flex justify-center pt-4">
        <Pagenation currentPageNumber={props.pageNumber} maxPageCount={maxPageCount} />
      </div>
    </Layout>
  );
};

export default AllProfilesPageNumbers;
