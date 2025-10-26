# 개발 가이드

Norkive를 로컬에서 설정하고 개발하기 위한 완전한 가이드입니다.

## 목차

- [사전 요구사항](#사전-요구사항)
- [초기 설정](#초기-설정)
- [개발 워크플로우](#개발-워크플로우)
- [프로젝트 구조](#프로젝트-구조)
- [콘텐츠 추가하기](#콘텐츠-추가하기)
- [컴포넌트 만들기](#컴포넌트-만들기)
- [테스팅](#테스팅)
- [문제 해결](#문제-해결)

---

## 사전 요구사항

### 필수 소프트웨어

- **Node.js**: >= 20.17.0
- **패키지 매니저**: npm, pnpm, yarn 중 하나
- **Git**: 최신 버전

### 권장 도구

- **VS Code**: 확장 프로그램 설치
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - MDX
- **브라우저**: DevTools가 포함된 Chrome 또는 Firefox

### 선택적 서비스

- **Notion**: 콘텐츠 관리
- **Cloudinary**: 이미지 최적화
- **Upstash Redis**: 캐싱

---

## 초기 설정

### 1. 저장소 클론

```bash
git clone https://github.com/ryoonwithinwisdomlights/norkive.git
cd norkive
```

### 2. 의존성 설치

```bash
# npm 사용
npm install

# pnpm 사용 (더 빠른 설치 - 권장)
pnpm install

# yarn 사용
yarn install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```bash
cp .env.example .env.local
```

`.env.local` 편집:

```env
# 필수: 사이트 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_LANG=kr-KR

# 선택: Notion (Notion에서 변환하는 경우에만)
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# 선택: Cloudinary (이미지 최적화 사용하는 경우에만)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 선택: Redis (캐싱 사용하는 경우에만)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### 4. 개발 서버 시작

```bash
npm run dev
```

http://localhost:3000 방문

---

## 개발 워크플로우

### 일일 개발

```bash
# 1. 최신 변경사항 가져오기
git pull origin main

# 2. 새로운 의존성 설치
npm install

# 3. 개발 서버 시작
npm run dev

# 4. 변경사항 작성
# app/, modules/, lib/ 등의 파일 편집

# 5. 로컬에서 테스트
# http://localhost:3000 확인

# 6. 린트 및 포맷팅
npm run lint
npm run prettier:write

# 7. 변경사항 커밋
git add .
git commit -m "feat: your changes"
git push origin your-branch
```

### 핫 리로드

Next.js는 편집 시 자동으로 리로드합니다:
- **페이지 파일** (`app/**/*.tsx`) - 전체 리로드
- **컴포넌트** (`modules/**/*.tsx`) - 빠른 새로고침
- **유틸리티** (`lib/**/*.ts`) - 전체 리로드
- **스타일** (`*.css`) - 즉시 업데이트

### 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 번들 빌드
npm run build

# 프로덕션 서버 시작 (빌드 후)
npm start

# 코드 린트
npm run lint

# 코드 포맷팅
npm run prettier:write

# MDX 파일 검증
npm run validate:mdx

# 번들 크기 분석
npm run analyze
```

---

## 프로젝트 구조

### 디렉토리 개요

```
norkive/
├── app/                      # Next.js App Router
│   ├── (home)/              # 홈 페이지 그룹
│   │   ├── layout.tsx       # 홈 레이아웃
│   │   └── page.tsx         # 홈 페이지
│   ├── api/                 # API 라우트
│   │   ├── cache/           # 캐시 엔드포인트
│   │   ├── cron/            # 스케줄 작업
│   │   └── search/          # 검색 API
│   ├── book/                # 책 카테고리
│   ├── engineering/         # 엔지니어링 포스트
│   ├── project/             # 프로젝트
│   ├── records/             # 기록
│   ├── tag/                 # 태그 페이지
│   ├── category/            # 카테고리 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   ├── loading.tsx          # 로딩 UI
│   ├── error.tsx            # 에러 UI
│   └── not-found.tsx        # 404 페이지
│
├── config/                  # 설정 파일
│   ├── site.config.ts       # 사이트 메타데이터
│   ├── analytics.config.ts  # 분석
│   ├── font.config.ts       # 폰트 설정
│   └── ...
│
├── content/                 # MDX 콘텐츠
│   ├── books/              # 책 리뷰
│   ├── engineerings/       # 기술 포스트
│   ├── projects/           # 프로젝트 문서
│   ├── records/            # 개인 기록
│   └── submenupages/       # 소개, 연락처
│
├── lib/                     # 유틸리티 & 라이브러리
│   ├── cache/              # 캐싱 시스템 (Redis, Memory)
│   ├── context/            # React 컨텍스트
│   ├── hooks/              # 커스텀 훅
│   ├── stores/             # Zustand 스토어 (theme, UI, search, settings)
│   ├── plugins/            # 브라우저 플러그인 (busuanzi 분석)
│   ├── styles/             # 스타일 유틸리티
│   ├── utils/              # 헬퍼 함수
│   │   ├── mdx-data-processing/  # MDX 변환 파이프라인
│   │   │   ├── convert-unsafe-mdx/  # 링크 변환
│   │   │   ├── cloudinary/        # 이미지 처리
│   │   │   ├── data-manager.ts    # 콘텐츠 관리
│   │   │   └── mdx-validator.ts   # 검증
│   │   ├── image.ts        # 이미지 유틸리티
│   │   ├── records.ts      # 기록 처리
│   │   ├── notion-adaptor-utils.ts  # Notion 어댑터
│   │   ├── youtube.ts      # YouTube 유틸리티
│   │   └── ...
│   ├── cloudinary.ts       # Cloudinary 설정
│   ├── redis.ts            # Redis 설정
│   └── source.ts           # 콘텐츠 소스
│
├── modules/                 # UI 컴포넌트
│   ├── common/             # 공유 컴포넌트
│   │   ├── cards/          # 카드 컴포넌트 (ImageCard, GridCard)
│   │   ├── buttons/        # 버튼 컴포넌트
│   │   ├── tag/            # 태그 컴포넌트
│   │   └── ...
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── templates/      # 레이아웃 템플릿
│   │   └── navigation/     # 네비게이션 컴포넌트
│   ├── mdx/                # MDX 컴포넌트
│   │   ├── YoutubeWrapper.tsx      # YouTube 임베드
│   │   ├── FileWrapper.tsx         # 파일 다운로드
│   │   ├── GoogleDriveWrapper.tsx  # Google Drive
│   │   ├── EmbededWrapper.tsx      # 일반 임베드
│   │   ├── BookMarkWrapper.tsx     # 북마크
│   │   └── ...
│   ├── page/               # 페이지별 컴포넌트
│   │   ├── components/     # 메모이제이션된 리스트 컴포넌트
│   │   └── intropage/      # 소개 페이지 컴포넌트
│   └── shared/             # 공유 유틸리티
│       ├── loading/        # 로딩 상태
│       └── ...
│
├── scripts/                 # 빌드 스크립트
│   ├── notion-mdx-all-in-one.ts
│   ├── redis-image-processor.ts
│   └── validate-mdx-files.ts
│
├── types/                   # TypeScript 타입
│   ├── general.model.ts
│   ├── mdx.model.ts
│   └── ...
│
├── public/                  # 정적 자산
│   ├── images/
│   ├── fonts/
│   └── ...
│
├── content-collections.ts   # 콘텐츠 스키마
├── getMDXComponents.tsx     # MDX 컴포넌트 매핑
├── blog.config.ts          # 블로그 설정
├── next.config.ts          # Next.js 설정
└── tailwind.config.ts      # Tailwind 설정
```

### 주요 파일 설명

#### `content-collections.ts`

콘텐츠의 타입 안전 스키마 정의:

```typescript
const records = defineCollection({
  name: 'records',
  directory: 'content/records',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // ...
  }),
});
```

#### `getMDXComponents.tsx`

MDX 요소를 React 컴포넌트로 매핑:

```typescript
export function getMDXComponents(): MDXComponents {
  return {
    pre: CodeBlock,
    img: OptimizedImage,
    // ...
  };
}
```

#### `blog.config.ts`

블로그의 중앙 설정:

```typescript
export const BLOG = {
  APP_NAME: "Norkive",
  AUTHOR: "ryoonwithinwisdomlights",
  // ...
};
```

### 디렉토리 상세

#### `lib/stores/`

클라이언트 상태 관리를 위한 Zustand 스토어:

- `themeStore.ts` - 테마(라이트/다크) 및 로케일 관리
- `uiStore.ts` - UI 상태 (사이드바, 메뉴, 모달)
- `searchStore.ts` - 검색 기능 상태
- `settingsStore.ts` - 사용자 설정

#### `lib/utils/mdx-data-processing/`

고급 MDX 변환 파이프라인:

- `convert-unsafe-mdx/` - 링크 변환 (YouTube, 파일, 임베드)
- `cloudinary/` - 이미지 처리 유틸리티
- `data-manager.ts` - 콘텐츠 컬렉션 관리
- `mdx-validator.ts` - MDX 콘텐츠 검증

#### `modules/mdx/`

커스텀 MDX 래퍼 컴포넌트:

- `YoutubeWrapper.tsx` - 지연 로딩이 있는 YouTube 비디오 임베드
- `FileWrapper.tsx` - 아이콘이 있는 파일 다운로드 링크
- `GoogleDriveWrapper.tsx` - Google Drive 문서 링크
- `EmbededWrapper.tsx` - 일반 iframe 임베드 (Figma, Maps 등)
- `BookMarkWrapper.tsx` - 리치 링크 미리보기

#### `modules/page/components/`

성능을 위한 메모이제이션된 리스트 컴포넌트:

- `EntireRecords.tsx` - 필터링이 있는 전체 기록 목록
- `DateSortedRecords.tsx` - 날짜별로 그룹화된 기록
- `LatestRecords.tsx` - 페이지네이션이 있는 최근 포스트
- `FeaturedRecords.tsx` - 추천 콘텐츠 캐러셀
- `RecordsWithMultiplesOfThree.tsx` - 그리드 레이아웃

---

## 콘텐츠 추가하기

### 방법 1: 직접 MDX (개발에 권장)

1. `content/records/my-post.mdx` 파일 생성
2. Frontmatter 추가:

```mdx
---
notionId: "unique-id-123"
title: "내 새 포스트"
date: 2025-01-15
category: "Engineering"
sub_type: "Tutorial"
tags: ["Next.js", "TypeScript"]
summary: "간단한 설명"
draft: false
favorite: false
---

# 내 포스트 제목

콘텐츠는 **마크다운** 포맷팅으로 작성합니다.

## 코드 예제

\`\`\`typescript
const example = "Hello, world!";
console.log(example);
\`\`\`
```

3. 저장 후 브라우저 새로고침

### 방법 2: Notion에서

1. Notion 데이터베이스에서 콘텐츠 작성
2. 변환 스크립트 실행:

```bash
npx tsx scripts/notion-mdx-all-in-one.ts
```

3. MDX 파일이 `content/`에 생성됨
4. Git에 커밋

### Frontmatter 스키마

모든 필드는 Zod 스키마로 검증됩니다:

```typescript
{
  notionId: string;           // 고유 식별자
  title: string;              // 필수
  date: Date;                 // 발행 날짜
  category?: string;          // "Engineering" | "Project" | 등
  sub_type?: string;          // 하위 카테고리
  tags?: string[];            // 태그 배열
  summary?: string;           // 간단한 설명
  pageCover?: string | null;  // 커버 이미지 URL
  draft?: boolean;            // 기본값: false
  favorite?: boolean;         // 기본값: false
  author?: string;            // 작성자 이름
  // ... 더 많은 필드
}
```

---

## 컴포넌트 만들기

### 컴포넌트 구조

```typescript
// modules/common/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({ 
  title, 
  className, 
  children 
}: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### MDX에서 컴포넌트 사용

1. **컴포넌트 생성**:

```typescript
// modules/mdx/Callout.tsx
export function Callout({ type, children }) {
  return (
    <div className={`callout callout-${type}`}>
      {children}
    </div>
  );
}
```

2. **getMDXComponents.tsx에 등록**:

```typescript
import { Callout } from '@/modules/mdx/Callout';

export function getMDXComponents() {
  return {
    Callout,
    // ...
  };
}
```

3. **MDX에서 사용**:

```mdx
<Callout type="warning">
  이것은 경고 메시지입니다!
</Callout>
```

### 스타일링 가이드

Tailwind CSS 사용:

```typescript
// ✅ 좋음: Tailwind 유틸리티
<div className="flex items-center justify-between p-4 rounded-lg" />

// ❌ 피하기: 인라인 스타일
<div style={{ display: 'flex', padding: '16px' }} />

// ✅ 좋음: cn()로 조건부 클래스
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

---

## 테스팅

### MDX 검증

```bash
npm run validate:mdx
```

확인 사항:
- Frontmatter 스키마 준수
- MDX 문법 오류
- 필수 필드 누락

### 수동 테스팅 체크리스트

- [ ] 페이지가 오류 없이 로드됨
- [ ] 콘텐츠가 올바르게 표시됨
- [ ] 이미지가 로드되고 최적화됨
- [ ] 링크가 작동함 (내부 및 외부)
- [ ] 다크 모드 토글이 작동함
- [ ] 검색 기능이 작동함
- [ ] 모바일 반응형
- [ ] Lighthouse 점수 > 90

### 성능 테스팅

```bash
# 프로덕션 번들 빌드
npm run build

# 번들 분석
npm run analyze

# Lighthouse 확인
# DevTools 열기 > Lighthouse > 실행
```

---

## 문제 해결

### 일반적인 문제

#### 1. 포트가 이미 사용 중

```bash
Error: Port 3000 is already in use
```

**해결 방법**:
```bash
# 프로세스 찾아서 종료
lsof -ti:3000 | xargs kill
# 또는 다른 포트 사용
PORT=3001 npm run dev
```

#### 2. 모듈을 찾을 수 없음

```bash
Error: Cannot find module '@/lib/utils'
```

**해결 방법**:
```bash
# 의존성 재설치
rm -rf node_modules
npm install
```

#### 3. TypeScript 오류

```bash
Type 'X' is not assignable to type 'Y'
```

**해결 방법**:
```bash
# 타입 재생성
npx content-collections build

# 또는 VS Code에서 TypeScript 서버 재시작
# Cmd/Ctrl + Shift + P > TypeScript: Restart TS Server
```

#### 4. 이미지가 로드되지 않음

**체크리스트**:
- [ ] 이미지 경로가 올바름
- [ ] 이미지가 `public/` 디렉토리에 있음
- [ ] 이미지 확장자가 지원됨 (.jpg, .png, .webp)
- [ ] Cloudinary URL이 유효함 (사용하는 경우)

#### 5. 빌드 실패

```bash
Error: Build failed
```

**디버깅**:
```bash
# Next.js 캐시 지우기
rm -rf .next

# Content Collections 캐시 지우기
rm -rf .content-collections

# 재빌드
npm run build
```

### 도움 받기

1. **문서 확인** `docs/` 디렉토리
2. **GitHub에서 이슈 검색**
3. **새 이슈 생성**:
   - 오류 메시지
   - 재현 단계
   - 환경 (OS, Node 버전)
   - 예상 동작 vs 실제 동작

---

## 베스트 프랙티스

### 코드 스타일

- 모든 새 파일에 TypeScript 사용
- ESLint 규칙 준수
- Prettier로 포맷팅
- 의미 있는 변수명 사용
- 복잡한 함수에 JSDoc 주석 추가

### Git 워크플로우

```bash
# 기능 브랜치 생성
git checkout -b feature/my-feature

# 작고 집중된 커밋 작성
git commit -m "feat: 새 컴포넌트 추가"
git commit -m "fix: 레이아웃 문제 해결"

# 푸시 및 PR 생성
git push origin feature/my-feature
```

### 커밋 메시지 규칙

```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 업데이트
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 추가
chore: 의존성 업데이트
```

### 성능

- 비용이 큰 컴포넌트에 `React.memo` 사용
- 적절하게 `useMemo` 및 `useCallback` 사용
- 무거운 컴포넌트 지연 로드
- 커밋 전 이미지 최적화
- 번들 크기 모니터링

---

## 개발 도구

### VS Code 확장 프로그램

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx"
  ]
}
```

### VS Code 설정

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "([\"'`][^\"'`]*.*?[\"'`])"]
  ]
}
```

---

## 다음 단계

설정 완료 후 탐색:

- [아키텍처](./ARCHITECTURE.ko.md) - 시스템 설계
- [성능](./PERFORMANCE.ko.md) - 최적화 기법
- [기여하기](./CONTRIBUTING.md) - 기여 가이드라인
- [마이그레이션](./MIGRATION.ko.md) - 기술 진화 스토리
