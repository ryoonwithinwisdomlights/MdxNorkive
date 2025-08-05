"use client";
import { projectSource } from "@/lib/source";
import ProjectIntro from "@/modules/blog/records/ProjectIntro";
import RecordBodyForPage from "@/modules/blog/records/RecordBodyForPage";
export default function Page() {
  const pages = projectSource.getPages();
  return (
    <div className="w-full flex flex-col items-center md:px-10 gap-10">
      <ProjectIntro />

      <RecordBodyForPage records={pages} />
    </div>
  );
}
