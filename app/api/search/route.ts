import {
  bookSource,
  engineeringSource,
  projectSource,
  recordSource,
} from "@/lib/source";

import { AdvancedIndex, createSearchAPI } from "fumadocs-core/search/server";
import { tokenize } from "@/modules/common/search/tokenizer";

// it should be cached forever
/**
 * revalidate = false의 효과
빌드 타임에 한 번만 실행: 모든 페이지 데이터를 한 번만 가져와서 인덱스 생성
캐시 영구 보존: 생성된 검색 인덱스를 계속 재사용
성능 향상: 매번 새로운 검색 인덱스를 만들지 않음
비용 절약: 불필요한 API 호출과 데이터 처리 방지
만약 revalidate = false를 설정하지 않으면
매번 검색 요청마다 새로운 인덱스 생성
페이지 데이터를 다시 가져오고 처리
검색 속도가 느려짐
서버 리소스 낭비
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
