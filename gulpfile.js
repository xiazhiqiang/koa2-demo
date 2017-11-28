var gulp = require("gulp");
// var gulpUtil = require("gulp-util");

var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var gulpWebpack = require("webpack-stream");
var nodemon = require("gulp-nodemon");
var minimist = require("minimist");
// var del = require("del");

// 加载配置
var appConfig = require("./config/app.config");
var webpackDevConfig = require("./webpack/webpack.dev");

// 默认参数
var defaultOptions = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "production"
  }
};

// 获取命令行参数
var options = minimist(process.argv.slice(2), defaultOptions);

/**
 * 开发环境
 */
gulp.task("dev", [
  "dev_webpack_server",
  "node_hot_server"
]);

gulp.task("pre", function() {

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
gulp.task("dev_webpack", function(cb) {
  return gulpWebpack(webpackDevConfig, webpack);
});

/**
 * dev环境的webpack-dev-server
 */
gulp.task("dev_webpack_server", function() {
  return new webpackDevServer(webpack(webpackDevConfig), {
    contentBase: "./",
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    host: appConfig.ip,
    lazy: false,
    inline: true,
    progress: true,
    port: webpackDevConfig.devServer.port,
    stats: {
      colors: true,
      debug: true,
      inline: true
    }
  })
  .listen(webpackDevConfig.devServer.port, appConfig.ip);
});

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