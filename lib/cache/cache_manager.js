import MemoryCache from "./memory_cache";

import { BLOG } from "@/blog.config";

let api = MemoryCache;

/**
 * To reduce frequent interface requests，notion data will be cached
 * @param {*} key
 * @returns
 */
export async function getDataFromCache(key, force) {
  if (BLOG.ENABLE_CACHE || force) {
    const dataFromCache = await api.getCache(key);
    console.log("dataFromCache::", dataFromCache);
    if (JSON.stringify(dataFromCache) === "[]") {
      return null;
    }
    return api.getCache(key);
  } else {
    return null;
  }
}

export async function setDataToCache(key, data) {
  if (!data) {
    return;
  }
  await api.setCache(key, data);
}

export async function delCacheData(key) {
  if (!BLOG.ENABLE_CACHE) {
    return;
  }
  await api.delCache(key);
}
