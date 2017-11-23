const ApiError = require("../lib/ApiError");

/**
 * 格式化响应内容
 * @param ctx
 * @param res
 */
const responseFormatter = (ctx, res) => {

  // api异常处理
  if (res && res.error && res.error instanceof ApiError) {
    ctx.status = 200;
    ctx.body = {
      status: 0,
      code: res.error.code,
      message: res.error.message
    };

    return;
  }

  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      status: 1,
      message: "success",
      data: ctx.body
    };
  } else {
    ctx.body = {
      status: 0,
      message: "success"
    };
  }
};

/**
 * 在app.use(router)之前调用
 */
const apiResponse = function() {
  return async (ctx, next) => {
    const res = {};
    try {
      //先去执行路由
      await next();
    } catch (error) {
      res.error = error;

      // api异常处理
      if (/^\/api/.test(ctx.originalUrl)) {
        return responseFormatter(ctx, res);
      }

      //继续抛，让外层中间件处理日志
      throw error;
    }

    //通过正则的url进行格式化处理
    if (/^\/api/.test(ctx.originalUrl)) {
      responseFormatter(ctx);
    }
  };
};

module.exports = apiResponse;
