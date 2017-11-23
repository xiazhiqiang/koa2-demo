const router = require("koa-router")();
const homeController = require("../controllers/home");

module.exports = router
  .get("/", homeController.index)
  .get("/string", homeController.string)
  .get("/json", homeController.json)
  .get("/error", homeController.error);