import path from "path"

import WebpackAssetsManifest from "webpack-assets-manifest"
import HtmlPlugin from "html-webpack-plugin"
import SriPlugin from "webpack-subresource-integrity"

const isProd = process.env.NODE_ENV === "production"

export default {
  mode: isProd ? "production" : "development",
  context: path.resolve(__dirname, "src"),
  entry: { main: "./packs/main.jsx" },
  output: {
    filename: isProd ? "[name]-[chunkhash].js" : "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    crossOriginLoading: "anonymous",
  },
  resolve: {
    extensions: [".jsx", ".js", ".css", ".png", ".svg", ".gif", ".jpeg", ".jpg"],
    modules: [
      // 'src',
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
        test: /\.jsx?/,
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
    new SriPlugin({
      enabled: isProd,
      hashFuncNames: ["sha256", "sha384", "sha512"],
    }),
    new HtmlPlugin({
      template: "./index.html",
      inject: false,
    }),
  ],
}
