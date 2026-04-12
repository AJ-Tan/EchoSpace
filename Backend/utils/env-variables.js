require("dotenv").config();

module.exports = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT,
  secret: process.env.SECRET,
  origin: process.env.ORIGIN,
  admin_pw: process.env.ADMIN_PW,
  node_env: process.env.NODE_ENV,
};
