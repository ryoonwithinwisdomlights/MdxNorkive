import { NextRequest, NextResponse } from "next/server";
import { enhancedSearchIndex } from "@/lib/search/enhanced-search-index";
import { SearchDocument } from "@/lib/search/enhanced-search-index";

export async function POST(request: NextRequest) {
  try {
    const body: { documents: SearchDocument[] } = await request.json();
    const { documents } = body;

    if (!documents || !Array.isArray(documents) || documents.length === 0) {
      return NextResponse.json(
        { error: "검색 인덱스를 빌드할 문서가 필요합니다" },
        { status: 400 }
      );
    }

    console.log(`🔍 검색 인덱스 빌드 시작: ${documents.length}개 문서`);

    // 검색 인덱스 빌드
    await enhancedSearchIndex.buildIndex(documents);

    const stats = enhancedSearchIndex.getStats();

    return NextResponse.json({
      success: true,
      message: "검색 인덱스가 성공적으로 빌드되었습니다",
      stats,
      documentCount: documents.length,
    });
  } catch (error) {
    console.error("검색 인덱스 빌드 오류:", error);
    return NextResponse.json(
      { error: "검색 인덱스 빌드 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = enhancedSearchIndex.getStats();

    return NextResponse.json({
      success: true,
      stats,
      isReady: enhancedSearchIndex.isReady(),
    });
  } catch (error) {
    console.error("검색 인덱스 상태 확인 오류:", error);
    return NextResponse.json(
      { error: "검색 인덱스 상태 확인 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    enhancedSearchIndex.clear();

    return NextResponse.json({
      success: true,
      message: "검색 인덱스가 정리되었습니다",
    });
  } catch (error) {
    console.error("검색 인덱스 정리 오류:", error);
    return NextResponse.json(
      { error: "검색 인덱스 정리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
