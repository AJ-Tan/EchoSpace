const pool = require("./pool");

module.exports.dbAllMessages = async () => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM members_only.messages 
      WHERE msg.is_archived = false ORDER BY msg.id DESC`,
    );

    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.dbSelectedMessage = async (id) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM members_only.messages WHERE id = $1`,
      [id],
    );

    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.dbInsertMessage = async ({
  community_id,
  user_id,
  title,
  message,
}) => {
  try {
    await pool.query(
      `INSERT INTO members_only.messages 
    (user_id, title, message, created_at) 
    VALUES 
    ($1, $2, $3, $4)`,
      [user_id, title, message, new Date()],
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.dbUpdateMessage = async ({ id, title, message }) => {
  try {
    await pool.query(
      `UPDATE members_only.messages SET title=$1, message=$2, last_modified=$3 WHERE id=$4`,
      [title, message, new Date(), id],
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.dbDeleteMessage = async ({ id }) => {
  try {
    await pool.query(`DELETE FROM members_only.messages WHERE id=$1`, [id]);
  } catch (err) {
    throw new Error(err);
  }
};
