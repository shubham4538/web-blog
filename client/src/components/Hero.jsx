import React from "react";

import heroImage from "../assets/images/hero.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="hero-content">
      <main className="min-h-screen flex flex-col lg:flex-row gap-10 items-center mx-auto max-w-5xl p-7 md:p-10">
        <div className="lg:order-1 p-0 w-2/3 sm:w-1/2 lg:w-full max-w-[370px]">
          <img src={heroImage} alt="Astronaut in the air" />
        </div>
        <div className="myfont">
          <span className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
            Your websites done easier with WebBlog
          </span>
          <p className="text-lg mt-3 text-slate-700 max-w-xl">
            Welcome to WebBlog, your hub for Web Development tips, tutorials,
            and updates. From beginners to pros, find everything you need to
            build and innovate for the web!
          </p>
        </div>
      </main>
    </main>
  );
}

export default Hero;
