/**
 * Web Vitals 측정 유틸리티
 *
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): 최대 콘텐츠 렌더링 시간
 * - FID (First Input Delay): 최초 입력 지연 시간
 * - CLS (Cumulative Layout Shift): 누적 레이아웃 이동
 *
 * 추가 메트릭:
 * - FCP (First Contentful Paint): 최초 콘텐츠 렌더링 시간
 * - TTFB (Time to First Byte): 최초 바이트까지의 시간
 * - INP (Interaction to Next Paint): 다음 페인트까지의 상호작용
 */

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  entries: PerformanceEntry[];
}

export interface WebVitalsReport {
  LCP?: WebVitalsMetric;
  FID?: WebVitalsMetric;
  CLS?: WebVitalsMetric;
  FCP?: WebVitalsMetric;
  TTFB?: WebVitalsMetric;
  INP?: WebVitalsMetric;
}

const vitalsStorage: WebVitalsReport = {};

/**
 * 메트릭 등급 평가
 */
function getRating(
  name: string,
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return "good";

  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

/**
 * Web Vitals 콜백 함수
 */
export function reportWebVitals(metric: WebVitalsMetric) {
  const { name, value, id, rating } = metric;

  // 메트릭 저장
  vitalsStorage[name as keyof WebVitalsReport] = metric;

  // 콘솔에 출력 (개발 환경)
  if (process.env.NODE_ENV === "development") {
    const emoji =
      rating === "good" ? "✅" : rating === "needs-improvement" ? "⚠️" : "❌";
    console.log(`${emoji} ${name}:`, {
      value: `${Math.round(value)}${name === "CLS" ? "" : "ms"}`,
      rating,
      id,
    });
  }

  // 분석 도구로 전송 (프로덕션)
  if (
    typeof window !== "undefined" &&
    typeof (window as any).gtag === "function"
  ) {
    (window as any).gtag("event", name, {
      event_category: "Web Vitals",
      event_label: id,
      value: Math.round(name === "CLS" ? value * 1000 : value),
      non_interaction: true,
    });
  }

  // 로컬 스토리지에 저장 (측정 기준선용)
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("webVitalsBaseline");
      const baseline = stored ? JSON.parse(stored) : {};

      baseline[name] = {
        value: Math.round(value),
        rating,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("webVitalsBaseline", JSON.stringify(baseline));
    } catch (error) {
      console.error("Failed to save web vitals to localStorage:", error);
    }
  }
}

/**
 * 현재 저장된 Web Vitals 가져오기
 */
export function getWebVitals(): WebVitalsReport {
  return { ...vitalsStorage };
}

/**
 * Web Vitals 요약 출력
 */
export function logWebVitalsSummary() {
  if (typeof window === "undefined") return;

  const vitals = getWebVitals();

  console.log("\n📊 Web Vitals Summary\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  Object.entries(vitals).forEach(([name, metric]) => {
    if (!metric) return;

    const emoji =
      metric.rating === "good"
        ? "✅"
        : metric.rating === "needs-improvement"
        ? "⚠️"
        : "❌";
    const unit = name === "CLS" ? "" : "ms";

    console.log(
      `${emoji} ${name}: ${Math.round(metric.value)}${unit} (${metric.rating})`
    );
  });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

/**
 * 브라우저 콘솔에서 사용할 수 있는 헬퍼 함수
 */
if (typeof window !== "undefined") {
  (window as any).webVitals = {
    get: getWebVitals,
    summary: logWebVitalsSummary,
    baseline: () => {
      const stored = localStorage.getItem("webVitalsBaseline");
      return stored ? JSON.parse(stored) : null;
    },
    clear: () => {
      localStorage.removeItem("webVitalsBaseline");
      console.log("✅ Web Vitals baseline cleared");
    },
  };
}
