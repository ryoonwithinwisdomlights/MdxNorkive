"use client";

import { useUIStore } from "@/lib/stores";
import GeneralRecordPage from "@/modules/page/intropage/GeneralRecordPage";
import { useSidebar } from "fumadocs-ui/provider";
import { useEffect } from "react";

export default function Page() {
  const { setCollapsed } = useSidebar();
  const { setRightSideInfoBarMode } = useUIStore();
  useEffect(() => {
    setCollapsed(true);
    setRightSideInfoBarMode("info");
  }, []); // 의존성 배열을 비워서 한 번만 실행되도록 함

  return <GeneralRecordPage />;
}
