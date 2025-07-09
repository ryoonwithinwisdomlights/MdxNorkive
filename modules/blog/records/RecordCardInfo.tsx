import React from "react";
import { usePathname } from "next/navigation";
import ProjectCardInfo from "./ProjectCardInfo";
import BasicCardInfo from "./BasicCardInfo";

const RecordCardInfo = ({ item, showPageCover }) => {
  const pathname = usePathname();
  const type = pathname.split("/")[1];

  return type === "project" ? (
    <ProjectCardInfo
      record={item}
      showPageCover={showPageCover}
      showPreview={true}
      showSummary={true}
    />
  ) : (
    <BasicCardInfo
      record={item}
      showPageCover={showPageCover}
      showPreview={true}
      showSummary={true}
    />
  );
};

export default RecordCardInfo;
