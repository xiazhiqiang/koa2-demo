const logConfig = require("../../config/log4js");
const log4js = require("log4js");

//加载配置文件
log4js.configure(logConfig);

//格式化响应日志
const formatRes = function(ctx, resTime) {
  return [
    "\n" + "*************** response log start ***************" + "\n",//响应日志开始
    formatReqLog(ctx.request, resTime),//添加请求日志
    "response status: " + ctx.status + "\n",//响应状态码
    "response body: " + "\n" + JSON.stringify(ctx.body) + "\n",//响应内容
    "*************** response log end ***************" + "\n"//响应日志结束
  ].join("");
};

//格式化错误日志
const formatError = function(ctx, err, resTime) {
  return [
    "\n" + "*************** extends log start ***************" + "\n",//错误信息开始
    formatReqLog(ctx.request, resTime),//添加请求日志
    "err name: " + err.name + "\n",//错误名称
    "err message: " + err.message + "\n",//错误信息
    "err stack: " + err.stack + "\n",//错误详情
    "*************** extends log end ***************" + "\n"//错误信息结束
  ].join("");
};

//格式化请求日志
const formatReqLog = function(req, resTime) {
  // startTime = req.query.requestStartTime;//开始时间
  return [
    "request method: " + req.method + "\n",//访问方法
    "request originalUrl:  " + req.originalUrl + "\n",//请求原始地址
    "request client ip:  " + req.ip + "\n",//客户端ip
    req.method === "GET"
      ? "request query:  " + JSON.stringify(req.query) + "\n"
      : "request body: " + "\n" + JSON.stringify(req.body) + "\n",//请求参数
    "response time: " + resTime + "\n"//服务器响应时间
  ].join("");
};

// 设置不同的日志分类，与日志config中的category一致
const resLogger = log4js.getLogger("accessLogger");
const errorLogger = log4js.getLogger("errorLogger");
const defaultLogger = log4js.getLogger("default");

//封装错误日志
const logError = function(errMsg) {
  return errMsg && errorLogger.error(errMsg);
};

//封装响应日志
const logAccess = function(msg) {
  return msg && resLogger.info(msg);
};

module.exports = {
  console: defaultLogger,//通用信息输出
  logError: logError,
  logAccess: logAccess
};
