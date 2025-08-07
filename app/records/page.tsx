"use client";

import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
import ArchiveIntroPage from "@/modules/page/ArchiveIntroPage";
import GeneralRecordPage from "@/modules/intropage/GeneralRecordPage";

export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });

  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <GeneralRecordPage />
    </div>
  );
}
