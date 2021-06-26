const withPWA = require("next-pwa");
module.exports = withPWA({
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    NEXT_PUBLIC_SLACK_WEBHOOK_URL: "",
  },
  pwa: {
    dest: "public", // swの出力ディレクトリ
    // runtimeCaching: [],
  },
  // future: {
  //   webpack5: false,
  // },
});
