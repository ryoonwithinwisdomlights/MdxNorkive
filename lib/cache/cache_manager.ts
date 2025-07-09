import MemoryCache from "./memory_cache";
import { redis } from "@/lib/redis"; // Upstash Redis 인스턴스
import { BLOG } from "@/blog.config";

const isProd = BLOG.isProd;
const TTL = isProd ? 600 : 7200; // prod: 10min, dev: 2h
/**
 * To reduce frequent interface requests，notion data will be cached
 * @param {*} key
 * @returns
 */
export async function getDataFromCache(
  key: string,
  force = false
): Promise<any | null> {
  if (!BLOG.ENABLE_CACHE) return null;

  const cached = isProd
    ? await redis.get(key)
    : await MemoryCache.getCache(key);

  console.log(
    `[Cache ${isProd ? "Redis" : "Memory"}] get: ${key} →`,
    cached ? "hit" : "miss"
  );
  return cached || null;
}

export async function setDataToCache(key: string, data: any): Promise<void> {
  if (isProd) {
    await redis.set(key, data, { ex: TTL }); // 10분 TTL
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
