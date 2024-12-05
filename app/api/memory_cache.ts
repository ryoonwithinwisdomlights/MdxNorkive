import cache from "memory-cache";

import { BLOG } from "@/blog.config";
// import { cache } from "react";

const cacheTime = BLOG.isProd ? 10 * 60 : 120 * 60; // 120 minutes for dev,10 minutes for prod

export async function getCache(key) {
  console.log("getCache cache:", key);
  return await cache.get(key);
}

export async function setCache(key, data) {
  console.log("setCache cache:", key, data);
  await cache.put(key, data, cacheTime * 1000);
}

export async function delCache(key) {
  console.log("delCache cache:", key);
  await cache.del(key);
}

export default { getCache, setCache, delCache };
