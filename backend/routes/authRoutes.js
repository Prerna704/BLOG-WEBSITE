const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User Registered" });
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(400).json("Invalid credentials");
  res.json(user);
});
/* UPDATE PASSWORD */
router.post("/update-password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // simple logic 
    const user = await User.findOne({ password: oldPassword });

    if (!user) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password update failed" });
  }
});

module.exports = router;