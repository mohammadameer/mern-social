const path = require("path");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    path.join(CURRENT_WORKING_DIR, "client/main.js")
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
