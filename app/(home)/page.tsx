"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import NorkiveIntro from "@/modules/page/intropage/NorkiveIntro";
import { useEffect } from "react";

export default function Page() {
  const { handleChangeRightSideInfoBarMode } = useGeneralSiteSettings();
  useEffect(() => {
    handleChangeRightSideInfoBarMode("info");
  }, []);

  return <NorkiveIntro />;
}
