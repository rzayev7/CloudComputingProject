const db = require("../config/database");

const Task = {
  getAll: async (userId) => {
    const [rows] = await db.promise().execute("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    return rows;
  },
  getById: async (id, userId) => {
    const [rows] = await db.promise().execute("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, userId]);
    return rows[0];
  },
  create: async (title, description, status, userId) => {
    const [result] = await db.promise().execute(
      "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
      [title, description, status || 'todo', userId]
    );
    return result.affectedRows > 0 ? result.insertId : null;
  },
  update: async (id, title, description, status, userId) => {
    const [result] = await db.promise().execute(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [title, description, status, id, userId]
    );
    return result.affectedRows > 0;
  },
  delete: async (id, userId) => {
    const [result] = await db.promise().execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, userId]);
    return result.affectedRows > 0;
  },
};

module.exports = Task;
