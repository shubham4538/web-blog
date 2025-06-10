const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectMongoDB = require("./database/connection.js");
const BlogModel = require("./database/BlogModel.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/getblogs", async (req, res) => {
  await connectMongoDB();

  try {
    const blogs = await BlogModel.find({});
    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch blogs", err });
  }
});

app.get("/:blog", async (req, res) => {
  await connectMongoDB();

  const { blog } = req.params;
  try {
    const blogData = await BlogModel.findOne({ slug: blog });
    if (blogData) {
      res.status(200).json({
        message: "Blog fetched successfully",
        blog: blogData,
      });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to fetch blog" });
  }
});

app.post("/:blogid", async (req, res) => {
  await connectMongoDB();
  const { slug, content } = req.body;
  const { blogid } = req.params;

  try {
    if (blogid == "new") {
      const newModel = new BlogModel({ slug, content });
      const savedBlog = await newModel.save();
      res
        .status(200)
        .json({ message: "Blog created successfully", blog: savedBlog });
    } else {
      const updatedBlog = await BlogModel.findOneAndUpdate(
        { _id: blogid },
        { slug, content },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Blog updated successfully", blog: updatedBlog });
    }
  } catch (err) {
    console.error(err);
    if (err.code === 11000 || err.keyValue?.slug == null) {
      res.status(409).json({ message: "Blog already exists" });
    } else {
      res.status(500).json({ message: "Unable to create blog" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
