const express = require("express");
const User = require("../models/User");
const router = express.Router();

/* 🔐 REGISTER */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return res.status(400).json({
        message: "Only gmail, outlook, and yahoo emails allowed",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* 🔐 LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* 🔐 UPDATE PASSWORD */
router.post("/update-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const user = await User.findOne({ email });

    if (!user || user.password !== oldPassword) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "New password must be strong (8 chars, uppercase, lowercase, number, special)",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password update failed" });
  }
});

module.exports = router;
