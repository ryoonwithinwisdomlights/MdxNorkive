"use client";
import { engineeringSource } from "@/lib/source";
import EngineeringIRecordPage from "@/modules/intropage/EngineeringIRecordPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const pages = engineeringSource.getPages();
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return <EngineeringIRecordPage pages={pages} />;
}
