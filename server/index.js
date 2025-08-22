const express = require("express");
const cors = require("cors");
const yaml = require("js-yaml");
require("dotenv").config();
const matter = require("gray-matter");

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
  const { edit } = req.query;
  try {
    const blogData = await BlogModel.findOne({ slug: blog });
    if (blogData) {
      const blog = matter(blogData.content);
      if (edit) {
        res.status(200).json({ message: "Blog fetched!!!", blog: blogData });
      } else {
        res.status(200).json({ message: "Blog fetched!!!", blog });
      }
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to fetch blog" });
  }
});

app.post("/related", async (req, res) => {
  await connectMongoDB();
  const { tags, slug } = req.body;

  function extractTagsFromContent(content) {
    const match = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (match) {
      try {
        const frontmatter = yaml.load(match[1]);
        return frontmatter.tags || [];
      } catch (err) {
        return [];
      }
    }
    return [];
  }

  try {
    const blogs = await BlogModel.find({});
    const tagFiltered = blogs.filter((doc) => {
      const temptags = extractTagsFromContent(doc.content);
      return temptags.some((tag) => tags.includes(tag));
    });
    const filtered = tagFiltered.filter((doc) => doc.slug !== slug);
    res.status(200).json({ message: "Blogs fetched successfully", filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get blogs" });
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
  console.log(`Server is running on port ${port}`);
});
