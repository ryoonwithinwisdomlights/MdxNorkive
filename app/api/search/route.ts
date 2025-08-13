import {
  bookSource,
  engineeringSource,
  projectSource,
  recordSource,
} from "@/lib/source";

import { AdvancedIndex, createSearchAPI } from "fumadocs-core/search/server";
import { tokenize } from "@/modules/common/search/tokenizer";

/**
 * Fumadocs createSearchAPI를 사용한 검색 시스템
 * 안정적이고 검증된 검색 기능 제공
 *
 * revalidate = false의 효과:
 * 1. 빌드 타임에 한 번만 실행: 모든 페이지 데이터를 한 번만 가져와서 인덱스 생성하고 캐시 영구 보존하여 성능 향상
 * 2. 캐시 영구 보존: 생성된 검색 인덱스를 계속 재사용
 * 3. 성능 향상: 매번 새로운 검색 인덱스를 만들지 않음
 * 4. 비용 절약: 불필요한 API 호출과 데이터 처리 방지
 */
export const revalidate = false;

const recordPages = recordSource.getPages();
const bookPages = bookSource.getPages();
const engineeringPages = engineeringSource.getPages();
const projectPages = projectSource.getPages();

const allPages = [
  ...recordPages,
  ...bookPages,
  ...engineeringPages,
  ...projectPages,
];

export const { GET } = createSearchAPI("advanced", {
  indexes: allPages.map(
    (page) =>
      ({
        id: page.url,
        title: page.data.title,
        description: page.data.description,
        tag: page.data.type.toLocaleLowerCase(),
        structuredData: page.data.structuredData,
        url: page.url,
      } satisfies AdvancedIndex)
  ),
  tokenizer: {
    language: "english",
    tokenize,
  },
});
