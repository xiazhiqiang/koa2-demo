const logUtil = require("../utils/log");

exports.index = async (ctx, next) => {
  try {
    const modTest = require("../models/test");
    ctx.state.ret = await modTest.createTestTable();
    ctx.state.css = ["test.index.css"];
    ctx.state.js = "test.index.js";
  } catch (e) {
    // 打日志
    logUtil.logError(JSON.stringify(e) + JSON.stringify(ctx));

    ctx.state = {
      title: "Test-index Page",
      css: [],
      js: ""
    };
  }

  await ctx.render("test/index");
};

exports.abc = async (ctx, next) => {
  ctx.body = "abc";
};
