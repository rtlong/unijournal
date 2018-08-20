import path from "path"

import { ProvidePlugin } from "webpack"
import WebpackAssetsManifest from "webpack-assets-manifest"
import HtmlPlugin from "html-webpack-plugin"
import SriPlugin from "webpack-subresource-integrity"
import koaConnect from "koa-connect"
import historyApiFallback from "connect-history-api-fallback"

const isProd = process.env.NODE_ENV === "production"

export default {
  mode: isProd ? "production" : "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./packs/main.jsx",
    development: "./packs/development.js",
  },
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
    alias: {
      fs: "browserfs/dist/shims/fs.js",
      buffer: "browserfs/dist/shims/buffer.js",
      path: "browserfs/dist/shims/path.js",
      processGlobal: "browserfs/dist/shims/process.js",
      bufferGlobal: "browserfs/dist/shims/bufferGlobal.js",
      bfsGlobal: require.resolve("browserfs"),
    },
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
    noParse: [/browserfs\.js/],
  },
  plugins: [
    new ProvidePlugin({
      BrowserFS: "bfsGlobal",
      process: "processGlobal",
      Buffer: "bufferGlobal",
    }),
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
  node: {
    process: false,
    Buffer: false,
  },
  serve: {
    add: (app, _middleware, _options) => {
      app.use(koaConnect(historyApiFallback({})))
    },
  },
}
