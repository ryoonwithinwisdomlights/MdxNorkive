// scripts/check-mdx-validity.mjs
import fs from "fs/promises";
import path from "path";
import { compile } from "@mdx-js/mdx";

const BASE_OUTPUT_DIR = path.join(process.cwd(), "content");

async function checkAllMdxFiles() {
  const files = await fs.readdir(BASE_OUTPUT_DIR);
  let hasError = false;
  for (const file of files) {
    if (file.endsWith(".mdx")) {
      const filePath = path.join(BASE_OUTPUT_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      try {
        await compile(content, { jsx: true });
      } catch (e) {
        hasError = true;
        console.error(`❌ MDX 파싱 실패: ${file} - ${e.message}`);
        // 필요시 파일 삭제/더미로 대체
        await fs.unlink(filePath);
        await fs.writeFile(
          filePath,
          '---\ntitle: "준비 중"\n---\n\n이 문서는 준비 중입니다.',
          "utf-8"
        );
      }
    }
  }
  if (hasError) {
    process.exit(1);
  }
}
checkAllMdxFiles();
