import { defineCollection, defineConfig } from "@content-collections/core";
import {
  createMetaSchema,
  transformMDX,
} from "@fumadocs/content-collections/configuration";
import { z } from "zod";

const records = defineCollection({
  name: "records", // 필수: 컬렉션 고유 이름
  directory: "content/record", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().optional(),
    password: z.string().optional(),
    type: z.string().optional(), // "Record", "Notice", "Page" 등
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.union([z.string(), z.array(z.string())]).optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const subMenuPages = defineCollection({
  name: "submenupages", // 필수: 컬렉션 고유 이름
  directory: "content/submenupage", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    type: z.string().optional(), // "Record", "Notice", "Page" 등
    description: z.string().optional(),
    date: z.coerce.date(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.union([z.string(), z.array(z.string())]).optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});
// const docs = defineCollection({
//   name: "docs",
//   directory: "content/docs",
//   include: "**/*.mdx",
//   schema: createDocSchema,
//   transform: transformMDX,
// });

const metas = defineCollection({
  name: "meta",
  directory: "content",
  include: "**/meta.json",
  parser: "json",
  schema: z.object(createMetaSchema(z)), // 이렇게!
});

export default defineConfig({
  collections: [records, subMenuPages, metas],
});
