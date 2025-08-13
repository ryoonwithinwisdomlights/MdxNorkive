import { defineCollection, defineConfig } from "@content-collections/core";
import {
  createMetaSchema,
  transformMDX,
} from "@fumadocs/content-collections/configuration";
import {
  remarkNpm,
  rehypeCode,
  remarkStructure,
  remarkCodeTab,
  remarkImage,
  remarkSteps,
  transformerIcon,
  transformerTab,
} from "fumadocs-core/mdx-plugins";
import { z } from "zod";

const books = defineCollection({
  name: "books", // 필수: 컬렉션 고유 이름
  directory: "content/books", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().nullable().optional(),
    password: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    lastModified: z.string().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const projects = defineCollection({
  name: "projects", // 필수: 컬렉션 고유 이름
  directory: "content/projects", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().nullable().optional(),
    password: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    lastModified: z.string().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const engineerings = defineCollection({
  name: "engineerings", // 필수: 컬렉션 고유 이름
  directory: "content/engineerings", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().nullable().optional(),
    password: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    lastModified: z.string().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const records = defineCollection({
  name: "records", // 필수: 컬렉션 고유 이름
  directory: "content/records", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().nullable().optional(),
    password: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    lastModified: z.string().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const subMenuPages = defineCollection({
  name: "subMenuPages", // 필수: 컬렉션 고유 이름
  directory: "content/submenupages", // 필수: 콘텐츠 폴더 경로
  include: "**/*.{md,mdx}", // 필수: MD/MDX 파일 패턴
  parser: "frontmatter", // 기본값이지만 명시해도 OK
  schema: z.object({
    notionId: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    full: z.boolean().optional(),
    summary: z.string().optional(),
    pageCover: z.string().nullable().optional(),
    password: z.string().optional(),
    type: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    lastEditedDate: z.coerce.date().optional(),
    sub_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    lastModified: z.string().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const metas = defineCollection({
  name: "meta",
  directory: "content",
  include: "**/meta.json",
  parser: "json",
  schema: z.object(createMetaSchema(z)), // 이렇게!
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      remarkNpm,
      remarkCodeTab,
      remarkImage,
      remarkSteps,
      remarkStructure,
      transformerIcon,
      transformerTab,
    ],
    rehypePlugins: [rehypeCode],
    format: "mdx",
    development: false, // 항상 프로덕션 모드로 설정
  },
  // 빌드 성능 최적화
  parallel: true, // 병렬 처리 활성화
  incremental: true, // 증분 빌드 지원
  collections: [records, subMenuPages, metas, books, engineerings, projects],
});
