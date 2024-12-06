"use client";
import { BLOG } from "@/blog.config";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

// 사전에 사용할 아이콘 추가
library.add(faLock);

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
  //이동
  const onClick = (recordId: string) => {
    router.push(`/records/${recordId}`);
  };

  return (
    <div key={archiveTitle}>
      <div
        id={archiveTitle}
        className="pt-10  text-amber-400/50 font-semibold pb-4 text-2xl  "
      >
        {archiveTitle}
      </div>
      <ul>
        {archiveRecords[archiveTitle]?.map((post) => (
          <li
            key={post.id}
            className="border-l-4 border-amber-400/40  hover:border-amber-300 flex flex-row p-2 text-xs md:text-base items-center text-justify  hover:scale-x-105  dark:hover:border-amber-400 dark:border-amber-400/30 transform duration-500"
          >
            <div id={post?.publishDay}>
              <span className="text-amber-400/60 dark:hover:text-amber-300">
                {post.date?.start_date}
              </span>{" "}
              <span
                key={post.id}
                className="pl-2 pr-3 text-xs text-justify lh "
              >
                {post.pageIcon}
              </span>
              <div
                onClick={(e) => {
                  onClick(post.slug);
                }}
                // href={`${BLOG.SUB_PATH}/${post.slug}`}
                className="dark:text-neutral-400 hover:text-amber-400  dark:hover:text-amber-200 overflow-x-hidden hover:underline cursor-pointer text-neutral-600"
              >
                {post.title}{" "}
                <span className="text-xs">
                  {/* &nbsp;{post.password !== '' && '🔐'} */}
                  &nbsp;
                  {post.password !== "" && (
                    <>
                      <FontAwesomeIcon className="mr-1" icon={faLock} />
                      &nbsp;비공개
                    </>
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
