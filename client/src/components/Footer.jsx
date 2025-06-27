import React from "react";

function Footer() {
  return (
    <footer className="myfont my-10">
      <p className="text-center text-sm text-slate-500">
        Copyright © {new Date().getFullYear()} WebBlog. All rights reserved.
      </p>
      <p className="text-center text-xs text-slate-500 mt-1">
        Made with ❤️ by{" "}
        <a
          href="https://shubhamsinghviportfolio.vercel.app/"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Anonymous
        </a>
      </p>
    </footer>
  );
}

export default Footer;
