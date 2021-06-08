import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const About: NextPage = () => {
  return (
    <div>
      <Layout metaTitle="About">
        <h2 className="text-5xl">About</h2>
      </Layout>
    </div>
  );
};

export default About;
