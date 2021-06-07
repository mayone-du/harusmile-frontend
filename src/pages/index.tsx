import type { NextPage } from "next";
import { Layout } from "src/components/Layout";
import { ThemeChanger } from "src/components/ThemeChanger";

const Index: NextPage = () => {
  return (
    <Layout metaTitle="Index Page">
      <div className="flex flex-col justify-center items-center h-40">
        <div className="text-5xl">Index Page</div>
        <ThemeChanger />
      </div>
    </Layout>
  );
};

export default Index;
