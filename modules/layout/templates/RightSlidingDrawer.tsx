"use client";
import ArticleInfo from "@/modules/common/components/article/ArticleInfo";
import React from "react";
import InfoCard from "../components/InfoCard";
import Announcement from "@/modules/announcement/Announcement";
import Catalog from "@/modules/common/components/Catalog";
import { useNorkiveTheme } from "@/lib/context/GeneralSiteSettingsProvider";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";
import CatalogDrawerWrapper from "@/modules/blog/wrapper/CatalogDrawerWrapper";

const RightSlidingDrawer = () => {
  const { currentRecordData } = useGlobal({});
  console.log("currentRecordData::::", currentRecordData);
  return (
    <div
      className={
        "hidden w-3/12 xl:block dark:border-transparent relative z-10 border-l border-neutral-200"
      }
    >
      <div className="py-14 px-6 sticky top-0">
        <ArticleInfo />

        <div className="">
          <div>
            {/* {currentRecordData && <Catalog record={currentRecordData} />} */}
          </div>
          {/* <Catalog record={currentRecordData} /> */}
          <InfoCard />
          <Announcement />
        </div>
      </div>
    </div>
  );
};

export default RightSlidingDrawer;
