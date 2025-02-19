const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");

module.exports =  {
  mode: "production",
  entry: {
    main: path.join(__dirname, "source", "index.js")
  },

  output: {
    path: path.join(__dirname, "static"),
    publicPath: "/",
    filename: "theme-build.js"
  },

  module: {
    rules: [
      {
        test: /\.((png)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },

      {
        test: /\.((eot)|(woff)|(woff2)|(ttf)|(svg))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/",
          publicPath: "/fonts/",
        }
      },

      //{ test: /\.json$/, loader: "json-loader" },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {cacheDirectory: true}
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },

      {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  externals: {
    jquery: "jQuery"
  },

  plugins: [
    new webpack.ProvidePlugin({
      Popper: ["popper.js", "default"],
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab"
    }),

    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "data"),
      prettyPrint: true
    }),

    new WebpackShellPlugin({
      onBuildEnd: ["cp ./static/theme-build.css ./layouts/partials/build.css"]
    })
  ],

  optimization: {
    minimizer: [
      new TerserPlugin(),

      new MiniCssExtractPlugin({
        filename: "theme-build.css"
      }),

      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
