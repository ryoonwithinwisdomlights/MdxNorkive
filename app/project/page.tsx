"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import ProjectRecordsPage from "@/modules/page/intropage/ProjectRecordsPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";
export default function Page() {
  const { setCollapsed } = useSidebar();
  const { handleChangeRightSideInfoBarMode } = useGeneralSiteSettings();
  useEffect(() => {
    setCollapsed(true);
    handleChangeRightSideInfoBarMode("info");
  });
  return <ProjectRecordsPage />;
}
