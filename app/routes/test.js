const router = require("koa-router")();
const testController = require("../controllers/test");

// router.prefix("/test");

module.exports = router
  .get("/", testController.index)
  .get("/abc", testController.abc);
