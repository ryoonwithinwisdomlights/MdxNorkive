"use client";
import ProjectRecordsPage from "@/modules/page/intropage/ProjectRecordsPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return <ProjectRecordsPage />;
}
