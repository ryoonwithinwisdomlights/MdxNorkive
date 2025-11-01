/**
 * @norkive/youtube-utils
 * 
 * Lightweight utility to extract YouTube video IDs from URLs.
 * Zero dependencies, TypeScript support.
 */

const YOUTUBE_DOMAINS = new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/**
 * YouTube URL에서 비디오 ID를 추출합니다.
 * 
 * @param url - YouTube URL
 * @returns 비디오 ID 또는 null
 * 
 * @example
 * ```typescript
 * getYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // 'dQw4w9WgXcQ'
 * ```
 */
export function getYoutubeId(url: string): string | null {
  try {
    const { hostname } = new URL(url);
    if (!YOUTUBE_DOMAINS.has(hostname)) {
      return null;
    }
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2]?.length === 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }

  return null;
}

/**
 * URL이 유효한 YouTube URL인지 확인합니다.
 * 
 * @param url - 확인할 URL
 * @returns 유효한 YouTube URL인지 여부
 * 
 * @example
 * ```typescript
 * isValidYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // true
 * ```
 */
export function isValidYoutubeUrl(url: string): boolean {
  return getYoutubeId(url) !== null;
}

/**
 * YouTube URL에서 추가 파라미터를 추출합니다.
 * 
 * @param url - YouTube URL
 * @returns URL 파라미터 객체
 * 
 * @example
 * ```typescript
 * getYoutubeParams('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10')
 * // { v: 'dQw4w9WgXcQ', t: '10' }
 * ```
 */
export function getYoutubeParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};

    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  } catch {
    return {};
  }
}

