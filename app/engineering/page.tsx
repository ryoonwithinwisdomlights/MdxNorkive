"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIntro from "@/modules/blog/records/EngineeringIntro";
import RecordBodyForPage from "@/modules/blog/records/RecordBodyForPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const pages = engineeringSource.getPages();
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <EngineeringIntro />
      <RecordBodyForPage records={pages} />
    </div>
  );
}
