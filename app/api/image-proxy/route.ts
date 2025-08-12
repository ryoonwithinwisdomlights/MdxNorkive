import { NextRequest, NextResponse } from "next/server";
import { imageCacheManager } from "@/lib/cache/image_cache_manager";
import { uploadImageFromUrl } from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "이미지 URL이 필요합니다" },
      { status: 400 }
    );
  }

  try {
    // 1. Redis에서 캐시된 이미지 확인
    const cachedUrl = await imageCacheManager.getCachedImageUrl(imageUrl);

    if (cachedUrl) {
      // 캐시된 이미지가 있으면 리다이렉트
      return NextResponse.redirect(cachedUrl);
    }

    // 2. 캐시된 이미지가 없으면 새로 다운로드
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NorkiveBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`이미지 다운로드 실패: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const contentLength = response.headers.get("content-length");
    const size = contentLength ? parseInt(contentLength) : 0;

    // 3. 이미지를 Cloudinary에 업로드
    const fileName = extractFileName(imageUrl);
    const cloudinaryResult = await uploadImageFromUrl(imageUrl, fileName);
    const uploadedUrl = cloudinaryResult.secure_url;

    // 4. Redis에 캐시 정보 저장
    await imageCacheManager.cacheImageUrl(imageUrl, uploadedUrl, {
      contentType,
      size: cloudinaryResult.bytes,
      fileName: fileName,
    });

    // 5. 업로드된 이미지로 리다이렉트
    return NextResponse.redirect(uploadedUrl);
  } catch (error) {
    console.error("이미지 프록시 오류:", error);
    return NextResponse.json(
      { error: "이미지 처리 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

function extractFileName(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    let fileName = pathname.split("/").pop() || "image.jpg";

    if (fileName.includes("?")) {
      fileName = fileName.split("?")[0];
    }

    // 안전한 파일명으로 변환
    const safeFileName = fileName
      .replace(/[^a-zA-Z0-9가-힣._-]/g, "_") // 안전하지 않은 문자를 _로 변경
      .replace(/_{2,}/g, "_") // 연속된 _를 하나로
      .replace(/^_|_$/g, "") // 앞뒤 _ 제거
      .substring(0, 50); // 최대 50자로 제한

    return safeFileName || `image_${Date.now()}.jpg`;
  } catch (error) {
    return `image_${Date.now()}.jpg`;
  }
}
