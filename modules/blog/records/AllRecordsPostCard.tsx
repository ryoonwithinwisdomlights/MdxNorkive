"use client";
import { CardProps } from "@/types";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AllRecordsPostCard = ({ post }: CardProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const currentSelected = pathname.split("/")[2] === post.id;

  return (
    <div
      key={post.id}
      className={`py-1 cursor-pointer px-2 hover:bg-neutral-100 hover:dark:text-white rounded-md dark:hover:bg-neutral-500  ${
        currentSelected ? " text-neutral-500" : ""
      }`}
    >
      <div className="flex flex-col w-full select-none">
        <Link href={`/${post.slug}`} passHref>
          <span className="text-xs pr-1">{post.pageIcon} </span>{" "}
          {post.title.length > 25
            ? post.title.substring(0, 25) + "..."
            : post.title}
        </Link>
      </div>
    </div>
  );
};

export default AllRecordsPostCard;
