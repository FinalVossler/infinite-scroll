const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const webpack = require("webpack");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => {
  const isDevelopment = argv?.mode === "development";
  if (isDevelopment) {
    require("dotenv").config({ path: `./.env.development` });
  } else {
    require("dotenv").config();
  }

  return {
    entry: {
      app: "./src/index.ts",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
      publicPath:
        argv?.mode === "development" ? "http://localhost:3000/" : "auto",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(process.env),
      }),
      new ModuleFederationPlugin({
        name: "infiniteScroll",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./InfiniteScroll": "./src/components/infiniteScroll",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
