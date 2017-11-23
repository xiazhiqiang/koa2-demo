const path = require("path");
const basicPath = path.resolve(__dirname, "../logs");

// 日志错误级别
const LEVEL = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'MARK', 'OFF'];

/**
 * log4js配置
 * 文档：https://log4js-node.github.io/log4js-node/console.html
 * 源码：https://github.com/log4js-node/log4js-node
 */
module.exports = {
  "categories": {
    "default": {
      "appenders": ["stdout", "logFile"],
      "level": "ALL"
    },
    "errorLogger": {
      "appenders": ["stdout", "errorLogger"],
      "level": "ERROR"
    },
    "accessLogger": {
      "appenders": ["accessLogger"],
      "level": "ALL"
    }
  },
  "appenders": {
    "logFile": {
      "type": "dateFile",                        //日志类型
      "filename": path.resolve(basicPath, "log"),//日志输出位置
      "alwaysIncludePattern": true,              //是否总是有后缀名
      "pattern": "-yyyy-MM-dd.log",              //后缀，每天创建一个新的日志文件
      "compress": true,
      "keepFileExt": true
    },
    "errorLogger": {
      "type": "dateFile",
      "filename": path.resolve(basicPath, "error"),
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "keepFileExt": true
    },
    "accessLogger": {
      "type": "dateFile",
      "filename": path.resolve(basicPath, "access"),
      "pattern": "-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "keepFileExt": true
    },
    "stdout": {
      "type": "stdout"
    }
  }
};
