import fs from "fs/promises";
import path from "path";
import { compile } from "@mdx-js/mdx";
import pkg, {
  decodeUrlEncodedLinks,
  processMdxContent,
} from "../lib/utils/convert-unsafe-mdx-content.js";
const { convertUnsafeTags } = pkg;

const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");

/**
 * MDX 파일의 본문에 convertUnsafeTagsTEST를 적용하여 안전한 태그로 변환
 */
async function applyUnsafeTagsConversion(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    // frontmatter와 본문 분리
    const frontmatterEndIndex = content.indexOf("---", 3);
    if (frontmatterEndIndex === -1) {
      console.log(`⚠️  Frontmatter를 찾을 수 없습니다: ${filePath}`);
      return false;
    }

    const frontmatter = content.substring(0, frontmatterEndIndex + 3);
    const body = content.substring(frontmatterEndIndex + 3);

    // 본문에 convertUnsafeTags 적용
    let enhancedContent = body;
    // 안전 변환 적용
    enhancedContent = processMdxContent(enhancedContent);
    enhancedContent = decodeUrlEncodedLinks(enhancedContent);
    // const safeBody = convertUnsafeTags(body);
    const newContent = frontmatter + enhancedContent;

    // 파일에 다시 쓰기
    await fs.writeFile(filePath, newContent, "utf-8");
    console.log(`✅ 안전한 태그로 변환 완료: ${path.basename(filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ 파일 변환 실패: ${filePath} - ${error.message}`);
    return false;
  }
}

/**
 * 재귀적으로 디렉토리 내의 모든 MDX 파일을 찾습니다
 */
async function findMdxFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 하위 디렉토리 재귀 검사
      const subFiles = await findMdxFiles(fullPath);
      files.push(...subFiles);
    } else if (item.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function checkAllMdxFiles() {
  // content 디렉토리가 존재하는지 확인
  try {
    await fs.access(BASE_OUTPUT_DIR);
  } catch (error) {
    console.log(
      `📁 'content' 디렉토리가 존재하지 않습니다: ${BASE_OUTPUT_DIR}`
    );
    return;
  }

  // 모든 MDX 파일 찾기 (하위 디렉토리 포함)
  const mdxFiles = await findMdxFiles(BASE_OUTPUT_DIR);
  console.log(`📁 발견된 MDX 파일: ${mdxFiles.length}개`);

  let hasError = false;
  let convertedCount = 0;

  for (const filePath of mdxFiles) {
    // 먼저 안전한 태그로 변환 적용
    const converted = await applyUnsafeTagsConversion(filePath);
    if (converted) {
      convertedCount++;
    }

    // 변환된 내용으로 MDX 유효성 검사
    const content = await fs.readFile(filePath, "utf-8");
    try {
      await compile(content, { jsx: true });
    } catch (e) {
      hasError = true;
      console.error(
        `❌ MDX 파싱 실패: ${path.basename(filePath)} - ${e.message}`
      );
      // 필요시 파일 삭제/더미로 대체
      await fs.unlink(filePath);
      await fs.writeFile(
        filePath,
        '---\ntitle: "준비 중"\n---\n\n이 문서는 준비 중입니다.',
        "utf-8"
      );
    }
  }

  console.log(`\n📊 처리 결과:`);
  console.log(`- 발견된 MDX 파일: ${mdxFiles.length}개`);
  console.log(`- 변환된 파일: ${convertedCount}개`);
  console.log(`- 오류 발생: ${hasError ? "있음" : "없음"}`);

  if (hasError) {
    process.exit(1);
  }
}

checkAllMdxFiles();
