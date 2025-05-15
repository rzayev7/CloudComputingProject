const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/auth");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Auth routes (no auth required)
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/tasks", authMiddleware, taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
