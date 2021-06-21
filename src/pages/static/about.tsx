import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const About: NextPage = () => {
  return (
    <div>
      <Layout metaTitle="ハルスマイル | 運営">
        <h2 className="text-5xl">About</h2>
      </Layout>
    </div>
  );
};

export default About;
