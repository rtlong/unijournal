import path from "path"

import WebpackAssetsManifest from "webpack-assets-manifest"

const isProd = process.env.NODE_ENV === "production"

export default {
  mode: isProd ? "production" : "development",
  context: path.resolve(__dirname, "app/javascript"),
  entry: { react_entry: "./packs/react_entry.jsx" },
  output: {
    filename: isProd ? "[name]-[chunkhash].js" : "[name].js",
    path: path.resolve(__dirname, "public/packs"),
    publicPath: "/packs/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".css", ".png", ".svg", ".gif", ".jpeg", ".jpg"],
    modules: [
      // "app/javascript",
      "node_modules",
    ],
  },
  resolveLoader: {
    modules: ["node_modules"],
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: "tmp/cache/webpack/babel-loader",
            },
          },
        ],
      },
      // {
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[path][name]-[hash].[ext]",
      //         // context: "app/javascript",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new WebpackAssetsManifest({
      writeToDisk: true,
      integrity: true,
    }),
  ],
}
