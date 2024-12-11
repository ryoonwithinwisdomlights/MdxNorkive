import React from "react";
import NotionIcon from "../shared/NotionIcon";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCalendar,
  faCalendarCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import LazyImage from "../shared/LazyImage";
import { BLOG } from "@/blog.config";
// 사전에 사용할 아이콘 추가
library.add(faEye, faCalendar, faCalendarCheck);

const SingleRecordsInroduction = ({ post, siteInfo }) => {
  return (
    <>
      {" "}
      <h1 className="text-3xl pt-12  dark:text-neutral-100">
        <NotionIcon icon={post?.pageIcon} />
        {post?.title}
      </h1>
      <section
        className="flex-wrap
shadow-text-md flex text-sm
justify-start mt-4 text-neutral-500
 dark:text-neutral-400 font-light py-2
 "
      >
        <div className="flex justify-start dark:text-neutral-200 ">
          <span className="whitespace-nowrap">
            <FontAwesomeIcon className="mr-2" icon={faCalendar} />
            {post?.publishDay}
          </span>{" "}
          <span className="mx-1"> | </span>{" "}
          <span className="whitespace-nowrap mr-2">
            <FontAwesomeIcon className="mr-2" icon={faCalendarCheck} />

            {post?.lastEditedDay}
          </span>
          <span className="hidden busuanzi_container_page_pv ">
            <FontAwesomeIcon
              className="mr-2 font-light whitespace-nowrap "
              icon={faEye}
            />

            <span className="busuanzi_value_page_pv"></span>
          </span>
        </div>
        <span className="mx-1 mr-2"> | </span>{" "}
        <Link href="/" passHref legacyBehavior>
          <div className="flex flex-row">
            <LazyImage
              src={siteInfo?.icon}
              className="rounded-full cursor-pointer dark:border dark:border-neutral-300"
              width={20}
              height={20}
              alt={BLOG.AUTHOR}
            />

            <div className="mr-3 ml-2 my-auto text-neutral-400 cursor-pointer">
              {BLOG.AUTHOR}
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default SingleRecordsInroduction;
