import { cookies } from "next/headers";

/**
 * 서버 컴포넌트에서 쿠키를 읽는 유틸리티 함수
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie?.value || null;
}

/**
 * 서버 컴포넌트에서 다중 쿠키를 읽는 유틸리티 함수
 * @param names 쿠키 이름 배열
 * @returns 쿠키 값들이 담긴 객체
 */
export async function getCookies(
  names: string[]
): Promise<Record<string, string | null>> {
  const cookieStore = await cookies();
  const result: Record<string, string | null> = {};

  for (const name of names) {
    const cookie = cookieStore.get(name);
    result[name] = cookie?.value || null;
  }

  return result;
}
