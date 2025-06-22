"use client";
import ArticleInfo from "@/modules/common/components/article/ArticleInfo";
import Catalog from "@/modules/common/components/catalog/Catalog";
import React from "react";
import InfoCard from "../components/InfoCard";
import Announcement from "@/modules/announcement/Announcement";

type Props = {};

const RightSlidingDrawer = (props: Props) => {
  return (
    <div
      // style={{ width: "32rem" }}
      className={
        "hidden w-3/12 xl:block dark:border-transparent relative z-10 border-l border-neutral-200"
      }
    >
      <div className="py-14 px-6 sticky top-0">
        <ArticleInfo />
        <div className="py-4 justify-center">
          <Catalog post={null} />

          <InfoCard />

          <Announcement />
        </div>
      </div>
    </div>
  );
};

export default RightSlidingDrawer;
