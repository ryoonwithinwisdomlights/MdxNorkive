"use client";
import { projectSource } from "@/lib/source";
import ProjectIntro from "@/modules/page/intropage/intro/ProjectIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";
import { generalIntroPageClass } from "@/types";

const ProjectRecordsPage = () => {
  const pages = projectSource.getPages();

  return (
    <div className={generalIntroPageClass({ className: "" })}>
      <ProjectIntro />
      <RecordsBodyWithTwoOptions records={pages} />
    </div>
  );
};

export default ProjectRecordsPage;
