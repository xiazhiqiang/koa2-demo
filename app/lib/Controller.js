const config = require("../../config/app.config");

/**
 * 控制器基类
 */
class Controller {

  constructor() {
    this.init();
  }

  init() {
    this.assets = this.getAssets();
  }

  getAssets() {
    // 设置资源路径
    return config.env === "dev"
      ? `http://${config.ip}:${config.webpack.devserver.port}${config.webpack.devserver.publicPath}/`
      : "";
  }

}

module.exports = Controller;
