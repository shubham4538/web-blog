import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

import HeadDetails from "../components/BlogPage/HeadDetails";
import Body from "../components/BlogPage/Body";
import LinkBlock from "../components/LinkBlock";

import "../styles/blogpage.css";

function BlogPage() {
  const [continueButton, setContinueButton] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [nextLink, setNextLink] = useState("");
  const { slug } = useParams();
  const { state } = useLocation();
  const localState = JSON.parse(localStorage.getItem("short-code"));

  useEffect(() => {
    axios.get(`https://server-webblog.vercel.app/${slug}`).then((response) => {
      setContent(response.data.blog.content);
      setLoading(false);
    });
  }, []);

  function encryptData(data) {
    const encryptedData = encodeURIComponent(
      CryptoJS.AES.encrypt(data, "linkmansecret").toString()
    );
    return encryptedData;
  }

  const stepTwo = () => {
    if (state) {
      localStorage.setItem("short-code", JSON.stringify({ code: state.code }));
    } else if (localState) {
      setLinkLoading(true);
      const encryptedCode = encryptData(localState.code);
      axios
        .get(`https://linkmanlinks.vercel.app/getlink/${encryptedCode}`)
        .then((response) => {
          console.log(response);
          localStorage.removeItem("short-code");
          window.open(response.data.link, "_blank");
          setLinkLoading(false);
        });
      return;
    }
    window.open(nextLink, "_blank");
    // navigate(nextLink, {
    //   state: { code: state.code, step: 2 },
    // });
  };

  return (
    !loading && (
      <div className="blog myfont max-w-3xl mx-auto mt-10 px-5">
        {/* Blog details */}
        <HeadDetails content={content} />

        {/* Linkman timer or link */}
        {(state || localState) && (
          <LinkBlock
            setContinueButton={setContinueButton}
            setNextLink={setNextLink}
          />
        )}

        {/* Blog Data */}
        <Body content={content} />

        {/* Author details */}
        {/* Might need changes as well */}
        {/* 
        Commented because of use of single person blogs
        might change when new  authors are added
        Use static untill then
        also removed from mdx frontmatter 
      */}
        {/* <AuthorDetails slug={slug} /> */}
        <div className="my-5">
          <h5 className="m-1">Author:</h5>
          <div className="flex">
            <img
              alt=""
              src="https://res.cloudinary.com/shubham4538/image/upload/v1739338408/User-profiles/screenshot_1_cysy7w.jpg"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="text-lg font-semibold">Anonymous</div>
              <div className="text-md text-gray-600">Software Developer</div>
            </div>
          </div>
        </div>

        {/* Linkman continue button */}
        <div className="text-center">
          {(state || localState) && continueButton && (
            <button
              onClick={stepTwo}
              className="w-max p-2 px-3 rounded-md text-center text-white bg-sky-400"
            >
              {linkLoading ? "Loading..." : "Continue"}
            </button>
          )}
        </div>

        <Link to={"/blogs"}>{`<- back`}</Link>
      </div>
    )
  );
}

export default BlogPage;
