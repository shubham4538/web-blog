import { Link } from "react-router-dom";
import matter from "gray-matter";

import Tags from "./Tags";

function RelatedBlog({ blog }) {
  const { content, data } = matter(blog.content);

  return (
    <div className="border rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link to={`/blog/${blog.slug}`}>
        <div className="h-full flex flex-col">
          <img
            src={data.image.src}
            alt=""
            className="aspect-[2/1] w-full object-cover"
          />
          <div className="flex flex-col h-full gap-1 md:gap-2 p-3 md:p-5">
            <div className="text-lg md:text-xl font-semibold">{data.title}</div>
            {/* <div className="flex-1 text-md text-gray-600 mb-2">
              {data.description}
            </div> */}
            <Tags tags={data.tags} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RelatedBlog;
