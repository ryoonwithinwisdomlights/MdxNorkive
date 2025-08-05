"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/blog/records/EngineeringIntro";
import RecordBodyForPage from "@/modules/blog/records/RecordBodyForPage";
export default function Page() {
  const pages = engineeringSource.getPages();
  return (
    <div className="w-full flex flex-col items-center md:px-10 gap-10">
      <EngineeringIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
}
