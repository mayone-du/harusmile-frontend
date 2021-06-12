import { Layout } from "src/components/layouts/Layout";

const NotFoundPage = () => {
  return (
    <div>
      <Layout metaTitle="404 Not Found">
        <h2 className="text-3xl">404 Not Found</h2>
        {/* <div className="p-4 mx-auto w-full max-w-sm rounded-md border border-gray-300 shadow">
          <div className="flex space-x-4 animate-pulse">
            <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
            <div className="flex-1 py-1 space-y-4">
              <div className="w-3/4 h-4 bg-gray-400 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
          </div>
        </div> */}
      </Layout>
    </div>
  );
};

export default NotFoundPage;
