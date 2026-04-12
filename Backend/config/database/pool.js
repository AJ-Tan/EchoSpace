const { Pool } = require("pg");
const { dbUrl } = require("../../utils/env-variables");

module.exports = new Pool({
  connectionString: dbUrl,
});
