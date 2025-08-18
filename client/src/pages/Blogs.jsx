import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { remark } from "remark";

import GoogleAdsFluid from "../components/GoogleAdsFluid.jsx";
import GenerateDate from "../lib/GenerateDate.js";
import Loading from "../components/Loading.jsx";

function Blogs() {
  const [data, setData] = useState([]);
  const [matter, setMatter] = useState("");
  const [allTags, setAllTags] = useState("");
  const [params] = useSearchParams();

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
      setData(contentMatter);
      alphaTags(contentMatter.flatMap((item) => item.data.frontmatter.tags));
    });
  }, []);

  useEffect(() => {
    if (!matter) return;
    if (params.get("category")) {
      const category = params.get("category");
      const filteredBlogs = matter.filter((item) =>
        item.data.frontmatter.tags.some((tag) => tag.toLowerCase() === category)
      );
      setMatter(filteredBlogs);
      console.log("cats");
    } else if (params.get("search")) {
      const search = params.get("search").toLowerCase();
      const filteredBlogs = matter.filter(
        (item) =>
          item.data.frontmatter.title.toLowerCase().includes(search) ||
          item.data.frontmatter.description.toLowerCase().includes(search) ||
          item.data.frontmatter.tags.some((tag) => tag.toLowerCase() === search)
      );
      setMatter(filteredBlogs);
      console.log("sehs");
    } else {
      setMatter(data);
      console.log("nada");
    }
  }, [params, allTags]);

  const alphaTags = (tags) => {
    const uniqueTags = Array.from(new Set(tags));
    setAllTags(uniqueTags.sort((a, b) => a.localeCompare(b)));
    const tagCount = uniqueTags.reduce((acc, tag) => {
      acc[tag] = tags.filter((t) => t === tag).length;
      return acc;
    }, {});

    setAllTags(tagCount);
  };

  return matter ? (
    <div className="myfont px-5 mx-auto max-w-7xl">
      <div className="mt-2 md:mt-5 max-w-5xl lg:m-auto">
        {/* Head */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-900">
          <h1 className="">Latest Blogs</h1>

          {/* Search and Category */}
          <div className="text-sm md:text-lg flex gap-3 items-center">
            {/* Search */}
            <form
              className="w-max p-2 py-1 md:py-2 rounded-lg border-2 border-gray-900"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `?search=${e.target[0].value}`;
              }}
            >
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="w-32 md:w-max ml-2 outline-none"
                placeholder="Search..."
              />
            </form>

            {/* Category */}
            <div className="relative group inline-block cursor-pointer">
              <div className="p-2 py-1 md:py-2 rounded-lg border-2 border-gray-900">
                Category
                <i className="ml-2 fas fa-chevron-down"></i>
              </div>

              <div className="absolute right-0 hidden group-hover:flex flex-col gap-2 bg-white border border-gray-200 p-4 rounded-lg shadow-lg z-50 h-[50vh] overflow-auto">
                {allTags &&
                  Object.entries(allTags).map(([tag, count]) => (
                    <a
                      href={`?category=${tag.toLowerCase()}`}
                      className="w-max hover:text-blue-600 text-md"
                      key={tag}
                    >
                      {tag} ({count})
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="flex flex-col gap-5 md:gap-8 m-auto max-w-[35rem] py-5 md:p-10 md:max-w-[50rem] lg:max-w-[65rem]">
        <GoogleAdsFluid />
        {matter
          .sort(
            (a, b) =>
              new Date(b.data.frontmatter.date) -
              new Date(a.data.frontmatter.date)
          )
          .map(({ data, slug }) => {
            return (
              <Link
                className="border border-gray-300 rounded-xl overflow-hidden"
                to={`https://daily-webblog.vercel.app/blog/${slug}`}
                key={slug}
              >
                <article className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative aspect-[2/1] lg:w-80 lg:flex-shrink-0">
                    <img
                      alt={data.frontmatter.image.alt}
                      src={data.frontmatter.image.src}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-3 p-3">
                    {/* Date & Tags */}
                    <div className="flex gap-2 items-center justify-between">
                      <div className="shrink-0 w-max text-sm md:text-md font-semibold text-gray-600">
                        {GenerateDate(data.frontmatter.date)}
                      </div>
                      <div className="flex-1 flex whitespace-nowrap gap-2 md:gap-3 justify-end">
                        {data.frontmatter.tags.map((tag) => {
                          return (
                            <span
                              className="tracking-wider w-max font-semibold text-[11px] md:text-[13px] p-0.5 px-2 rounded-lg bg-gray-200"
                              key={tag}
                            >
                              {tag.toUpperCase()}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Title & Desc*/}
                    <div className="flex flex-col gap-2">
                      <div className="text-xl font-semibold">
                        {data.frontmatter.title}
                      </div>
                      <span className="text-md text-gray-500">
                        {data.frontmatter.description}
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <img
                        alt=""
                        src="https://res.cloudinary.com/shubham4538/image/upload/v1739338408/User-profiles/screenshot_1_cysy7w.jpg"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="">
                        <div className="font-semibold">Shubham</div>
                        <div className="text-sm text-gray-700">
                          Software Developer
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
      </main>
    </div>
  ) : (
    <Loading height={"min-h-screen"} />
  );
}

export default Blogs;
