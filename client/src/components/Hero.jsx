import React from "react";

import heroImage from "../assets/images/hero.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <main className="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24">
      <div className="py-6 md:order-1 hidden md:block">
        <img src={heroImage} alt="Astronaut in the air" />
      </div>
      <div className="myfont">
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
          Your websites done easier with WebBlog
        </h1>
        <p className="text-lg mt-3 text-slate-700 max-w-xl">
          Welcome to WebBlog, your hub for Web Development tips, tutorials, and
          updates. From beginners to pros, find everything you need to build and
          innovate for the web!
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="https://shubham4538.github.io/Portfolio/"
            className="bg-black text-white p-3 px-5 rounded-md flex gap-1 justify-center"
          >
            <i className="fas fa-user w-5 h-5"></i>
            Portfolio
          </Link>
          <Link
            to="https://github.com/shubham4538"
            className="flex gap-1 p-3 px-5 justify-center rounded-md border-2 border-black"
          >
            <i className="fa-brands fa-github w-5 h-5"></i>
            GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Hero;
