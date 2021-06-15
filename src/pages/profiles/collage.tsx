import type { NextPage } from "next";
import { useGetCollageProfilesQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { CollageProfilesWrapper } from "src/components/profiles/CollageProfilesWrapper";

const Collage: NextPage = () => {
  const { data } = useGetCollageProfilesQuery();
  return (
    <Layout metaTitle="Collage">
      <p>取得件数: {data?.collageProfiles?.edges.length.toString()}件</p>
      <section>{data && <CollageProfilesWrapper profilesData={data} />}</section>
    </Layout>
  );
};

export default Collage;
