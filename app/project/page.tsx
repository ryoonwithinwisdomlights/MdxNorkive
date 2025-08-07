"use client";
import { projectSource } from "@/lib/source";
import ProjectRecordsPage from "@/modules/intropage/ProjectRecordsPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const pages = projectSource.getPages();
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return <ProjectRecordsPage pages={pages} />;
}
