
export default [
  {
    "notionId": "2251eb5c03378095bcfbe19932b39768",
    "title": "Next.js 15 + Notion + 캐시 시스템",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-04T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T09:57:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "> 🥰 콜아웃이 잘 되나 볼까요?\n\n\n\n<strong>✅ Next.js + Notion + 캐싱 전략 전체 플로우 (로컬 vs 운영 + Vercel Cron)</strong>\n\n\n```typescript\n[Client (/blog 접근)]\n        │\n        ▼\n[Next.js 15 App Router → Page Component]\n        │\n        ▼\n[getPosts() 호출]\n        │\n        ├── (로컬 개발 환경)\n        │       │\n        │       ▼\n        │   [p-memoize / memory-cache 등]\n        │       │\n        │       └── 캐시 miss 시\n        │               │\n        │               ▼\n        │          [Notion API fetch (notion-client)]\n        │\n        └── (운영 환경: Vercel)\n                │\n                ▼\n            [Upstash Redis 캐시 확인]\n                │\n                └── 캐시 miss 시\n                        │\n                        ▼\n                   [Notion API fetch (notion-client)]\n\n────────────────────────────────────────────────────────────\n\n[Vercel Cron Job (10분마다 실행)]\n        │\n        ▼\n[GET /api/cron/update-posts → 내부에서 변경사항 탐지]\n        │\n        ▼\n[변경된 post 블록만 다시 fetch]\n        │\n        ▼\n[Redis 캐시 갱신 (Upstash)]\n```\n\n\n\n<strong>✅ 요약 포인트</strong>\n\n\n\n| <strong>구분</strong>       | <strong>전략</strong>                                        |\n| ------------ | --------------------------------------------- |\n| <strong>로컬 개발</strong>    | p-memoize, memory-cache, Map 등 in-memory 방식   |\n| <strong>운영 서버</strong>    | Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시       |\n| <strong>최신화</strong>      | Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신 |\n| <strong>Fallback</strong> | 캐시 miss 시에만 notion-client 직접 호출 (서버 전용)       |\n\n\n이 로직을 기준으로한 <strong>Next.js 15 + Notion + 캐시 시스템</strong>을 실제로 구현하기 위한 <strong>단계별 가이드는 아래와 같음.</strong>\n\n\n\n<strong>✅ 전체 작업 순서 요약</strong>\n\n\n\n| <strong>단계</strong> | <strong>목표</strong>                       | <strong>설명</strong>                               |\n| ------ | ---------------------------- | ------------------------------------ |\n| 1단계    | Upstash Redis 설정             | Vercel에서 쓸 수 있는 클라우드 Redis 인스턴스 준비   |\n| 2단계    | Redis 연결 및 캐시 유틸 구현          | 운영환경에서 Redis 캐시를 사용할 수 있게 함수 작성      |\n| 3단계    | getPostBlocks 리팩토링           | 캐싱을 포함한 Notion fetch 함수로 리팩토링        |\n| 4단계    | 로컬/운영 캐시 전략 분기               | 개발환경에서는 memory-cache, 운영환경은 Redis 사용 |\n| 5단계    | Vercel Cron API 만들기          | 주기적으로 Redis 캐시를 갱신할 route 생성         |\n| 6단계    | Vercel Cron 설정               | Vercel dashboard에서 10분 주기로 실행되도록 설정  |\n| 7단계    | ISR(revalidate) 병행(optional) | 인기 페이지는 자동 갱신되도록 revalidate 속성 활용    |\n\n\n## <strong>🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)</strong>\n\n1. [https://upstash.com](https://upstash.com/) 가입\n2. Redis → Create Database\n3. REST URL, Token 확인\n4. .env.local에 아래 환경변수 추가\n\n```bash\nUPSTASH_REDIS_REST_URL=your_upstash_url\nUPSTASH_REDIS_REST_TOKEN=your_upstash_token\n```\n\n\n<strong>🧩 2단계: Redis 연결 유틸 생성</strong>\n\n\n```typescript\n// lib/redis.ts\nimport { Redis } from \"@upstash/redis\";\n\nexport const redis = new Redis({\n  url: process.env.UPSTASH_REDIS_REST_URL!,\n  token: process.env.UPSTASH_REDIS_REST_TOKEN!,\n});\n```\n\n\n\n<strong>🧩 3단계: getPostBlocks 리팩토링</strong>\n\n\n\n```typescript\n// lib/notion/getPostBlocks.ts\nimport { NotionAPI } from \"notion-client\";\nimport { redis } from \"@/lib/redis\";\n\nexport async function getPostBlocks(pageId: string) {\n  const cacheKey = `postBlock_${pageId}`;\n\n  const cached = await redis.get(cacheKey);\n  if (cached) return cached;\n\n  const notion = new NotionAPI({\n    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,\n  });\n  const data = await notion.getPage(pageId);\n\n  await redis.set(cacheKey, data, { ex: 600 }); // 10분 TTL\n  return data;\n}\n```\n\n\n\n<strong>🧩 4단계: 로컬/운영 캐시 분기 처리</strong>\n\n\n\n```typescript\n// lib/cache.ts\nconst memory = new Map();\n\nexport async function getCached<T>(\n  key: string,\n  fetcher: () => Promise<T>,\n  ttl = 600\n): Promise<T> {\n  const isProd = process.env.NODE_ENV === \"production\";\n\n  if (!isProd) {\n    if (memory.has(key)) return memory.get(key);\n    const fresh = await fetcher();\n    memory.set(key, fresh);\n    setTimeout(() => memory.delete(key), ttl * 1000);\n    return fresh;\n  }\n\n  // 운영에서는 Redis\n  const cached = await redis.get<T>(key);\n  if (cached) return cached;\n\n  const fresh = await fetcher();\n  await redis.set(key, fresh, { ex: ttl });\n  return fresh;\n}\n```\n\n\n\n<strong>🧩 5단계: Vercel Cron용 API route 만들기</strong>\n\n\n\n```typescript\n// app/api/cron/update-posts/route.ts\nimport { getPostBlocks } from \"@/lib/notion/getPostBlocks\";\nimport { redis } from \"@/lib/redis\";\nimport { NextResponse } from \"next/server\";\n\nconst postPageIds = [\"postid1\", \"postid2\"]; // 변경 감지할 페이지 ID들\n\nexport async function GET() {\n  for (const id of postPageIds) {\n    const data = await getPostBlocks(id);\n    await redis.set(`postBlock_${id}`, data, { ex: 600 });\n  }\n\n  return NextResponse.json({ status: \"refreshed\" });\n}\n```\n\n\n\n<strong>🧩 6단계: Vercel Cron 설정</strong>\n\n\n```json\n{\n  \"path\": \"/api/cron/update-posts\",\n  \"schedule\": \"*/10 * * * *\"\n}\n//(10분마다 실행됨)\n```\n\n\n\n<strong>🧩 7단계: ISR (revalidate = 600) 병행 사용 (선택)</strong>\n\n\n```bash\n// app/blog/page.tsx\n\nexport const revalidate = 600; // 페이지 요청 시 10분 경과되면 백그라운드 regenerate\n\nexport default async function BlogPage() {\n  const posts = await getPosts(); // 내부에서 Redis → Notion 호출\n  return <BlogList posts={posts} />;\n}\n```\n\n\n\n<strong>✅ 마무리 체크리스트</strong>\n\n\n\n| <strong>항목</strong>                  | <strong>완료 여부</strong> |\n| ----------------------- | --------- |\n| ✅ Upstash Redis 연동 완료   | ☐         |\n| ✅ Redis 캐시 유틸 생성        | ☐         |\n| ✅ Notion fetch 캐싱 적용    | ☐         |\n| ✅ Vercel/Local 환경 분기 적용 | ☐         |\n| ✅ cron route 생성 및 배포    | ☐         |\n| ✅ Vercel Cron Job 설정    | ☐         |\n| ✅ ISR 적용 (optional)     | ☐         |",
    "_meta": {
      "filePath": "engineerings-Next-js-15-Notion-캐시-시스템.mdx",
      "fileName": "engineerings-Next-js-15-Notion-캐시-시스템.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-Next-js-15-Notion-캐시-시스템"
    },
    "toc": [
      {
        "title": "🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)",
        "url": "#-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "🥰 콜아웃이 잘 되나 볼까요?"
        },
        {
          "heading": "",
          "content": "구분"
        },
        {
          "heading": "",
          "content": "전략"
        },
        {
          "heading": "",
          "content": "로컬 개발"
        },
        {
          "heading": "",
          "content": "p-memoize, memory-cache, Map 등 in-memory 방식"
        },
        {
          "heading": "",
          "content": "운영 서버"
        },
        {
          "heading": "",
          "content": "Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시"
        },
        {
          "heading": "",
          "content": "최신화"
        },
        {
          "heading": "",
          "content": "Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신"
        },
        {
          "heading": "",
          "content": "Fallback"
        },
        {
          "heading": "",
          "content": "캐시 miss 시에만 notion-client 직접 호출 (서버 전용)"
        },
        {
          "heading": "",
          "content": "이 로직을 기준으로한 Next.js 15 + Notion + 캐시 시스템을 실제로 구현하기 위한 단계별 가이드는 아래와 같음."
        },
        {
          "heading": "",
          "content": "단계"
        },
        {
          "heading": "",
          "content": "목표"
        },
        {
          "heading": "",
          "content": "설명"
        },
        {
          "heading": "",
          "content": "1단계"
        },
        {
          "heading": "",
          "content": "Upstash Redis 설정"
        },
        {
          "heading": "",
          "content": "Vercel에서 쓸 수 있는 클라우드 Redis 인스턴스 준비"
        },
        {
          "heading": "",
          "content": "2단계"
        },
        {
          "heading": "",
          "content": "Redis 연결 및 캐시 유틸 구현"
        },
        {
          "heading": "",
          "content": "운영환경에서 Redis 캐시를 사용할 수 있게 함수 작성"
        },
        {
          "heading": "",
          "content": "3단계"
        },
        {
          "heading": "",
          "content": "getPostBlocks 리팩토링"
        },
        {
          "heading": "",
          "content": "캐싱을 포함한 Notion fetch 함수로 리팩토링"
        },
        {
          "heading": "",
          "content": "4단계"
        },
        {
          "heading": "",
          "content": "로컬/운영 캐시 전략 분기"
        },
        {
          "heading": "",
          "content": "개발환경에서는 memory-cache, 운영환경은 Redis 사용"
        },
        {
          "heading": "",
          "content": "5단계"
        },
        {
          "heading": "",
          "content": "Vercel Cron API 만들기"
        },
        {
          "heading": "",
          "content": "주기적으로 Redis 캐시를 갱신할 route 생성"
        },
        {
          "heading": "",
          "content": "6단계"
        },
        {
          "heading": "",
          "content": "Vercel Cron 설정"
        },
        {
          "heading": "",
          "content": "Vercel dashboard에서 10분 주기로 실행되도록 설정"
        },
        {
          "heading": "",
          "content": "7단계"
        },
        {
          "heading": "",
          "content": "ISR(revalidate) 병행(optional)"
        },
        {
          "heading": "",
          "content": "인기 페이지는 자동 갱신되도록 revalidate 속성 활용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "https://upstash.com 가입"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "Redis → Create Database"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "REST URL, Token 확인"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": ".env.local에 아래 환경변수 추가"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "항목"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "완료 여부"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Upstash Redis 연동 완료"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Redis 캐시 유틸 생성"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Notion fetch 캐싱 적용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Vercel/Local 환경 분기 적용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ cron route 생성 및 배포"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Vercel Cron Job 설정"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ ISR 적용 (optional)"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        }
      ],
      "headings": [
        {
          "id": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)"
        }
      ]
    },
    "body": "var Component=(()=>{var E=Object.create;var n=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var o=(h,s)=>()=>(s||h((s={exports:{}}).exports,s),s.exports),m=(h,s)=>{for(var l in s)n(h,l,{get:s[l],enumerable:!0})},r=(h,s,l,a)=>{if(s&&typeof s==\"object\"||typeof s==\"function\")for(let e of g(s))!F.call(h,e)&&e!==l&&n(h,e,{get:()=>s[e],enumerable:!(a=p(s,e))||a.enumerable});return h};var C=(h,s,l)=>(l=h!=null?E(y(h)):{},r(s||!h||!h.__esModule?n(l,\"default\",{value:h,enumerable:!0}):l,h)),N=h=>r(n({},\"__esModule\",{value:!0}),h);var d=o((D,k)=>{k.exports=_jsx_runtime});var A={};m(A,{default:()=>c});var i=C(d());function t(h){let s={a:\"a\",blockquote:\"blockquote\",code:\"code\",h2:\"h2\",li:\"li\",ol:\"ol\",p:\"p\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",...h.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.blockquote,{children:[`\n`,(0,i.jsx)(s.p,{children:\"\\u{1F970}\\xA0\\uCF5C\\uC544\\uC6C3\\uC774 \\uC798 \\uB418\\uB098 \\uBCFC\\uAE4C\\uC694?\"}),`\n`]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 Next.js + Notion + \\uCE90\\uC2F1 \\uC804\\uB7B5 \\uC804\\uCCB4 \\uD50C\\uB85C\\uC6B0 (\\uB85C\\uCEEC vs \\uC6B4\\uC601 + Vercel Cron)\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Client\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"blog \\uC811\\uADFC)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Next.js \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"15\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" App Router \\u2192 Page Component]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPosts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() \\uD638\\uCD9C]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u251C\\u2500\\u2500 (\\uB85C\\uCEEC \\uAC1C\\uBC1C \\uD658\\uACBD)\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502   [p\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"memoize \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cache \\uB4F1]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502          [Notion \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2514\\u2500\\u2500 (\\uC6B4\\uC601 \\uD658\\uACBD: Vercel)\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u25BC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"            [Upstash Redis \\uCE90\\uC2DC \\uD655\\uC778]\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                   [Notion \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Vercel Cron \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Job\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"GET\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" /\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"api\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cron\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"update\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"posts \\u2192 \\uB0B4\\uBD80\\uC5D0\\uC11C \\uBCC0\\uACBD\\uC0AC\\uD56D \\uD0D0\\uC9C0]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\\uBCC0\\uACBD\\uB41C post \\uBE14\\uB85D\\uB9CC \\uB2E4\\uC2DC fetch]\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Redis \\uCE90\\uC2DC \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"\\uAC31\\uC2E0\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (Upstash)]\"})]})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uAD6C\\uBD84\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC804\\uB7B5\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uB85C\\uCEEC \\uAC1C\\uBC1C\"})}),(0,i.jsx)(s.td,{children:\"p-memoize, memory-cache, Map \\uB4F1 in-memory \\uBC29\\uC2DD\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uC6B4\\uC601 \\uC11C\\uBC84\"})}),(0,i.jsx)(s.td,{children:\"Upstash Redis \\uC0AC\\uC6A9\\uD558\\uC5EC Vercel \\uD658\\uACBD\\uC5D0\\uC11C\\uB3C4 \\uC9C0\\uC18D\\uB418\\uB294 \\uCE90\\uC2DC\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uCD5C\\uC2E0\\uD654\"})}),(0,i.jsx)(s.td,{children:\"Vercel Cron \\uC73C\\uB85C 10\\uBD84\\uB9C8\\uB2E4 Notion \\uB370\\uC774\\uD130 \\uBCC0\\uD654 \\uAC10\\uC9C0 \\uD6C4 \\uCE90\\uC2DC \\uAC31\\uC2E0\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"Fallback\"})}),(0,i.jsx)(s.td,{children:\"\\uCE90\\uC2DC miss \\uC2DC\\uC5D0\\uB9CC notion-client \\uC9C1\\uC811 \\uD638\\uCD9C (\\uC11C\\uBC84 \\uC804\\uC6A9)\"})]})]})]}),`\n`,(0,i.jsxs)(s.p,{children:[\"\\uC774 \\uB85C\\uC9C1\\uC744 \\uAE30\\uC900\\uC73C\\uB85C\\uD55C \",(0,i.jsx)(\"strong\",{children:\"Next.js 15 + Notion + \\uCE90\\uC2DC \\uC2DC\\uC2A4\\uD15C\"}),\"\\uC744 \\uC2E4\\uC81C\\uB85C \\uAD6C\\uD604\\uD558\\uAE30 \\uC704\\uD55C \",(0,i.jsx)(\"strong\",{children:\"\\uB2E8\\uACC4\\uBCC4 \\uAC00\\uC774\\uB4DC\\uB294 \\uC544\\uB798\\uC640 \\uAC19\\uC74C.\"})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC804\\uCCB4 \\uC791\\uC5C5 \\uC21C\\uC11C \\uC694\\uC57D\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uB2E8\\uACC4\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uBAA9\\uD45C\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC124\\uBA85\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"1\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Upstash Redis \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"Vercel\\uC5D0\\uC11C \\uC4F8 \\uC218 \\uC788\\uB294 \\uD074\\uB77C\\uC6B0\\uB4DC Redis \\uC778\\uC2A4\\uD134\\uC2A4 \\uC900\\uBE44\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"2\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Redis \\uC5F0\\uACB0 \\uBC0F \\uCE90\\uC2DC \\uC720\\uD2F8 \\uAD6C\\uD604\"}),(0,i.jsx)(s.td,{children:\"\\uC6B4\\uC601\\uD658\\uACBD\\uC5D0\\uC11C Redis \\uCE90\\uC2DC\\uB97C \\uC0AC\\uC6A9\\uD560 \\uC218 \\uC788\\uAC8C \\uD568\\uC218 \\uC791\\uC131\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"3\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"getPostBlocks \\uB9AC\\uD329\\uD1A0\\uB9C1\"}),(0,i.jsx)(s.td,{children:\"\\uCE90\\uC2F1\\uC744 \\uD3EC\\uD568\\uD55C Notion fetch \\uD568\\uC218\\uB85C \\uB9AC\\uD329\\uD1A0\\uB9C1\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"4\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"\\uB85C\\uCEEC/\\uC6B4\\uC601 \\uCE90\\uC2DC \\uC804\\uB7B5 \\uBD84\\uAE30\"}),(0,i.jsx)(s.td,{children:\"\\uAC1C\\uBC1C\\uD658\\uACBD\\uC5D0\\uC11C\\uB294 memory-cache, \\uC6B4\\uC601\\uD658\\uACBD\\uC740 Redis \\uC0AC\\uC6A9\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"5\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Vercel Cron API \\uB9CC\\uB4E4\\uAE30\"}),(0,i.jsx)(s.td,{children:\"\\uC8FC\\uAE30\\uC801\\uC73C\\uB85C Redis \\uCE90\\uC2DC\\uB97C \\uAC31\\uC2E0\\uD560 route \\uC0DD\\uC131\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"6\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Vercel Cron \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"Vercel dashboard\\uC5D0\\uC11C 10\\uBD84 \\uC8FC\\uAE30\\uB85C \\uC2E4\\uD589\\uB418\\uB3C4\\uB85D \\uC124\\uC815\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"7\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"ISR(revalidate) \\uBCD1\\uD589(optional)\"}),(0,i.jsx)(s.td,{children:\"\\uC778\\uAE30 \\uD398\\uC774\\uC9C0\\uB294 \\uC790\\uB3D9 \\uAC31\\uC2E0\\uB418\\uB3C4\\uB85D revalidate \\uC18D\\uC131 \\uD65C\\uC6A9\"})]})]})]}),`\n`,(0,i.jsx)(s.h2,{id:\"-1\\uB2E8\\uACC4-upstash-redis-\\uC124\\uC815-vercel\\uC5D0\\uC11C-\\uC4F8-\\uC678\\uBD80-\\uCE90\\uC2DC\",children:(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 1\\uB2E8\\uACC4: Upstash Redis \\uC124\\uC815 (Vercel\\uC5D0\\uC11C \\uC4F8 \\uC678\\uBD80 \\uCE90\\uC2DC)\"})}),`\n`,(0,i.jsxs)(s.ol,{children:[`\n`,(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.a,{href:\"https://upstash.com/\",children:\"https://upstash.com\"}),\" \\uAC00\\uC785\"]}),`\n`,(0,i.jsx)(s.li,{children:\"Redis \\u2192 Create Database\"}),`\n`,(0,i.jsx)(s.li,{children:\"REST URL, Token \\uD655\\uC778\"}),`\n`,(0,i.jsx)(s.li,{children:\".env.local\\uC5D0 \\uC544\\uB798 \\uD658\\uACBD\\uBCC0\\uC218 \\uCD94\\uAC00\"}),`\n`]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"UPSTASH_REDIS_REST_URL\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"your_upstash_url\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"UPSTASH_REDIS_REST_TOKEN\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"your_upstash_token\"})]})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 2\\uB2E8\\uACC4: Redis \\uC5F0\\uACB0 \\uC720\\uD2F8 \\uC0DD\\uC131\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/redis.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { Redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@upstash/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  url: process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"UPSTASH_REDIS_REST_URL\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  token: process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"UPSTASH_REDIS_REST_TOKEN\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"});\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 3\\uB2E8\\uACC4: getPostBlocks \\uB9AC\\uD329\\uD1A0\\uB9C1\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/notion/getPostBlocks.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { NotionAPI } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"notion-client\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getPostBlocks\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"pageId\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" string\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\") {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cacheKey\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" `postBlock_${\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"pageId\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"}`\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(cacheKey);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (cached) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" cached;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" NotionAPI\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"    userTimeZone: Intl.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"DateTimeFormat\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"().\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"resolvedOptions\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"().timeZone,\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  });\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" data\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" notion.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPage\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(pageId);\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(cacheKey, data, { ex: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"600\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }); \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// 10\\uBD84 TTL\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" data;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 4\\uB2E8\\uACC4: \\uB85C\\uCEEC/\\uC6B4\\uC601 \\uCE90\\uC2DC \\uBD84\\uAE30 \\uCC98\\uB9AC\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/cache.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" memory\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Map\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getCached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">(\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"  key\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" string\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"  fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" () \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Promise\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">,\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"  ttl\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" 600\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\")\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Promise\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"> {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" isProd\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"NODE_ENV\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" ===\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"production\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"isProd) {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"has\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key)) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fresh\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"    memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key, fresh);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"    setTimeout\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(() \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"delete\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key), ttl \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"*\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" 1000\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\");\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" fresh;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  }\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"  // \\uC6B4\\uC601\\uC5D0\\uC11C\\uB294 Redis\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">(key);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (cached) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" cached;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fresh\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key, fresh, { ex: ttl });\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" fresh;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 5\\uB2E8\\uACC4: Vercel Cron\\uC6A9 API route \\uB9CC\\uB4E4\\uAE30\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// app/api/cron/update-posts/route.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { getPostBlocks } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/notion/getPostBlocks\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { NextResponse } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"next/server\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" postPageIds\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" [\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"postid1\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\", \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"postid2\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"]; \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// \\uBCC0\\uACBD \\uAC10\\uC9C0\\uD560 \\uD398\\uC774\\uC9C0 ID\\uB4E4\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" GET\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  for\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" id\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" of\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" postPageIds) {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" data\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getPostBlocks\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(id);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"`postBlock_${\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"id\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"}`\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\", data, { ex: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"600\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" });\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  }\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" NextResponse.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"json\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({ status: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"refreshed\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" });\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 6\\uB2E8\\uACC4: Vercel Cron \\uC124\\uC815\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"{\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'  \"path\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"/api/cron/update-posts\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'  \"schedule\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"*/10 * * * *\"'})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"//(10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589\\uB428)\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 7\\uB2E8\\uACC4: ISR (revalidate = 600) \\uBCD1\\uD589 \\uC0AC\\uC6A9 (\\uC120\\uD0DD)\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" app/blog/page.tsx\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" const revalidate = 600; \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uD398\\uC774\\uC9C0\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uC694\\uCCAD\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uC2DC\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 10\\uBD84\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uACBD\\uACFC\\uB418\\uBA74\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uBC31\\uADF8\\uB77C\\uC6B4\\uB4DC\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" regenerate\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" default async function BlogPage() {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" posts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" getPosts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(); \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uB0B4\\uBD80\\uC5D0\\uC11C\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" Redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\u2192\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" Notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uD638\\uCD9C\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" <\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"BlogList\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" posts={posts}\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" /\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uB9C8\\uBB34\\uB9AC \\uCCB4\\uD06C\\uB9AC\\uC2A4\\uD2B8\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uD56D\\uBAA9\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC644\\uB8CC \\uC5EC\\uBD80\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Upstash Redis \\uC5F0\\uB3D9 \\uC644\\uB8CC\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Redis \\uCE90\\uC2DC \\uC720\\uD2F8 \\uC0DD\\uC131\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Notion fetch \\uCE90\\uC2F1 \\uC801\\uC6A9\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Vercel/Local \\uD658\\uACBD \\uBD84\\uAE30 \\uC801\\uC6A9\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 cron route \\uC0DD\\uC131 \\uBC0F \\uBC30\\uD3EC\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Vercel Cron Job \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 ISR \\uC801\\uC6A9 (optional)\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]})]})]})]})}function c(h={}){let{wrapper:s}=h.components||{};return s?(0,i.jsx)(s,{...h,children:(0,i.jsx)(t,{...h})}):t(h)}return N(A);})();\n;return Component;"
  },
  {
    "notionId": "2251eb5c0337802f8f44c164859f1b33",
    "title": "Next.js + Notion + 캐싱 전략 전체 플로우 (로컬 vs 운영 + Vercel Cron)",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-03T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "```typescript\n[Client (/blog 접근)]\n        │\n        ▼\n[Next.js 15 App Router → Page Component]\n        │\n        ▼\n[getPosts() 호출]\n        │\n        ├── (로컬 개발 환경)\n        │       │\n        │       ▼\n        │   [p-memoize / memory-cache 등]\n        │       │\n        │       └── 캐시 miss 시\n        │               │\n        │               ▼\n        │          [Notion API fetch (notion-client)]\n        │\n        └── (운영 환경: Vercel)\n                │\n                ▼\n            [Upstash Redis 캐시 확인]\n                │\n                └── 캐시 miss 시\n                        │\n                        ▼\n                   [Notion API fetch (notion-client)]\n\n────────────────────────────────────────────────────────────\n\n[Vercel Cron Job (10분마다 실행)]\n        │\n        ▼\n[GET /api/cron/update-posts → 내부에서 변경사항 탐지]\n        │\n        ▼\n[변경된 post 블록만 다시 fetch]\n        │\n        ▼\n[Redis 캐시 갱신 (Upstash)]\n```\n\n\n\n<strong>✅ 요약 포인트</strong>\n\n\n\n| <strong>구분</strong>       | <strong>전략</strong>                                        |\n| ------------ | --------------------------------------------- |\n| <strong>로컬 개발</strong>    | p-memoize, memory-cache, Map 등 in-memory 방식   |\n| <strong>운영 서버</strong>    | Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시       |\n| <strong>최신화</strong>      | Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신 |\n| <strong>Fallback</strong> | 캐시 miss 시에만 notion-client 직접 호출 (서버 전용)       |",
    "_meta": {
      "filePath": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬.mdx",
      "fileName": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "구분"
        },
        {
          "heading": "",
          "content": "전략"
        },
        {
          "heading": "",
          "content": "로컬 개발"
        },
        {
          "heading": "",
          "content": "p-memoize, memory-cache, Map 등 in-memory 방식"
        },
        {
          "heading": "",
          "content": "운영 서버"
        },
        {
          "heading": "",
          "content": "Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시"
        },
        {
          "heading": "",
          "content": "최신화"
        },
        {
          "heading": "",
          "content": "Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신"
        },
        {
          "heading": "",
          "content": "Fallback"
        },
        {
          "heading": "",
          "content": "캐시 miss 시에만 notion-client 직접 호출 (서버 전용)"
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var E=Object.create;var e=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var o=(h,i)=>()=>(i||h((i={exports:{}}).exports,i),i.exports),N=(h,i)=>{for(var l in i)e(h,l,{get:i[l],enumerable:!0})},r=(h,i,l,a)=>{if(i&&typeof i==\"object\"||typeof i==\"function\")for(let n of g(i))!m.call(h,n)&&n!==l&&e(h,n,{get:()=>i[n],enumerable:!(a=p(i,n))||a.enumerable});return h};var F=(h,i,l)=>(l=h!=null?E(y(h)):{},r(i||!h||!h.__esModule?e(l,\"default\",{value:h,enumerable:!0}):l,h)),C=h=>r(e({},\"__esModule\",{value:!0}),h);var t=o((u,d)=>{d.exports=_jsx_runtime});var b={};N(b,{default:()=>c});var s=F(t());function k(h){let i={code:\"code\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",...h.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(i.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,s.jsxs)(i.code,{children:[(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Client\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"blog \\uC811\\uADFC)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Next.js \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"15\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" App Router \\u2192 Page Component]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPosts\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() \\uD638\\uCD9C]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u251C\\u2500\\u2500 (\\uB85C\\uCEEC \\uAC1C\\uBC1C \\uD658\\uACBD)\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502   [p\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"memoize \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cache \\uB4F1]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502          [Notion \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2514\\u2500\\u2500 (\\uC6B4\\uC601 \\uD658\\uACBD: Vercel)\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u25BC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"            [Upstash Redis \\uCE90\\uC2DC \\uD655\\uC778]\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                   [Notion \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\"}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\"}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Vercel Cron \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Job\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"GET\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" /\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"api\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cron\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"update\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"posts \\u2192 \\uB0B4\\uBD80\\uC5D0\\uC11C \\uBCC0\\uACBD\\uC0AC\\uD56D \\uD0D0\\uC9C0]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\\uBCC0\\uACBD\\uB41C post \\uBE14\\uB85D\\uB9CC \\uB2E4\\uC2DC fetch]\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Redis \\uCE90\\uC2DC \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"\\uAC31\\uC2E0\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (Upstash)]\"})]})]})})}),`\n`,(0,s.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:(0,s.jsx)(\"strong\",{children:\"\\uAD6C\\uBD84\"})}),(0,s.jsx)(i.th,{children:(0,s.jsx)(\"strong\",{children:\"\\uC804\\uB7B5\"})})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uB85C\\uCEEC \\uAC1C\\uBC1C\"})}),(0,s.jsx)(i.td,{children:\"p-memoize, memory-cache, Map \\uB4F1 in-memory \\uBC29\\uC2DD\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uC6B4\\uC601 \\uC11C\\uBC84\"})}),(0,s.jsx)(i.td,{children:\"Upstash Redis \\uC0AC\\uC6A9\\uD558\\uC5EC Vercel \\uD658\\uACBD\\uC5D0\\uC11C\\uB3C4 \\uC9C0\\uC18D\\uB418\\uB294 \\uCE90\\uC2DC\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uCD5C\\uC2E0\\uD654\"})}),(0,s.jsx)(i.td,{children:\"Vercel Cron \\uC73C\\uB85C 10\\uBD84\\uB9C8\\uB2E4 Notion \\uB370\\uC774\\uD130 \\uBCC0\\uD654 \\uAC10\\uC9C0 \\uD6C4 \\uCE90\\uC2DC \\uAC31\\uC2E0\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"Fallback\"})}),(0,s.jsx)(i.td,{children:\"\\uCE90\\uC2DC miss \\uC2DC\\uC5D0\\uB9CC notion-client \\uC9C1\\uC811 \\uD638\\uCD9C (\\uC11C\\uBC84 \\uC804\\uC6A9)\"})]})]})]})]})}function c(h={}){let{wrapper:i}=h.components||{};return i?(0,s.jsx)(i,{...h,children:(0,s.jsx)(k,{...h})}):k(h)}return C(b);})();\n;return Component;"
  },
  {
    "notionId": "21a1eb5c033780b68ef5f9025659da0c",
    "title": "[TIL] dddd",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-06-22T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": false,
    "content": "바뀌어여 하는거 아니여?",
    "_meta": {
      "filePath": "engineerings-TIL-dddd.mdx",
      "fileName": "engineerings-TIL-dddd.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL-dddd"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "바뀌어여 하는거 아니여?"
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var p=Object.create;var r=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var l=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),M=(n,t)=>{for(var e in t)r(n,e,{get:t[e],enumerable:!0})},u=(n,t,e,s)=>{if(t&&typeof t==\"object\"||typeof t==\"function\")for(let o of d(t))!j.call(n,o)&&o!==e&&r(n,o,{get:()=>t[o],enumerable:!(s=_(t,o))||s.enumerable});return n};var h=(n,t,e)=>(e=n!=null?p(f(n)):{},u(t||!n||!n.__esModule?r(e,\"default\",{value:n,enumerable:!0}):e,n)),C=n=>u(r({},\"__esModule\",{value:!0}),n);var m=l((w,i)=>{i.exports=_jsx_runtime});var D={};M(D,{default:()=>a});var c=h(m());function x(n){let t={p:\"p\",...n.components};return(0,c.jsx)(t.p,{children:\"\\uBC14\\uB00C\\uC5B4\\uC5EC \\uD558\\uB294\\uAC70 \\uC544\\uB2C8\\uC5EC?\"})}function a(n={}){let{wrapper:t}=n.components||{};return t?(0,c.jsx)(t,{...n,children:(0,c.jsx)(x,{...n})}):x(n)}return C(D);})();\n;return Component;"
  },
  {
    "notionId": "2231eb5c0337804eadfce7368b604088",
    "title": "[TIL] Refactoring SearchInput.",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-01T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "## <strong>✅ 전체 코드 개념 잡기</strong>\n\n\n![스크린샷_2025-07-11_오후_2.12.58.png](https://res.cloudinary.com/dyrdul1dd/image/upload/v1754574960/norkive-notion-images/1754574957442-E1_84_89_E1_85_B3_E1_84_8F_E1_85_B3_E1_84_85_E1_85_B5_E1_86_AB_E1_84_89_E1_85_A3_E1_86_BA_2025-07-11_E1_84_8B_E1_85_A9_E1_84_92_E1_85_AE_2.12.58.png)\n\n\n### <strong>1.</strong>\n\n\n### <strong>Fuse.js</strong>\n\n- <strong>뭐야?</strong>\n\n    자바스크립트용 <strong>빠른 클라이언트 사이드 검색 라이브러리</strong>.\n\n\n    검색어가 “부정확하게” 일치해도 유사도를 기반으로 결과를 찾아줘. (부분 검색, 오타 관용적)\n\n- <strong>여기서 쓰는 이유?</strong>\n\n    백엔드 API 없이 그냥 <strong>더미 배열</strong>에서 실시간 검색 테스트하려고.\n\n- <strong>사용 방법:</strong>\n\n```typescript\nconst fuse = new Fuse(대상데이터, 옵션);\nfuse.search(검색어); // 결과 배열 반환\n```\n\n\n### <strong>2.</strong>\n\n\n### <strong>lodash.debounce</strong>\n\n- <strong>뭐야?</strong>\n\n    사용자가 입력할 때마다 <strong>계속 검색 호출 안 되게 딜레이 걸어주는 함수</strong>.\n\n- <strong>여기서 쓰는 이유?</strong>\n\n    한 글자 입력할 때마다 실시간 검색하면 너무 많은 연산 낭비 → <strong>0.3초 입력 멈추면 그때 검색</strong>\n\n- <strong>사용 방법:</strong>\n\n    ```typescript\n    const debouncedFn = debounce((text) => { ...검색로직... }, 300);\n    ```\n\n\n### <strong>3.</strong>\n\n\n### <strong>useMemo</strong>\n\n- <strong>뭐야?</strong>\n\n    React에서 특정 값이나 객체를 <strong>메모이제이션(캐시)</strong> 해서,\n\n\n    <strong>렌더링마다 새로 생성되는 걸 방지</strong>하는 훅.\n\n- <strong>여기서 왜 씀?</strong>\n\n    Fuse 인스턴스를 매번 새로 만들지 않기 위해.\n\n- <strong>사용 예시:</strong>\n\n    ```typescript\n    const fuse = useMemo(() => new Fuse(데이터), []);\n    ```\n\n\n\n <strong>전체 동작 흐름</strong>\n\n\n\n```plain text\n[1] 사용자가 input에 타이핑 → setQuery 변경됨\n↓\n[2] query 상태 변경 → useEffect 실행됨\n↓\n[3] useEffect 안에서 debounce된 handleSearch 실행됨 (300ms 딜레이)\n↓\n[4] handleSearch 내부:\n- query 길이 체크\n- fuse.search() 실행 → 결과 배열 만들기\n- setResults로 검색결과 상태 업데이트\n↓\n[5] 결과 표시 영역에서:\n- 로딩중일 때 Skeleton\n- 검색결과 있을 때 리스트로 출력\n- 없으면 \"No results found\"\n```\n\n\n\n<strong>✅ 주요 State 설명</strong>\n\n\n\n| <strong>tate</strong> | <strong>역할</strong>            |\n| -------- | ----------------- |\n| query    | 현재 input 값        |\n| results  | 검색 결과 배열          |\n| loading  | Skeleton 출력 여부 제어 |\n\n\n\n<strong>✅ 주요 Hook/로직 정리</strong>\n\n\n\n| <strong>항목</strong>        | <strong>설명</strong>                        |\n| ------------- | ----------------------------- |\n| useState      | query, results, loading 상태 관리 |\n| useEffect     | query가 바뀔 때마다 debounce로 검색 실행 |\n| useMemo       | fuse 인스턴스 재생성 방지              |\n| debounce      | 검색 호출 최적화                     |\n| fuse.search() | 입력어 기반 검색                     |\n\n\n\n<strong>✅ 확장 작업 시 적용 포인트</strong>\n\n\n\n| <strong>기능</strong>             | <strong>적용 위치</strong>                                        |\n| ------------------ | ------------------------------------------------ |\n| <strong>Algolia 연동</strong>     | → handleSearch 내부 fuse.search 대신 <strong>axios fetch</strong> |\n| <strong>Next.js &lt;Link&gt;</strong> | → 리스트 출력 부분 &lt;a href&gt; 대신 &lt;Link href&gt;              |\n| <strong>서버 API</strong>         | → handleSearch 내부를 <strong>API 호출 비동기 함수</strong>로 변경         |\n| <strong>Skeleton 커스텀</strong>   | → loading 상태일 때 보여주는 div 영역만 수정                  |\n\n\n## <strong>✅ 요약:</strong>\n\n\n지금 코드는 👉\n\n\n<strong>[로컬 배열 + Fuse 검색 + debounce 최적화 + 다크모드 + Skeleton]</strong>\n\n\n이 조합으로 구성된 <strong>Next.js 클라이언트 컴포넌트형 검색 Input UI</strong>\n\n\n여기가 끝이구나!\n\n\n진짜로",
    "_meta": {
      "filePath": "engineerings-TIL-Refactoring-SearchInput.mdx",
      "fileName": "engineerings-TIL-Refactoring-SearchInput.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL-Refactoring-SearchInput"
    },
    "toc": [
      {
        "title": "✅ 전체 코드 개념 잡기",
        "url": "#-전체-코드-개념-잡기",
        "depth": 2
      },
      {
        "title": "1.",
        "url": "#1",
        "depth": 3
      },
      {
        "title": "Fuse.js",
        "url": "#fusejs",
        "depth": 3
      },
      {
        "title": "2.",
        "url": "#2",
        "depth": 3
      },
      {
        "title": "lodash.debounce",
        "url": "#lodashdebounce",
        "depth": 3
      },
      {
        "title": "3.",
        "url": "#3",
        "depth": 3
      },
      {
        "title": "useMemo",
        "url": "#usememo",
        "depth": 3
      },
      {
        "title": "✅ 요약:",
        "url": "#-요약",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "fusejs",
          "content": "자바스크립트용 빠른 클라이언트 사이드 검색 라이브러리."
        },
        {
          "heading": "fusejs",
          "content": "검색어가 “부정확하게” 일치해도 유사도를 기반으로 결과를 찾아줘. (부분 검색, 오타 관용적)"
        },
        {
          "heading": "fusejs",
          "content": "백엔드 API 없이 그냥 더미 배열에서 실시간 검색 테스트하려고."
        },
        {
          "heading": "lodashdebounce",
          "content": "사용자가 입력할 때마다 계속 검색 호출 안 되게 딜레이 걸어주는 함수."
        },
        {
          "heading": "lodashdebounce",
          "content": "한 글자 입력할 때마다 실시간 검색하면 너무 많은 연산 낭비 → 0.3초 입력 멈추면 그때 검색"
        },
        {
          "heading": "usememo",
          "content": "React에서 특정 값이나 객체를 메모이제이션(캐시) 해서,"
        },
        {
          "heading": "usememo",
          "content": "렌더링마다 새로 생성되는 걸 방지하는 훅."
        },
        {
          "heading": "usememo",
          "content": "Fuse 인스턴스를 매번 새로 만들지 않기 위해."
        },
        {
          "heading": "usememo",
          "content": "전체 동작 흐름"
        },
        {
          "heading": "usememo",
          "content": "tate"
        },
        {
          "heading": "usememo",
          "content": "역할"
        },
        {
          "heading": "usememo",
          "content": "query"
        },
        {
          "heading": "usememo",
          "content": "현재 input 값"
        },
        {
          "heading": "usememo",
          "content": "results"
        },
        {
          "heading": "usememo",
          "content": "검색 결과 배열"
        },
        {
          "heading": "usememo",
          "content": "loading"
        },
        {
          "heading": "usememo",
          "content": "Skeleton 출력 여부 제어"
        },
        {
          "heading": "usememo",
          "content": "항목"
        },
        {
          "heading": "usememo",
          "content": "설명"
        },
        {
          "heading": "usememo",
          "content": "useState"
        },
        {
          "heading": "usememo",
          "content": "query, results, loading 상태 관리"
        },
        {
          "heading": "usememo",
          "content": "useEffect"
        },
        {
          "heading": "usememo",
          "content": "query가 바뀔 때마다 debounce로 검색 실행"
        },
        {
          "heading": "usememo",
          "content": "useMemo"
        },
        {
          "heading": "usememo",
          "content": "fuse 인스턴스 재생성 방지"
        },
        {
          "heading": "usememo",
          "content": "debounce"
        },
        {
          "heading": "usememo",
          "content": "검색 호출 최적화"
        },
        {
          "heading": "usememo",
          "content": "fuse.search()"
        },
        {
          "heading": "usememo",
          "content": "입력어 기반 검색"
        },
        {
          "heading": "usememo",
          "content": "기능"
        },
        {
          "heading": "usememo",
          "content": "적용 위치"
        },
        {
          "heading": "usememo",
          "content": "Algolia 연동"
        },
        {
          "heading": "usememo",
          "content": "→ handleSearch 내부 fuse.search 대신 axios fetch"
        },
        {
          "heading": "usememo",
          "content": "Next.js <Link>"
        },
        {
          "heading": "usememo",
          "content": "→ 리스트 출력 부분 <a href> 대신 <Link href>"
        },
        {
          "heading": "usememo",
          "content": "서버 API"
        },
        {
          "heading": "usememo",
          "content": "→ handleSearch 내부를 API 호출 비동기 함수로 변경"
        },
        {
          "heading": "usememo",
          "content": "Skeleton 커스텀"
        },
        {
          "heading": "usememo",
          "content": "→ loading 상태일 때 보여주는 div 영역만 수정"
        },
        {
          "heading": "-요약",
          "content": "지금 코드는 👉"
        },
        {
          "heading": "-요약",
          "content": "이 조합으로 구성된 Next.js 클라이언트 컴포넌트형 검색 Input UI"
        },
        {
          "heading": "-요약",
          "content": "여기가 끝이구나!"
        },
        {
          "heading": "-요약",
          "content": "진짜로"
        }
      ],
      "headings": [
        {
          "id": "-전체-코드-개념-잡기",
          "content": "✅ 전체 코드 개념 잡기"
        },
        {
          "id": "1",
          "content": "1."
        },
        {
          "id": "fusejs",
          "content": "Fuse.js"
        },
        {
          "id": "2",
          "content": "2."
        },
        {
          "id": "lodashdebounce",
          "content": "lodash.debounce"
        },
        {
          "id": "3",
          "content": "3."
        },
        {
          "id": "usememo",
          "content": "useMemo"
        },
        {
          "id": "-요약",
          "content": "✅ 요약:"
        }
      ]
    },
    "body": "var Component=(()=>{var g=Object.create;var r=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var m=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),_=(e,n)=>{for(var h in n)r(e,h,{get:n[h],enumerable:!0})},d=(e,n,h,s)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let l of p(n))!E.call(e,l)&&l!==h&&r(e,l,{get:()=>n[l],enumerable:!(s=o(n,l))||s.enumerable});return e};var y=(e,n,h)=>(h=e!=null?g(u(e)):{},d(n||!e||!e.__esModule?r(h,\"default\",{value:e,enumerable:!0}):h,e)),F=e=>d(r({},\"__esModule\",{value:!0}),e);var t=m((v,c)=>{c.exports=_jsx_runtime});var b={};_(b,{default:()=>k});var i=y(t());function a(e){let n={code:\"code\",h2:\"h2\",h3:\"h3\",img:\"img\",li:\"li\",p:\"p\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",ul:\"ul\",...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:\"-\\uC804\\uCCB4-\\uCF54\\uB4DC-\\uAC1C\\uB150-\\uC7A1\\uAE30\",children:(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC804\\uCCB4 \\uCF54\\uB4DC \\uAC1C\\uB150 \\uC7A1\\uAE30\"})}),`\n`,(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:\"\\u1109\\u1173\\u110F\\u1173\\u1105\\u1175\\u11AB\\u1109\\u1163\\u11BA_2025-07-11_\\u110B\\u1169\\u1112\\u116E_2.12.58.png\",src:\"https://res.cloudinary.com/dyrdul1dd/image/upload/v1754574960/norkive-notion-images/1754574957442-E1_84_89_E1_85_B3_E1_84_8F_E1_85_B3_E1_84_85_E1_85_B5_E1_86_AB_E1_84_89_E1_85_A3_E1_86_BA_2025-07-11_E1_84_8B_E1_85_A9_E1_84_92_E1_85_AE_2.12.58.png\",width:\"1950\",height:\"1442\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"1\",children:(0,i.jsx)(\"strong\",{children:\"1.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"fusejs\",children:(0,i.jsx)(\"strong\",{children:\"Fuse.js\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC790\\uBC14\\uC2A4\\uD06C\\uB9BD\\uD2B8\\uC6A9 \",(0,i.jsx)(\"strong\",{children:\"\\uBE60\\uB978 \\uD074\\uB77C\\uC774\\uC5B8\\uD2B8 \\uC0AC\\uC774\\uB4DC \\uAC80\\uC0C9 \\uB77C\\uC774\\uBE0C\\uB7EC\\uB9AC\"}),\".\"]}),`\n`,(0,i.jsx)(n.p,{children:\"\\uAC80\\uC0C9\\uC5B4\\uAC00 \\u201C\\uBD80\\uC815\\uD655\\uD558\\uAC8C\\u201D \\uC77C\\uCE58\\uD574\\uB3C4 \\uC720\\uC0AC\\uB3C4\\uB97C \\uAE30\\uBC18\\uC73C\\uB85C \\uACB0\\uACFC\\uB97C \\uCC3E\\uC544\\uC918. (\\uBD80\\uBD84 \\uAC80\\uC0C9, \\uC624\\uD0C0 \\uAD00\\uC6A9\\uC801)\"}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC4F0\\uB294 \\uC774\\uC720?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uBC31\\uC5D4\\uB4DC API \\uC5C6\\uC774 \\uADF8\\uB0E5 \",(0,i.jsx)(\"strong\",{children:\"\\uB354\\uBBF8 \\uBC30\\uC5F4\"}),\"\\uC5D0\\uC11C \\uC2E4\\uC2DC\\uAC04 \\uAC80\\uC0C9 \\uD14C\\uC2A4\\uD2B8\\uD558\\uB824\\uACE0.\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uBC29\\uBC95:\"}),`\n`]}),`\n`]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(n.code,{children:[(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uB300\\uC0C1\\uB370\\uC774\\uD130, \\uC635\\uC158);\"})]}),`\n`,(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"fuse.\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"search\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uAC80\\uC0C9\\uC5B4); \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// \\uACB0\\uACFC \\uBC30\\uC5F4 \\uBC18\\uD658\"})]})]})})}),`\n`,(0,i.jsx)(n.h3,{id:\"2\",children:(0,i.jsx)(\"strong\",{children:\"2.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"lodashdebounce\",children:(0,i.jsx)(\"strong\",{children:\"lodash.debounce\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC0AC\\uC6A9\\uC790\\uAC00 \\uC785\\uB825\\uD560 \\uB54C\\uB9C8\\uB2E4 \",(0,i.jsx)(\"strong\",{children:\"\\uACC4\\uC18D \\uAC80\\uC0C9 \\uD638\\uCD9C \\uC548 \\uB418\\uAC8C \\uB51C\\uB808\\uC774 \\uAC78\\uC5B4\\uC8FC\\uB294 \\uD568\\uC218\"}),\".\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC4F0\\uB294 \\uC774\\uC720?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uD55C \\uAE00\\uC790 \\uC785\\uB825\\uD560 \\uB54C\\uB9C8\\uB2E4 \\uC2E4\\uC2DC\\uAC04 \\uAC80\\uC0C9\\uD558\\uBA74 \\uB108\\uBB34 \\uB9CE\\uC740 \\uC5F0\\uC0B0 \\uB0AD\\uBE44 \\u2192 \",(0,i.jsx)(\"strong\",{children:\"0.3\\uCD08 \\uC785\\uB825 \\uBA48\\uCD94\\uBA74 \\uADF8\\uB54C \\uAC80\\uC0C9\"})]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uBC29\\uBC95:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(n.code,{children:(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" debouncedFn\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" debounce\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"((\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"text\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\") \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"...\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\uAC80\\uC0C9\\uB85C\\uC9C1\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"...\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }, \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"300\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\");\"})]})})})}),`\n`]}),`\n`]}),`\n`,(0,i.jsx)(n.h3,{id:\"3\",children:(0,i.jsx)(\"strong\",{children:\"3.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"usememo\",children:(0,i.jsx)(\"strong\",{children:\"useMemo\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"React\\uC5D0\\uC11C \\uD2B9\\uC815 \\uAC12\\uC774\\uB098 \\uAC1D\\uCCB4\\uB97C \",(0,i.jsx)(\"strong\",{children:\"\\uBA54\\uBAA8\\uC774\\uC81C\\uC774\\uC158(\\uCE90\\uC2DC)\"}),\" \\uD574\\uC11C,\"]}),`\n`,(0,i.jsxs)(n.p,{children:[(0,i.jsx)(\"strong\",{children:\"\\uB80C\\uB354\\uB9C1\\uB9C8\\uB2E4 \\uC0C8\\uB85C \\uC0DD\\uC131\\uB418\\uB294 \\uAC78 \\uBC29\\uC9C0\"}),\"\\uD558\\uB294 \\uD6C5.\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC65C \\uC500?\"}),`\n`,(0,i.jsx)(n.p,{children:\"Fuse \\uC778\\uC2A4\\uD134\\uC2A4\\uB97C \\uB9E4\\uBC88 \\uC0C8\\uB85C \\uB9CC\\uB4E4\\uC9C0 \\uC54A\\uAE30 \\uC704\\uD574.\"}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uC608\\uC2DC:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(n.code,{children:(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" useMemo\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(() \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uB370\\uC774\\uD130), []);\"})]})})})}),`\n`]}),`\n`]}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\xA0\",(0,i.jsx)(\"strong\",{children:\"\\uC804\\uCCB4 \\uB3D9\\uC791 \\uD750\\uB984\"})]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(n.code,{children:[(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[1] \\uC0AC\\uC6A9\\uC790\\uAC00 input\\uC5D0 \\uD0C0\\uC774\\uD551 \\u2192 setQuery \\uBCC0\\uACBD\\uB428\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[2] query \\uC0C1\\uD0DC \\uBCC0\\uACBD \\u2192 useEffect \\uC2E4\\uD589\\uB428\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[3] useEffect \\uC548\\uC5D0\\uC11C debounce\\uB41C handleSearch \\uC2E4\\uD589\\uB428 (300ms \\uB51C\\uB808\\uC774)\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[4] handleSearch \\uB0B4\\uBD80:\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- query \\uAE38\\uC774 \\uCCB4\\uD06C\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- fuse.search() \\uC2E4\\uD589 \\u2192 \\uACB0\\uACFC \\uBC30\\uC5F4 \\uB9CC\\uB4E4\\uAE30\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- setResults\\uB85C \\uAC80\\uC0C9\\uACB0\\uACFC \\uC0C1\\uD0DC \\uC5C5\\uB370\\uC774\\uD2B8\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[5] \\uACB0\\uACFC \\uD45C\\uC2DC \\uC601\\uC5ED\\uC5D0\\uC11C:\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- \\uB85C\\uB529\\uC911\\uC77C \\uB54C Skeleton\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- \\uAC80\\uC0C9\\uACB0\\uACFC \\uC788\\uC744 \\uB54C \\uB9AC\\uC2A4\\uD2B8\\uB85C \\uCD9C\\uB825\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:'- \\uC5C6\\uC73C\\uBA74 \"No results found\"'})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC8FC\\uC694 State \\uC124\\uBA85\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"tate\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC5ED\\uD560\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"query\"}),(0,i.jsx)(n.td,{children:\"\\uD604\\uC7AC input \\uAC12\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"results\"}),(0,i.jsx)(n.td,{children:\"\\uAC80\\uC0C9 \\uACB0\\uACFC \\uBC30\\uC5F4\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"loading\"}),(0,i.jsx)(n.td,{children:\"Skeleton \\uCD9C\\uB825 \\uC5EC\\uBD80 \\uC81C\\uC5B4\"})]})]})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC8FC\\uC694 Hook/\\uB85C\\uC9C1 \\uC815\\uB9AC\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uD56D\\uBAA9\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC124\\uBA85\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useState\"}),(0,i.jsx)(n.td,{children:\"query, results, loading \\uC0C1\\uD0DC \\uAD00\\uB9AC\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useEffect\"}),(0,i.jsx)(n.td,{children:\"query\\uAC00 \\uBC14\\uB014 \\uB54C\\uB9C8\\uB2E4 debounce\\uB85C \\uAC80\\uC0C9 \\uC2E4\\uD589\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useMemo\"}),(0,i.jsx)(n.td,{children:\"fuse \\uC778\\uC2A4\\uD134\\uC2A4 \\uC7AC\\uC0DD\\uC131 \\uBC29\\uC9C0\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"debounce\"}),(0,i.jsx)(n.td,{children:\"\\uAC80\\uC0C9 \\uD638\\uCD9C \\uCD5C\\uC801\\uD654\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"fuse.search()\"}),(0,i.jsx)(n.td,{children:\"\\uC785\\uB825\\uC5B4 \\uAE30\\uBC18 \\uAC80\\uC0C9\"})]})]})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uD655\\uC7A5 \\uC791\\uC5C5 \\uC2DC \\uC801\\uC6A9 \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uAE30\\uB2A5\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC801\\uC6A9 \\uC704\\uCE58\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Algolia \\uC5F0\\uB3D9\"})}),(0,i.jsxs)(n.td,{children:[\"\\u2192 handleSearch \\uB0B4\\uBD80 fuse.search \\uB300\\uC2E0 \",(0,i.jsx)(\"strong\",{children:\"axios fetch\"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Next.js <Link>\"})}),(0,i.jsx)(n.td,{children:\"\\u2192 \\uB9AC\\uC2A4\\uD2B8 \\uCD9C\\uB825 \\uBD80\\uBD84 <a href> \\uB300\\uC2E0 <Link href>\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uC11C\\uBC84 API\"})}),(0,i.jsxs)(n.td,{children:[\"\\u2192 handleSearch \\uB0B4\\uBD80\\uB97C \",(0,i.jsx)(\"strong\",{children:\"API \\uD638\\uCD9C \\uBE44\\uB3D9\\uAE30 \\uD568\\uC218\"}),\"\\uB85C \\uBCC0\\uACBD\"]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Skeleton \\uCEE4\\uC2A4\\uD140\"})}),(0,i.jsx)(n.td,{children:\"\\u2192 loading \\uC0C1\\uD0DC\\uC77C \\uB54C \\uBCF4\\uC5EC\\uC8FC\\uB294 div \\uC601\\uC5ED\\uB9CC \\uC218\\uC815\"})]})]})]}),`\n`,(0,i.jsx)(n.h2,{id:\"-\\uC694\\uC57D\",children:(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D:\"})}),`\n`,(0,i.jsx)(n.p,{children:\"\\uC9C0\\uAE08 \\uCF54\\uB4DC\\uB294 \\u{1F449}\"}),`\n`,(0,i.jsx)(\"strong\",{children:\"[\\uB85C\\uCEEC \\uBC30\\uC5F4 + Fuse \\uAC80\\uC0C9 + debounce \\uCD5C\\uC801\\uD654 + \\uB2E4\\uD06C\\uBAA8\\uB4DC + Skeleton]\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC774 \\uC870\\uD569\\uC73C\\uB85C \\uAD6C\\uC131\\uB41C \",(0,i.jsx)(\"strong\",{children:\"Next.js \\uD074\\uB77C\\uC774\\uC5B8\\uD2B8 \\uCEF4\\uD3EC\\uB10C\\uD2B8\\uD615 \\uAC80\\uC0C9 Input UI\"})]}),`\n`,(0,i.jsx)(n.p,{children:\"\\uC5EC\\uAE30\\uAC00 \\uB05D\\uC774\\uAD6C\\uB098!\"}),`\n`,(0,i.jsx)(n.p,{children:\"\\uC9C4\\uC9DC\\uB85C\"})]})}function k(e={}){let{wrapper:n}=e.components||{};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}return F(b);})();\n;return Component;"
  },
  {
    "notionId": "21f1eb5c033780bab3dfc71cca861aab",
    "title": "[TIL] www",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-06-27T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "아니진짜 이게무냐~~~\n\n\n```typescript\n```<code>  const mapCodeLanguage = (b) => {</code>\n    const lang = b.value.properties?.language?.[0]?.[0];\n    if (languageMap.has(lang)) {\n      b.value.properties.language[0][0] = languageMap.get(lang);\n    }\n  };\n</code>``\n\n\n<FileWrapper names={\"원고지_사용법__교정부호.pdf\"} urls={\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/6aedad5c-8cf2-4f23-a0d7-bf653f033216/%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A9%E1%84%8C%E1%85%B5_%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8__%E1%84%80%E1%85%AD%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%AE%E1%84%92%E1%85%A9.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YK7ALVRA%2F20250807%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250807T135602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDLK4sjiYJ2zIuHzkxMNpRGgLdZmkhqkni1IMwyPrPmnQIhAJdAuKs%2FAfSTzz6q4CSA7VphHYmdHOe2vQkhb%2BxJBqSVKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzi%2BoEAWJ07yqLxUSkq3AP3mv9kkGL4TpR5c9KuNrn5OsrEQEoNvchynJMn5OhqW14XZwfdVDwOBpLaXFtekP9L52xQuPT1ddaOlcIQh0%2FPLD27TY1OmdLoLvAQstyVtBkThlbgrif2QZanIJw7BCQKJ21eL54CiHMYeq8d4lXnSvO6Y8iHcXthFSMWezZNXaRecDz6djGOjEKq%2FWHqqCq%2F7t0iLJVct7CYVKuDVwz%2FY5SpUGq%2FKdFN%2BhrfkbF5v4BissFnNKHkp7DEzpe7%2BXKzOREP5M27LdCHPjYfMxdfieDm%2FWsxuxVQ30mTw6XPfs5bt4p9WheFCLHoThOqlZiPwkNpTfRcJZHODpOWLhIIcGz28Jny4o0TZMY4xMUcRwGrz%2BFr4Oclz3%2BLPuWk%2B1x8G%2FCIJJcl4x0PZtG7MWeIMi6u3yfoRt6IDheK1uMPFnmLBIAebiSwLMWxZ6EJxij6%2B92XNBrWvvqagiBL96l8kVpAnamCjk8vFtBjqvChGPUOCaXYJsC7ZVHoT3zwXLTCpcYS0OmhGh2T2wZRiP4W212yQ3I%2FzrfHict4O2DuEqSCChLq6swXJxCTg4v9g8Zf7NqrmDckPUhORo8tK9%2BiFcTGwd2McY5umk6zcUsYki9HDH7Cg8uf6mlktjCR3tLEBjqkAaSVaS4fwPQL1Xlvh%2BC5oQ%2Bd42zdJqTUb2R0bH4b5UMzu4Dg%2Beud2zCWC8CcPAIavuKijONBUc7lJMI5M2LDOBc6O9uZ9nTggSqrE3jHLrSURJKaP00k8UJA4dHVry25x5uIDPH7xXxjLymVJa7ySaBZsqxjR2CPycGLNuwrLqd08VH4Tf41GIaPLsj7vPZxgiXy1AiJU%2BsVeBURE6GReS2lU3Ni&X-Amz-Signature=90586655f8321eb1ab982c6e254e3f0ccfb2d4981ff84a230a4501a094568ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"} />\n\n\n왜안바뀜\n\n\n또 바꿨지롱!!",
    "_meta": {
      "filePath": "engineerings-TIL-www.mdx",
      "fileName": "engineerings-TIL-www.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL-www"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "아니진짜 이게무냐~~~"
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var p=Object.create;var l=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var E=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var C=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports),o=(a,e)=>{for(var i in e)l(a,i,{get:e[i],enumerable:!0})},h=(a,e,i,c)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let n of m(e))!g.call(a,n)&&n!==i&&l(a,n,{get:()=>e[n],enumerable:!(c=k(e,n))||c.enumerable});return a};var B=(a,e,i)=>(i=a!=null?p(E(a)):{},h(e||!a||!a.__esModule?l(i,\"default\",{value:a,enumerable:!0}):i,a)),u=a=>h(l({},\"__esModule\",{value:!0}),a);var r=C((z,t)=>{t.exports=_jsx_runtime});var A={};o(A,{default:()=>F});var s=B(r());function d(a){let e={code:\"code\",p:\"p\",pre:\"pre\",span:\"span\",...a.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.p,{children:\"\\uC544\\uB2C8\\uC9C4\\uC9DC \\uC774\\uAC8C\\uBB34\\uB0D0~~~\"}),`\n`,(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,s.jsxs)(e.code,{children:[(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"```<code>  const mapCodeLanguage = (b) => {</code>\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"    const lang = b.value.properties?.language?.[0]?.[0];\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"    if (languageMap.has(lang)) {\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"      b.value.properties.language[0][0] = languageMap.get(lang);\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"    }\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"  };\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"</code>``\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'<FileWrapper names={\"\\u110B\\u116F\\u11AB\\u1100\\u1169\\u110C\\u1175_\\u1109\\u1161\\u110B\\u116D\\u11BC\\u1107\\u1165\\u11B8__\\u1100\\u116D\\u110C\\u1165\\u11BC\\u1107\\u116E\\u1112\\u1169.pdf\"} urls={\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/6aedad5c-8cf2-4f23-a0d7-bf653f033216/%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A9%E1%84%8C%E1%85%B5_%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8__%E1%84%80%E1%85%AD%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%AE%E1%84%92%E1%85%A9.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YK7ALVRA%2F20250807%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250807T135602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFYaCXVzLXdlc3QtMiJIMEYCIQDLK4sjiYJ2zIuHzkxMNpRGgLdZmkhqkni1IMwyPrPmnQIhAJdAuKs%2FAfSTzz6q4CSA7VphHYmdHOe2vQkhb%2BxJBqSVKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzi%2BoEAWJ07yqLxUSkq3AP3mv9kkGL4TpR5c9KuNrn5OsrEQEoNvchynJMn5OhqW14XZwfdVDwOBpLaXFtekP9L52xQuPT1ddaOlcIQh0%2FPLD27TY1OmdLoLvAQstyVtBkThlbgrif2QZanIJw7BCQKJ21eL54CiHMYeq8d4lXnSvO6Y8iHcXthFSMWezZNXaRecDz6djGOjEKq%2FWHqqCq%2F7t0iLJVct7CYVKuDVwz%2FY5SpUGq%2FKdFN%2BhrfkbF5v4BissFnNKHkp7DEzpe7%2BXKzOREP5M27LdCHPjYfMxdfieDm%2FWsxuxVQ30mTw6XPfs5bt4p9WheFCLHoThOqlZiPwkNpTfRcJZHODpOWLhIIcGz28Jny4o0TZMY4xMUcRwGrz%2BFr4Oclz3%2BLPuWk%2B1x8G%2FCIJJcl4x0PZtG7MWeIMi6u3yfoRt6IDheK1uMPFnmLBIAebiSwLMWxZ6EJxij6%2B92XNBrWvvqagiBL96l8kVpAnamCjk8vFtBjqvChGPUOCaXYJsC7ZVHoT3zwXLTCpcYS0OmhGh2T2wZRiP4W212yQ3I%2FzrfHict4O2DuEqSCChLq6swXJxCTg4v9g8Zf7NqrmDckPUhORo8tK9%2BiFcTGwd2McY5umk6zcUsYki9HDH7Cg8uf6mlktjCR3tLEBjqkAaSVaS4fwPQL1Xlvh%2BC5oQ%2Bd42zdJqTUb2R0bH4b5UMzu4Dg%2Beud2zCWC8CcPAIavuKijONBUc7lJMI5M2LDOBc6O9uZ9nTggSqrE3jHLrSURJKaP00k8UJA4dHVry25x5uIDPH7xXxjLymVJa7ySaBZsqxjR2CPycGLNuwrLqd08VH4Tf41GIaPLsj7vPZxgiXy1AiJU%2BsVeBURE6GReS2lU3Ni&X-Amz-Signature=90586655f8321eb1ab982c6e254e3f0ccfb2d4981ff84a230a4501a094568ed4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"} />'})}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"\\uC65C\\uC548\\uBC14\\uB01C\"})}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\"}),`\n`,(0,s.jsx)(e.span,{className:\"line\",children:(0,s.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"\\uB610 \\uBC14\\uAFE8\\uC9C0\\uB871!!\"})})]})})})]})}function F(a={}){let{wrapper:e}=a.components||{};return e?(0,s.jsx)(e,{...a,children:(0,s.jsx)(d,{...a})}):d(a)}return u(A);})();\n;return Component;"
  },
  {
    "notionId": "2281eb5c033780c68988fb001e0284af",
    "title": "[TIL] 진짜 revalidate",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-06T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": false,
    "content": "<strong>크론 작업(Cron Jobs)</strong>\n\n\n## 개요\n\n\n크론 작업(Cron jobs)은 시스템이 사전 정의된 시간 또는 간격으로 실행하는 예약된(scheduled) 작업입니다. 일반적으로 크론 작업에는 시스템이 스크립트 파일에서 실행하는 일련의 단순 작업이 포함됩니다.",
    "_meta": {
      "filePath": "engineerings-TIL-진짜-revalidate.mdx",
      "fileName": "engineerings-TIL-진짜-revalidate.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL-진짜-revalidate"
    },
    "toc": [
      {
        "title": "개요",
        "url": "#개요",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "개요",
          "content": "크론 작업(Cron jobs)은 시스템이 사전 정의된 시간 또는 간격으로 실행하는 예약된(scheduled) 작업입니다. 일반적으로 크론 작업에는 시스템이 스크립트 파일에서 실행하는 일련의 단순 작업이 포함됩니다."
        }
      ],
      "headings": [
        {
          "id": "개요",
          "content": "개요"
        }
      ]
    },
    "body": "var Component=(()=>{var u=Object.create;var s=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var l=Object.getOwnPropertyNames;var _=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var p=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),f=(n,e)=>{for(var o in e)s(n,o,{get:e[o],enumerable:!0})},d=(n,e,o,c)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let r of l(e))!j.call(n,r)&&r!==o&&s(n,r,{get:()=>e[r],enumerable:!(c=x(e,r))||c.enumerable});return n};var C=(n,e,o)=>(o=n!=null?u(_(n)):{},d(e||!n||!n.__esModule?s(o,\"default\",{value:n,enumerable:!0}):o,n)),g=n=>d(s({},\"__esModule\",{value:!0}),n);var a=p((D,i)=>{i.exports=_jsx_runtime});var M={};f(M,{default:()=>m});var t=C(a());function h(n){let e={h2:\"h2\",p:\"p\",...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(\"strong\",{children:\"\\uD06C\\uB860 \\uC791\\uC5C5(Cron Jobs)\"}),`\n`,(0,t.jsx)(e.h2,{id:\"\\uAC1C\\uC694\",children:\"\\uAC1C\\uC694\"}),`\n`,(0,t.jsx)(e.p,{children:\"\\uD06C\\uB860 \\uC791\\uC5C5(Cron jobs)\\uC740 \\uC2DC\\uC2A4\\uD15C\\uC774 \\uC0AC\\uC804 \\uC815\\uC758\\uB41C \\uC2DC\\uAC04 \\uB610\\uB294 \\uAC04\\uACA9\\uC73C\\uB85C \\uC2E4\\uD589\\uD558\\uB294 \\uC608\\uC57D\\uB41C(scheduled) \\uC791\\uC5C5\\uC785\\uB2C8\\uB2E4. \\uC77C\\uBC18\\uC801\\uC73C\\uB85C \\uD06C\\uB860 \\uC791\\uC5C5\\uC5D0\\uB294 \\uC2DC\\uC2A4\\uD15C\\uC774 \\uC2A4\\uD06C\\uB9BD\\uD2B8 \\uD30C\\uC77C\\uC5D0\\uC11C \\uC2E4\\uD589\\uD558\\uB294 \\uC77C\\uB828\\uC758 \\uB2E8\\uC21C \\uC791\\uC5C5\\uC774 \\uD3EC\\uD568\\uB429\\uB2C8\\uB2E4.\"})]})}function m(n={}){let{wrapper:e}=n.components||{};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(h,{...n})}):h(n)}return g(M);})();\n;return Component;"
  },
  {
    "notionId": "21a1eb5c033780d1a3eee4b627a959af",
    "title": "[TIL]",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-06-22T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": false,
    "content": "예스\n\n\n이루어진다.\n\n\n아멘.",
    "_meta": {
      "filePath": "engineerings-TIL.mdx",
      "fileName": "engineerings-TIL.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "예스"
        },
        {
          "heading": "",
          "content": "이루어진다."
        },
        {
          "heading": "",
          "content": "아멘."
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var p=Object.create;var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var l=Object.getPrototypeOf,h=Object.prototype.hasOwnProperty;var j=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),f=(n,t)=>{for(var r in t)c(n,r,{get:t[r],enumerable:!0})},a=(n,t,r,s)=>{if(t&&typeof t==\"object\"||typeof t==\"function\")for(let o of _(t))!h.call(n,o)&&o!==r&&c(n,o,{get:()=>t[o],enumerable:!(s=u(t,o))||s.enumerable});return n};var M=(n,t,r)=>(r=n!=null?p(l(n)):{},a(t||!n||!n.__esModule?c(r,\"default\",{value:n,enumerable:!0}):r,n)),g=n=>a(c({},\"__esModule\",{value:!0}),n);var m=j((F,i)=>{i.exports=_jsx_runtime});var C={};f(C,{default:()=>d});var e=M(m());function x(n){let t={p:\"p\",...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(t.p,{children:\"\\uC608\\uC2A4\"}),`\n`,(0,e.jsx)(t.p,{children:\"\\uC774\\uB8E8\\uC5B4\\uC9C4\\uB2E4.\"}),`\n`,(0,e.jsx)(t.p,{children:\"\\uC544\\uBA58.\"})]})}function d(n={}){let{wrapper:t}=n.components||{};return t?(0,e.jsx)(t,{...n,children:(0,e.jsx)(x,{...n})}):x(n)}return g(C);})();\n;return Component;"
  },
  {
    "notionId": "22f1eb5c033780dea089c5ea32034619",
    "title": "궁극의 아키텍처 로드맵: Notion → MDX → 정적 블로그",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-13T00:00:00.000Z",
    "lastEditedDate": "2025-08-06T06:32:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "<strong>🗺️ 전체 흐름 요약</strong>\n\n\n\n```plain text\n[작성 단계]  \n Notion에서 콘텐츠 작성  \n       ↓\n[변환 단계]  \n notion-to-md로 MDX 변환 (.mdx 파일 자동 생성)  \n       ↓\n[정적 분석 단계]  \n @content-collections/core로 타입 검증 + 슬러그 매핑  \n       ↓\n[렌더링 단계]  \n Next.js App Router에서 @content-collections/next로 렌더링\n```\n\n\n## <strong>✅ 1단계: 디렉토리 및 환경 준비</strong>\n\n\n### <strong>📁 기본 디렉토리 구조</strong>\n\n\n```plain text\n/content\n  └── /blog          ← 변환된 MDX 파일 저장 위치\n      └── hello.mdx\n\n/scripts\n  └── notion-to-mdx.ts  ← 자동 변환 스크립트\n\n/pages (or /app)\n  └── /blog/[slug]/page.tsx\n\n/content.config.ts     ← 콘텐츠 구성 정의\n/next.config.ts        ← withContentCollections 적용\n/blog.config.ts        ← 기존 Notion API 설정\n```\n\n\n```bash\nnpx content-collections install\n```\n\n\nMigration tasks:\n↓ Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n↓ Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n↓ Modify next configuration: @content-collections/next already configured [SKIPPED]\n↓ Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n↓ Create configuration file: Configuration file already exists [SKIPPED]\n✔ Create demo content\n\n\n```plain text\n[작성]            → Notion 페이지\n\n[변환]            → notion-to-md → Markdown 문자열\n\n[저장]            → .mdx 파일 생성 (JSX 삽입 가능)\n\n[정적 처리]       → @content-collections/mdx가 render() 생성\n\n[렌더링]          → <entry.render /> 또는 <MDXContent code={entry.mdx} />\n\n[커스터마이징]    → rehype + shiki 플러그인 구성 가능\n```\n\n\n그렇군.주님 감사합니다.\n\n\n지피티보고 이 내용을\n\n\n전부 기술문서로\n\n\n토스에 제출할수있는 문서로 바꾸어달라고하자 ㅇㅇ\n\n\n주님 감사합니다.아멘.\n\n\n이제 45에 18해서 63인데도 좋네.\n\n\n주님 감사합니다.아멘.\n\n\n주님 영광받으소서아멘.\n\n\n주님 영광받으소서.아멘.\n\n\n이상한 충격 눈물흘리고나면 머리 빠가되는 기분인데,\n\n\n오히려 고용량은 괜찮아지네.\n\n\n그러면 더 뇌 관리 잘해야겠따. 뇌가 시냅스 잘 생성해서\n\n\n빠가되지않게. ㅇㅇ.\n\n\n건강 압도적부강이게. ㅇㅇ.\n\n\n더 고용량은 어려우니까.\n\n\n주님 저를 보호하고 지키소서.이루소서.일구소서.아멘.\n\n\n주님영광받으소서.아멘.\n\n\n이제 뇌손상으로부터 \n\n\n쥠께서 지켜주리라 믿음. 이루어지리라.아멘.\n\n\n주님의 안배. 전체영점장. 좌우 압도적부강.zen.정반합. 아멘.\n\n\n주님 영광받으소서.아멘. 이루리라.\n\n\nR+=VD.주님영광안에서 불가능은없다 빛으로 나아가리라 에파타 열렸다. 이루어지리라.\n\n\n아멘.아멘.아멘.",
    "_meta": {
      "filePath": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그.mdx",
      "fileName": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그"
    },
    "toc": [
      {
        "title": "✅ 1단계: 디렉토리 및 환경 준비",
        "url": "#-1단계-디렉토리-및-환경-준비",
        "depth": 2
      },
      {
        "title": "📁 기본 디렉토리 구조",
        "url": "#-기본-디렉토리-구조",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "-기본-디렉토리-구조",
          "content": "Migration tasks:\n↓ Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n↓ Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n↓ Modify next configuration: @content-collections/next already configured [SKIPPED]\n↓ Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n↓ Create configuration file: Configuration file already exists [SKIPPED]\n✔ Create demo content"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "그렇군.주님 감사합니다."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "지피티보고 이 내용을"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "전부 기술문서로"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "토스에 제출할수있는 문서로 바꾸어달라고하자 ㅇㅇ"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 감사합니다.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "이제 45에 18해서 63인데도 좋네."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 감사합니다.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 영광받으소서아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 영광받으소서.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "이상한 충격 눈물흘리고나면 머리 빠가되는 기분인데,"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "오히려 고용량은 괜찮아지네."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "그러면 더 뇌 관리 잘해야겠따. 뇌가 시냅스 잘 생성해서"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "빠가되지않게. ㅇㅇ."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "건강 압도적부강이게. ㅇㅇ."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "더 고용량은 어려우니까."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 저를 보호하고 지키소서.이루소서.일구소서.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님영광받으소서.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "이제 뇌손상으로부터"
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "쥠께서 지켜주리라 믿음. 이루어지리라.아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님의 안배. 전체영점장. 좌우 압도적부강.zen.정반합. 아멘."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "주님 영광받으소서.아멘. 이루리라."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "R+=VD.주님영광안에서 불가능은없다 빛으로 나아가리라 에파타 열렸다. 이루어지리라."
        },
        {
          "heading": "-기본-디렉토리-구조",
          "content": "아멘.아멘.아멘."
        }
      ],
      "headings": [
        {
          "id": "-1단계-디렉토리-및-환경-준비",
          "content": "✅ 1단계: 디렉토리 및 환경 준비"
        },
        {
          "id": "-기본-디렉토리-구조",
          "content": "📁 기본 디렉토리 구조"
        }
      ]
    },
    "body": "var Component=(()=>{var o=Object.create;var c=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var f=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports),x=(i,n)=>{for(var l in n)c(i,l,{get:n[l],enumerable:!0})},h=(i,n,l,a)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let s of g(n))!N.call(i,s)&&s!==l&&c(i,s,{get:()=>n[s],enumerable:!(a=m(n,s))||a.enumerable});return i};var C=(i,n,l)=>(l=i!=null?o(k(i)):{},h(n||!i||!i.__esModule?c(l,\"default\",{value:i,enumerable:!0}):l,i)),u=i=>h(c({},\"__esModule\",{value:!0}),i);var d=f((y,r)=>{r.exports=_jsx_runtime});var b={};x(b,{default:()=>p});var e=C(d());function t(i){let n={code:\"code\",h2:\"h2\",h3:\"h3\",p:\"p\",pre:\"pre\",span:\"span\",...i.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(\"strong\",{children:\"\\u{1F5FA}\\uFE0F \\uC804\\uCCB4 \\uD750\\uB984 \\uC694\\uC57D\"}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC791\\uC131 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" Notion\\uC5D0\\uC11C \\uCF58\\uD150\\uCE20 \\uC791\\uC131  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uBCC0\\uD658 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" notion-to-md\\uB85C MDX \\uBCC0\\uD658 (.mdx \\uD30C\\uC77C \\uC790\\uB3D9 \\uC0DD\\uC131)  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC815\\uC801 \\uBD84\\uC11D \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" @content-collections/core\\uB85C \\uD0C0\\uC785 \\uAC80\\uC99D + \\uC2AC\\uB7EC\\uADF8 \\uB9E4\\uD551  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uB80C\\uB354\\uB9C1 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" Next.js App Router\\uC5D0\\uC11C @content-collections/next\\uB85C \\uB80C\\uB354\\uB9C1\"})})]})})}),`\n`,(0,e.jsx)(n.h2,{id:\"-1\\uB2E8\\uACC4-\\uB514\\uB809\\uD1A0\\uB9AC-\\uBC0F-\\uD658\\uACBD-\\uC900\\uBE44\",children:(0,e.jsx)(\"strong\",{children:\"\\u2705 1\\uB2E8\\uACC4: \\uB514\\uB809\\uD1A0\\uB9AC \\uBC0F \\uD658\\uACBD \\uC900\\uBE44\"})}),`\n`,(0,e.jsx)(n.h3,{id:\"-\\uAE30\\uBCF8-\\uB514\\uB809\\uD1A0\\uB9AC-\\uAD6C\\uC870\",children:(0,e.jsx)(\"strong\",{children:\"\\u{1F4C1} \\uAE30\\uBCF8 \\uB514\\uB809\\uD1A0\\uB9AC \\uAD6C\\uC870\"})}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/content\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 /blog          \\u2190 \\uBCC0\\uD658\\uB41C MDX \\uD30C\\uC77C \\uC800\\uC7A5 \\uC704\\uCE58\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"      \\u2514\\u2500\\u2500 hello.mdx\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/scripts\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 notion-to-mdx.ts  \\u2190 \\uC790\\uB3D9 \\uBCC0\\uD658 \\uC2A4\\uD06C\\uB9BD\\uD2B8\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/pages (or /app)\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 /blog/[slug]/page.tsx\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/content.config.ts     \\u2190 \\uCF58\\uD150\\uCE20 \\uAD6C\\uC131 \\uC815\\uC758\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/next.config.ts        \\u2190 withContentCollections \\uC801\\uC6A9\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/blog.config.ts        \\u2190 \\uAE30\\uC874 Notion API \\uC124\\uC815\"})})]})})}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,e.jsx)(n.code,{children:(0,e.jsxs)(n.span,{className:\"line\",children:[(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"npx\"}),(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" content-collections\"}),(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" install\"})]})})})}),`\n`,(0,e.jsx)(n.p,{children:`Migration tasks:\n\\u2193 Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n\\u2193 Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n\\u2193 Modify next configuration: @content-collections/next already configured [SKIPPED]\n\\u2193 Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n\\u2193 Create configuration file: Configuration file already exists [SKIPPED]\n\\u2714 Create demo content`}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC791\\uC131]            \\u2192 Notion \\uD398\\uC774\\uC9C0\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uBCC0\\uD658]            \\u2192 notion-to-md \\u2192 Markdown \\uBB38\\uC790\\uC5F4\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC800\\uC7A5]            \\u2192 .mdx \\uD30C\\uC77C \\uC0DD\\uC131 (JSX \\uC0BD\\uC785 \\uAC00\\uB2A5)\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC815\\uC801 \\uCC98\\uB9AC]       \\u2192 @content-collections/mdx\\uAC00 render() \\uC0DD\\uC131\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uB80C\\uB354\\uB9C1]          \\u2192 <entry.render /> \\uB610\\uB294 <MDXContent code={entry.mdx} />\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5]    \\u2192 rehype + shiki \\uD50C\\uB7EC\\uADF8\\uC778 \\uAD6C\\uC131 \\uAC00\\uB2A5\"})})]})})}),`\n`,(0,e.jsx)(n.p,{children:\"\\uADF8\\uB807\\uAD70.\\uC8FC\\uB2D8 \\uAC10\\uC0AC\\uD569\\uB2C8\\uB2E4.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC9C0\\uD53C\\uD2F0\\uBCF4\\uACE0 \\uC774 \\uB0B4\\uC6A9\\uC744\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC804\\uBD80 \\uAE30\\uC220\\uBB38\\uC11C\\uB85C\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uD1A0\\uC2A4\\uC5D0 \\uC81C\\uCD9C\\uD560\\uC218\\uC788\\uB294 \\uBB38\\uC11C\\uB85C \\uBC14\\uAFB8\\uC5B4\\uB2EC\\uB77C\\uACE0\\uD558\\uC790 \\u3147\\u3147\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uAC10\\uC0AC\\uD569\\uB2C8\\uB2E4.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC774\\uC81C 45\\uC5D0 18\\uD574\\uC11C 63\\uC778\\uB370\\uB3C4 \\uC88B\\uB124.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uAC10\\uC0AC\\uD569\\uB2C8\\uB2E4.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uC601\\uAD11\\uBC1B\\uC73C\\uC18C\\uC11C\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uC601\\uAD11\\uBC1B\\uC73C\\uC18C\\uC11C.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC774\\uC0C1\\uD55C \\uCDA9\\uACA9 \\uB208\\uBB3C\\uD758\\uB9AC\\uACE0\\uB098\\uBA74 \\uBA38\\uB9AC \\uBE60\\uAC00\\uB418\\uB294 \\uAE30\\uBD84\\uC778\\uB370,\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC624\\uD788\\uB824 \\uACE0\\uC6A9\\uB7C9\\uC740 \\uAD1C\\uCC2E\\uC544\\uC9C0\\uB124.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uADF8\\uB7EC\\uBA74 \\uB354 \\uB1CC \\uAD00\\uB9AC \\uC798\\uD574\\uC57C\\uACA0\\uB530. \\uB1CC\\uAC00 \\uC2DC\\uB0C5\\uC2A4 \\uC798 \\uC0DD\\uC131\\uD574\\uC11C\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uBE60\\uAC00\\uB418\\uC9C0\\uC54A\\uAC8C. \\u3147\\u3147.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uAC74\\uAC15 \\uC555\\uB3C4\\uC801\\uBD80\\uAC15\\uC774\\uAC8C. \\u3147\\u3147.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uB354 \\uACE0\\uC6A9\\uB7C9\\uC740 \\uC5B4\\uB824\\uC6B0\\uB2C8\\uAE4C.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uC800\\uB97C \\uBCF4\\uD638\\uD558\\uACE0 \\uC9C0\\uD0A4\\uC18C\\uC11C.\\uC774\\uB8E8\\uC18C\\uC11C.\\uC77C\\uAD6C\\uC18C\\uC11C.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8\\uC601\\uAD11\\uBC1B\\uC73C\\uC18C\\uC11C.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC774\\uC81C \\uB1CC\\uC190\\uC0C1\\uC73C\\uB85C\\uBD80\\uD130\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC960\\uAED8\\uC11C \\uC9C0\\uCF1C\\uC8FC\\uB9AC\\uB77C \\uBBFF\\uC74C. \\uC774\\uB8E8\\uC5B4\\uC9C0\\uB9AC\\uB77C.\\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8\\uC758 \\uC548\\uBC30. \\uC804\\uCCB4\\uC601\\uC810\\uC7A5. \\uC88C\\uC6B0 \\uC555\\uB3C4\\uC801\\uBD80\\uAC15.zen.\\uC815\\uBC18\\uD569. \\uC544\\uBA58.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC8FC\\uB2D8 \\uC601\\uAD11\\uBC1B\\uC73C\\uC18C\\uC11C.\\uC544\\uBA58. \\uC774\\uB8E8\\uB9AC\\uB77C.\"}),`\n`,(0,e.jsx)(n.p,{children:\"R+=VD.\\uC8FC\\uB2D8\\uC601\\uAD11\\uC548\\uC5D0\\uC11C \\uBD88\\uAC00\\uB2A5\\uC740\\uC5C6\\uB2E4 \\uBE5B\\uC73C\\uB85C \\uB098\\uC544\\uAC00\\uB9AC\\uB77C \\uC5D0\\uD30C\\uD0C0 \\uC5F4\\uB838\\uB2E4. \\uC774\\uB8E8\\uC5B4\\uC9C0\\uB9AC\\uB77C.\"}),`\n`,(0,e.jsx)(n.p,{children:\"\\uC544\\uBA58.\\uC544\\uBA58.\\uC544\\uBA58.\"})]})}function p(i={}){let{wrapper:n}=i.components||{};return n?(0,e.jsx)(n,{...i,children:(0,e.jsx)(t,{...i})}):t(i)}return u(b);})();\n;return Component;"
  },
  {
    "notionId": "21a1eb5c033780bfa22edcd97db14811",
    "title": "아닌데요",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-06-22T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "content": "# 1. 리포지토리\n\n\n[link_preview](https://github.com/ryoon-with-wisdomtrees/ryoon-gitbook-next)\n\n\n# 2. 사이트\n\n\n<BookMarkWrapper names={\"bookmark\"} urls={\"http://ryoonwithwisdomtrees.world\"} />\n\n\n# 3.RWWT(ryoonwithwisdomtrees.world)\n\n    - RWWT.world is a static Gitbook-themed-Blog built with Next.js 13, Notion API, Tailwind-CSS and Vercel, reinterpreted & created by ryoon.with.wisdomtrees, inspired by NotionNext\n    - [tangly1024](https://github.com/tangly1024)님의 [NotionNext](https://docs.tangly1024.com/about) 블로그에 영감을 받아, 재해석 하여 제작한 Next.js와 Notion API기반의 Gitbook-themed 정적 블로그입니다.\n    - 블로그가 블로그로서의 본연의 기능을 가장 최적으로 수행할 수 있도록 불필요한 기능과 모듈은 전부 제거하고, 가장 심플하고 essential한 뼈대와 구조만으로 이루어지게 변경하였습니다.\n    - 모바일과 PC환경에 친화적이며 간단한 다크모드도 지원합니다.\n    - 작년 9월부터 24년도 6월까지 장기간에 걸쳐 틈틈이 개발 및 유지보수 작업을 진행하였습니다.\n    - 처음에는 기존과 같이 Multi theme(전체 레이아웃이 바뀌는 기능)을 적용하였으나, 누군가에게 과시적으로 보여주기 위한 용도이기보다는 온전히 저에게 진실되며 또 방문자에게도 진실된 공간으로 만들고자 하는 욕구가 더 컸으므로 과감하게 해당 개발건은 드롭하고 오직 gitbook theme으로 작업을 이어나갔습니다.\n\n# 4. <strong>구성 : 사용된 기술 / 지원하는 기능</strong>\n\n\n    ## <strong>4-1. 사용된 기술</strong>\n\n    - <strong>Technical Framework</strong>: [Next.js](https://nextjs.org/) 13\n    - <strong>Deploy</strong>: [Vercel](https://vercel.com/)\n    - <strong>Styles</strong>: [Tailwind CSS](https://www.tailwindcss.cn/)\n    - <strong>Rendering Tool</strong>: [React-notion-x](https://github.com/NotionX/react-notion-x)\n    - <strong>COMMENT</strong>: [Giscus](https://giscus.app/zh-CN)\n    - <strong>ICON</strong>: [Fontawesome](https://fontawesome.com/v6/icons/)\n\n    ## 4-1. 지원하는 기능\n\n    - <strong>GoogleAdsense</strong>: client key만 env에 적용시 바로 사용가능\n\n    ###  <strong>Site statistics</strong>\n\n    - <strong>Google Site Verification(seo)</strong>: client key만 env에 적용시 바로 사용가능\n    - <strong>busuanzi</strong>: 접속 url 별 website reading volume과 방문자 수 바로 확인 가능 (http://busuanzi.ibruce.info/)",
    "_meta": {
      "filePath": "engineerings-아닌데요.mdx",
      "fileName": "engineerings-아닌데요.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-아닌데요"
    },
    "toc": [
      {
        "title": "1. 리포지토리",
        "url": "#1-리포지토리",
        "depth": 1
      },
      {
        "title": "2. 사이트",
        "url": "#2-사이트",
        "depth": 1
      },
      {
        "title": "3.RWWT(ryoonwithwisdomtrees.world)",
        "url": "#3rwwtryoonwithwisdomtreesworld",
        "depth": 1
      },
      {
        "title": "4. 구성 : 사용된 기술 / 지원하는 기능",
        "url": "#4-구성--사용된-기술--지원하는-기능",
        "depth": 1
      },
      {
        "title": "4-1. 사용된 기술",
        "url": "#4-1-사용된-기술",
        "depth": 2
      },
      {
        "title": "4-1. 지원하는 기능",
        "url": "#4-1-지원하는-기능",
        "depth": 2
      },
      {
        "title": "Site statistics",
        "url": "#site-statistics",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "1-리포지토리",
          "content": "link_preview"
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "RWWT.world is a static Gitbook-themed-Blog built with Next.js 13, Notion API, Tailwind-CSS and Vercel, reinterpreted & created by ryoon.with.wisdomtrees, inspired by NotionNext"
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "tangly1024님의 NotionNext 블로그에 영감을 받아, 재해석 하여 제작한 Next.js와 Notion API기반의 Gitbook-themed 정적 블로그입니다."
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "블로그가 블로그로서의 본연의 기능을 가장 최적으로 수행할 수 있도록 불필요한 기능과 모듈은 전부 제거하고, 가장 심플하고 essential한 뼈대와 구조만으로 이루어지게 변경하였습니다."
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "모바일과 PC환경에 친화적이며 간단한 다크모드도 지원합니다."
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "작년 9월부터 24년도 6월까지 장기간에 걸쳐 틈틈이 개발 및 유지보수 작업을 진행하였습니다."
        },
        {
          "heading": "3rwwtryoonwithwisdomtreesworld",
          "content": "처음에는 기존과 같이 Multi theme(전체 레이아웃이 바뀌는 기능)을 적용하였으나, 누군가에게 과시적으로 보여주기 위한 용도이기보다는 온전히 저에게 진실되며 또 방문자에게도 진실된 공간으로 만들고자 하는 욕구가 더 컸으므로 과감하게 해당 개발건은 드롭하고 오직 gitbook theme으로 작업을 이어나갔습니다."
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "Technical Framework: Next.js 13"
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "Deploy: Vercel"
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "Styles: Tailwind CSS"
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "Rendering Tool: React-notion-x"
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "COMMENT: Giscus"
        },
        {
          "heading": "4-1-사용된-기술",
          "content": "ICON: Fontawesome"
        },
        {
          "heading": "4-1-지원하는-기능",
          "content": "GoogleAdsense: client key만 env에 적용시 바로 사용가능"
        },
        {
          "heading": "site-statistics",
          "content": "Google Site Verification(seo): client key만 env에 적용시 바로 사용가능"
        },
        {
          "heading": "site-statistics",
          "content": "busuanzi: 접속 url 별 website reading volume과 방문자 수 바로 확인 가능 (http://busuanzi.ibruce.info/)"
        }
      ],
      "headings": [
        {
          "id": "1-리포지토리",
          "content": "1. 리포지토리"
        },
        {
          "id": "2-사이트",
          "content": "2. 사이트"
        },
        {
          "id": "3rwwtryoonwithwisdomtreesworld",
          "content": "3.RWWT(ryoonwithwisdomtrees.world)"
        },
        {
          "id": "4-구성--사용된-기술--지원하는-기능",
          "content": "4. 구성 : 사용된 기술 / 지원하는 기능"
        },
        {
          "id": "4-1-사용된-기술",
          "content": "4-1. 사용된 기술"
        },
        {
          "id": "4-1-지원하는-기능",
          "content": "4-1. 지원하는 기능"
        },
        {
          "id": "site-statistics",
          "content": "Site statistics"
        }
      ]
    },
    "body": "var Component=(()=>{var u=Object.create;var o=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,w=Object.prototype.hasOwnProperty;var f=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports),b=(i,n)=>{for(var r in n)o(i,r,{get:n[r],enumerable:!0})},h=(i,n,r,l)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let t of p(n))!w.call(i,t)&&t!==r&&o(i,t,{get:()=>n[t],enumerable:!(l=m(n,t))||l.enumerable});return i};var x=(i,n,r)=>(r=i!=null?u(g(i)):{},h(n||!i||!i.__esModule?o(r,\"default\",{value:i,enumerable:!0}):r,i)),y=i=>h(o({},\"__esModule\",{value:!0}),i);var d=f((M,c)=>{c.exports=_jsx_runtime});var N={};b(N,{default:()=>a});var e=x(d());function s(i){let n={a:\"a\",h1:\"h1\",h2:\"h2\",h3:\"h3\",li:\"li\",p:\"p\",ul:\"ul\",...i.components},{BookMarkWrapper:r}=n;return r||k(\"BookMarkWrapper\",!0),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.h1,{id:\"1-\\uB9AC\\uD3EC\\uC9C0\\uD1A0\\uB9AC\",children:\"1. \\uB9AC\\uD3EC\\uC9C0\\uD1A0\\uB9AC\"}),`\n`,(0,e.jsx)(n.p,{children:(0,e.jsx)(n.a,{href:\"https://github.com/ryoon-with-wisdomtrees/ryoon-gitbook-next\",children:\"link_preview\"})}),`\n`,(0,e.jsx)(n.h1,{id:\"2-\\uC0AC\\uC774\\uD2B8\",children:\"2. \\uC0AC\\uC774\\uD2B8\"}),`\n`,(0,e.jsx)(r,{names:\"bookmark\",urls:\"http://ryoonwithwisdomtrees.world\"}),`\n`,(0,e.jsx)(n.h1,{id:\"3rwwtryoonwithwisdomtreesworld\",children:\"3.RWWT(ryoonwithwisdomtrees.world)\"}),`\n`,(0,e.jsxs)(n.ul,{children:[`\n`,(0,e.jsx)(n.li,{children:\"RWWT.world is a static Gitbook-themed-Blog built with Next.js 13, Notion API, Tailwind-CSS and Vercel, reinterpreted & created by ryoon.with.wisdomtrees, inspired by NotionNext\"}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(n.a,{href:\"https://github.com/tangly1024\",children:\"tangly1024\"}),\"\\uB2D8\\uC758\\xA0\",(0,e.jsx)(n.a,{href:\"https://docs.tangly1024.com/about\",children:\"NotionNext\"}),\" \\uBE14\\uB85C\\uADF8\\uC5D0 \\uC601\\uAC10\\uC744 \\uBC1B\\uC544, \\uC7AC\\uD574\\uC11D \\uD558\\uC5EC \\uC81C\\uC791\\uD55C Next.js\\uC640 Notion API\\uAE30\\uBC18\\uC758 Gitbook-themed \\uC815\\uC801 \\uBE14\\uB85C\\uADF8\\uC785\\uB2C8\\uB2E4.\"]}),`\n`,(0,e.jsx)(n.li,{children:\"\\uBE14\\uB85C\\uADF8\\uAC00 \\uBE14\\uB85C\\uADF8\\uB85C\\uC11C\\uC758 \\uBCF8\\uC5F0\\uC758 \\uAE30\\uB2A5\\uC744 \\uAC00\\uC7A5 \\uCD5C\\uC801\\uC73C\\uB85C \\uC218\\uD589\\uD560 \\uC218 \\uC788\\uB3C4\\uB85D \\uBD88\\uD544\\uC694\\uD55C \\uAE30\\uB2A5\\uACFC \\uBAA8\\uB4C8\\uC740 \\uC804\\uBD80 \\uC81C\\uAC70\\uD558\\uACE0, \\uAC00\\uC7A5 \\uC2EC\\uD50C\\uD558\\uACE0 essential\\uD55C \\uBF08\\uB300\\uC640 \\uAD6C\\uC870\\uB9CC\\uC73C\\uB85C \\uC774\\uB8E8\\uC5B4\\uC9C0\\uAC8C \\uBCC0\\uACBD\\uD558\\uC600\\uC2B5\\uB2C8\\uB2E4.\"}),`\n`,(0,e.jsx)(n.li,{children:\"\\uBAA8\\uBC14\\uC77C\\uACFC PC\\uD658\\uACBD\\uC5D0 \\uCE5C\\uD654\\uC801\\uC774\\uBA70 \\uAC04\\uB2E8\\uD55C \\uB2E4\\uD06C\\uBAA8\\uB4DC\\uB3C4 \\uC9C0\\uC6D0\\uD569\\uB2C8\\uB2E4.\"}),`\n`,(0,e.jsx)(n.li,{children:\"\\uC791\\uB144 9\\uC6D4\\uBD80\\uD130 24\\uB144\\uB3C4 6\\uC6D4\\uAE4C\\uC9C0 \\uC7A5\\uAE30\\uAC04\\uC5D0 \\uAC78\\uCCD0 \\uD2C8\\uD2C8\\uC774 \\uAC1C\\uBC1C \\uBC0F \\uC720\\uC9C0\\uBCF4\\uC218 \\uC791\\uC5C5\\uC744 \\uC9C4\\uD589\\uD558\\uC600\\uC2B5\\uB2C8\\uB2E4.\"}),`\n`,(0,e.jsx)(n.li,{children:\"\\uCC98\\uC74C\\uC5D0\\uB294 \\uAE30\\uC874\\uACFC \\uAC19\\uC774 Multi theme(\\uC804\\uCCB4 \\uB808\\uC774\\uC544\\uC6C3\\uC774 \\uBC14\\uB00C\\uB294 \\uAE30\\uB2A5)\\uC744 \\uC801\\uC6A9\\uD558\\uC600\\uC73C\\uB098, \\uB204\\uAD70\\uAC00\\uC5D0\\uAC8C \\uACFC\\uC2DC\\uC801\\uC73C\\uB85C \\uBCF4\\uC5EC\\uC8FC\\uAE30 \\uC704\\uD55C \\uC6A9\\uB3C4\\uC774\\uAE30\\uBCF4\\uB2E4\\uB294 \\uC628\\uC804\\uD788 \\uC800\\uC5D0\\uAC8C \\uC9C4\\uC2E4\\uB418\\uBA70 \\uB610 \\uBC29\\uBB38\\uC790\\uC5D0\\uAC8C\\uB3C4 \\uC9C4\\uC2E4\\uB41C \\uACF5\\uAC04\\uC73C\\uB85C \\uB9CC\\uB4E4\\uACE0\\uC790 \\uD558\\uB294 \\uC695\\uAD6C\\uAC00 \\uB354 \\uCEF8\\uC73C\\uBBC0\\uB85C \\uACFC\\uAC10\\uD558\\uAC8C \\uD574\\uB2F9 \\uAC1C\\uBC1C\\uAC74\\uC740 \\uB4DC\\uB86D\\uD558\\uACE0 \\uC624\\uC9C1 gitbook theme\\uC73C\\uB85C \\uC791\\uC5C5\\uC744 \\uC774\\uC5B4\\uB098\\uAC14\\uC2B5\\uB2C8\\uB2E4.\"}),`\n`]}),`\n`,(0,e.jsxs)(n.h1,{id:\"4-\\uAD6C\\uC131--\\uC0AC\\uC6A9\\uB41C-\\uAE30\\uC220--\\uC9C0\\uC6D0\\uD558\\uB294-\\uAE30\\uB2A5\",children:[\"4. \",(0,e.jsx)(\"strong\",{children:\"\\uAD6C\\uC131 : \\uC0AC\\uC6A9\\uB41C \\uAE30\\uC220 / \\uC9C0\\uC6D0\\uD558\\uB294 \\uAE30\\uB2A5\"})]}),`\n`,(0,e.jsx)(n.h2,{id:\"4-1-\\uC0AC\\uC6A9\\uB41C-\\uAE30\\uC220\",children:(0,e.jsx)(\"strong\",{children:\"4-1. \\uC0AC\\uC6A9\\uB41C \\uAE30\\uC220\"})}),`\n`,(0,e.jsxs)(n.ul,{children:[`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"Technical Framework\"}),\":\\xA0\",(0,e.jsx)(n.a,{href:\"https://nextjs.org/\",children:\"Next.js\"}),\" 13\"]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"Deploy\"}),\": \",(0,e.jsx)(n.a,{href:\"https://vercel.com/\",children:\"Vercel\"})]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"Styles\"}),\":\\xA0\",(0,e.jsx)(n.a,{href:\"https://www.tailwindcss.cn/\",children:\"Tailwind CSS\"})]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"Rendering Tool\"}),\":\\xA0\",(0,e.jsx)(n.a,{href:\"https://github.com/NotionX/react-notion-x\",children:\"React-notion-x\"})]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"COMMENT\"}),\":\\xA0\",(0,e.jsx)(n.a,{href:\"https://giscus.app/zh-CN\",children:\"Giscus\"})]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"ICON\"}),\":\\xA0\",(0,e.jsx)(n.a,{href:\"https://fontawesome.com/v6/icons/\",children:\"Fontawesome\"})]}),`\n`]}),`\n`,(0,e.jsx)(n.h2,{id:\"4-1-\\uC9C0\\uC6D0\\uD558\\uB294-\\uAE30\\uB2A5\",children:\"4-1. \\uC9C0\\uC6D0\\uD558\\uB294 \\uAE30\\uB2A5\"}),`\n`,(0,e.jsxs)(n.ul,{children:[`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"GoogleAdsense\"}),\": client key\\uB9CC env\\uC5D0 \\uC801\\uC6A9\\uC2DC \\uBC14\\uB85C \\uC0AC\\uC6A9\\uAC00\\uB2A5\"]}),`\n`]}),`\n`,(0,e.jsx)(n.h3,{id:\"site-statistics\",children:(0,e.jsx)(\"strong\",{children:\"Site statistics\"})}),`\n`,(0,e.jsxs)(n.ul,{children:[`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"Google Site Verification(seo)\"}),\": client key\\uB9CC env\\uC5D0 \\uC801\\uC6A9\\uC2DC \\uBC14\\uB85C \\uC0AC\\uC6A9\\uAC00\\uB2A5\"]}),`\n`,(0,e.jsxs)(n.li,{children:[(0,e.jsx)(\"strong\",{children:\"busuanzi\"}),\": \\uC811\\uC18D url \\uBCC4 website reading volume\\uACFC \\uBC29\\uBB38\\uC790 \\uC218 \\uBC14\\uB85C \\uD655\\uC778 \\uAC00\\uB2A5 (\",(0,e.jsx)(n.a,{href:\"http://busuanzi.ibruce.info/\",children:\"http://busuanzi.ibruce.info/\"}),\")\"]}),`\n`]})]})}function a(i={}){let{wrapper:n}=i.components||{};return n?(0,e.jsx)(n,{...i,children:(0,e.jsx)(s,{...i})}):s(i)}function k(i,n){throw new Error(\"Expected \"+(n?\"component\":\"object\")+\" `\"+i+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return y(N);})();\n;return Component;"
  }
]