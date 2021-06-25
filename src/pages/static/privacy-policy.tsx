import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const PrivacyPolicy: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="利用規約" metaTitle="ハルスマイル | 利用規約">
        <h2 className="md:text-4xl text-center">利用規約</h2>
      </Layout>
    </div>
  );
};

export default PrivacyPolicy;
