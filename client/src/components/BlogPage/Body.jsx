import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

import "highlight.js/styles/base16/ir-black.css";

function Body({ content }) {
  const [source, setSource] = useState();
  hljs.registerLanguage("javascript", javascript);

  useEffect(() => {
    // Highlight code blocks
    const codeBlock = document.querySelectorAll("pre code");
    codeBlock.forEach((block) => {
      const code = block.innerText;
      const highlightedCode = hljs.highlight(code, {
        language: "javascript",
      }).value;
      block.innerHTML = highlightedCode;
    });

    // Copy to clipboard
    const preBlock = document.querySelectorAll("pre");
    preBlock.forEach((block) => {
      const text = block.innerText;
      block.onclick = () => {
        navigator.clipboard.writeText(text).then(() => {
          alert("Copied to clipboard!");
        });
      };
    });
  }, [source]);

  useEffect(() => {
    (async () => {
      const mdxSource = await serialize(content);
      setSource(mdxSource);
    })();
  }, []);

  return source && <MDXRemote {...source} />;
}

export default Body;
