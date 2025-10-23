"use client";

/**
 * Web Vitals 측정 컴포넌트
 *
 * Next.js의 useReportWebVitals 훅을 사용하여 Core Web Vitals를 측정합니다.
 * 이 컴포넌트는 app/layout.tsx에 추가되어야 합니다.
 */

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVitals, WebVitalsMetric } from "@/lib/utils/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Web Vitals 리포터에 전달
    reportWebVitals(metric as WebVitalsMetric);
  });

  return null;
}
