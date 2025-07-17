// content-collections.ts
import { rehypePrettyCode } from "rehype-pretty-code";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
// MDX 전용이므로 compileMarkdown 불필요
// 1. Content type 스키마 정의
const recordSchema = z.object({
  notionId: z.string(),
  title: z.string(),
  type: z.string().optional(), // "Record", "Notice", "Page" 등
  description: z.string().optional(),
  date: z.coerce.date(),
  sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
  category: z.union([z.string(), z.array(z.string())]).optional(), // ex. "개발", ["개발", "에세이"]
  tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
  draft: z.boolean().default(false),
  // 필요시 커스텀 필드도 추가 가능
});

// 1️⃣ 먼저 컬렉션 정의
const records = defineCollection({
  name: "records", // 필수: 컬렉션 고유 이름
  directory: "content", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: recordSchema,

  // transform 단계에서 slug 포함
  // 	•	transform 함수의 인자로 들어오는 doc은 이미 schema를 통과한 데이터 객체야.
  // •	즉, doc.title, doc.date, doc.draft처럼 직접 접근해야지 doc.data처럼 쓰면 타입 에러가 나.
  transform: async (doc, context) => {
    const mdx = await compileMDX(context, doc);
    // slug가 이미 frontmatter에 들어 있는 경우 우선 사용
    const rawSlug = (doc as any).slug || doc._meta.path;
    const safeSlug = rawSlug.replace(/\.mdx?$/, ""); // .mdx 확장자 제거하고 안전하게 추출 (ex: record/nextjs)
    return {
      ...doc,
      slug: safeSlug,
      mdx, // MDX 컴포넌트 코드 문자열
    };
  },
});

// 2️⃣ defineConfig에 컬렉션 등록
export default defineConfig({
  collections: [records],
});
