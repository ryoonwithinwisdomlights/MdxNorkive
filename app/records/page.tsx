"use client";

import GeneralRecordPage from "@/modules/page/intropage/GeneralRecordPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";

export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center p-10 gap-10">
      <GeneralRecordPage />
    </div>
  );
}
