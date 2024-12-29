import MemoryCache from "./memory_cache";
import FileCache from "./local_file_cache";
import { BLOG } from "@/blog.config";

// let api = MemoryCache;

/**
 * To reduce frequent interface requests，notion data will be cached
 * @param {*} key
 * @returns
 */
export async function getDataFromCache(key, force = false) {
  if (BLOG.ENABLE_CACHE || force) {
    const dataFromCache = await getApi().getCache(key);
    console.log("dataFromCache::", dataFromCache);
    if (JSON.stringify(dataFromCache) === "[]") {
      return null;
    }
    return getApi().getCache(key);
  } else {
    return null;
  }
}

export async function setDataToCache(key, data) {
  if (!data) {
    return;
  }
  await getApi().setCache(key, data);
}

export async function delCacheData(key) {
  // if (!JSON.parse(BLOG.ENABLE_CACHE)) {
  if (!BLOG.ENABLE_CACHE) {
    return;
  }
  await getApi().delCache(key);
}
function getApi() {
  if (process.env.ENABLE_FILE_CACHE) {
    return FileCache;
  } else {
    return MemoryCache;
  }
}
