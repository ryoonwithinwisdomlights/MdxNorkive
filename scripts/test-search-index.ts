#!/usr/bin/env tsx

import { enhancedSearchIndex, SearchDocument } from "@/lib/search/enhanced-search-index";

// 테스트용 샘플 데이터
const sampleDocuments: SearchDocument[] = [
  {
    id: "1",
    title: "Next.js 15 성능 최적화 가이드",
    content: "Next.js 15에서 성능을 최적화하는 방법에 대한 상세한 가이드입니다. 캐싱, 이미지 최적화, 번들 최적화 등을 다룹니다.",
    summary: "Next.js 15 성능 최적화 방법과 모범 사례",
    tags: ["Next.js", "성능최적화", "웹개발", "React"],
    category: "engineering",
    type: "engineering",
    url: "/engineering/nextjs-15-performance",
    date: "2024-01-15",
    author: "Ryoon",
    readingTime: 15,
    wordCount: 2500,
  },
  {
    id: "2",
    title: "Notion API와 MDX 통합하기",
    content: "Notion API를 사용하여 콘텐츠를 가져오고 MDX로 변환하는 방법을 설명합니다. 자동화된 콘텐츠 관리 시스템 구축 방법을 다룹니다.",
    summary: "Notion API와 MDX를 통합한 콘텐츠 관리 시스템",
    tags: ["Notion", "MDX", "API", "콘텐츠관리"],
    category: "engineering",
    type: "engineering",
    url: "/engineering/notion-api-mdx-integration",
    date: "2024-01-10",
    author: "Ryoon",
    readingTime: 12,
    wordCount: 2000,
  },
  {
    id: "3",
    title: "웹 성능 측정과 최적화",
    content: "웹 성능을 측정하고 최적화하는 방법에 대한 포괄적인 가이드입니다. Core Web Vitals, Lighthouse, 실제 사용자 경험 등을 다룹니다.",
    summary: "웹 성능 측정부터 최적화까지 완벽 가이드",
    tags: ["웹성능", "CoreWebVitals", "Lighthouse", "최적화"],
    category: "engineering",
    type: "engineering",
    url: "/engineering/web-performance-optimization",
    date: "2024-01-05",
    author: "Ryoon",
    readingTime: 20,
    wordCount: 3500,
  },
  {
    id: "4",
    title: "React 렌더링 최적화 기법",
    content: "React 애플리케이션의 렌더링 성능을 최적화하는 다양한 기법들을 소개합니다. memo, useMemo, useCallback 등을 활용한 최적화 방법을 다룹니다.",
    summary: "React 렌더링 성능 최적화를 위한 실용적인 기법들",
    tags: ["React", "성능최적화", "렌더링", "hooks"],
    category: "engineering",
    type: "engineering",
    url: "/engineering/react-rendering-optimization",
    date: "2024-01-01",
    author: "Ryoon",
    readingTime: 18,
    wordCount: 3000,
  },
  {
    id: "5",
    title: "TypeScript 고급 타입 시스템",
    content: "TypeScript의 고급 타입 시스템을 활용하여 더 안전하고 유지보수하기 쉬운 코드를 작성하는 방법을 설명합니다.",
    summary: "TypeScript 고급 타입 시스템 활용법",
    tags: ["TypeScript", "타입시스템", "고급기법", "개발도구"],
    category: "engineering",
    type: "engineering",
    url: "/engineering/typescript-advanced-types",
    date: "2023-12-28",
    author: "Ryoon",
    readingTime: 14,
    wordCount: 2200,
  },
];

async function testSearchIndex() {
  try {
    console.log("🧪 검색 인덱스 테스트 시작");
    console.log("=".repeat(50));

    // 1. 검색 인덱스 빌드
    console.log("1️⃣ 검색 인덱스 빌드 테스트");
    await enhancedSearchIndex.buildIndex(sampleDocuments);
    console.log("✅ 검색 인덱스 빌드 완료");

    // 2. 기본 검색 테스트
    console.log("\n2️⃣ 기본 검색 테스트");
    const basicResults = await enhancedSearchIndex.search({
      query: "성능 최적화",
      limit: 5,
    });
    console.log(`검색 결과: ${basicResults.length}개`);
    basicResults.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.document.title} (점수: ${result.score.toFixed(2)})`);
    });

    // 3. 필터링 검색 테스트
    console.log("\n3️⃣ 필터링 검색 테스트");
    const filteredResults = await enhancedSearchIndex.search({
      query: "React",
      filters: { type: "engineering" },
      limit: 3,
    });
    console.log(`필터링 결과: ${filteredResults.length}개`);
    filteredResults.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.document.title}`);
    });

    // 4. 정렬 테스트
    console.log("\n4️⃣ 정렬 테스트");
    const sortedResults = await enhancedSearchIndex.search({
      query: "개발",
      sortBy: "date",
      limit: 3,
    });
    console.log("날짜순 정렬 결과:");
    sortedResults.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.document.title} (${result.document.date})`);
    });

    // 5. 자동완성 제안 테스트
    console.log("\n5️⃣ 자동완성 제안 테스트");
    const suggestions = await enhancedSearchIndex.getSuggestions("성능", 5);
    console.log(`제안어: ${suggestions.join(", ")}`);

    // 6. 통계 확인
    console.log("\n6️⃣ 인덱스 통계");
    const stats = enhancedSearchIndex.getStats();
    console.log(`인덱스 상태: ${stats.isBuilt ? "준비됨" : "미준비"}`);
    console.log(`문서 수: ${stats.documentCount}`);
    console.log(`빌드 시간: ${stats.buildTime}ms`);
    console.log(`메모리 사용량: ${stats.memoryUsage}개 문서`);

    // 7. 성능 테스트
    console.log("\n7️⃣ 성능 테스트");
    const performanceStart = Date.now();
    for (let i = 0; i < 100; i++) {
      await enhancedSearchIndex.search({
        query: "개발",
        limit: 10,
      });
    }
    const performanceEnd = Date.now();
    const avgTime = (performanceEnd - performanceStart) / 100;
    console.log(`평균 검색 시간: ${avgTime.toFixed(2)}ms`);

    console.log("\n" + "=".repeat(50));
    console.log("🎉 모든 테스트 완료!");

  } catch (error) {
    console.error("❌ 테스트 중 오류 발생:", error);
  }
}

// 메인 실행
if (require.main === module) {
  testSearchIndex().catch(console.error);
}
