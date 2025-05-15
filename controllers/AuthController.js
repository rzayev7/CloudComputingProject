const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      // Create user
      const userId = await User.create(email, passwordHash);
      
      if (!userId) {
        return res.status(500).json({ message: "Failed to create user" });
      }
      
      // Generate JWT
      const token = jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      res.status(201).json({ token, userId });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Generate JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      res.json({ token, userId: user.id });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = AuthController; 