const db = require("../config/database");

const User = {
  findByEmail: async (email) => {
    const [rows] = await db.promise().execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await db.promise().execute("SELECT id, email, created_at FROM users WHERE id = ?", [id]);
    return rows[0];
  },
  create: async (email, passwordHash) => {
    const [result] = await db.promise().execute(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, passwordHash]
    );
    return result.affectedRows > 0 ? result.insertId : null;
  },
};

module.exports = User; 