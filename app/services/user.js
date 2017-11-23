const ApiError = require("../lib/ApiError");

//获取用户
exports.getUser = async (ctx, next) => {
  console.log(ctx.query);
  if (parseInt(ctx.query.id) !== 1) {
    throw new ApiError("USER_NOT_EXIST");
  }

  ctx.body = {
    username: "阿，希爸",
    age: 30
  };
};

//用户注册
exports.registerUser = async (ctx, next) => {
  console.log("registerUser", ctx.request.body);
  ctx.body = {
    code: 0
  };
};
