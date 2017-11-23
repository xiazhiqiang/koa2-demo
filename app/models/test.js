const db = require("../utils/db");
const table = require("../sql/table");

exports.createTestTable = () => {
  return db.query(table.test, []);
};