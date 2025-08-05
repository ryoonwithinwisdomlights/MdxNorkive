"use client";
import { engineeringSource } from "@/lib/source";
import BasicRecordPage from "@/modules/blog/records/BasicRecordPage";
import RecordBodyForPage from "@/modules/blog/records/RecordBodyForPage";
import RecordIntroForPage from "@/modules/blog/records/RecordIntroForPage";
export default function Page() {
  const pages = engineeringSource.getPages();
  return (
    <div className="w-full flex flex-col items-center md:px-10 gap-10">
      <RecordIntroForPage />
      <RecordBodyForPage records={pages} />
    </div>
  );
}
