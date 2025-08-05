"use client";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
import GeneralRecordPage from "@/modules/blog/records/GeneralRecordPage";

export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return (
    <div className="w-full flex flex-col items-center p-8 gap-10">
      <GeneralRecordPage />
    </div>
  );
}
