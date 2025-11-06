import { DOCS_CONFIG } from "@/config/docs.config";
import { redisCacheManager } from "@/lib/cache/redis_cache_manager";
import { config } from "dotenv";
import "dotenv/config";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}

const BASE_OUTPUT_DIR = path.join(
  process.cwd(),
  DOCS_CONFIG.DOCS_ROOT_DIR_NAME
);

interface ProcessedImage {
  originalUrl: string;
  proxyUrl: string;
  fileName: string;
}

class RedisImageProcessor {
  private processedImages: ProcessedImage[] = [];
  private baseUrl: string;

  constructor() {
    // Vercel 배포 시 환경변수에서 가져오거나, 로컬에서는 localhost 사용
    this.baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
  }

  /**
   * MDX 콘텐츠에서 노션 이미지 URL을 프록시 URL로 교체
   */
  async processMdxContent(content: string): Promise<string> {
    // 마크다운 이미지 문법 처리: ![alt](url)
    const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let processedContent = content;

    const markdownMatches = [...content.matchAll(markdownImageRegex)];
    for (const match of markdownMatches) {
      const [fullMatch, alt, imageUrl] = match;

      if (this.isNotionImageOrFileUrl(imageUrl)) {
        const proxyUrl = await this.getOrCreateProxyUrl(imageUrl);
        const newImageTag = `![${alt}](${proxyUrl})`;
        processedContent = processedContent.replace(fullMatch, newImageTag);

        this.processedImages.push({
          originalUrl: imageUrl,
          proxyUrl,
          fileName: this.extractFileName(imageUrl),
        });
      }
    }

    // HTML img 태그 처리: <img src="url">
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    const htmlMatches = [...processedContent.matchAll(htmlImageRegex)];

    for (const match of htmlMatches) {
      const [fullMatch, imageUrl] = match;

      if (this.isNotionImageOrFileUrl(imageUrl)) {
        const proxyUrl = await this.getOrCreateProxyUrl(imageUrl);
        const newImageTag = fullMatch.replace(imageUrl, proxyUrl);
        processedContent = processedContent.replace(fullMatch, newImageTag);

        this.processedImages.push({
          originalUrl: imageUrl,
          proxyUrl,
          fileName: this.extractFileName(imageUrl),
        });
      }
    }

    return processedContent;
  }

  /**
   * 노션 이미지 URL인지 확인
   */
  private isNotionImageOrFileUrl(url: string): boolean {
    return (
      url.includes("prod-files-secure.s3.us-west-2.amazonaws.com") ||
      url.includes("s3.us-west-2.amazonaws.com") ||
      url.includes("notion.so")
    );
  }

  /**
   * 프록시 URL 생성 또는 기존 캐시 사용
   */
  private async getOrCreateProxyUrl(originalUrl: string): Promise<string> {
    // Redis에서 캐시된 URL 확인
    const cachedUrl = await redisCacheManager.getCachedImageUrl(originalUrl);

    if (cachedUrl) {
      return cachedUrl;
    }

    // 캐시된 URL이 없으면 프록시 URL 생성
    const proxyUrl = `${this.baseUrl}/api/image-proxy?url=${encodeURIComponent(
      originalUrl
    )}`;

    // Redis에 임시 캐시 정보 저장 (실제 이미지는 프록시 API에서 처리됨)
    await redisCacheManager.cacheImageUrl(originalUrl, proxyUrl, {
      fileName: this.extractFileName(originalUrl),
    });

    return proxyUrl;
  }

  /**
   * 파일명 추출
   */
  private extractFileName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      let fileName = pathname.split("/").pop() || "image.jpg";

      if (fileName.includes("?")) {
        fileName = fileName.split("?")[0];
      }

      return fileName;
    } catch (error) {
      return `image_${Date.now()}.jpg`;
    }
  }

  /**
   * 모든 MDX 파일 처리
   */
  async processAllMdxFiles(): Promise<void> {
    console.log("🔄 Redis 기반 이미지 처리 시작...");

    const mdxFiles = await this.findMdxFiles(BASE_OUTPUT_DIR);
    console.log(`📁 처리할 MDX 파일 수: ${mdxFiles.length}`);

    let processedCount = 0;
    let imageCount = 0;

    for (const filePath of mdxFiles) {
      try {
        const content = await fs.readFile(filePath, "utf-8");
        const { data, content: mdxContent } = matter(content);

        const processedContent = await this.processMdxContent(mdxContent);

        if (processedContent !== mdxContent) {
          const newContent = matter.stringify(processedContent, data);
          await fs.writeFile(filePath, newContent, "utf-8");
          processedCount++;

          console.log(`✅ 처리 완료: ${path.basename(filePath)}`);
        }
      } catch (error) {
        console.error(`❌ 파일 처리 실패: ${filePath}`, error);
      }
    }

    imageCount = this.processedImages.length;

    console.log(`\n🎉 Redis 이미지 처리 완료!`);
    console.log(`📊 통계:`);
    console.log(`   - 처리된 파일: ${processedCount}개`);
    console.log(`   - 처리된 이미지: ${imageCount}개`);

    // Redis 캐시 통계 출력
    const stats = await redisCacheManager.getCacheStats();
    console.log(`   - Redis 캐시된 이미지: ${stats.totalImages}개`);
    console.log(`   - 만료된 이미지: ${stats.expiredCount}개`);
  }

  /**
   * MDX 파일 찾기
   */
  private async findMdxFiles(dir: string): Promise<string[]> {
    const files: string[] = [];

    try {
      const items = await fs.readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          const subFiles = await this.findMdxFiles(fullPath);
          files.push(...subFiles);
        } else if (item.endsWith(".mdx")) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`디렉토리 읽기 실패: ${dir}`, error);
    }

    return files;
  }

  /**
   * 캐시 통계 출력
   */
  async printCacheStats(): Promise<void> {
    try {
      const stats = await redisCacheManager.getCacheStats();
      console.log(`\n📊 Redis 이미지 캐시 통계:`);
      console.log(`   - 총 이미지: ${stats.totalImages}개`);
      console.log(
        `   - 총 크기: ${(stats.totalSize / 1024 / 1024).toFixed(2)}MB`
      );
      console.log(`   - 만료된 이미지: ${stats.expiredCount}개`);
    } catch (error) {
      console.log(`\n📊 Redis 이미지 캐시 통계: 에러 발생 - ${error}`);
    }
  }
}

// 메인 실행 함수
async function main() {
  try {
    const processor = new RedisImageProcessor();
    await processor.processAllMdxFiles();
    await processor.printCacheStats();
  } catch (error) {
    console.error("Redis 이미지 처리 중 오류 발생:", error);
    process.exit(1);
  }
}

// 스크립트가 직접 실행될 때만 main 함수 호출
if (require.main === module) {
  main();
}

export default RedisImageProcessor;
