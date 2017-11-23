const ErrorMap = require("../../config/errorMap");

/**
 * Api错误类型定义
 */
class ApiError extends Error {

  constructor(type, message) {
    super();

    this.initError(type, message);
  }

  initError(type, message) {
    const error = this.getErrorInfo(type);
    this.type = type;
    this.code = error.code;
    this.message = message ? message : error.message;
  }

  getErrorInfo(type) {
    return ErrorMap[type] ? ErrorMap[type] : ErrorMap["UNKNOWN_ERROR"];
  }

}

module.exports = ApiError;