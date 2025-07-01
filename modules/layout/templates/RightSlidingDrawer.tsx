"use client";
import Announcement from "@/modules/announcement/Announcement";
import InfoCard from "../components/InfoCard";

import ArticleInfo from "@/modules/common/components/article/ArticleInfo";
import TableOfContents from "@/modules/common/components/TableOfContents";
import { useEffect, useState } from "react";

const RightSlidingDrawer = ({ props }) => {
  let result = props;
  if (!props) {
    result = null;
  }

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div
      className={
        "hidden w-3/12 xl:block dark:border-transparent relative z-10 border-l h-full border-neutral-200"
      }
    >
      <div className="px-6 sticky top-0">
        <ArticleInfo props={result} />
        <div className="">
          <TableOfContents props={props} />

          <InfoCard />
          <Announcement />
        </div>
      </div>
    </div>
  );
};

export default RightSlidingDrawer;
