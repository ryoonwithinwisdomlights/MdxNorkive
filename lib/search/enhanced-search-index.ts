// 간단하고 효과적인 메모리 기반 검색 인덱스
// 한국어 지원 및 빠른 검색 성능
// Orama의 한국어 지원 한계를 우회

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
  private documents: Map<string, SearchDocument> = new Map();
  private searchIndex: Map<string, Set<string>> = new Map(); // term -> documentIds
  private isBuilt = false;
  private buildTime = 0;
  private documentCount = 0;

  /**
   * 검색 인덱스 빌드
   */
  async buildIndex(documents: SearchDocument[]): Promise<void> {
    const startTime = Date.now();

    try {
      console.log(`🔍 검색 인덱스 빌드 시작: ${documents.length}개 문서`);

      // 1. 문서 저장
      this.documents.clear();
      documents.forEach((doc) => this.documents.set(doc.id, doc));
      this.documentCount = documents.length;

      // 2. 검색 인덱스 생성
      this.searchIndex.clear();
      documents.forEach((doc) => {
        this.indexDocument(doc);
      });

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
   * 단일 문서 인덱싱
   */
  private indexDocument(doc: SearchDocument): void {
    const terms = this.extractTerms(doc);

    terms.forEach((term) => {
      if (!this.searchIndex.has(term)) {
        this.searchIndex.set(term, new Set());
      }
      this.searchIndex.get(term)!.add(doc.id);
    });
  }

  /**
   * 문서에서 검색 가능한 용어 추출
   */
  private extractTerms(doc: SearchDocument): string[] {
    const terms = new Set<string>();

    // 제목에서 용어 추출
    if (doc.title) {
      this.extractWords(doc.title).forEach((word) => terms.add(word));
    }

    // 요약에서 용어 추출
    if (doc.summary) {
      this.extractWords(doc.summary).forEach((word) => terms.add(word));
    }

    // 태그에서 용어 추출
    if (doc.tags) {
      doc.tags.forEach((tag) => {
        this.extractWords(tag).forEach((word) => terms.add(word));
      });
    }

    // 카테고리에서 용어 추출
    if (doc.category) {
      this.extractWords(doc.category).forEach((word) => terms.add(word));
    }

    return Array.from(terms);
  }

  /**
   * 텍스트에서 검색 가능한 단어 추출 (한국어 지원)
   */
  private extractWords(text: string): string[] {
    return text
      .toLowerCase()
      .split(/[\s\-_]+/)
      .map((word) => word.replace(/[^a-z0-9가-힣]/g, ""))
      .filter((word) => word.length > 1); // 2글자 이상만
  }

  /**
   * 고급 검색 실행
   */
  async search(options: SearchOptions): Promise<SearchResult[]> {
    if (!this.isBuilt) {
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

      // 1. 검색 쿼리 처리
      const queryTerms = this.extractWords(query);
      const matchingDocs = this.findMatchingDocuments(queryTerms);

      // 2. 필터 적용
      let filteredDocs = matchingDocs;
      if (filters) {
        filteredDocs = this.applyFilters(filteredDocs, filters);
      }

      // 3. 점수 계산 및 결과 생성
      const results = filteredDocs.map((doc) => ({
        document: doc,
        score: this.calculateScore(doc, queryTerms),
        highlights: this.generateHighlights(doc, query),
      }));

      // 4. 정렬 적용
      if (sortBy !== "relevance") {
        this.sortResults(results, sortBy);
      } else {
        // 관련성 점수로 정렬
        results.sort((a, b) => b.score - a.score);
      }

      // 5. offset 및 limit 적용
      return results.slice(offset, offset + limit);
    } catch (error) {
      console.error("❌ 검색 실행 실패:", error);
      return [];
    }
  }

  /**
   * 매칭되는 문서 찾기
   */
  private findMatchingDocuments(queryTerms: string[]): SearchDocument[] {
    const matchingDocIds = new Set<string>();

    queryTerms.forEach((term) => {
      if (this.searchIndex.has(term)) {
        this.searchIndex.get(term)!.forEach((docId) => {
          matchingDocIds.add(docId);
        });
      }
    });

    return Array.from(matchingDocIds).map((id) => this.documents.get(id)!);
  }

  /**
   * 필터 적용
   */
  private applyFilters(
    docs: SearchDocument[],
    filters: SearchOptions["filters"]
  ): SearchDocument[] {
    if (!filters) return docs;

    return docs.filter((doc) => {
      if (filters.type && doc.type !== filters.type) return false;
      if (filters.category && doc.category !== filters.category) return false;
      if (filters.author && doc.author !== filters.author) return false;
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some((tag) =>
          doc.tags.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }
      return true;
    });
  }

  /**
   * 검색 점수 계산 (가중치 기반)
   */
  private calculateScore(doc: SearchDocument, queryTerms: string[]): number {
    let score = 0;

    queryTerms.forEach((term) => {
      // 제목 매칭 (가장 높은 가중치)
      if (doc.title.toLowerCase().includes(term)) {
        score += 10;
      }

      // 태그 매칭 (높은 가중치)
      if (doc.tags.some((tag) => tag.toLowerCase().includes(term))) {
        score += 8;
      }

      // 요약 매칭 (중간 가중치)
      if (doc.summary.toLowerCase().includes(term)) {
        score += 5;
      }

      // 카테고리 매칭 (낮은 가중치)
      if (doc.category.toLowerCase().includes(term)) {
        score += 3;
      }
    });

    return score;
  }

  /**
   * 하이라이트 생성
   */
  private generateHighlights(doc: SearchDocument, query: string): string[] {
    const highlights: string[] = [];
    const queryTerms = query.toLowerCase().split(/\s+/);

    // 제목에서 하이라이트
    if (doc.title) {
      for (const term of queryTerms) {
        if (doc.title.toLowerCase().includes(term)) {
          highlights.push(`제목: ${doc.title}`);
          break;
        }
      }
    }

    // 요약에서 하이라이트
    if (doc.summary) {
      for (const term of queryTerms) {
        if (doc.summary.toLowerCase().includes(term)) {
          const start = Math.max(
            0,
            doc.summary.toLowerCase().indexOf(term) - 20
          );
          const end = Math.min(
            doc.summary.length,
            doc.summary.toLowerCase().indexOf(term) + term.length + 20
          );
          highlights.push(`요약: ...${doc.summary.slice(start, end)}...`);
          break;
        }
      }
    }

    // 태그에서 하이라이트
    if (doc.tags) {
      const matchingTags = doc.tags.filter((tag) =>
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
  private sortResults(results: SearchResult[], sortBy: string): void {
    switch (sortBy) {
      case "date":
        results.sort(
          (a, b) =>
            new Date(b.document.date).getTime() -
            new Date(a.document.date).getTime()
        );
        break;

      case "title":
        results.sort((a, b) =>
          a.document.title.localeCompare(b.document.title)
        );
        break;

      case "readingTime":
        results.sort((a, b) => b.document.readingTime - a.document.readingTime);
        break;

      case "relevance":
      default:
        results.sort((a, b) => b.score - a.score);
        break;
    }
  }

  /**
   * 자동완성 제안
   */
  async getSuggestions(query: string, limit = 5): Promise<string[]> {
    if (!this.isBuilt) {
      return [];
    }

    try {
      const suggestions = new Set<string>();
      const queryLower = query.toLowerCase();

      // 1. 제목 기반 제안
      this.documents.forEach((doc) => {
        if (doc.title.toLowerCase().includes(queryLower)) {
          suggestions.add(doc.title);
        }
      });

      // 2. 태그 기반 제안
      this.documents.forEach((doc) => {
        doc.tags?.forEach((tag) => {
          if (tag.toLowerCase().includes(queryLower)) {
            suggestions.add(tag);
          }
        });
      });

      // 3. 카테고리 기반 제안
      this.documents.forEach((doc) => {
        if (doc.category && doc.category.toLowerCase().includes(queryLower)) {
          suggestions.add(doc.category);
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
      indexSize: this.searchIndex.size,
    };
  }

  /**
   * 인덱스 상태 확인
   */
  isReady(): boolean {
    return this.isBuilt;
  }

  /**
   * 인덱스 정리
   */
  clear(): void {
    this.searchIndex.clear();
    this.documents.clear();
    this.isBuilt = false;
    this.buildTime = 0;
    this.documentCount = 0;
  }
}

// 싱글톤 인스턴스
export const enhancedSearchIndex = new EnhancedSearchIndex();
