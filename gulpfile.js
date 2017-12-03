var gulp = require("gulp");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var gulpWebpack = require("webpack-stream");
var nodemon = require("gulp-nodemon");
var minimist = require("minimist");
var shell = require("gulp-shell");

// 加载配置
var appConfig = require("./config/app.config");
var webpackDevConfig = require("./webpack/webpack.dev");

// 默认参数
var defaultOptions = {
  string: ["env"],
  default: {
    env: process.env.NODE_ENV || "production",
    hotstart: "true", // 默认node-server热启动
  }
};

// 获取命令行参数
var options = minimist(process.argv.slice(2), defaultOptions);

/**
 * 开发环境
 */
gulp.task("dev", [
  "dev_server",
  options.hotstart ? "node_hot_server" : "node_server",
]);

gulp.task("pre", [
  "pre_build",
  options.hotstart ? "node_hot_server" : "node_server",
]);

gulp.task("publish", ["prd_build"], function() {

});

gulp.task("build", function() {

});

gulp.task("default", function() {
  // 将你的默认的任务代码放在这
});

//--------------------------------------------------------------------------------------------

/**
 * dev环境的webpack编译打包
 */
gulp.task("dev_webpack", function() {
  return gulpWebpack(webpackDevConfig, webpack);
});

/**
 * 开发环境的webpack-dev-server
 */
gulp.task("dev_server", shell.task("cnpm run dev-server"));

/**
 * 开发环境的编译
 */
gulp.task("dev_build", shell.task("cnpm run dev-build"));

/**
 * 预发环境的编译
 */
gulp.task("pre_build", shell.task("cnpm run pre-build"));

/**
 * 正式环境的编译
 */
gulp.task("prd_build", shell.task("cnpm run prd-build"));

/**
 * node server
 */
gulp.task("node_server", shell.task("NODE_ENV=" + options.env + " cnpm run start"));

/**
 * nodemon node server
 */
gulp.task("node_hot_server", function() {
  var stream = nodemon({
    script: "./bin/www",
    ext: "js",
    env: {
      "NODE_ENV": options.env
    },
    "ignore": [
      "test/*",
      "docs/*",
      "logs/*",
      "*.md",
      ".gitignore",
      "build/*"
    ],
    "delay": "2500"
  });

  stream
    .on('restart', function() {
      console.log('restarted!')
    })
    .on('crash', function() {
      console.error('Application has crashed!\n')
      stream.emit('restart', 10) // restart the server in 10 seconds
    });

  return stream;
});