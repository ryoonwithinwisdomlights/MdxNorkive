import { redis } from "@/lib/redis";

export interface ImageCacheInfo {
  originalUrl: string;
  cachedUrl: string;
  fileName: string;
  contentType: string;
  size: number;
  cachedAt: string;
  expiresAt: string;
}

export class RedisCacheManager {
  private readonly CACHE_PREFIX = "image_cache:";
  private readonly CACHE_EXPIRY = 24 * 60 * 60; // 24시간 (초 단위)

  /**
   * 이미지 URL을 Redis에 캐시
   */
  async cacheImageUrl(
    originalUrl: string,
    cachedUrl: string,
    metadata: Partial<ImageCacheInfo> = {}
  ): Promise<void> {
    const cacheKey = this.generateCacheKey(originalUrl);
    const cacheInfo: ImageCacheInfo = {
      originalUrl,
      cachedUrl,
      fileName: metadata.fileName || this.extractFileName(originalUrl),
      contentType: metadata.contentType || "image/jpeg",
      size: metadata.size || 0,
      cachedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + this.CACHE_EXPIRY * 1000).toISOString(),
      ...metadata,
    };

    await redis.setex(cacheKey, this.CACHE_EXPIRY, JSON.stringify(cacheInfo));
  }

  /**
   * 캐시된 이미지 URL 조회
   */
  async getCachedImageUrl(originalUrl: string): Promise<string | null> {
    try {
      const cacheKey = this.generateCacheKey(originalUrl);
      const cached = await redis.get(cacheKey);

      if (!cached) return null;

      // Redis에서 가져온 값이 문자열인지 확인
      const cachedString =
        typeof cached === "string" ? cached : JSON.stringify(cached);
      const cacheInfo: ImageCacheInfo = JSON.parse(cachedString);
      return cacheInfo.cachedUrl;
    } catch (error) {
      console.error("Redis 캐시 조회 실패:", error);
      return null;
    }
  }

  /**
   * 만료된 이미지 URL들 조회
   */
  async getExpiredImageUrls(): Promise<string[]> {
    const pattern = `${this.CACHE_PREFIX}*`;
    const keys = await redis.keys(pattern);
    const expiredUrls: string[] = [];

    for (const key of keys) {
      const cached = await redis.get(key);
      if (!cached) continue;

      try {
        // Redis에서 가져온 값이 문자열인지 확인
        const cachedString =
          typeof cached === "string" ? cached : JSON.stringify(cached);
        const cacheInfo: ImageCacheInfo = JSON.parse(cachedString);
        const expiresAt = new Date(cacheInfo.expiresAt);

        if (expiresAt < new Date()) {
          expiredUrls.push(cacheInfo.originalUrl);
        }
      } catch (error) {
        console.error("캐시 파싱 오류:", error);
      }
    }

    return expiredUrls;
  }

  /**
   * 캐시된 이미지 정보 조회
   */
  async getImageCacheInfo(originalUrl: string): Promise<ImageCacheInfo | null> {
    const cacheKey = this.generateCacheKey(originalUrl);
    const cached = await redis.get(cacheKey);

    if (!cached) return null;

    try {
      // Redis에서 가져온 값이 문자열인지 확인
      const cachedString =
        typeof cached === "string" ? cached : JSON.stringify(cached);
      return JSON.parse(cachedString);
    } catch (error) {
      console.error("캐시 파싱 오류:", error);
      return null;
    }
  }

  /**
   * 캐시 삭제
   */
  async deleteCache(originalUrl: string): Promise<void> {
    const cacheKey = this.generateCacheKey(originalUrl);
    await redis.del(cacheKey);
  }

  /**
   * 모든 이미지 캐시 조회
   */
  async getAllCachedImages(): Promise<ImageCacheInfo[]> {
    const pattern = `${this.CACHE_PREFIX}*`;
    const keys = await redis.keys(pattern);
    const images: ImageCacheInfo[] = [];

    for (const key of keys) {
      const cached = await redis.get(key);
      if (!cached) continue;

      try {
        // Redis에서 가져온 값이 문자열인지 확인
        const cachedString =
          typeof cached === "string" ? cached : JSON.stringify(cached);
        const cacheInfo: ImageCacheInfo = JSON.parse(cachedString);
        images.push(cacheInfo);
      } catch (error) {
        console.error("캐시 파싱 오류:", error);
      }
    }

    return images;
  }

  /**
   * 캐시 통계 조회
   */
  async getCacheStats(): Promise<{
    totalImages: number;
    totalSize: number;
    expiredCount: number;
  }> {
    const images = await this.getAllCachedImages();
    const now = new Date();

    const expiredCount = images.filter(
      (img) => new Date(img.expiresAt) < now
    ).length;
    const totalSize = images.reduce((sum, img) => sum + img.size, 0);

    return {
      totalImages: images.length,
      totalSize,
      expiredCount,
    };
  }

  private generateCacheKey(originalUrl: string): string {
    const hash = this.simpleHash(originalUrl);
    return `${this.CACHE_PREFIX}${hash}`;
  }

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

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

export const redisCacheManager = new RedisCacheManager();

/**
 * @deprecated v2에서 imageCacheManager 이름 제거 예정
 * 호환성을 위해 유지
 */
export const imageCacheManager = redisCacheManager;
