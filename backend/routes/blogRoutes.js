const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.post("/create", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json("Blog Created");
});

module.exports = router;
