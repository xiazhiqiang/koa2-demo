const config = require("../../config/app.config");

const session = require("koa-session-minimal");
const mysqlSession = require("koa-mysql-session");

// 配置存储session信息的mysql
const store = new mysqlSession({
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  host: config.mysql.host,
});

// 存放sessionId的cookie配置
const cookie = {
  maxAge: "", // cookie有效时长
  expires: "", // cookie失效时间
  path: "/", // 写cookie所在的路径
  domain: "127.0.0.1", // 写cookie所在的域名
  httpOnly: "true", // 是否只用于http请求中获取
  overwrite: "true", // 是否允许重写
  secure: "",
  sameSite: "",
  signed: "",
};

module.exports = (params) => {
  const config = Object.assign({
    key: "SESSION_ID",
    store: store,
    cookie: cookie
  }, params);

  return session(config);
};
