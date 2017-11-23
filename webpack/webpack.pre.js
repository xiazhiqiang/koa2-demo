var config = require("../config/app.config");

var path = require("path");
var fs = require("fs");

var webpack = require("webpack");

// min输出js
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

// 插件配置
var DefinePlugin = webpack.DefinePlugin;

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ENTRY_PATH = path.resolve(__dirname, "../app/views/entry");
var entry = fs.readdirSync(ENTRY_PATH).map(file => path.resolve(ENTRY_PATH, file)).reduce((a, b) => {
  if (path.extname(b) === ".jsx") {
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
    publicPath: config.webpack.publicPath
  },

  devtool: "source-map", // 开发工具，打包后代码调试
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  resolve: {
    modules: [
      path.resolve(__dirname, '../app'),
      path.resolve(__dirname, '../node_modules')
    ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../app/views"),
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
    new UglifyJsPlugin({
      beautify: true,// 最紧凑的输出
      comments: false,// 删除所有的注释
      compress: {
        warnings: false,// 在UglifyJs删除没有用到的代码时不输出警告
        drop_console: true,// 删除所有的 `console` 语句 还可以兼容ie浏览器
        collapse_vars: true,// 内嵌定义了但是只用到一次的变量
        reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),
    new DefinePlugin({
      "process.env": {
        NODE_ENV: "\"" + config.env + "\""
      }
    }),
    new CommonsChunkPlugin({
      names: ['common']
    })
  ]
};
