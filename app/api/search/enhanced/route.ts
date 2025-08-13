import { NextRequest, NextResponse } from "next/server";
import { enhancedSearchIndex } from "@/lib/search/enhanced-search-index";
import { SearchOptions } from "@/lib/search/enhanced-search-index";

export async function POST(request: NextRequest) {
  try {
    const body: SearchOptions = await request.json();
    const { query, limit, offset, filters, sortBy } = body;

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "검색 쿼리가 필요합니다" },
        { status: 400 }
      );
    }

    // 검색 실행
    const results = await enhancedSearchIndex.search({
      query: query.trim(),
      limit: limit || 20,
      offset: offset || 0,
      filters,
      sortBy,
    });

    return NextResponse.json({
      success: true,
      results,
      total: results.length,
      query,
      filters,
      sortBy,
    });
  } catch (error) {
    console.error("검색 API 오류:", error);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const tags = searchParams.get("tags")?.split(",");
    const author = searchParams.get("author");
    const sortBy = searchParams.get("sort") as any;

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: "검색 쿼리가 필요합니다" },
        { status: 400 }
      );
    }

    // 필터 구성
    const filters: any = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (tags && tags.length > 0) filters.tags = tags;
    if (author) filters.author = author;

    // 검색 실행
    const results = await enhancedSearchIndex.search({
      query: query.trim(),
      limit,
      offset,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      sortBy: sortBy || "relevance",
    });

    return NextResponse.json({
      success: true,
      results,
      total: results.length,
      query,
      filters,
      sortBy,
    });
  } catch (error) {
    console.error("검색 API 오류:", error);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
