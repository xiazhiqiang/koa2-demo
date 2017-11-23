const Logger = require("../utils/log");

exports.index = async (ctx, next) => {
  ctx.state = {
    title: "Hello Koa 2!",
    css: ["home.index.css"]
  };

  await ctx.render("home/index");
};

exports.string = async (ctx, next) => {
  ctx.body = "koa2 string";
};

exports.json = async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
};

/**
 * todo
 * 前台页面统一错误页
 */
exports.error = async (ctx, next) => {
  ctx.body = {
    error: ctx
  };
};
