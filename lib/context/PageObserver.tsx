"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGlobal } from "./EssentialNavInfoProvider";
import { AVAILABLE_PAGE_TYPES } from "../../constants/menu.constants";

function noCleanup(segments: string[]) {
  const flag = AVAILABLE_PAGE_TYPES.map((item) => item.toLocaleLowerCase());
  return segments.length > 1 && flag.includes(segments[0]);
}

export function PageObserver() {
  const pathname = usePathname();
  const { cleanCurrentRecordData } = useGlobal({});
  useEffect(() => {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (!noCleanup(segments)) {
      cleanCurrentRecordData();
    }
  }, [pathname]);

  return null;
}
