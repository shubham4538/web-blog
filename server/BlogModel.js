const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    slug: String,
    content: String,
  },
  { timestamps: true }
);

BlogSchema.index(
  { slug: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const Blog = mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);
module.exports = Blog;
