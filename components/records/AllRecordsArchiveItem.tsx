"use client";
import { BLOG } from "@/blog.config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockIcon } from "lucide-react";

/**
 * Records grouping

 * @param {*} param0
 * @returns
 */
export default function AllRecordsArchiveItem({
  archiveTitle,
  archiveRecords,
}: {
  archiveTitle: string;
  archiveRecords: [];
}) {
  const router = useRouter();

  return (
    <div key={archiveTitle}>
      <div
        id={archiveTitle}
        className="pt-10  text-[#cbcac4e2] font-semibold pb-4 text-2xl  "
      >
        {archiveTitle}
      </div>
      <ul>
        {archiveRecords[archiveTitle]?.map((post) => (
          <li
            key={post.id}
            className="border-l-4 border-[#f1efe9e2]  hover:border-[#cbcac4e2] flex flex-row p-2 text-xs md:text-base items-center text-justify  hover:scale-x-105  dark:hover:border-neutral-400 dark:border-neutral-400/30 transform duration-500"
          >
            <div id={post?.publishDay}>
              <span className="text-[#cbcac4e2] dark:hover:text-neutral-300">
                {post.date?.start_date}
              </span>{" "}
              <span
                key={post.id}
                className="pl-2 pr-3 text-xs text-justify lh "
              >
                {post.pageIcon}
              </span>
              <Link
                href={`records/${post.id}`}
                className="dark:text-neutral-400 hover:text-neutral-400  dark:hover:text-neutral-200 overflow-x-hidden hover:underline cursor-pointer text-neutral-600"
              >
                {post.title}{" "}
                <span className="text-xs">
                  {/* &nbsp;{post.password !== '' && '🔐'} */}
                  &nbsp;
                  {post.password !== "" && (
                    <>
                      <LockIcon className="mr-1" />
                      &nbsp;비공개
                    </>
                  )}
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
