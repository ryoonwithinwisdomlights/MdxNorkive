"use client";
import ProjectIntro from "@/modules/page/intropage/intro/ProjectIntro";
import RecordBodyForPage from "@/modules/page/intropage/body/RecordBodyForPage";
const ProjectRecordsPage = (pages) => {
  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <ProjectIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
};

export default ProjectRecordsPage;
