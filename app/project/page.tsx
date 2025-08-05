"use client";
import { engineeringSource, projectSource } from "@/lib/source";
import RecordBodyForPage from "@/modules/blog/records/RecordBodyForPage";
import RecordIntroForPage from "@/modules/blog/records/RecordIntroForPage";
export default function Page() {
  const pages = projectSource.getPages();
  return (
    <div className="w-full flex flex-col items-center md:px-10 gap-10">
      <RecordIntroForPage />
      <RecordBodyForPage records={pages} />
    </div>
  );
}
