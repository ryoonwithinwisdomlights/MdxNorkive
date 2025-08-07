"use client";
import EngineeringIRecordPage from "@/modules/page/intropage/EngineeringIRecordPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(true);
  });
  return <EngineeringIRecordPage />;
}
