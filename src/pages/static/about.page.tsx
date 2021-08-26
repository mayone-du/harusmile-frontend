import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const About: NextPage = () => {
  return (
    <Layout spHeaderTitle="運営会社" meta={{ pageName: "運営会社" }}>
      <h2 className="md:text-4xl text-lg font-bold pt-2 text-center">運営会社</h2>
    </Layout>
  );
};

export default About;
