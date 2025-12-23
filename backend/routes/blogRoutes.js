const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// 🔹 GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔹 GET single blog by ID  (⭐ MUST BE ABOVE myblogs)
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json("Blog not found");
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 🔹 GET blogs by author
router.get("/myblogs/:author", async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.params.author });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 CREATE blog
router.post("/create", async (req, res) => {
  try {
    const { title, description, image, author } = req.body;
    const blog = new Blog({ title, description, image, author }); 
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update Blog

router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, image, author } = req.body;

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author }, // ✅ owner check
      { title, description, image },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(403).json("You are not allowed to edit this blog");
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE blog
router.delete("/delete/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json("Blog not found");
    if (blog.author !== req.body.author) return res.status(403).json("Not allowed");

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
