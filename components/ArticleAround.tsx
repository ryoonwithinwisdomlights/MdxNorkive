"use client";
import Link from "next/link";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 사전에 사용할 아이콘 추가
library.add(faAngleDoubleLeft, faAngleDoubleRight);

/**
 * Previous article, next article
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleAround({ prev, next }) {
  if (!prev || !next) {
    return <></>;
  }
  return (
    <section className="text-neutral-800 dark:text-neutral-400 h-12 flex items-center justify-between space-x-5 my-4">
      <Link
        href={`/${prev.slug}`}
        passHref
        className="text-sm cursor-pointer justify-start items-center flex hover:underline duration-300"
      >
        <FontAwesomeIcon className="mr-1" icon={faAngleDoubleLeft} />

        {prev.title}
      </Link>
      <Link
        href={`/${next.slug}`}
        passHref
        className="text-sm cursor-pointer justify-end items-center flex hover:underline duration-300"
      >
        {next.title}
        <FontAwesomeIcon className="mr-1 my-1 " icon={faAngleDoubleRight} />
      </Link>
    </section>
  );
}
