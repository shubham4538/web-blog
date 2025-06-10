import React from "react";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";

function Home() {
  return (
    <div className="px-5 mx-auto max-w-7xl">
      <Hero />
      <div className="myfont bg-black p-8 md:px-20 md:py-20 mx-auto rounded-lg flex flex-col items-center text-center">
        <h2 className="text-white text-4xl md:text-6xl tracking-tight">
          Build faster websites.
        </h2>
        <p className="text-slate-400 mt-4 text-lg md:text-xl">
          Pull content from anywhere and serve it fast with Astro's next-gen
          island archite cture.
        </p>
        <div className="flex mt-5">
          <Link
            to="/blogs"
            className="p-3 px-5 font-semibold rounded-md bg-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
