const Task = require("../models/Task");

const TaskController = {
  getAllTasks: async (req, res) => {
    const tasks = await Task.getAll();
    res.json(tasks);
  },
  getTaskById: async (req, res) => {
    const task = await Task.getById(req.params.id);
    res.json(task || {});
  },
  createTask: async (req, res) => {
    const { title, description } = req.body;
    const success = await Task.create(title, description);
    res.status(success ? 201 : 400).json({ message: success ? "Created" : "Failed" });
  },
  updateTask: async (req, res) => {
    const { title, description } = req.body;
    const success = await Task.update(req.params.id, title, description);
    res.status(success ? 200 : 404).json({ message: success ? "Updated" : "Not Found" });
  },
  deleteTask: async (req, res) => {
    const success = await Task.delete(req.params.id);
    res.status(success ? 200 : 404).json({ message: success ? "Deleted" : "Not Found" });
  },
};

module.exports = TaskController;
