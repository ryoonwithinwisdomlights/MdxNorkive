import { notion } from "@/app/api/clients";
import { NOTION_DATABASE_ID } from "@/app/api/clients";
import { n2m } from "@/app/api/clients";
import { generateUserFriendlySlug } from "@/lib/utils";
import {
  processNotionImages,
  processDocumentLinks,
  processPageCover,
} from "@/lib/utils/mdx-data-processing/cloudinary";
import {
  decodeUrlEncodedLinks,
  processMdxContentWithLoggingFn,
  validateAndFixMdxContent,
} from "@/lib/utils/mdx-data-processing/convert-unsafe-mdx";
// SlugManager는 현재 사용하지 않으므로 제거
import path from "path";
import fs from "fs/promises";

export interface MdxGenerationOptions {
  parallel: boolean;
  maxConcurrency: number;
  enableCaching: boolean;
  retryAttempts: number;
  outputDir: string;
}

export interface MdxGenerationResult {
  success: boolean;
  pageId: string;
  slug: string;
  outputPath: string;
  error?: string;
  processingTime: number;
  fileSize: number;
}

export class EnhancedMdxGenerator {
  private cache: Map<string, any> = new Map();
  private options: MdxGenerationOptions;
  private stats = {
    total: 0,
    success: 0,
    failed: 0,
    totalTime: 0,
    avgTime: 0,
  };

  constructor(options: Partial<MdxGenerationOptions> = {}) {
    this.options = {
      parallel: true,
      maxConcurrency: 4,
      enableCaching: true,
      retryAttempts: 3,
      outputDir: "content",
      ...options,
    };
  }

  /**
   * 병렬 처리를 통한 MDX 생성 최적화
   */
  async generateMdxFilesInParallel(
    pageIds: string[],
    outputDir: string
  ): Promise<MdxGenerationResult[]> {
    const startTime = Date.now();
    this.stats.total = pageIds.length;

    console.log(`🚀 병렬 MDX 생성 시작: ${pageIds.length}개 페이지`);

    if (this.options.parallel) {
      return this.processInParallel(pageIds, outputDir);
    } else {
      return this.processSequentially(pageIds, outputDir);
    }
  }

  /**
   * 병렬 처리 구현
   */
  private async processInParallel(
    pageIds: string[],
    outputDir: string
  ): Promise<MdxGenerationResult[]> {
    const startTime = Date.now();
    const results: MdxGenerationResult[] = [];
    const chunks = this.chunkArray(pageIds, this.options.maxConcurrency);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(
        `📦 청크 ${i + 1}/${chunks.length} 처리 중 (${chunk.length}개 페이지)`
      );

      const chunkPromises = chunk.map((pageId) =>
        this.generateSingleMdxFile(pageId, outputDir)
      );

      const chunkResults = await Promise.allSettled(chunkPromises);

      chunkResults.forEach((result, index) => {
        if (result.status === "fulfilled") {
          results.push(result.value);
          if (result.value.success) {
            this.stats.success++;
          } else {
            this.stats.failed++;
          }
        } else {
          const errorResult: MdxGenerationResult = {
            success: false,
            pageId: chunk[index],
            slug: "",
            outputPath: "",
            error: result.reason?.message || "Unknown error",
            processingTime: 0,
            fileSize: 0,
          };
          results.push(errorResult);
          this.stats.failed++;
        }
      });

      // 청크 간 간격을 두어 API 제한 방지
      if (i < chunks.length - 1) {
        await this.delay(1000);
      }
    }

    this.calculateStats(startTime);
    return results;
  }

  /**
   * 순차 처리 구현
   */
  private async processSequentially(
    pageIds: string[],
    outputDir: string
  ): Promise<MdxGenerationResult[]> {
    const startTime = Date.now();
    const results: MdxGenerationResult[] = [];

    for (const pageId of pageIds) {
      const result = await this.generateSingleMdxFile(pageId, outputDir);
      results.push(result);

      if (result.success) {
        this.stats.success++;
      } else {
        this.stats.failed++;
      }

      // API 제한 방지를 위한 지연
      await this.delay(500);
    }

    this.calculateStats(startTime);
    return results;
  }

  /**
   * 단일 MDX 파일 생성
   */
  private async generateSingleMdxFile(
    pageId: string,
    outputDir: string
  ): Promise<MdxGenerationResult> {
    const startTime = Date.now();

    try {
      // 캐시 확인
      if (this.options.enableCaching && this.cache.has(pageId)) {
        const cached = this.cache.get(pageId);
        return {
          success: true,
          pageId,
          slug: cached.slug,
          outputPath: cached.outputPath,
          processingTime: Date.now() - startTime,
          fileSize: cached.fileSize,
        };
      }

      // Notion 페이지 데이터 가져오기
      const pageData = await this.fetchPageWithRetry(pageId);
      if (!pageData) {
        throw new Error("페이지 데이터를 가져올 수 없습니다");
      }

      // MDX 콘텐츠 생성
      const mdxContent = await this.generateMdxContent(pageData, pageId);

      // 슬러그 생성
      const slug = this.generateSlug(pageData);

      // 출력 디렉토리 생성
      const typeDir = this.getTypeDirectory(pageData);
      const fullOutputDir = path.join(outputDir, typeDir);
      await fs.mkdir(fullOutputDir, { recursive: true });

      // 파일 저장
      const outputPath = path.join(fullOutputDir, `${slug}.mdx`);
      await fs.writeFile(outputPath, mdxContent, "utf-8");

      // 파일 크기 확인
      const stats = await fs.stat(outputPath);
      const fileSize = stats.size;

      const result: MdxGenerationResult = {
        success: true,
        pageId,
        slug,
        outputPath,
        processingTime: Date.now() - startTime,
        fileSize,
      };

      // 캐시에 저장
      if (this.options.enableCaching) {
        this.cache.set(pageId, {
          slug,
          outputPath,
          fileSize,
        });
      }

      return result;
    } catch (error) {
      console.error(`❌ MDX 생성 실패 (${pageId}):`, error);

      return {
        success: false,
        pageId,
        slug: "",
        outputPath: "",
        error: error instanceof Error ? error.message : "Unknown error",
        processingTime: Date.now() - startTime,
        fileSize: 0,
      };
    }
  }

  /**
   * 재시도 로직을 포함한 페이지 데이터 가져오기
   */
  private async fetchPageWithRetry(pageId: string, attempt = 1): Promise<any> {
    try {
      const pageData = await notion.pages.retrieve({ page_id: pageId });
      return pageData;
    } catch (error) {
      if (attempt < this.options.retryAttempts) {
        console.warn(
          `⚠️ 재시도 ${attempt}/${this.options.retryAttempts} (${pageId})`
        );
        await this.delay(1000 * attempt); // 지수 백오프
        return this.fetchPageWithRetry(pageId, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * MDX 콘텐츠 생성
   */
  private async generateMdxContent(
    pageData: any,
    pageId: string
  ): Promise<string> {
    try {
      // 1. notion-to-md로 기본 변환
      const mdBlocks = await n2m.pageToMarkdown(pageId);
      let content = n2m.toMarkdownString(mdBlocks) as unknown as string;

      // 2. 이미지 처리
      content = await processNotionImages(content);
      content = await processDocumentLinks(content);

      // 3. pageCover 처리
      if (pageData.cover) {
        const processedCover = await processPageCover(
          pageData.cover.external?.url || pageData.cover.file?.url
        );
        if (processedCover) {
          content = `---\npageCover: ${processedCover}\n---\n\n${content}`;
        }
      }

      // 4. MDX 안전성 처리
      content = decodeUrlEncodedLinks(content);
      content = processMdxContentWithLoggingFn(content);

      // 5. 메타데이터 생성
      const frontMatter = this.generateFrontMatter(pageData);

      return `${frontMatter}\n\n${content}`;
    } catch (error) {
      console.warn(`⚠️ MDX 처리 실패, 기본 변환 사용 (${pageId}):`, error);

      // 폴백: 기본 notion-to-md 결과 사용
      const mdBlocks = await n2m.pageToMarkdown(pageId);
      const content = n2m.toMarkdownString(mdBlocks) as unknown as string;
      const frontMatter = this.generateFrontMatter(pageData);

      return `${frontMatter}\n\n${content}`;
    }
  }

  /**
   * Front Matter 생성
   */
  private generateFrontMatter(pageData: any): string {
    const props = pageData.properties;

    const frontMatter = {
      title: this.extractTitle(props),
      slug: this.generateSlug(pageData),
      notionId: pageData.id,
      type: props.type?.select?.name || "UNKNOWN",
      date: props.date?.date?.start || new Date().toISOString(),
      draft: props.status?.select?.name !== "Published",
      // 기타 필요한 메타데이터들...
    };

    return `---\n${Object.entries(frontMatter)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join("\n")}\n---`;
  }

  /**
   * 제목 추출
   */
  private extractTitle(props: any): string {
    if (props.title?.title?.[0]?.plain_text) {
      return props.title.title[0].plain_text;
    }
    return "Untitled";
  }

  /**
   * 슬러그 생성
   */
  private generateSlug(pageData: any): string {
    const title = this.extractTitle(pageData.properties);
    // 간단한 슬러그 생성 로직
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return baseSlug;
  }

  /**
   * 타입별 디렉토리 결정
   */
  private getTypeDirectory(pageData: any): string {
    const type = pageData.properties.type?.select?.name;
    switch (type?.toLowerCase()) {
      case "records":
        return "records";
      case "books":
        return "books";
      case "projects":
        return "projects";
      case "engineerings":
        return "engineerings";
      default:
        return "records";
    }
  }

  /**
   * 배열을 청크로 분할
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * 통계 계산
   */
  private calculateStats(startTime: number): void {
    this.stats.totalTime = Date.now() - startTime;
    this.stats.avgTime =
      this.stats.total > 0 ? this.stats.totalTime / this.stats.total : 0;
  }

  /**
   * 통계 반환
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * 캐시 정리
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 메모리 사용량 확인
   */
  getMemoryUsage(): number {
    return this.cache.size;
  }
}
