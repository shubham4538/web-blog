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
    <div className="inline-block w-full h-full max-w-7xl m-auto bg-slate-900">
      <header className="myfont flex flex-col lg:flex-row justify-between items-center m-2 mx-5">
        <div className="flex w-full lg:w-auto items-center justify-between">
          <a href="/" className="text-lg">
            <span className="font-bold text-slate-800">Web</span>
            <span className="text-slate-500">Blog</span>
          </a>
          <div
            className="block lg:hidden cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <i className="fas fa-bars w-4 h-4 text-gray-800"></i>
          </div>
        </div>
        <div
          className={`${
            !isOpen && "hidden"
          } w-full lg:w-auto mt-2 lg:flex lg:mt-0`}
        >
          <div className="flex flex-col lg:flex-row lg:gap-3">
            {menuitems.map((item, index) => (
              <div key={item.title} className="text-center">
                <a
                  href={item.path}
                  className="flex lg:px-3 py-2 items-center text-gray-600 hover:text-gray-900"
                >
                  <span> {item.title}</span>
                  {item.badge && (
                    <span className="ml-1 px-2 py-0.5 text-[10px] animate-pulse font-semibold uppercase text-white bg-indigo-600 rounded-full">
                      New
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>
          <div className="lg:hidden flex items-center mt-3 gap-4">
            <Link href="" size="md">
              Hello
            </Link>
          </div>
        </div>
        <div>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="" size="md">
              Hello
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
