"use client";

import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
import ArchiveIntro from "@/modules/blog/records/ArchiveIntro";

export default function Page() {
  // const pages = pageTree;

  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });

  return (
    <div className="w-full flex flex-col items-center p-10 gap-10">
      <ArchiveIntro />
    </div>
  );
}
