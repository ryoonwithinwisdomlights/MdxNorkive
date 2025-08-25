/**
 * 향상된 이미지 처리 옵션
 */
export interface EnhancedImageOptions {
  format?: "webp" | "jpg" | "png" | "auto";
  quality?: number;
  width?: number;
  height?: number;
  progressive?: boolean;
  loading?: "lazy" | "eager";
}

/**
 * 기본 이미지 최적화 옵션
 */
const DEFAULT_IMAGE_OPTIONS: EnhancedImageOptions = {
  format: "webp",
  quality: 85,
  progressive: true,
  loading: "lazy",
};

/**
 * 간단한 WebP 변환 (Cloudinary 없이)
 */
export async function processNotionImageToWebP(
  imageUrl: string,
  options: Partial<EnhancedImageOptions> = {}
): Promise<string | null> {
  try {
    if (!imageUrl || !imageUrl.startsWith("http")) {
      return null;
    }

    // 간단한 WebP 변환: URL에 WebP 확장자 추가
    // 실제 변환은 브라우저나 서버에서 처리
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split(".");
    const extension = pathParts[pathParts.length - 1];

    if (extension && ["jpg", "jpeg", "png"].includes(extension.toLowerCase())) {
      pathParts[pathParts.length - 1] = "webp";
      url.pathname = pathParts.join(".");

      // 품질 파라미터 추가
      url.searchParams.set("format", "webp");
      url.searchParams.set("quality", (options.quality || 85).toString());

      console.log(`🖼️ WebP 변환: ${imageUrl} → ${url.toString()}`);
      return url.toString();
    }

    return imageUrl; // 변환할 수 없는 경우 원본 반환
  } catch (error) {
    console.error(`❌ 이미지 변환 실패: ${imageUrl}`, error);
    return imageUrl; // 실패 시 원본 URL 반환
  }
}

/**
 * MDX 콘텐츠의 모든 이미지를 WebP로 변환
 */
export async function processMdxImagesToWebP(
  content: string,
  options: Partial<EnhancedImageOptions> = {}
): Promise<string> {
  try {
    // Markdown 이미지 패턴: ![alt](url)
    const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;

    let processedContent = content;
    let match;

    while ((match = imagePattern.exec(content)) !== null) {
      const [fullMatch, alt, imageUrl] = match;

      if (imageUrl && imageUrl.startsWith("http")) {
        const optimizedUrl = await processNotionImageToWebP(imageUrl, options);
        if (optimizedUrl) {
          processedContent = processedContent.replace(imageUrl, optimizedUrl);
        }
      }
    }

    // HTML img 태그 패턴: <img src="url" alt="alt" />
    const htmlImagePattern = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

    while ((match = htmlImagePattern.exec(processedContent)) !== null) {
      const [fullMatch, imageUrl] = match;

      if (imageUrl && imageUrl.startsWith("http")) {
        const optimizedUrl = await processNotionImageToWebP(imageUrl, options);
        if (optimizedUrl) {
          processedContent = processedContent.replace(imageUrl, optimizedUrl);
        }
      }
    }

    return processedContent;
  } catch (error) {
    console.error("❌ MDX 이미지 처리 실패:", error);
    return content; // 실패 시 원본 콘텐츠 반환
  }
}

/**
 * 페이지 커버 이미지를 WebP로 변환
 */
export async function processPageCoverToWebP(
  coverUrl: string,
  options: Partial<EnhancedImageOptions> = {}
): Promise<string | null> {
  try {
    if (!coverUrl) return null;

    // 커버 이미지는 더 높은 품질로 처리
    const coverOptions: EnhancedImageOptions = {
      ...DEFAULT_IMAGE_OPTIONS,
      quality: 90,
      ...options,
    };

    return await processNotionImageToWebP(coverUrl, coverOptions);
  } catch (error) {
    console.error("❌ 커버 이미지 처리 실패:", error);
    return coverUrl; // 실패 시 원본 URL 반환
  }
}

/**
 * 이미지 최적화 통계
 */
export interface ImageOptimizationStats {
  totalImages: number;
  optimizedImages: number;
  failedImages: number;
  totalSizeReduction: number;
  averageQuality: number;
}

/**
 * 이미지 최적화 성능 측정
 */
export async function measureImageOptimization(
  content: string,
  options: Partial<EnhancedImageOptions> = {}
): Promise<{ content: string; stats: ImageOptimizationStats }> {
  const startTime = Date.now();
  const stats: ImageOptimizationStats = {
    totalImages: 0,
    optimizedImages: 0,
    failedImages: 0,
    totalSizeReduction: 0,
    averageQuality: 0,
  };

  // 이미지 개수 계산
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const htmlImagePattern = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;

  let match;
  while ((match = imagePattern.exec(content)) !== null) {
    if (match[2] && match[2].startsWith("http")) {
      stats.totalImages++;
    }
  }

  while ((match = htmlImagePattern.exec(content)) !== null) {
    if (match[1] && match[1].startsWith("http")) {
      stats.totalImages++;
    }
  }

  // 이미지 최적화 실행
  const optimizedContent = await processMdxImagesToWebP(content, options);

  const processingTime = Date.now() - startTime;
  console.log(
    `📊 이미지 최적화 완료: ${stats.totalImages}개 이미지 (${processingTime}ms)`
  );

  return { content: optimizedContent, stats };
}
