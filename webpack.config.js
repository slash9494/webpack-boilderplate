const path = require("path");
const terserPlugin = require("terser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    watchFiles: "index.html",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "index.css" }),
  ],
  optimization: {
    minimizer: [new terserPlugin({}), new CssMinimizerPlugin()],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
