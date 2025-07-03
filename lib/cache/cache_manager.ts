import MemoryCache from "./memory_cache";
import { redis } from "@/lib/redis"; // Upstash Redis 인스턴스
import { BLOG } from "@/blog.config";

const isProd = BLOG.isProd;
/**
 * To reduce frequent interface requests，notion data will be cached
 * @param {*} key
 * @returns
 */
export async function getDataFromCache(
  key: string,
  force = false
): Promise<any | null> {
  if (!BLOG.ENABLE_CACHE && !force) return null;

  if (isProd) {
    const cached = await redis.get(key);
    console.log("[Redis] getCache:", key, cached ? "hit" : "miss");
    return cached || null;
  } else {
    const cached = await MemoryCache.getCache(key);
    console.log("[Memory] getCache:", key, cached ? "hit" : "miss");
    return cached || null;
  }
}

export async function setDataToCache(key: string, data: any): Promise<void> {
  if (!data || !BLOG.ENABLE_CACHE) return;
  //TTL 설정 운영(10분), 로컬(2시간) 유지됨
  if (isProd) {
    await redis.set(key, data, { ex: 600 }); // 10분 TTL
    console.log("[Redis] setCache:", key);
  } else {
    await MemoryCache.setCache(key, data); // 기존 memory-cache TTL 사용
    console.log("[Memory] setCache:", key);
  }
}

export async function delCacheData(key: string): Promise<void> {
  if (!BLOG.ENABLE_CACHE) return;

  if (isProd) {
    await redis.del(key);
    console.log("[Redis] delCache:", key);
  } else {
    await MemoryCache.delCache(key);
    console.log("[Memory] delCache:", key);
  }
}
