const router = require("koa-router")();

const userService = require("../services/user");

/**
 * api应该选择性暴露，不能将service中的所有逻辑接口都暴露对外
 */
// user api
router.get("/users/getUser", userService.getUser);
router.post("/users/registerUser", userService.registerUser);

// other api

module.exports = router;
