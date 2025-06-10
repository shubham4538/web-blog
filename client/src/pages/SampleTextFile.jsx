import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { remark } from "remark";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import bcrypt from "bcryptjs";

import GenerateDate from "../lib/GenerateDate.js";

import "../styles/blogpage.css";

function SampleTextFile() {
  const { blog } = useParams();
  const [searchParams] = useSearchParams();
  const [slug, setSlug] = useState(blog || "");
  const [blogId, setBlogId] = useState("new");
  const [matter, setMatter] = useState();
  const [source, setSource] = useState();
  const [rawMdx, setRawMdx] = useState("");

  useEffect(() => {
    // const hashedPassword = bcrypt.hashSync("", 10);
    // console.log("Hashed Password:", hashedPassword);
  }, []);

  // Fetch blog
  useEffect(() => {
    (async () => {
      const searchQuery = searchParams.get("hp");
      const code = import.meta.env.VITE_SECRET_CODE;
      const auth = await bcrypt.compare(code, searchQuery);
      if (!auth) {
        location.href = "/blogs";
      }

      try {
        const response = await axios.get(`http://localhost:3001/${blog}`);
        if (response.data) {
          console.log("Blog data fetched successfully:", response.data);
          setBlogId(response.data.blog._id);
          setRawMdx(response.data.blog.content);
        } else {
          console.error("No data found for the blog");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    })();
  }, []);

  // Parse MDX and frontmatter
  useEffect(() => {
    (async () => {
      const frontData = remark()
        .use(remarkFrontmatter, ["yaml", "toml"])
        .use(remarkParseFrontmatter)
        .processSync(rawMdx);
      setMatter(frontData.data);

      const filterHtml = rawMdx.replace(/^---[\s\S]*?^---\s*/m, "");
      const mdxSource = await serialize(filterHtml);
      setSource(mdxSource);
    })();
  }, [rawMdx]);

  const submitBlog = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/${blogId}`, {
        slug,
        content: rawMdx,
      });
      console.log("Blog submitted successfully:", response.data);
      if (response.data.blog.slug !== blog) {
        location.href = `/edit/${response.data.blog.slug}`;
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col border-r border-gray-300 bg-white shadow-md">
        {/* Textarea (Top 80%) */}
        <textarea
          defaultValue={rawMdx}
          onChange={(e) => setRawMdx(e.target.value)}
          className="flex-grow resize-none p-4 border-b border-gray-300 outline-none font-mono text-sm"
          placeholder="Write your MDX content here..."
        />

        {/* Slug Input (10%) */}
        <div className="h-[10%] flex items-center justify-between gap-2 px-4 py-2 border-t border-gray-200 bg-gray-50">
          <input
            type="text"
            defaultValue={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Enter slug"
            className="flex-1 border px-3 py-2 rounded-md outline-none text-sm"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={submitBlog}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col flex-grow bg-white shadow-inner">
        {/* Frontmatter (Top 25%) */}
        <div className="h-1/4 p-4 border-b bg-gray-50 overflow-auto">
          {matter?.frontmatter ? (
            <article className="flex flex-col lg:flex-row gap-5">
              <div className="relative aspect-[2/1] lg:w-80 lg:flex-shrink-0 lg:aspect-[3/2]">
                <img
                  alt={matter.frontmatter.image?.src || ""}
                  src={matter.frontmatter.image?.src || ""}
                  className="absolute h-full w-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600">
                    {GenerateDate(matter.frontmatter.date || "01-01-1999")}
                  </span>
                  {matter.frontmatter.tags?.map((tag) => {
                    return (
                      <span
                        className="leading-[1] font-semibold text-sm p-1 px-1.5 rounded-lg bg-gray-200"
                        key={tag}
                      >
                        {tag}
                      </span>
                    );
                  }) || "tags"}
                </div>
                <div className="pt-4 flex-1">
                  <div className="mb-2 text-xl font-semibold">
                    {matter.frontmatter?.title}
                  </div>
                  <p className="m-0 text-lg">
                    {matter.frontmatter?.description}
                  </p>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-4">
                    <img
                      alt=""
                      src="https://res.cloudinary.com/shubham4538/image/upload/v1739338408/User-profiles/screenshot_1_cysy7w.jpg"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="">
                      <div className="font-semibold">Anonymous</div>
                      <div className="text-sm text-gray-700">
                        Software Developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <p className="text-gray-400 italic">No frontmatter detected</p>
          )}
        </div>

        {/* Rendered MDX (Bottom 75%) */}
        <div className="blog h-3/4 overflow-auto p-6 prose max-w-none">
          {rawMdx ? (
            <MDXRemote {...source} />
          ) : (
            <p className="text-gray-400 italic">No content to render</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SampleTextFile;
