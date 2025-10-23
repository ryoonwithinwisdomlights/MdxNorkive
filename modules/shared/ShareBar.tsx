"use client";
import ShareButtons from "./ShareButtons";
import { lazy, Suspense } from "react";
const ShareBar = ({ data, url }) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <Suspense fallback={<div className="h-8" />}>
        <ShareButtons data={data} url={url} />
      </Suspense>
    </div>
  );
};
export default ShareBar;
