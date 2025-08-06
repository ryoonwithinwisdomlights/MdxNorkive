#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { glob } from "glob";

// 중첩된 링크 패턴을 찾아서 수정하는 함수
function fixNestedLinks(content) {
  // 패턴 1: [**text**](url) 형태를 **text**로 변경
  content = content.replace(/\[(\*\*[^*]+\*\*)\]\([^)]+\)/g, "$1");

  // 패턴 2: [**text**](url) 형태를 text로 변경 (볼드 제거)
  content = content.replace(/\[\*\*([^*]+)\*\*\]\([^)]+\)/g, "$1");

  // 패턴 3: [text](url) 형태를 text로 변경 (일반 링크)
  content = content.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  return content;
}

// MDX 파일들을 찾아서 처리하는 함수
async function processMDXFiles() {
  try {
    // content 디렉토리의 모든 .mdx 파일 찾기
    const mdxFiles = await glob("content/**/*.mdx");

    console.log(`Found ${mdxFiles.length} MDX files to process`);

    let processedCount = 0;
    let errorCount = 0;

    for (const filePath of mdxFiles) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const originalContent = content;
        const fixedContent = fixNestedLinks(content);

        // 내용이 변경된 경우에만 파일에 쓰기
        if (originalContent !== fixedContent) {
          fs.writeFileSync(filePath, fixedContent, "utf8");
          console.log(`✅ Fixed: ${filePath}`);
          processedCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        errorCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`- Processed: ${processedCount} files`);
    console.log(`- Errors: ${errorCount} files`);
    console.log(`- Total: ${mdxFiles.length} files`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  processMDXFiles();
}

export { fixNestedLinks, processMDXFiles };
