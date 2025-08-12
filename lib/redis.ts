import { EXTERNAL_CONFIG } from "@/config/external.config";
import { Redis } from "@upstash/redis";

// Redis 설정 확인
const redisUrl = EXTERNAL_CONFIG.UPSTASH_REDIS_REST_URL!;
const redisToken = EXTERNAL_CONFIG.UPSTASH_REDIS_REST_TOKEN!;

if (!redisUrl || !redisToken) {
  console.warn("⚠️ Redis 환경변수가 설정되지 않았습니다:");
  console.warn(
    `   - UPSTASH_REDIS_REST_URL: ${redisUrl ? "✅ 설정됨" : "❌ 설정 안됨"}`
  );
  console.warn(
    `   - UPSTASH_REDIS_REST_TOKEN: ${
      redisToken ? "✅ 설정됨" : "❌ 설정 안됨"
    }`
  );
}

export const redis = new Redis({
  url: redisUrl!,
  token: redisToken!,
});

// Redis 연결 테스트 함수
export async function testRedisConnection() {
  try {
    await redis.ping();
    console.log("✅ Redis 연결 성공");
    return true;
  } catch (error) {
    console.error("❌ Redis 연결 실패:", error);
    return false;
  }
}
