import React, { useEffect, useState } from "react";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";

function AuthorDetails({ frontMatter, slug }) {
  const [rawMDX, setRawMDX] = useState();
  useEffect(() => {
    import(`../../data/pages/${slug}.mdx?raw`)
      .then((module) => {
        setRawMDX(
          remark()
            .use(remarkFrontmatter, ["yaml", "toml"])
            .use(remarkParseFrontmatter)
            .processSync(module.default)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    rawMDX && (
      <div className="my-5">
        <h5 className="m-1">Author:</h5>
        <div className="flex">
          <img
            alt=""
            src={rawMDX.data.frontmatter.author.image}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <div className="text-lg font-semibold">
              {rawMDX.data.frontmatter.author.name}
            </div>
            <div className="text-md text-gray-600">
              {rawMDX.data.frontmatter.author.designation}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default AuthorDetails;
