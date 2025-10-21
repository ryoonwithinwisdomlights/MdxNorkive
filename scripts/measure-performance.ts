#!/usr/bin/env tsx
/**
 * 성능 측정 스크립트
 *
 * 이 스크립트는 다음을 측정합니다:
 * 1. 번들 크기 (빌드 후 .next 폴더 분석)
 * 2. 빌드 시간
 * 3. 청크 크기
 *
 * 사용법: npx tsx scripts/measure-performance.ts
 */

import fs from "fs";
import path from "path";

interface FileSize {
  name: string;
  size: number;
  sizeKB: number;
  sizeMB: number;
}

interface BundleAnalysis {
  timestamp: string;
  totalSize: number;
  totalSizeKB: number;
  totalSizeMB: number;
  files: FileSize[];
  largestFiles: FileSize[];
}

function formatBytes(bytes: number): { KB: number; MB: number } {
  return {
    KB: Math.round((bytes / 1024) * 100) / 100,
    MB: Math.round((bytes / (1024 * 1024)) * 100) / 100,
  };
}

function getDirectorySize(dirPath: string): number {
  let totalSize = 0;

  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  }

  return totalSize;
}

function getFilesInDirectory(dirPath: string, extension?: string): FileSize[] {
  const files: FileSize[] = [];

  if (!fs.existsSync(dirPath)) {
    return files;
  }

  function traverse(currentPath: string) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverse(itemPath);
      } else {
        if (!extension || item.endsWith(extension)) {
          const size = stats.size;
          const formatted = formatBytes(size);
          files.push({
            name: path.relative(dirPath, itemPath),
            size,
            sizeKB: formatted.KB,
            sizeMB: formatted.MB,
          });
        }
      }
    }
  }

  traverse(dirPath);
  return files;
}

async function analyzeBuildOutput(): Promise<BundleAnalysis> {
  console.log("📊 번들 크기 분석 중...\n");

  const nextDir = path.join(process.cwd(), ".next");

  if (!fs.existsSync(nextDir)) {
    console.error(
      "❌ .next 폴더를 찾을 수 없습니다. 먼저 빌드를 실행하세요: npm run build"
    );
    process.exit(1);
  }

  // 전체 .next 크기
  const totalSize = getDirectorySize(nextDir);
  const formatted = formatBytes(totalSize);

  // JavaScript 파일들 분석
  const staticDir = path.join(nextDir, "static");
  const jsFiles = getFilesInDirectory(staticDir, ".js");

  // 크기 순으로 정렬
  jsFiles.sort((a, b) => b.size - a.size);

  // 상위 10개 파일
  const largestFiles = jsFiles.slice(0, 10);

  const analysis: BundleAnalysis = {
    timestamp: new Date().toISOString(),
    totalSize,
    totalSizeKB: formatted.KB,
    totalSizeMB: formatted.MB,
    files: jsFiles,
    largestFiles,
  };

  return analysis;
}

function displayResults(analysis: BundleAnalysis) {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📦 번들 크기 분석 결과");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  console.log(
    `⏰ 측정 시간: ${new Date(analysis.timestamp).toLocaleString("ko-KR")}\n`
  );

  console.log(`📊 전체 빌드 크기:`);
  console.log(`   - 바이트: ${analysis.totalSize.toLocaleString()}`);
  console.log(`   - KB: ${analysis.totalSizeKB.toLocaleString()}`);
  console.log(`   - MB: ${analysis.totalSizeMB.toLocaleString()}\n`);

  console.log(`📁 JavaScript 파일 개수: ${analysis.files.length}개\n`);

  console.log("🔝 가장 큰 10개 파일:\n");
  analysis.largestFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file.name}`);
    console.log(`      크기: ${file.sizeKB} KB (${file.sizeMB} MB)\n`);
  });

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

function saveResults(analysis: BundleAnalysis) {
  const resultsDir = path.join(process.cwd(), "performance-reports");

  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // 현재 측정 결과 저장
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const resultFile = path.join(resultsDir, `bundle-${timestamp}.json`);
  fs.writeFileSync(resultFile, JSON.stringify(analysis, null, 2));

  // 기준선 파일 (baseline.json) 업데이트 또는 생성
  const baselineFile = path.join(resultsDir, "baseline.json");

  interface Baseline {
    created: string;
    updated: string;
    bundle: {
      totalSizeMB: number;
      totalSizeKB: number;
      filesCount: number;
      largestFiles: FileSize[];
    };
    lighthouse?: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    };
    webVitals?: {
      lcp: string;
      fid: string;
      cls: string;
    };
  }

  let baseline: Baseline;

  if (fs.existsSync(baselineFile)) {
    baseline = JSON.parse(fs.readFileSync(baselineFile, "utf-8"));
    baseline.updated = analysis.timestamp;
  } else {
    baseline = {
      created: analysis.timestamp,
      updated: analysis.timestamp,
      bundle: {
        totalSizeMB: 0,
        totalSizeKB: 0,
        filesCount: 0,
        largestFiles: [],
      },
      lighthouse: {
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
        seo: 0,
      },
      webVitals: {
        lcp: "TBD",
        fid: "TBD",
        cls: "TBD",
      },
    };
  }

  // 번들 정보 업데이트
  baseline.bundle = {
    totalSizeMB: analysis.totalSizeMB,
    totalSizeKB: analysis.totalSizeKB,
    filesCount: analysis.files.length,
    largestFiles: analysis.largestFiles.slice(0, 5),
  };

  fs.writeFileSync(baselineFile, JSON.stringify(baseline, null, 2));

  console.log(`✅ 결과 저장됨:`);
  console.log(`   - 상세 결과: ${resultFile}`);
  console.log(`   - 기준선: ${baselineFile}\n`);
}

async function main() {
  console.log("\n🚀 성능 측정 시작...\n");

  try {
    const analysis = await analyzeBuildOutput();
    displayResults(analysis);
    saveResults(analysis);

    console.log("✨ 성능 측정 완료!\n");
    console.log("📌 다음 단계:");
    console.log("   1. Lighthouse 측정: npm run measure:lighthouse");
    console.log("   2. 번들 분석 (시각화): npm run analyze\n");
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    process.exit(1);
  }
}

main();
