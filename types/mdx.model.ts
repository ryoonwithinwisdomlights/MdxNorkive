/**
 * MDX 관련 타입 정의
 *
 * 📋 파일 역할:
 * MDX 콘텐츠 처리에 필요한 모든 타입, 인터페이스, 타입 가드를 정의합니다.
 *
 * 🏗️ 아키텍처: 타입 관리
 * - 검증 결과 타입
 * - 콘텐츠 블록 타입
 * - 처리 컨텍스트 타입
 * - 변환 함수 타입
 *
 * MdxValidationResult: 검증 결과 타입
 * ContentBlock, ProcessingContext: 처리 컨텍스트 타입들
 * ContentTransformer: 변환 함수 타입
 * MdxProcessingOptions, MdxProcessingStats: 확장 타입들
 *
 * @version 1.0.0
 * @author AI Assistant & ryoon (ryoon.with.wisdomtrees@gmail.com)
 * @created 2025-08-08
 * @lastModified 2025-08-08
 */

/**
 * MDX 검증 결과 타입
 *
 * 📊 검증 과정에서 반환되는 결과를 정의합니다.
 * - isValid: 검증 성공 여부
 * - content: 처리된 콘텐츠 (성공 시) 또는 대체 콘텐츠 (실패 시)
 * - errors: 발생한 오류 메시지 목록
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
 *
 * 🔒 보호된 콘텐츠 블록(코드 블록, 인용문)을 임시로 저장하는 구조
 * - marker: 임시 마커 문자열
 * - content: 원본 콘텐츠
 */
export interface ContentBlock {
  /** 임시 마커 문자열 (예: __CODE_BLOCK_0__) */
  marker: string;

  /** 원본 콘텐츠 */
  content: string;
}

/**
 * MDX 처리 컨텍스트 타입
 *
 * 🔄 MDX 처리 과정에서 상태를 관리하는 컨텍스트
 * - codeBlocks: 보호된 코드 블록 목록
 * - blockquotes: 보호된 인용문 목록
 * - codeBlockIndex: 코드 블록 인덱스
 * - blockquoteIndex: 인용문 인덱스
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
 *
 * 🔄 MDX 콘텐츠를 변환하는 함수의 시그니처
 * - content: 입력 콘텐츠
 * - context: 처리 컨텍스트
 * - 반환값: 변환된 콘텐츠
 */
export type ContentTransformer = (
  content: string,
  context: ProcessingContext
) => string;

/**
 * MDX 파일 검증 결과 타입
 *
 * 📁 디렉토리 전체 검증 결과를 정의합니다.
 * - total: 총 파일 수
 * - valid: 유효한 파일 수
 * - fixed: 수정된 파일 수
 * - failed: 실패한 파일 수
 * - errors: 오류가 발생한 파일 목록
 */
export interface MdxDirectoryValidationResult {
  /** 총 파일 수 */
  total: number;

  /** 유효한 파일 수 */
  valid: number;

  /** 수정된 파일 수 */
  fixed: number;

  /** 실패한 파일 수 */
  failed: number;

  /** 오류가 발생한 파일 목록 */
  errors: Array<{
    /** 파일 경로 */
    file: string;

    /** 오류 메시지 목록 */
    errors: string[];
  }>;
}

/**
 * MDX 문법 검증 결과 타입
 *
 * 🔍 MDX 문법 검증 결과를 정의합니다.
 * - isValid: 문법 검증 성공 여부
 * - errors: 문법 오류 메시지 목록
 */
export interface MdxSyntaxValidationResult {
  /** 문법 검증 성공 여부 */
  isValid: boolean;

  /** 문법 오류 메시지 목록 */
  errors: string[];
}

/**
 * MDX 링크 변환 결과 타입
 *
 * 🔗 링크 변환 결과를 정의합니다.
 * - originalUrl: 원본 URL
 * - transformedUrl: 변환된 URL
 * - linkType: 링크 타입 (youtube, embed, file, etc.)
 * - success: 변환 성공 여부
 */
export interface MdxLinkTransformResult {
  /** 원본 URL */
  originalUrl: string;

  /** 변환된 URL 또는 컴포넌트 */
  transformedUrl: string;

  /** 링크 타입 */
  linkType:
    | "youtube"
    | "embed"
    | "file"
    | "google-drive"
    | "bookmark"
    | "general";

  /** 변환 성공 여부 */
  success: boolean;
}

/**
 * MDX 처리 옵션 타입
 *
 * ⚙️ MDX 처리 시 사용할 수 있는 옵션들을 정의합니다.
 * - preserveCodeBlocks: 코드 블록 보호 여부
 * - preserveBlockquotes: 인용문 보호 여부
 * - sanitizeHtml: HTML 태그 정리 여부
 * - transformLinks: 링크 변환 여부
 * - removeMdxExtensions: MDX 확장 문법 제거 여부
 */
export interface MdxProcessingOptions {
  /** 코드 블록 보호 여부 (기본값: true) */
  preserveCodeBlocks?: boolean;

  /** 인용문 보호 여부 (기본값: true) */
  preserveBlockquotes?: boolean;

  /** HTML 태그 정리 여부 (기본값: true) */
  sanitizeHtml?: boolean;

  /** 링크 변환 여부 (기본값: true) */
  transformLinks?: boolean;

  /** MDX 확장 문법 제거 여부 (기본값: true) */
  removeMdxExtensions?: boolean;

  /** 디버그 모드 여부 (기본값: false) */
  debug?: boolean;
}

/**
 * MDX 처리 통계 타입
 *
 * 📊 MDX 처리 과정에서의 통계 정보를 정의합니다.
 * - processedFiles: 처리된 파일 수
 * - skippedFiles: 건너뛴 파일 수
 * - errorFiles: 오류 발생 파일 수
 * - totalProcessingTime: 총 처리 시간 (ms)
 * - averageProcessingTime: 평균 처리 시간 (ms)
 */
export interface MdxProcessingStats {
  /** 처리된 파일 수 */
  processedFiles: number;

  /** 건너뛴 파일 수 */
  skippedFiles: number;

  /** 오류 발생 파일 수 */
  errorFiles: number;

  /** 총 처리 시간 (ms) */
  totalProcessingTime: number;

  /** 평균 처리 시간 (ms) */
  averageProcessingTime: number;
}

/**
 * 타입 가드 함수들
 */

/**
 * ContentBlock 타입 가드
 * @param obj 검사할 객체
 * @returns ContentBlock인지 여부
 */
export function isContentBlock(obj: any): obj is ContentBlock {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.marker === "string" &&
    typeof obj.content === "string"
  );
}

/**
 * ProcessingContext 타입 가드
 * @param obj 검사할 객체
 * @returns ProcessingContext인지 여부
 */
export function isProcessingContext(obj: any): obj is ProcessingContext {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Array.isArray(obj.codeBlocks) &&
    Array.isArray(obj.blockquotes) &&
    typeof obj.codeBlockIndex === "number" &&
    typeof obj.blockquoteIndex === "number"
  );
}

/**
 * MdxValidationResult 타입 가드
 * @param obj 검사할 객체
 * @returns MdxValidationResult인지 여부
 */
export function isMdxValidationResult(obj: any): obj is MdxValidationResult {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.isValid === "boolean" &&
    typeof obj.content === "string" &&
    Array.isArray(obj.errors)
  );
}
