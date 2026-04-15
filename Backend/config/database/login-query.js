const { admin_pw } = require("../../utils/env-variables");
const pool = require("./pool");
const bcrypt = require("bcrypt");

module.exports.findUser = async ({ id, username }) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM members_only.login_info WHERE id=$1 OR username=$2",
      [id, username],
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.insertUser = async ({
  username,
  password,
  firstName,
  lastName,
  avatar,
  admin,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO members_only.login_info (username,password,first_name, last_name,avatar_id, role)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        avatar,
        admin === admin_pw ? "admin" : "user",
      ],
    );
  } catch (err) {
    throw new Error(err);
  }
};
