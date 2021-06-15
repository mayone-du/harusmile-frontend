import type { NextPage } from "next";
import { useGetHighSchoolProfilesQuery } from "src/apollo/schema";
import { Layout } from "src/components/layouts/Layout";
import { HighSchoolProfilesWrapper } from "src/components/profiles/HighSchoolProfilesWrapper";

const HighSchool: NextPage = () => {
  const { data } = useGetHighSchoolProfilesQuery();
  return (
    <Layout metaTitle="HighSchool">
      <p>取得件数: {data?.highSchoolProfiles?.edges.length.toString()}件</p>
      <section>{data && <HighSchoolProfilesWrapper profilesData={data} />}</section>
    </Layout>
  );
};

export default HighSchool;
