"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import GeneralRecordPage from "@/modules/page/intropage/GeneralRecordPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";

export default function Page() {
  const { setCollapsed } = useSidebar();
  const { handleChangeRightSideInfoBarMode } = useGeneralSiteSettings();
  useEffect(() => {
    setCollapsed(true);
    handleChangeRightSideInfoBarMode("info");
  });

  return <GeneralRecordPage />;
}
