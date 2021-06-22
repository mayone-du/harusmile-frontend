import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const About: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="運営会社" metaTitle="ハルスマイル | 運営会社">
        <h2 className="text-5xl">About</h2>
      </Layout>
    </div>
  );
};

export default About;
