import { Layout } from "src/components/layouts/Layout";

const Talk = () => {
  return (
    <div>
      <Layout metaTitle="Talk Page">
        <div className="flex">
          <aside className="block w-1/3">
            <input type="search" className="block p-2 border" />
          </aside>

          {/* talk */}
          <div className="py-2 w-2/3 border shadow-md">
            {/* 会話相手のプロフィール */}
            <div className="flex items-center px-2 border-b border-gray-500">
              <div className="flex items-center">
                <img src="" alt="Profile" className="block w-10 h-10 rounded-full border" />
                <div>
                  <p className="text-lg">相手の名前</p>
                  <p>相手の学校</p>
                </div>
              </div>
              <button className="block p-2 bg-yellow-500">レビューを書く</button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Talk;
