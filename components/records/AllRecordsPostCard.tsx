"use client";
import { BLOG } from "@/blog.config";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AllRecordsPostCard = ({ post, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (recordId: string) => {
    router.push(`/records/${recordId}`);
  };
  const currentSelected = pathname.split("?")[0] === "/" + post.slug;
  return (
    <div
      key={post.id}
      className={`${className} py-1 cursor-pointer px-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-500  ${
        currentSelected ? "bg-yellow-50 text-yellow-500" : ""
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
          onClick={(e) => {
            alert(`post.id:${post.id} `);
            onClick(post.id);
          }}
        >
          <span className="text-xs pr-1">{post.pageIcon} </span>{" "}
          {post.title.length > 25
            ? post.title.substr(0, 25) + "..."
            : post.title}
          {/* {post.title} */}
        </div>
      </div>
    </div>
  );
};

export default AllRecordsPostCard;
