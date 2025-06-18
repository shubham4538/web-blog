import GenerateDate from "../../lib/GenerateDate";
import Tags from "./Tags";

function HeadDetails({ frontmatter }) {
  return (
    <div>
      <img
        alt={frontmatter.tags.map((tag) => tag).join(" ")}
        src={frontmatter.image.src}
        className="w-full rounded-xl object-cover aspect-[2/1] md:aspect-[3/1]"
      />
      <div className="justify-between flex items-center gap-3 pt-3">
        <time
          dateTime="2020-03-10"
          className="text-sm font-semibold text-gray-600"
        >
          {GenerateDate(frontmatter.date)}
        </time>
        <Tags tags={frontmatter.tags} />
      </div>
    </div>
  );
}

export default HeadDetails;
