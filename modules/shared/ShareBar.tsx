"use client";
import { PageData } from "fumadocs-core/source";
import { Suspense } from "react";
import ShareButtons from "./ShareButtons";
const ShareBar = ({ data, url }: { data: PageData; url: string }) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <Suspense fallback={<div className="h-8" />}>
        <ShareButtons data={data} url={url} />
      </Suspense>
    </div>
  );
};
export default ShareBar;
