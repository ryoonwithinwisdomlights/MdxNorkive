import "dotenv/config";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import https from "https";
import { URL } from "url";

interface ImageInfo {
  originalUrl: string;
  localPath: string;
  fileName: string;
}

class NotionImageDownloader {
  private baseDir: string;
  private downloadedImages: Map<string, string> = new Map();

  constructor() {
    this.baseDir = path.join(process.cwd(), "public", "images", "notion");
  }

  /**
   * URL에서 파일명 추출
   */
  private extractFileName(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      let fileName = pathname.split("/").pop() || "image.jpg";

      // 노션 이미지 URL에서 실제 파일명 추출
      if (fileName.includes("?")) {
        fileName = fileName.split("?")[0];
      }

      // URL 디코딩
      try {
        fileName = decodeURIComponent(fileName);
      } catch (e) {
        // 디코딩 실패시 원본 사용
      }

      // 안전한 파일명으로 변환 (특수문자 제거)
      const safeFileName = fileName
        .replace(/[^a-zA-Z0-9가-힣._-]/g, "_") // 특수문자를 언더스코어로 변경
        .replace(/_{2,}/g, "_") // 연속된 언더스코어를 하나로
        .replace(/^_|_$/g, ""); // 앞뒤 언더스코어 제거

      // 파일명이 비어있거나 너무 짧으면 타임스탬프 추가
      if (!safeFileName || safeFileName.length < 3) {
        return `image_${Date.now()}.jpg`;
      }

      return safeFileName;
    } catch (error) {
      console.error("파일명 추출 실패:", error);
      return `image_${Date.now()}.jpg`;
    }
  }

  /**
   * 이미지 다운로드
   */
  private async downloadImage(
    url: string,
    localPath: string
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const file = createWriteStream(localPath);

      https
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            console.error(
              `❌ 이미지 다운로드 실패: ${url} (${response.statusCode})`
            );
            file.close();
            fs.unlink(localPath).catch(() => {}); // 실패한 파일 삭제
            resolve(false);
            return;
          }

          response.pipe(file);

          file.on("finish", () => {
            file.close();
            console.log(`✅ 이미지 다운로드 완료: ${localPath}`);
            resolve(true);
          });

          file.on("error", (err) => {
            console.error(`❌ 파일 저장 실패: ${localPath}`, err);
            fs.unlink(localPath).catch(() => {});
            resolve(false);
          });
        })
        .on("error", (err) => {
          console.error(`❌ 이미지 다운로드 실패: ${url}`, err);
          file.close();
          fs.unlink(localPath).catch(() => {});
          resolve(false);
        });
    });
  }

  /**
   * 노션 이미지 URL인지 확인
   */
  private isNotionImageUrl(url: string): boolean {
    return (
      url.includes("prod-files-secure.s3.us-west-2.amazonaws.com") ||
      url.includes("s3.us-west-2.amazonaws.com")
    );
  }

  /**
   * 이미지 처리
   */
  async processImage(url: string): Promise<string> {
    if (!this.isNotionImageUrl(url)) {
      return url; // 노션 이미지가 아니면 원본 URL 반환
    }

    // 이미 처리된 이미지인지 확인
    if (this.downloadedImages.has(url)) {
      return this.downloadedImages.get(url)!;
    }

    try {
      // 디렉토리 생성
      await fs.mkdir(this.baseDir, { recursive: true });

      const fileName = this.extractFileName(url);
      const localPath = path.join(this.baseDir, fileName);
      const publicUrl = `/images/notion/${fileName}`;

      // 파일이 이미 존재하는지 확인
      try {
        await fs.access(localPath);
        console.log(`📁 이미 존재하는 이미지: ${fileName}`);
        this.downloadedImages.set(url, publicUrl);
        return publicUrl;
      } catch {
        // 파일이 없으면 다운로드
        const success = await this.downloadImage(url, localPath);
        if (success) {
          this.downloadedImages.set(url, publicUrl);
          return publicUrl;
        } else {
          return url; // 다운로드 실패시 원본 URL 반환
        }
      }
    } catch (error) {
      console.error(`❌ 이미지 처리 실패: ${url}`, error);
      return url;
    }
  }

  /**
   * MDX 콘텐츠에서 이미지 URL 교체
   */
  async processMdxContent(content: string): Promise<string> {
    // 마크다운 이미지 패턴 매칭
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    let processedContent = content;

    while ((match = imageRegex.exec(content)) !== null) {
      const [fullMatch, alt, imageUrl] = match;
      const newUrl = await this.processImage(imageUrl);

      if (newUrl !== imageUrl) {
        processedContent = processedContent.replace(
          fullMatch,
          `![${alt}](${newUrl})`
        );
      }
    }

    // HTML img 태그 패턴 매칭
    const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    while ((match = htmlImageRegex.exec(content)) !== null) {
      const [fullMatch, imageUrl] = match;
      const newUrl = await this.processImage(imageUrl);

      if (newUrl !== imageUrl) {
        processedContent = processedContent.replace(imageUrl, newUrl);
      }
    }

    return processedContent;
  }

  /**
   * 통계 출력
   */
  printStats() {
    console.log(`\n📊 이미지 다운로드 통계:`);
    console.log(`   - 총 처리된 이미지: ${this.downloadedImages.size}개`);
    console.log(`   - 저장 위치: ${this.baseDir}`);
  }
}

// 사용 예시
async function main() {
  const downloader = new NotionImageDownloader();

  // 테스트용 MDX 콘텐츠
  const testContent = `
![스크린샷](https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/c58b1512-5c84-4eda-90e1-54facf628948/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-12-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.55.58.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666J3K7ZXY%2F20250806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250806T110329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIC%2BZ4fvMu61%2BWVMK33EDiYj7fJmajJE6k3cbNPvb4JKUAiAFGBsVqeiuBaa7Zlf0ffUQdpJ%2BkZql4HtFK69FHP49Bir%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMMF6%2BT0796ARR6z7KKtwDF%2BBuu%2FkoN7yJlbpjBVibKIgtOcYUjfs51qxKsoH6LKP%2BSa1%2BQUpqr3abnj0Z40LL70sMK6T3SyNaIQKEyyExNEihXUlhy%2FSIcRyBbmUOdMgtTPMPIseukxcx%2FubexFe8thBttcAj7SdaCisISF5S6JrMtUNf18LAprsTVly%2FJQaBnT5K4Ji2yEO%2Br%2BS7XROPHyk2Y3LZMHgkskpCn4zqjeDkR8NDQo4y0VXZlVRvCDZnBF3Rai2%2FIy6wc4irx0oyBFBKuC5wGHUUgHPtt50PyOFenHj0EpcC8MDd40SaS2EJqiodlXb4knWgrs9Mb92lXJ3j4328CDHErt%2BnRvQ0rBuRCoSITz4BHnbM9Bj%2ByQV%2BP1t6knOAexM0amoQLYSJ36WDgjBV%2BpsTyquoE4llqGsrCe6u9pdHyHOn5vrr8SHy6NgQklIofeeUgG841N6J3n4maZk2lgttEePODlQsELNUJzwnWxNpZoVmlVh0CF1C0HKNuUmAoKp1AaTr4jfE7slak440ld8pBuVp8EMGY6odz0c6ebTv944Otk8moQtKj9oaXDCpV1WTVDmyJxmOi5lFJbFDtX9tiSH6FLMOVZhk%2B2w37aaqNcHwRJsifg09qBzUOjp%2BtvZziHMw6OvMxAY6pgHBebO2Xz8RZwKAzghEjcoSe8KTtXpLu%2FjQXCQBISU0ozn1dQ%2B1xkqLiaLUYiiEjwUrDlmUmqL9OIJV%2FtXMC%2FWrJPZlq6BuNfJHY6QvEBSJejMbpP3xP7Yw3Oe1glxkrM9OZgOhB6Z3GZ13XCulg2XsWdXI68BxLj6pPt10Idh%2Bzf0Okc7fj90iT%2FSODJ%2BAjFKH3E2d5nf65Gf8VfEjeHTSKyc36bqx&X-Amz-Signature=db0fa53a684e66c965c3064985a4fcf810f330110dc81168188fa1377e456a8a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

<img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/974b6801-2a7c-496a-8dbe-ac4d55727745/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-12-06_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.56.07.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666J3K7ZXY%2F20250806%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250806T110329Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaCXVzLXdlc3QtMiJGMEQCIC%2BZ4fvMu61%2BWVMK33EDiYj7fJmajJE6k3cbNPvb4JKUAiAFGBsVqeiuBaa7Zlf0ffUQdpJ%2BkZql4HtFK69FHP49Bir%2FAwh0EAAaDDYzNzQyMzE4MzgwNSIMMF6%2BT0796ARR6z7KKtwDF%2BBuu%2FkoN7yJlbpjBVibKIgtOcYUjfs51qxKsoH6LKP%2BSa1%2BQUpqr3abnj0Z40LL70sMK6T3SyNaIQKEyyExNEihXUlhy%2FSIcRyBbmUOdMgtTPMPIseukxcx%2FubexFe8thBttcAj7SdaCisISF5S6JrMtUNf18LAprsTVly%2FJQaBnT5K4Ji2yEO%2Br%2BS7XROPHyk2Y3LZMHgkskpCn4zqjeDkR8NDQo4y0VXZlVRvCDZnBF3Rai2%2FIy6wc4irx0oyBFBKuC5wGHUUgHPtt50PyOFenHj0EpcC8MDd40SaS2EJqiodlXb4knWgrs9Mb92lXJ3j4328CDHErt%2BnRvQ0rBuRCoSITz4BHnbM9Bj%2ByQV%2BP1t6knOAexM0amoQLYSJ36WDgjBV%2BpsTyquoE4llqGsrCe6u9pdHyHOn5vrr8SHy6NgQklIofeeUgG841N6J3n4maZk2lgttEePODlQsELNUJzwnWxNpZoVmlVh0CF1C0HKNuUmAoKp1AaTr4jfE7slak440ld8pBuVp8EMGY6odz0c6ebTv944Otk8moQtKj9oaXDCpV1WTVDmyJxmOi5lFJbFDtX9tiSH6FLMOVZhk%2B2w37aaqNcHwRJsifg09qBzUOjp%2BtvZziHMw6OvMxAY6pgHBebO2Xz8RZwKAzghEjcoSe8KTtXpLu%2FjQXCQBISU0ozn1dQ%2B1xkqLiaLUYiiEjwUrDlmUmqL9OIJV%2FtXMC%2FWrJPZlq6BuNfJHY6QvEBSJejMbpP3xP7Yw3Oe1glxkrM9OZgOhB6Z3GZ13XCulg2XsWdXI68BxLj6pPt10Idh%2Bzf0Okc7fj90iT%2FSODJ%2BAjFKH3E2d5nf65Gf8VfEjeHTSKyc36bqx&X-Amz-Signature=fcd187fb638392acbc3e9b94902215573e85326c0e9dfa4785ea18b2cd5ee245&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject" alt="테스트 이미지" />
  `;

  console.log("🔄 이미지 다운로드 시작...");
  const processedContent = await downloader.processMdxContent(testContent);

  console.log("\n📝 처리된 콘텐츠:");
  console.log(processedContent);

  downloader.printStats();
}

if (require.main === module) {
  main().catch(console.error);
}

export default NotionImageDownloader;
