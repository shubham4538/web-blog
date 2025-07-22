import React from "react";

function Footer() {
  return (
    <footer className="myfont py-5 text-slate-700 bg-gray-300">
      <div className="text-center">
        <a href="/terms" className="hover:underline">
          Terms & Conditions
        </a>
        {" | "}
        <a href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </a>
      </div>
      <p className="text-center text-sm">
        Copyright © {new Date().getFullYear()} WebBlog. All rights reserved.
      </p>
      <p className="text-center text-sm">
        Made with ❤️ by{" "}
        <a
          href="https://shubhamsinghviportfolio.vercel.app/"
          target="_blank"
          rel="noopener"
          className="hover:underline"
        >
          Shubham
        </a>
      </p>
    </footer>
  );
}

export default Footer;
