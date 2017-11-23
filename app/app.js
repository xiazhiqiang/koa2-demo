const Koa = require("koa");
const app = new Koa();

// 引入中间件
const views = require("koa-views");
const json = require("koa-json");
const jsonp = require("koa-jsonp");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const staticPath = require("koa-static");
const apiResponse = require("./middleware/response_api");
const session = require("./middleware/session");

// 引入路由
const index = require("./routes/index");

// 引入util库
const logUtil = require("./utils/log");

// 引入配置
const config = require("../config/app.config");

// extends handler
onerror(app, {
  // redirect: "/error"
});

// middleware
app.use(bodyparser({enableTypes: ["json", "form", "text"]}));
app.use(json());
app.use(jsonp());
app.use(logger());
app.use(staticPath(__dirname + "/../public"));
app.use(staticPath(__dirname + "/../build"));
app.use(views(__dirname + "/views", {extension: "ejs", map: {html: "tpl"}, options: config.viewOptions}));
app.use(apiResponse());
app.use(session());

const start = new Date(); //响应开始时间

app.use(async (ctx, next) => {
  ctx.session = {
    user_id: Math.random().toString(36).substr(2),
    count: 0
  };

  await next();
});

// access logger
app.use(async (ctx, next) => {
  try {
    await next();
    const ms = new Date() - start;

    //记录响应日志
    // console.log(`${ctx.method} ${ctx.url} - ${ms/1000}ms`);
    logUtil.logAccess(`${ctx.method} ${ctx.url} - ${ms / 1000}ms`);
  } catch (err) {
    // 抛给onerror中间件做统一处理
    throw err;
  }
});

// routes
app.use(index.routes(), index.allowedMethods());

// extends-handling
app.on("error", (err, ctx) => {
  const ms = new Date() - start;

  //记录异常日志
  // console.extends("server extends", err, ctx);
  // logUtil.console("extends", "server extends:" + JSON.stringify(err) + JSON.stringify(ctx));
  logUtil.logError("server extends:" + JSON.stringify(err) + JSON.stringify(ctx));
});

module.exports = app;
