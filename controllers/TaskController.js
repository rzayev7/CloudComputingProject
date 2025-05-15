const Task = require("../models/Task");
const { PubSub } = require('@google-cloud/pubsub');

// Initialize Pub/Sub (will be used in Phase 4)
const pubSubClient = new PubSub();
const topicName = process.env.PUBSUB_TOPIC || 'task-events';

const TaskController = {
  getAllTasks: async (req, res) => {
    try {
      const userId = req.user.userId;
      const tasks = await Task.getAll(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  getTaskById: async (req, res) => {
    try {
      const userId = req.user.userId;
      const task = await Task.getById(req.params.id, userId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  createTask: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { title, description, status } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
      
      const taskId = await Task.create(title, description, status, userId);
      
      if (!taskId) {
        return res.status(400).json({ message: "Failed to create task" });
      }
      
      // Publish to Pub/Sub (Phase 4)
      try {
        if (process.env.NODE_ENV === 'production') {
          await pubSubClient.topic(topicName).publishMessage({
            data: Buffer.from(JSON.stringify({
              event: 'task_created',
              taskId,
              userId,
              timestamp: new Date().toISOString()
            }))
          });
        }
      } catch (pubsubError) {
        console.error("Pub/Sub publish error:", pubsubError);
        // Continue execution even if Pub/Sub fails
      }
      
      res.status(201).json({ 
        message: "Task created",
        taskId 
      });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  updateTask: async (req, res) => {
    try {
      const userId = req.user.userId;
      const taskId = req.params.id;
      const { title, description, status } = req.body;
      
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }
      
      const success = await Task.update(taskId, title, description, status, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      // Publish to Pub/Sub (Phase 4)
      try {
        if (process.env.NODE_ENV === 'production') {
          await pubSubClient.topic(topicName).publishMessage({
            data: Buffer.from(JSON.stringify({
              event: 'task_updated',
              taskId,
              userId,
              timestamp: new Date().toISOString()
            }))
          });
        }
      } catch (pubsubError) {
        console.error("Pub/Sub publish error:", pubsubError);
        // Continue execution even if Pub/Sub fails
      }
      
      res.json({ message: "Task updated" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  deleteTask: async (req, res) => {
    try {
      const userId = req.user.userId;
      const taskId = req.params.id;
      
      const success = await Task.delete(taskId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      // Publish to Pub/Sub (Phase 4)
      try {
        if (process.env.NODE_ENV === 'production') {
          await pubSubClient.topic(topicName).publishMessage({
            data: Buffer.from(JSON.stringify({
              event: 'task_deleted',
              taskId,
              userId,
              timestamp: new Date().toISOString()
            }))
          });
        }
      } catch (pubsubError) {
        console.error("Pub/Sub publish error:", pubsubError);
        // Continue execution even if Pub/Sub fails
      }
      
      res.json({ message: "Task deleted" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = TaskController;
