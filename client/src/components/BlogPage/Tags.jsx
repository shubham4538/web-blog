import React from "react";

function Tags({ tags }) {
  return (
    <div className="flex gap-2 md:gap-3">
      {tags.map((tag) => {
        return (
          <span
            className="leading-[1] text-xs md:text-sm p-1 px-1.5 rounded-md bg-gray-200"
            key={tag}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

export default Tags;
