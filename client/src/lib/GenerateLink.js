import * as allPages from "../data/pages/index";

const GenerateLink = () => {
  // const prefix = "https://shubham-web-blog.vercel.app"
  // const prefix = "http://localhost:5173";
  const blogs = Object.keys(allPages);
  const link = `/blog/${blogs[Math.floor(Math.random() * blogs.length)]}`;
  return link;
};

export default GenerateLink;
