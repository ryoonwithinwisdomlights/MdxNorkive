import { create, insertMultiple, search } from "@orama/orama";

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  category: string;
  type: string;
  url: string;
  date: string;
  author: string;
  readingTime: number;
  wordCount: number;
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  highlights: string[];
}

export interface SearchOptions {
  query: string;
  limit?: number;
  offset?: number;
  filters?: {
    type?: string;
    category?: string;
    tags?: string[];
    author?: string;
  };
  sortBy?: "relevance" | "date" | "title" | "readingTime";
}

export class EnhancedSearchIndex {
  private searchIndex: any = null;
  private documents: Map<string, SearchDocument> = new Map();
  private isBuilt = false;
  private buildTime = 0;
  private documentCount = 0;

  /**
   * 검색 인덱스 스키마 정의
   */
  private readonly schema = {
    id: "string",
    title: "string",
    content: "string",
    summary: "string",
    tags: "string[]",
    category: "string",
    type: "string",
    url: "string",
    date: "string",
    author: "string",
    readingTime: "number",
    wordCount: "number",
  } as const;

  /**
   * 검색 인덱스 빌드
   */
  async buildIndex(documents: SearchDocument[]): Promise<void> {
    const startTime = Date.now();

    try {
      console.log(`🔍 검색 인덱스 빌드 시작: ${documents.length}개 문서`);

      // 1. 인덱스 생성
      this.searchIndex = create({
        schema: this.schema,
      });

      // 2. 문서 삽입
      if (documents.length > 0) {
        await insertMultiple(this.searchIndex, documents);
      }

      // 3. 메타데이터 저장
      this.documents.clear();
      documents.forEach((doc) => this.documents.set(doc.id, doc));
      this.documentCount = documents.length;
      this.isBuilt = true;
      this.buildTime = Date.now() - startTime;

      console.log(
        `✅ 검색 인덱스 빌드 완료: ${this.documentCount}개 문서 (${this.buildTime}ms)`
      );
    } catch (error) {
      console.error("❌ 검색 인덱스 빌드 실패:", error);
      throw error;
    }
  }

  /**
   * 고급 검색 실행
   */
  async search(options: SearchOptions): Promise<SearchResult[]> {
    if (!this.isBuilt || !this.searchIndex) {
      throw new Error("검색 인덱스가 아직 빌드되지 않았습니다");
    }

    try {
      const {
        query,
        limit = 20,
        offset = 0,
        filters,
        sortBy = "relevance",
      } = options;

      // 1. 기본 검색 쿼리 구성
      let searchQuery: any = {
        term: query,
        properties: ["title", "content", "summary", "tags"],
        limit: limit + offset, // offset을 위해 더 많은 결과 가져오기
      };

      // 2. 필터 적용
      if (filters) {
        const whereConditions: any = {};

        if (filters.type) {
          whereConditions.type = { eq: filters.type };
        }

        if (filters.category) {
          whereConditions.category = { eq: filters.category };
        }

        if (filters.tags && filters.tags.length > 0) {
          whereConditions.tags = { in: filters.tags };
        }

        if (filters.author) {
          whereConditions.author = { eq: filters.author };
        }

        if (Object.keys(whereConditions).length > 0) {
          searchQuery.where = whereConditions;
        }
      }

      // 3. 검색 실행
      const searchResults = await search(this.searchIndex, searchQuery);

      // 4. 결과 후처리
      let processedResults = searchResults.hits.map((hit) => ({
        document: this.documents.get(hit.id)!,
        score: hit.score,
        highlights: this.generateHighlights(hit, query),
      }));

      // 5. 정렬 적용
      if (sortBy !== "relevance") {
        processedResults = this.sortResults(processedResults, sortBy);
      }

      // 6. offset 및 limit 적용
      processedResults = processedResults.slice(offset, offset + limit);

      return processedResults;
    } catch (error) {
      console.error("❌ 검색 실행 실패:", error);
      return [];
    }
  }

  /**
   * 하이라이트 생성
   */
  private generateHighlights(hit: any, query: string): string[] {
    const highlights: string[] = [];
    const queryTerms = query.toLowerCase().split(/\s+/);

    // 제목에서 하이라이트
    if (hit.document.title) {
      const title = hit.document.title;
      for (const term of queryTerms) {
        if (title.toLowerCase().includes(term)) {
          highlights.push(`제목: ${title}`);
          break;
        }
      }
    }

    // 요약에서 하이라이트
    if (hit.document.summary) {
      const summary = hit.document.summary;
      for (const term of queryTerms) {
        if (summary.toLowerCase().includes(term)) {
          const start = Math.max(0, summary.toLowerCase().indexOf(term) - 20);
          const end = Math.min(
            summary.length,
            summary.toLowerCase().indexOf(term) + term.length + 20
          );
          highlights.push(`요약: ...${summary.slice(start, end)}...`);
          break;
        }
      }
    }

    // 태그에서 하이라이트
    if (hit.document.tags) {
      const matchingTags = hit.document.tags.filter((tag) =>
        queryTerms.some((term) => tag.toLowerCase().includes(term))
      );
      if (matchingTags.length > 0) {
        highlights.push(`태그: ${matchingTags.join(", ")}`);
      }
    }

    return highlights.slice(0, 3); // 최대 3개 하이라이트
  }

  /**
   * 결과 정렬
   */
  private sortResults(results: SearchResult[], sortBy: string): SearchResult[] {
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.document.date).getTime() -
            new Date(a.document.date).getTime()
          );

        case "title":
          return a.document.title.localeCompare(b.document.title);

        case "readingTime":
          return b.document.readingTime - a.document.readingTime;

        case "relevance":
        default:
          return b.score - a.score;
      }
    });
  }

  /**
   * 자동완성 제안
   */
  async getSuggestions(query: string, limit = 5): Promise<string[]> {
    if (!this.isBuilt || !this.searchIndex) {
      return [];
    }

    try {
      const suggestions = new Set<string>();

      // 1. 제목 기반 제안
      const titleResults = await search(this.searchIndex, {
        term: query,
        properties: ["title"],
        limit: 10,
      });

      titleResults.hits.forEach((hit) => {
        const title = hit.document.title;
        if (title.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(title);
        }
      });

      // 2. 태그 기반 제안
      const tagResults = await search(this.searchIndex, {
        term: query,
        properties: ["tags"],
        limit: 10,
      });

      tagResults.hits.forEach((hit) => {
        hit.document.tags?.forEach((tag) => {
          if (tag.toLowerCase().includes(query.toLowerCase())) {
            suggestions.add(tag);
          }
        });
      });

      // 3. 카테고리 기반 제안
      const categoryResults = await search(this.searchIndex, {
        term: query,
        properties: ["category"],
        limit: 10,
      });

      categoryResults.hits.forEach((hit) => {
        const category = hit.document.category;
        if (category && category.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(category);
        }
      });

      return Array.from(suggestions).slice(0, limit);
    } catch (error) {
      console.error("❌ 자동완성 제안 생성 실패:", error);
      return [];
    }
  }

  /**
   * 인덱스 통계
   */
  getStats() {
    return {
      isBuilt: this.isBuilt,
      documentCount: this.documentCount,
      buildTime: this.buildTime,
      memoryUsage: this.documents.size,
    };
  }

  /**
   * 인덱스 상태 확인
   */
  isReady(): boolean {
    return this.isBuilt && this.searchIndex !== null;
  }

  /**
   * 인덱스 정리
   */
  clear(): void {
    this.searchIndex = null;
    this.documents.clear();
    this.isBuilt = false;
    this.buildTime = 0;
    this.documentCount = 0;
  }
}

// 싱글톤 인스턴스
export const enhancedSearchIndex = new EnhancedSearchIndex();
