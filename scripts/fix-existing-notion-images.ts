import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import NotionImageDownloader from "./download-notion-images";

const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");

async function findMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  try {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        const subFiles = await findMdxFiles(fullPath);
        files.push(...subFiles);
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`디렉토리 읽기 실패: ${dir}`, error);
  }

  return files;
}

async function processMdxFile(
  filePath: string,
  imageDownloader: NotionImageDownloader
): Promise<boolean> {
  try {
    console.log(`📄 처리 중: ${path.basename(filePath)}`);

    // 파일 읽기
    const content = await fs.readFile(filePath, "utf-8");
    const { data, content: mdxContent } = matter(content);

    // 이미지 처리
    const processedContent = await imageDownloader.processMdxContent(
      mdxContent
    );

    // 변경사항이 있는지 확인
    if (processedContent !== mdxContent) {
      // 새로운 frontmatter와 함께 파일 저장
      const newContent = matter.stringify(processedContent, data);
      await fs.writeFile(filePath, newContent, "utf-8");
      console.log(`✅ 업데이트 완료: ${path.basename(filePath)}`);
      return true;
    } else {
      console.log(`⏭️ 변경사항 없음: ${path.basename(filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ 파일 처리 실패: ${filePath}`, error);
    return false;
  }
}

async function main() {
  console.log("🔄 기존 MDX 파일들의 노션 이미지 처리 시작...");

  // 이미지 다운로더 초기화
  const imageDownloader = new NotionImageDownloader();

  // 모든 MDX 파일 찾기
  const mdxFiles = await findMdxFiles(BASE_OUTPUT_DIR);
  console.log(`📁 총 ${mdxFiles.length}개의 MDX 파일을 찾았습니다.`);

  let processedCount = 0;
  let updatedCount = 0;

  // 각 파일 처리
  for (const filePath of mdxFiles) {
    const wasUpdated = await processMdxFile(filePath, imageDownloader);
    processedCount++;

    if (wasUpdated) {
      updatedCount++;
    }

    // 진행률 표시
    if (processedCount % 10 === 0) {
      console.log(
        `📊 진행률: ${processedCount}/${mdxFiles.length} (${Math.round(
          (processedCount / mdxFiles.length) * 100
        )}%)`
      );
    }
  }

  // 결과 출력
  console.log(`\n📊 처리 결과:`);
  console.log(`   - 총 파일 수: ${mdxFiles.length}개`);
  console.log(`   - 처리된 파일: ${processedCount}개`);
  console.log(`   - 업데이트된 파일: ${updatedCount}개`);

  // 이미지 다운로드 통계 출력
  imageDownloader.printStats();

  console.log("\n🎉 기존 MDX 파일들의 노션 이미지 처리 완료!");
}

if (require.main === module) {
  main().catch(console.error);
}
