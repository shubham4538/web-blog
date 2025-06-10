import { useEffect, useState } from "react";
import axios from "axios";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import { remark } from "remark";

import GenerateDate from "../../lib/GenerateDate";

function HeadDetails({ content }) {
  const [rawMDX, setRawMDX] = useState();

  useEffect(() => {
    setRawMDX(
      remark()
        .use(remarkFrontmatter, ["yaml", "toml"])
        .use(remarkParseFrontmatter)
        .processSync(content)
    );
  }, []);

  return (
    rawMDX && (
      <div>
        <img
          alt={rawMDX.data.frontmatter.tags.map((tag) => tag).join(" ")}
          src={rawMDX.data.frontmatter.image.src}
          className="w-full rounded-xl object-cover aspect-[2/1] md:aspect-[3/1]"
        />
        <div className="justify-between flex items-center gap-3 pt-3">
          <time
            dateTime="2020-03-10"
            className="text-sm font-semibold text-gray-600"
          >
            {GenerateDate(rawMDX.data.frontmatter.date)}
          </time>
          <div className="flex gap-3">
            {rawMDX.data.frontmatter.tags.map((tag) => {
              return (
                <span
                  className="leading-[1] font-semibold text-sm p-1 px-1.5 rounded-lg bg-gray-200"
                  key={tag}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}

export default HeadDetails;
