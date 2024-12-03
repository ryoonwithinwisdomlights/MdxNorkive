import cache from "memory-cache";

import { BLOG } from "@/blog.config";
// import { cache } from "react";

const cacheTime = BLOG.isProd ? 10 * 60 : 120 * 60; // 120 minutes for dev,10 minutes for prod

export async function getCache(key) {
  console.log("getCache cache:", cache);
  return await cache.get(key);
}

export async function setCache(key, data) {
  console.log("setCache cache:", cache);
  await cache.put(key, data, cacheTime * 1000);
}

export async function delCache(key) {
  console.log("delCache cache:", cache);
  await cache.del(key);
}

export default { getCache, setCache, delCache };
