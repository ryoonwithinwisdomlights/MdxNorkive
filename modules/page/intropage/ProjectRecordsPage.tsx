"use client";
import { projectSource } from "@/lib/source";
import ProjectIntro from "@/modules/page/intropage/intro/ProjectIntro";
import RecordsBodyWithTwoOptions from "./body/RecordsBodyWithTwoOptions";

const ProjectRecordsPage = () => {
  const pages = projectSource.getPages();

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <ProjectIntro />
      <RecordsBodyWithTwoOptions records={pages} />
    </div>
  );
};

export default ProjectRecordsPage;
