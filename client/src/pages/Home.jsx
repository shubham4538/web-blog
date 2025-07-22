import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";

import GenerateDate from "../lib/GenerateDate";
import Hero from "../components/Hero";
import "../styles/home.css";
import Loading from "../components/Loading";

function Home() {
  const [matter, setMatter] = useState("");

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
      // setData(contentMatter);
      // alphaTags(contentMatter.flatMap((item) => item.data.frontmatter.tags));
    });
  }, []);

  //  px-5 mx-auto max-w-5xl

  return (
    <div className="myfont">
      <Hero />

      {/* Latest Blogs */}
      <div className="p-7 md:p-10 max-w-5xl mx-auto">
        <h1>Latest Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          {matter ? (
            matter
              .sort(
                (a, b) =>
                  new Date(b.data.frontmatter.date) -
                  new Date(a.data.frontmatter.date)
              )
              .slice(0, 3)
              .map(({ data, slug }) => {
                return (
                  <Link
                    className="blog-block"
                    to={`https://daily-webblog.vercel.app/blog/${slug}`}
                    key={slug}
                  >
                    <article className="flex flex-col gap-2">
                      <div className="relative aspect-[2/1] w-full">
                        <img
                          alt={data.frontmatter.image.alt}
                          src={data.frontmatter.image.src}
                          className="h-full w-full absolute object-cover rounded-lg"
                        />
                      </div>
                      <div className="text-lg font-sb  p-3">
                        {data.frontmatter.title}
                      </div>
                    </article>
                  </Link>
                );
              })
          ) : (
            <Loading height={""} />
          )}
        </div>
        <div className="mt-5 text-center">
          <Link
            to={"/blogs"}
            className="inline-block p-2 px-3 rounded-xl cursor-pointer text-white bg-blue-500"
          >
            See all Blogs <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* Blogs Category */}
      <div className="p-7 md:p-10 max-w-5xl mx-auto">
        <h1>Blogs Category</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
          <Link
            to={"/blogs?category=react"}
            className="category-block"
            style={{ backgroundImage: "url('./images/reactjs.jpg')" }}
          >
            React
          </Link>
          <Link
            to={"/blogs?category=nodejs"}
            className="category-block"
            style={{ backgroundImage: "url('./images/download2.jpg')" }}
          >
            Installation
          </Link>
          <Link
            to={"/blogs?category=mongodb"}
            className="category-block"
            style={{ backgroundImage: "url('./images/connect.jpg')" }}
          >
            Connection
          </Link>
        </div>
        <div className="mt-5 text-center">
          <Link
            to={"/blogs"}
            className="inline-block p-2 px-3 rounded-xl cursor-pointer text-white bg-blue-500"
          >
            See all Categories <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* About Me */}
      <div className="p-7 md:p-10 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">About Me</h1>
          <p className="mt-2">
            <b>Hi! I'm Shubham</b> — a full-stack developer who loves turning
            real-world problems into scalable solutions through clean,
            maintainable code.
            <br />
            <br />
            This blog is a collection of everything I learn, build, debug, and
            refine — from backend issues that kept me up at night to frontend
            tricks that made my life easier.
            <br />
            <br />
            Whether you're a developer looking for fixes, a learner seeking
            clarity, or just curious how things work behind the scenes — you're
            in the right place.
          </p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="https://shubham4538.github.io/Portfolio/"
            className="flex gap-2 p-2 justify-center rounded-md border-2 text-white bg-black border-black"
          >
            <i className="fas fa-user"></i>
            Portfolio
          </Link>
          <Link
            to="https://github.com/shubham4538"
            className="flex gap-2 p-2 justify-center rounded-md border-2 border-black"
          >
            <i className="fa-brands fa-github"></i>
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
