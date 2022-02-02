import path from "path";
import terserPlugin from "terser-webpack-plugin";
import htmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import "webpack-dev-server";
import webpack from "webpack";

const isDevelopment = process.env.NODE_ENV !== "production";

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.(svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/svgs/[name][ext]",
        },
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    watchFiles: "index.html",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "index.css" }),
    new CopyPlugin({
      patterns: [{ from: "assets", to: "assets" }],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? "development" : "production",
    }),
  ],
  optimization: {
    minimizer: [new terserPlugin({}), new CssMinimizerPlugin()],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name].[ext]",
    clean: true,
  },
};

export default config;
