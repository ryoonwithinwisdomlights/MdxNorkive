/**
 * @norkive/youtube-utils
 *
 * Lightweight utility to extract YouTube video IDs from URLs.
 * Zero dependencies, TypeScript support.
 */
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
declare function getYoutubeId(url: string): string | null;
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
declare function isValidYoutubeUrl(url: string): boolean;
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
declare function getYoutubeParams(url: string): Record<string, string>;

export { getYoutubeId, getYoutubeParams, isValidYoutubeUrl };
