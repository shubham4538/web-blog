import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import matter from "gray-matter";
import CryptoJS from "crypto-js";
import axios from "axios";

import HeadDetails from "../components/BlogPage/HeadDetails";
import Body from "../components/BlogPage/Body";
import LinkBlock from "../components/LinkBlock";
import RelatedBlog from "../components/BlogPage/RelatedBlog";

import "../styles/blogpage.css";
import GoogleAds from "../components/GoogleAds";

function BlogPage() {
  const { slug } = useParams();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [frontmatter, setFrontmatter] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [nextLink, setNextLink] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [continueButton, setContinueButton] = useState(false);
  const localState = JSON.parse(localStorage.getItem("short-code"));

  useEffect(() => {
    axios.get(`https://server-webblog.vercel.app/${slug}`).then((response) => {
      const { content: content, data: frontmatter } = matter(
        response.data.blog.content
      );
      setContent(content);
      setFrontmatter(frontmatter);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!frontmatter) return;
    axios
      .post(`https://server-webblog.vercel.app/related`, {
        tags: frontmatter?.tags,
        slug,
      })
      .then((response) => {
        setRelatedBlogs(response.data.filtered);
      });
  }, [frontmatter]);

  function encryptData(data) {
    const encryptedData = encodeURIComponent(
      CryptoJS.AES.encrypt(data, "linkmansecret").toString()
    );
    return encryptedData;
  }

  const stepTwo = () => {
    localStorage.removeItem("timer-finished");

    if (localState.step == 1) {
      localStorage.setItem(
        "short-code",
        JSON.stringify({ step: 2, code: localState.code })
      );
    } else if (localState.step == 2) {
      setLinkLoading(true);
      const encryptedCode = encryptData(localState.code);
      axios
        .get(`https://linkmanurl.vercel.app/api/click/getlink/${encryptedCode}`)
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("short-code");
          window.open(response.data.link, "_blank");
          setLinkLoading(false);
        });
      return;
    }
    window.open(nextLink, "_blank");
  };

  return !loading ? (
    <div className="myfont text-gray-900">
      <div className="blog max-w-3xl mx-auto mt-10 px-5">
        {/* Blog details */}
        <HeadDetails frontmatter={frontmatter} />

        {/* Linkman timer or Ads */}
        {localState ? (
          <LinkBlock
            setContinueButton={setContinueButton}
            setNextLink={setNextLink}
            step={localState.step}
          />
        ) : (
          <GoogleAds />
        )}

        {/* Blog Data */}
        <Body content={content} />

        <hr className="border-[1px]" />

        {/* <AuthorDetails slug={slug} /> */}
        <div className="my-5">
          <div className="flex gap-3">
            <img
              alt=""
              src="https://res.cloudinary.com/shubham4538/image/upload/v1739338408/User-profiles/screenshot_1_cysy7w.jpg"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <div className="text-xs font-semibold text-gray-600">AUTHOR</div>
              <div className="text-lg font-semibold">Shubham</div>
            </div>
          </div>
        </div>

        {/* Linkman continue button */}
        <div className="text-center" id="continue-button">
          <GoogleAds />
          {localState && continueButton && (
            <>
              <button
                onClick={stepTwo}
                className="px-1 border text-black border-gray-700 bg-blue-400"
              >
                {linkLoading ? "Loading..." : "Continue"}
              </button>
              <GoogleAds />
            </>
          )}
        </div>

        {/* <Link to={"/blogs"}>{`<- back`}</Link> */}
      </div>

      {/* Related Courses */}
      <div className="p-5 max-w-5xl mx-auto">
        <h1>Related Blogs</h1>
        {relatedBlogs && relatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBlogs.map((blog) => (
              <RelatedBlog key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related blogs found.</p>
        )}
      </div>
    </div>
  ) : (
    <p className="text-gray-500 text-xl text-center">Loading...</p>
  );
}

export default BlogPage;
