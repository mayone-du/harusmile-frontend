import type { NextPage } from "next";
import { Layout } from "src/components/layouts/Layout";

const PrivacyPolicy: NextPage = () => {
  return (
    <div>
      <Layout spHeaderTitle="利用規約" meta={{ pageName: "利用規約" }}>
        <h2 className="md:text-4xl text-xl font-bold py-4 text-center">利用規約</h2>
        <div>
          <p>迷惑・悪質な行為や違法行為などは行わないでください。</p>
        </div>
      </Layout>
    </div>
  );
};

export default PrivacyPolicy;
