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
import { DOCS_CONFIG } from "@/config/docs.config";
const { DOCS_ROOT_DIR_NAME, DOCS_TYPE } = DOCS_CONFIG;

const generals = defineCollection({
  name: DOCS_TYPE.GENERALS as string, // 필수: 컬렉션 고유 이름
  directory: `${DOCS_ROOT_DIR_NAME}/${DOCS_TYPE.GENERALS}`, // 필수: 콘텐츠 폴더 경로
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
    lastEditedTime: z.coerce.date().optional(),
    doc_type: z.string().optional(), // ex. "docs" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "docs", ["docs", "portfolios"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const techs = defineCollection({
  name: DOCS_TYPE.TECHS as string, // 필수: 컬렉션 고유 이름
  directory: `${DOCS_ROOT_DIR_NAME}/${DOCS_TYPE.TECHS}`, // 필수: 콘텐츠 폴더 경로
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
    lastEditedTime: z.coerce.date().optional(),
    doc_type: z.string().optional(), // ex. "techs" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const portfolios = defineCollection({
  name: DOCS_TYPE.PORTFOLIOS as string, // 필수: 컬렉션 고유 이름
  directory: `${DOCS_ROOT_DIR_NAME}/${DOCS_TYPE.PORTFOLIOS}`, // 필수: 콘텐츠 폴더 경로
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
    lastEditedTime: z.coerce.date().optional(),
    doc_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    draft: z.boolean().default(false),
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),

    version: z.string().optional(),
    status: z.string().optional(),
    author: z.string().optional(),
    // Fumadocs OpenAPI generated
    _openapi: z.record(z.string(), z.any()).optional(),
  }),
  transform: transformMDX,
});

const subMenuPages = defineCollection({
  name: DOCS_TYPE.SUBMENU_PAGES as string, // 필수: 컬렉션 고유 이름
  directory: `${DOCS_ROOT_DIR_NAME}/${DOCS_TYPE.SUBMENU_PAGES}`, // 필수: 콘텐츠 폴더 경로
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
    lastEditedTime: z.coerce.date().optional(),
    doc_type: z.string().optional(), // ex. "engineering" 배열 또는 문자열 모두 수용할 수 있게 유연하게 처리
    category: z.string().optional(), // ex. "개발", ["개발", "에세이"]
    tags: z.array(z.string()).optional(), // ex. ["Next.js", "SEO"]
    favorite: z.boolean().default(false),
    readingTime: z.number().optional(),
    wordCount: z.number().optional(),
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
  directory: `${DOCS_ROOT_DIR_NAME}/${DOCS_TYPE.TECHS}`,
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
  collections: [generals, techs, portfolios, subMenuPages, metas],
});
