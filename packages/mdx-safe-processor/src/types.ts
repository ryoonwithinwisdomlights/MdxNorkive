/**
 * MDX Safe Processor 타입 정의
 *
 * @package @norkive/mdx-safe-processor
 */

/**
 * MDX 검증 결과 타입
 */
export interface MdxValidationResult {
  /** 검증 성공 여부 */
  isValid: boolean;

  /** 처리된 콘텐츠 또는 대체 콘텐츠 */
  content: string;

  /** 발생한 오류 메시지 목록 */
  errors: string[];
}

/**
 * 콘텐츠 블록 타입
 */
export interface ContentBlock {
  /** 임시 마커 문자열 (예: __CODE_BLOCK_0__) */
  marker: string;

  /** 원본 콘텐츠 */
  content: string;
}

/**
 * MDX 처리 컨텍스트 타입
 */
export interface ProcessingContext {
  /** 보호된 코드 블록 목록 */
  codeBlocks: ContentBlock[];

  /** 보호된 인용문 목록 */
  blockquotes: ContentBlock[];

  /** 코드 블록 인덱스 */
  codeBlockIndex: number;

  /** 인용문 인덱스 */
  blockquoteIndex: number;
}

/**
 * 콘텐츠 변환 함수 타입
 */
export type ContentTransformer = (
  content: string,
  context: ProcessingContext
) => string;

