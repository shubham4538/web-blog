import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import bcrypt from "bcryptjs";
import axios from "axios";

import GenerateDate from "../lib/GenerateDate.js";
import "../styles/blogpage.css";

function SampleTextFile() {
  const { blog } = useParams();
  const [searchParams] = useSearchParams();
  const [slug, setSlug] = useState(blog || "");
  const [error, setError] = useState(null);
  const [blogId, setBlogId] = useState("new");
  const [frontmatter, setFrontMatter] = useState();
  const [source, setSource] = useState();
  const [rawMdx, setRawMdx] = useState("");

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
        const response = await axios.get(
          `https://server-webblog.vercel.app/${blog}?edit=true`
        );
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
      try {
        const { content, data: frontmatter } = matter(rawMdx);
        setFrontMatter(frontmatter);
        const mdxSource = await serialize(content);
        setSource(mdxSource);
        setError(null);
      } catch (err) {
        setSource(null);
        setError("Error parsing MDX content");
      }
    })();
  }, [rawMdx]);

  function ErrorFallback({ error }) {
    return (
      <div className="text-red-500 bg-red-50 border p-4 rounded">
        <p className="font-bold">Error rendering MDX:</p>
        <pre className="text-xs whitespace-pre-wrap">{error.message}</pre>
      </div>
    );
  }

  const submitBlog = async () => {
    try {
      const response = await axios.post(
        `https://server-webblog.vercel.app/${blogId}`,
        {
          slug,
          content: rawMdx,
        }
      );
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
          {frontmatter ? (
            <article className="flex flex-col lg:flex-row gap-5">
              <div className="relative aspect-[2/1] lg:w-80 lg:flex-shrink-0 lg:aspect-[3/2]">
                <img
                  alt={frontmatter.image?.src || ""}
                  src={frontmatter.image?.src || ""}
                  className="absolute h-full w-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-600">
                    {GenerateDate(frontmatter.date || "01-01-1999")}
                  </span>
                  {frontmatter.tags?.map((tag) => {
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
                    {frontmatter?.title}
                  </div>
                  <p className="m-0 text-lg">{frontmatter?.description}</p>
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
            error ? (
              <p className="text-gray-400 italic">{error}</p>
            ) : (
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <MDXRemote {...source} />
              </ErrorBoundary>
            )
          ) : (
            <p className="text-gray-400 italic">No content to render</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SampleTextFile;
