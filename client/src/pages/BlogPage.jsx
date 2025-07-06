import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import matter from "gray-matter";
import CryptoJS from "crypto-js";
import axios from "axios";

import HeadDetails from "../components/BlogPage/HeadDetails";
import Body from "../components/BlogPage/Body";
import LinkBlock from "../components/LinkBlock";

import "../styles/blogpage.css";
import RelatedBlog from "../components/BlogPage/RelatedBlog";

function BlogPage() {
  const [continueButton, setContinueButton] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [frontmatter, setFrontmatter] = useState();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [nextLink, setNextLink] = useState("");
  const { slug } = useParams();
  const { state } = useLocation();
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
    if (state) {
      localStorage.setItem("short-code", JSON.stringify({ code: state.code }));
    } else if (localState) {
      setLinkLoading(true);
      const encryptedCode = encryptData(localState.code);
      axios
        .get(`https://linkmanurl.vercel.app/api/click/getlink/${encryptedCode}`)
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

  return !loading ? (
    <div className="myfont text-gray-900">
      <div className="blog max-w-3xl mx-auto mt-10 px-5">
        {/* Blog details */}
        <HeadDetails frontmatter={frontmatter} />

        {/* Linkman timer or Ads */}
        {state || localState ? (
          <LinkBlock
            setContinueButton={setContinueButton}
            setNextLink={setNextLink}
          />
        ) : (
          <>
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-8226681368050252"
              data-ad-slot="7191414055"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </>
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

        {/* <Link to={"/blogs"}>{`<- back`}</Link> */}
      </div>

      {/* Related Courses */}
      <div className="p-5">
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
