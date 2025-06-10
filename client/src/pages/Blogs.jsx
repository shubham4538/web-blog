import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { remark } from "remark";

import GenerateDate from "../lib/GenerateDate.js";

function Blogs() {
  const [matter, setMatter] = useState([]);

  useEffect(() => {
    axios.get("https://server-webblog.vercel.app/getblogs").then((response) => {
      const contentMatter = response.data.blogs.map((doc) => {
        const frontData = remark()
          .use(remarkFrontmatter, ["yaml", "toml"])
          .use(remarkParseFrontmatter)
          .processSync(doc.content);

        return {
          slug: doc.slug,
          data: frontData.data,
        };
      });
      setMatter(contentMatter);
    });
  }, []);

  return matter ? (
    <div className="myfont px-5 mx-auto max-w-7xl">
      <div className="mt-16 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          My Blogs
        </h1>
        <p className="text-lg mt-4 text-slate-600">
          We write about building startups and thoughts going on our mind.
        </p>
      </div>
      <main className="">
        <div className="flex flex-col gap-8 m-auto max-w-[35rem] md:px-10 md:max-w-[50rem] lg:max-w-[65rem]">
          {matter
            .sort(
              (a, b) =>
                new Date(b.data.frontmatter.date) -
                new Date(a.data.frontmatter.date)
            )
            .map(({ data, slug }) => {
              return (
                <Link
                  className="pt-8 [&:not(:first-child)]:border-t-2 border-t-gray-400"
                  to={`https://daily-webblog.vercel.app/blog/${slug}`}
                  key={data.frontmatter.image.src}
                >
                  <article className="flex flex-col lg:flex-row gap-5">
                    <div className="relative aspect-[2/1] lg:w-80 lg:flex-shrink-0 lg:aspect-[3/2]">
                      <img
                        alt={data.frontmatter.image.alt}
                        src={data.frontmatter.image.src}
                        className="absolute h-full w-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-600">
                          {GenerateDate(data.frontmatter.date)}
                        </span>
                        {data.frontmatter.tags.map((tag) => {
                          return (
                            <span
                              className="leading-[1] font-semibold text-sm p-1 px-1.5 rounded-lg bg-gray-200"
                              key={tag}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                      <div className="pt-4 flex-1">
                        <div className="mb-2 text-xl font-semibold">
                          {data.frontmatter.title}
                        </div>
                        <p className="m-0 text-lg">
                          {data.frontmatter.description}
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
                        {/* BlogPage.jsx | line: 85 */}
                        {/* <div className="flex items-center gap-4">
                        <img
                          alt=""
                          src={data.frontmatter.author.image}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="">
                          <div className="font-semibold">
                            {data.frontmatter.author.name}
                          </div>
                          <div className="text-sm text-gray-700">
                            {data.frontmatter.author.designation}
                          </div>
                        </div>
                      </div> */}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
        </div>
      </main>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default Blogs;
