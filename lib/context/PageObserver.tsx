"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePageStore } from "./pageStore";
import { useGlobal } from "./EssentialNavInfoProvider";
import { AVAILABLE_PAGE_TYPES } from "../constants/menu.constants";

/**
 *  
    segments 길이가 2이면서 즉 1이상이면서
    AVAILABLE_PAGE_TYPES 인클루딩인 페이지에 대한
    데이터는 노 클린업.
 */
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
