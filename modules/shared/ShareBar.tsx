"use client";
import ShareButtons from "./ShareButtons";

const ShareBar = ({ data, url }) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <ShareButtons data={data} url={url} />
    </div>
  );
};
export default ShareBar;
