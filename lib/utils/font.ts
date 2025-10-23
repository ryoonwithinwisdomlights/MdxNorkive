/**
 * 폰트 최적화: Next.js Font Optimization 사용
 *
 * Next.js의 폰트 최적화를 통해:
 * - 자동 preload: Next.js가 자동으로 preload를 처리
 * - 자동 서브셋팅: latin, latin-ext 사용 글자만 포함
 * - 자동 WOFF2 변환: 최신 압축 포맷
 * - 로컬 호스팅: Google 서버 의존 제거

 */

export const fontFamilies = {
  // Next.js에서 최적화된 Noto Sans 폰트 사용
  sans: [
    "var(--font-sans)", // Noto Sans from next/font/google
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "sans-serif",
  ],

  // Next.js에서 최적화된 Noto Serif 폰트 사용
  serif: [
    "var(--font-serif)", // Noto Serif from next/font/google
    "Georgia",
    "serif",
  ],

  // 이모지 없는 시스템 폰트
  noEmoji: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "sans-serif",
  ],
};
