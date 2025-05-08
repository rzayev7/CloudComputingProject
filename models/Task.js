const db = require("../config/database");

const Task = {
  getAll: async () => {
    const [rows] = await db.promise().execute("SELECT * FROM tasks");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.promise().execute("SELECT * FROM tasks WHERE id=?", [id]);
    return rows[0];
  },
  create: async (title, description) => {
    const [result] = await db.promise().execute(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    return result.affectedRows > 0;
  },
  update: async (id, title, description) => {
    const [result] = await db.promise().execute(
      "UPDATE tasks SET title=?, description=? WHERE id=?",
      [title, description, id]
    );
    return result.affectedRows > 0;
  },
  delete: async (id) => {
    const [result] = await db.promise().execute("DELETE FROM tasks WHERE id=?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Task;
