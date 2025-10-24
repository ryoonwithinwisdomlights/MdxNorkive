import { NextResponse } from "next/server";
import { fetchMenuList } from "@/app/api/fetcher";

export async function GET() {
  try {
    const menuList = await fetchMenuList();

    // 응답에 캐싱 헤더 추가
    const response = NextResponse.json(menuList);
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Failed to fetch menu list:", error);
    return NextResponse.json([], { status: 500 });
  }
}
