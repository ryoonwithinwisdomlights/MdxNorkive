"use client";
import { projectSource } from "@/lib/source";
import RecordBodyForPage from "@/modules/page/intropage/body/RecordBodyForPage";
import ProjectIntro from "@/modules/page/intropage/intro/ProjectIntro";

const ProjectRecordsPage = () => {
  const pages = projectSource.getPages();

  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <ProjectIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
};

export default ProjectRecordsPage;
