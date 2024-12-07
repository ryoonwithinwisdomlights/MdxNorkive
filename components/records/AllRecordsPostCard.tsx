"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AllRecordsPostCard = ({ post, className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (recordId: string) => {
    router.push(`/records/${recordId}`);
  };
  //const currentSelected = pathname;
  const currentSelected = pathname.split("?")[0] === "/" + post.slug;
  // console.log("pathname:::", pathname);
  // console.log("post.slug;:::", post.slug);
  return (
    <Link
      href={`/records/${post.id}`}
      key={post.id}
      onMouseMove={(e) => {
        console.log("pathname:::", pathname);
        console.log("post.slug;:::", post.slug);
        console.log("post.id;:::", post.id);
      }}
      className={`${className} py-1 cursor-pointer px-2 hover:bg-neutral-100 rounded-md dark:hover:bg-neutral-500  ${
        currentSelected ? "bg-yellow-50 text-yellow-500" : ""
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <div
        // onClick={(e) => {
        //   alert(`post.id:${post.id} `);
        //   onClick(post.id);
        // }}
        >
          <span className="text-xs pr-1">{post.pageIcon} </span>{" "}
          {post.title.length > 25
            ? post.title.substr(0, 25) + "..."
            : post.title}
        </div>
      </div>
    </Link>
  );
};

export default AllRecordsPostCard;
