import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuitems = [
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blogs",
    path: "/blogs",
    badge: true,
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 px-5 py-3 inline-block w-full bg-slate-900 z-50">
      <header className="myfont max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex w-full lg:w-auto items-center justify-between">
          <a href="/" className="text-lg">
            <span className="font-bold text-gray-300">Web</span>
            <span className="text-white">Blog</span>
          </a>
          <div
            className="block lg:hidden cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <i className="fas fa-bars w-4 h-4 text-white"></i>
          </div>
        </div>
        <div
          className={`${
            !isOpen && "hidden"
          } w-full lg:flex flex-col lg:flex-row justify-center items-center p-2 lg:p-0 lg:mt-0 text-white`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-7">
            {menuitems.map((item, index) => (
              <div key={item.title} className="text-center">
                <a
                  href={item.path}
                  className="flex items-center text-white hover:text-gray-400"
                >
                  <span> {item.title}</span>
                  {/* {item.badge && (
                    <span className="ml-1 px-2 py-0.5 text-[10px] animate-pulse font-semibold uppercase text-white bg-indigo-600 rounded-full">
                      New
                    </span>
                  )} */}
                </a>
              </div>
            ))}
          </div>
          <div className="lg:hidden mt-2 p-1 px-2 rounded-md bg-sky-600">
            <div
              title="Not yet implemented"
              size="md"
              className="cursor-pointer flex gap-2 justify-center items-center"
            >
              <i className="far fa-globe"></i> EN
            </div>
          </div>
        </div>
        <div>
          <div className="text-white hidden lg:flex">
            <div
              title="Not yet implemented"
              size="md"
              className="cursor-pointer flex gap-2 items-center"
            >
              <i className="far fa-globe"></i> EN
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
