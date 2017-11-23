const mysql = require("mysql");
const config = require("../../config/app.config");

// 创建数据池
const pool = mysql.createPool({
  host: config.mysql.host, // 数据库地址
  user: config.mysql.username, // 数据库用户
  password: config.mysql.password, // 数据库密码
  database: config.mysql.database // 选中数据库
});

/**
 * query
 * @param {*} sql
 * @param {*} values
 */
exports.query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }

      connection.query(sql, values, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }

        connection.release();
      });
    });
  });
};

/**
 * 创建数据表
 * @param {*} sql
 */
exports.createTable = (sql) => {
  return query(sql, []);
};
