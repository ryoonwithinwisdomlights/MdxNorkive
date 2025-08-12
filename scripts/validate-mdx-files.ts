import "dotenv/config";
import { config } from "dotenv";
import { validateMdxDirectory } from "@/lib/utils/mdx-data-processing/mdx-validator";
import path from "path";
import { EXTERNAL_CONFIG } from "@/config/external.config";

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  config({ path: path.resolve(process.cwd(), ".env.local") });
}

const CONTENT_DIR = path.join(process.cwd(), EXTERNAL_CONFIG.DIR_NAME);

async function main() {
  console.log("🔍 MDX 파일 검증 및 수정을 시작합니다...");
  console.log(`📁 검증 대상 디렉토리: ${CONTENT_DIR}`);

  try {
    const results = await validateMdxDirectory(CONTENT_DIR);

    console.log("\n📊 검증 결과:");
    console.log(`   - 총 파일 수: ${results.total}개`);
    console.log(`   - 유효한 파일: ${results.valid}개`);
    console.log(`   - 수정된 파일: ${results.fixed}개`);
    console.log(`   - 실패한 파일: ${results.failed}개`);

    if (results.errors.length > 0) {
      console.log("\n❌ 오류가 발생한 파일들:");
      results.errors.forEach(({ file, errors }) => {
        console.log(`   - ${file}:`);
        errors.forEach((error) => console.log(`     ${error}`));
      });
    }

    if (results.failed === 0) {
      console.log("\n✅ 모든 MDX 파일이 성공적으로 검증되었습니다!");
    } else {
      console.log(`\n⚠️ ${results.failed}개의 파일에서 문제가 발생했습니다.`);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ MDX 검증 중 오류가 발생했습니다:", error);
    process.exit(1);
  }
}

main();
