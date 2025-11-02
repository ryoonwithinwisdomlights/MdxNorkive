/**
 * Media Processor 팩토리 함수
 * 의존성 주입을 통한 프로세서 생성
 */

import { MediaProcessor } from "./media-processor";
import type { MediaProcessorConfig } from "./types";

/**
 * 미디어 프로세서 생성
 * @param config 프로세서 설정
 * @returns MediaProcessor 인스턴스
 */
export function createMediaProcessor(
  config: MediaProcessorConfig
): MediaProcessor {
  return new MediaProcessor(config);
}

