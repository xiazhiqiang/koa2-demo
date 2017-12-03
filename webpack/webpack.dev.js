var config = require("../config/app.config");

var path = require("path");
var fs = require("fs");

var webpack = require("webpack");

// 插件配置
var DefinePlugin = webpack.DefinePlugin;

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ENTRY_PATH = path.resolve(__dirname, "../app/views/entry");
var entry = fs
.readdirSync(ENTRY_PATH)
.map(file => path.resolve(ENTRY_PATH, file))
.reduce((a, b) => {
  if (path.extname(b) === ".jsx") {// 只针对entry目录下以.jsx文件为入口文件
    const key = path.basename(b, ".jsx");
    a[key] = b;
  }

  return a;
}, {});

entry.common = ['react', 'react-dom'];

console.log(config.env, entry);

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "[name].js",
    publicPath: config.webpack.publicPath,
  },

  devtool: "inline-source-map", // 开发工具，打包后代码调试
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          path.resolve(__dirname, "../node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(["style-loader", "css-loader"])
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: "\"" + config.env + "\""
      }
    }),
    new webpack.HotModuleReplacementPlugin(), // webpack-dev-server 强化插件
    new CommonsChunkPlugin({
      names: ['common']
    })
  ],

  devServer: {
    port: config.webpack.devserver.port, // 监听端口号
    hot: true,
    inline: true
  }
};
