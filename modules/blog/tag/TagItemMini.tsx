import Link from "next/link";
import { TagIcon } from "lucide-react";

const TagItemMini = ({ data }) => {
  // console.log("tag::", tag);
  return (
    // <Link
    //   key={tag}
    //   href={selected ? "/" : `/tag/${encodeURIComponent(tag.name)}`}
    //   passHref
    //   className={`cursor-pointer inline-block rounded hover:bg-neutral-500 hover:text-white duration-200
    //     mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white
    //      ${
    //        selected
    //          ? "text-white  bg-black  "
    //          : `text-neutral-600 hover:shadow-xl notion-${tag.color}_background `
    //      }`}
    // >
    //   <div className="font-light ">
    //     {selected && <TagIcon className="mr-1" />}
    //     {tag.name + (tag.count ? `(${tag.count})` : "")}{" "}
    //   </div>
    // </Link>
    <div className="flex items-center gap-2">
      {data.tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-md text-xs"
        >
          {tag}
        </span>
      ))}
      {data.tags.length > 3 && (
        <span className="text-xs">+{data.tags.length - 3}</span>
      )}
    </div>
  );
};

export default TagItemMini;
