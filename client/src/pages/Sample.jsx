import React from "react";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { remark } from "remark";

import sampler from "../data/pages/sample.mdx?raw";

function Sample() {
  console.log(sampler);
  const fileOfRemark = remark()
    .use(remarkFrontmatter, ["yaml", "toml"])
    .use(remarkParseFrontmatter)
    .processSync(sampler);
  console.log(fileOfRemark);

  return <div>Sample</div>;
}

export default Sample;
