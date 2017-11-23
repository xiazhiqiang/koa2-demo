/**
 * 所有路由配置汇总
 */

const router = require("koa-router")();

const home = require("./home");
const test = require("./test");
const api = require("./api");

router.use("", home.routes(), home.allowedMethods());
router.use("/test", test.routes(), test.allowedMethods());
router.use("/api", api.routes(), api.allowedMethods());

module.exports = router;
