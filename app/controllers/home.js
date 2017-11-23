const Logger = require("../utils/log");

exports.index = async(ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
};

exports.string = async(ctx, next) => {
  ctx.body = "koa2 string";
};

exports.json = async(ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
};

/**
 * todo
 * 前台页面统一错误页
 */
exports.error = async(ctx, next) => {
  ctx.body = {
    error: ctx
  };
};