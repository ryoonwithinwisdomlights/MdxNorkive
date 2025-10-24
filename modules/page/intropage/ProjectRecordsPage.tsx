"use client";
import { projectSource } from "@/lib/source";
import ProjectIntro from "@/modules/page/intropage/intro/ProjectIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";
import { SerializedPage } from "@/types";
import { generalIntroPageClass } from "@/lib/utils";

const ProjectRecordsPage = () => {
  const pages = projectSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <ProjectIntro />
      <RecordsBodyWithTwoOptions
        records={pages as unknown as SerializedPage[]}
      />
    </div>
  );
};

export default ProjectRecordsPage;
