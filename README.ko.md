![logo](/public/images/Norkive_intro.png)
![logo](/public/images/Norkive_kv.png)
# Norkive

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.5-FF4154?logo=react)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Notion 콘텐츠를 MDX로 변환하여 정적 Next.js 15 블로그로 배포하는 타입 안전 지식 아카이브 플랫폼

🌐 **라이브 데모**: https://mdx-norkive.vercel.app/  
📦 **저장소**: https://github.com/ryoonwithinwisdomlights/norkive

---

## 개요

Norkive는 Notion의 직관적인 편집 경험과 고성능 정적 블로그 사이의 간극을 메우는 현대적인 지식 관리 플랫폼입니다. Notion 데이터베이스를 타입 안전 MDX 콘텐츠로 자동 변환하고, Cloudinary CDN을 통해 이미지를 최적화하며, 고급 렌더링 최적화를 적용한 빠른 Next.js 애플리케이션으로 배포합니다.

### 주요 기능

- 🔄 **자동화된 파이프라인**: 완전한 메타데이터 보존과 함께 Notion → MDX 변환
- 🖼️ **이미지 최적화**: 70% 크기 감소를 달성하는 Cloudinary 통합
- 🎨 **MDX 컴포넌트**: Shiki 문법 강조와 함께 풍부한 인터랙티브 컴포넌트
- 🎬 **풍부한 미디어 지원**: YouTube, PDF, Google Drive, 임베드, 북마크 커스텀 래퍼
- 🔍 **고급 검색**: 퍼지 검색이 가능한 커맨드 팔레트 (`⌘K`)
- ⚡ **성능**: Lighthouse 96/100, 1초 미만 초기 로딩, 89% 렌더링 감소
- 🎯 **타입 안전성**: 런타임 검증을 위한 Zod 스키마 + Content Collections
- 🚀 **React 최적화**: React.memo, useMemo, useCallback을 활용한 종합 메모이제이션
- 📱 **반응형**: 다크 모드를 지원하는 모바일 우선 디자인 (Zustand)
- 🔄 **상태 관리**: TanStack Query (서버 상태), Zustand (클라이언트 상태)
- 🛡️ **안전한 MDX 처리**: 고급 링크 변환, 코드 블록 보호, XSS 방지

### 기술 스택

- **프레임워크**: Next.js 15 (App Router), React 19
- **언어**: TypeScript 5.6 (코드베이스의 87.3%)
- **스타일링**: Tailwind CSS 4.1
- **콘텐츠**: MDX + Content Collections + Fumadocs
- **상태 관리**: TanStack Query (서버), Zustand (클라이언트)
- **검색**: Orama (전문 검색 엔진)
- **인프라**: Vercel, Cloudinary, Upstash Redis
- **품질**: ESLint, Prettier, Zod 검증

---

## 빠른 시작

### 사전 요구사항

- Node.js >= 20.17.0
- npm/pnpm/yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/ryoonwithinwisdomlights/norkive.git
cd norkive

# 의존성 설치
npm install
# 또는
pnpm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

http://localhost:3000 방문

### 환경 변수

```env
# Notion API (선택사항 - MDX 변환용)
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# Cloudinary (이미지 최적화)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Upstash Redis (캐싱)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# 사이트 설정
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_LANG=kr-KR
```

---

## 지원되는 블록 및 컴포넌트

Norkive는 커스텀 MDX 컴포넌트와 안전한 콘텐츠 처리를 통해 Notion 블록을 포괄적으로 지원합니다.

### 미디어 블록

| 블록 유형 | 컴포넌트 | 상태 | 설명 |
|------------|-----------|--------|-------------|
| **YouTube** | `YoutubeWrapper` | ✅ 지원 | 지연 로딩이 있는 경량 YouTube 임베드 |
| **비디오** | 네이티브 iframe | ✅ 지원 | 일반 비디오 임베드 |
| **오디오** | 네이티브 오디오 | ✅ 지원 | HTML5 오디오 플레이어 |
| **이미지** | Next Image | ✅ 지원 | Cloudinary로 최적화 |
| **PDF** | 파일 래퍼 | ✅ 지원 | PDF 미리보기 및 다운로드 |
| **Figma** | EmbededWrapper | ✅ 지원 | Figma 디자인 임베드 |
| **Google Maps** | EmbededWrapper | ✅ 지원 | iframe 임베드 |

### 파일 및 드라이브 블록

| 블록 유형 | 컴포넌트 | 상태 | 확장자 |
|------------|-----------|--------|------------|
| **PDF 파일** | `FileWrapper` | ✅ 지원 | `.pdf` |
| **문서** | `FileWrapper` | ✅ 지원 | `.doc`, `.docx`, `.rtf`, `.txt`, `.md`, `.odt` |
| **스프레드시트** | `FileWrapper` | ✅ 지원 | `.xls`, `.xlsx`, `.key`, `.numbers` |
| **프레젠테이션** | `FileWrapper` | ✅ 지원 | `.ppt`, `.pptx` |
| **Google Drive** | `GoogleDriveWrapper` | ✅ 지원 | Docs, Sheets, Slides |

### 링크 및 임베드 블록

| 블록 유형 | 컴포넌트 | 상태 | 기능 |
|------------|-----------|--------|----------|
| **북마크** | `BookMarkWrapper` | ✅ 지원 | 메타데이터가 있는 리치 링크 미리보기 |
| **임베드** | `EmbededWrapper` | ✅ 지원 | 일반 iframe 임베드 |
| **외부 링크** | 커스텀 컴포넌트 | ✅ 지원 | SEO 친화적인 외부 링크 |
| **페이지 링크** | 네이티브 링크 | ✅ 지원 | 내부 페이지 네비게이션 |

### 콘텐츠 블록

| 블록 유형 | 상태 | 기능 |
|------------|--------|----------|
| **제목** | ✅ 지원 | TOC 지원 H1-H6 |
| **단락** | ✅ 지원 | 리치 텍스트 포맷팅 |
| **인용구 / Callout** | ✅ 지원 | Fumadocs callout 컴포넌트 |
| **코드 블록** | ✅ 지원 | Shiki 문법 강조 |
| **인라인 코드** | ✅ 지원 | 모노스페이스 포맷팅 |
| **목록** | ✅ 지원 | 순서, 비순서, 작업 목록 |
| **테이블** | ✅ 지원 | 반응형 테이블 |
| **구분선** | ✅ 지원 | 수평선 |

### 고급 MDX 처리

Norkive는 안전하고 견고한 콘텐츠 처리를 위한 정교한 MDX 변환 파이프라인을 구현합니다:

#### 🔗 링크 변환
```markdown
# YouTube
[video](https://www.youtube.com/watch?v=xxx) → <YoutubeWrapper />

# 파일
[document.pdf](url) → <FileWrapper />

# Google Drive
[My Doc](drive.google.com/...) → <GoogleDriveWrapper />

# 임베드
[embed](url) → <EmbededWrapper />

# 북마크
[bookmark](url) → <BookMarkWrapper />
```

#### 🛡️ 보안 기능
- **XSS 방지**: 엄격한 HTML 태그 화이트리스트
- **코드 블록 보호**: 코드 콘텐츠 변환 방지
- **인용구 보호**: 중첩 인용구 보존
- **중첩 링크 수정**: 복잡한 링크 구조 처리
- **잘못된 HTML 정리**: 안전하지 않은 속성 제거

#### ⚡ 처리 파이프라인
1. **링크 감지**: 정규식 패턴 매칭
2. **컴포넌트 변환**: Markdown → JSX 컴포넌트
3. **코드 보호**: 코드 블록 및 인용구 보존
4. **안전성 검증**: XSS 방지
5. **오류 처리**: 우아한 저하

### 커스텀 컴포넌트 아키텍처

모든 미디어 컴포넌트는 일관된 래퍼 패턴을 따릅니다:

```typescript
// YoutubeWrapper.tsx
export default function YoutubeWrapper({ urls, names }: WrapperProps) {
  const youtubeId = getYoutubeId(urls);
  return <LiteYouTubeEmbed id={youtubeId} />;
}

// FileWrapper.tsx
export default function FileWrapper({ urls, names }: WrapperProps) {
  return (
    <a href={urls} download>
      <FileTextIcon /> {names}
    </a>
  );
}
```

**주요 이점:**
- ✨ 모든 래퍼에서 일관된 API
- 🔒 TypeScript로 타입 안전
- 🎨 Tailwind CSS로 스타일링
- ♿ ARIA 레이블로 접근성
- 📱 반응형 디자인
- 🌙 다크 모드 지원

### 콘텐츠 처리 파이프라인

```
Notion MDX → 링크 감지 → 컴포넌트 변환 → 
코드 보호 → 안전성 검증 → 최종 MDX
```

**처리 유형:**
- **함수형 파이프라인**: 순수 함수, 파이프 조합
- **플러그인 아키텍처**: 모듈식 변환 단계
- **클래스 기반**: 객체 지향 변환기 패턴

구현 세부사항은 [content-functional.ts](./lib/utils/mdx-data-processing/convert-unsafe-mdx/content-functional.ts)를 참조하세요.

---

## 사용법

### 콘텐츠 추가하기

**옵션 A: Notion 사용 (권장)**

1. Notion 데이터베이스에서 콘텐츠 작성
2. 변환 스크립트 실행:
   ```bash
   npm run generate:mdx
   ```
3. MDX 파일이 자동으로 `content/` 디렉토리에 생성됨

**옵션 B: 직접 MDX 작성**

`content/records/my-post.mdx` 파일 생성:

```mdx
---
notionId: "unique-id"
title: "내 포스트 제목"
date: 2025-01-15
category: "Engineering"
tags: ["Next.js", "TypeScript"]
---

# 여기에 콘텐츠

**굵은 글씨**와 *기울임*이 있는 단락입니다.

\`\`\`typescript
const example = "코드 블록";
\`\`\`
```

### 사용 가능한 명령어

```bash
npm run dev              # 개발 서버 시작
npm run build            # 프로덕션 빌드
npm start                # 프로덕션 서버 시작
npm run lint             # ESLint 실행
npm run validate:mdx     # MDX 파일 검증
npm run prettier:write   # 코드 포맷팅
npm run analyze          # 번들 크기 분석
npm run check:validity   # 유효성 검사 및 테스트 실행
```

---

## 문서

- 📐 **[아키텍처](./docs/ARCHITECTURE.ko.md)** - 시스템 설계, 데이터 플로우, 기술적 의사결정
- 🔄 **[마이그레이션 가이드](./docs/MIGRATION.ko.md)** - react-notion-x → MDX 마이그레이션 스토리
- ⚡ **[성능](./docs/PERFORMANCE.ko.md)** - 최적화 전략 및 벤치마크
- 🛠️ **[개발](./docs/DEVELOPMENT.ko.md)** - 로컬 설정 및 개발 가이드
- 🤝 **[기여하기](./docs/CONTRIBUTING.ko.md)** - 이 프로젝트에 기여하는 방법
- 🚀 **[메모이제이션 가이드](./documents-description/MEMOIZATION_GUIDE.md)** - React 렌더링 최적화

---

## 프로젝트 구조

```
norkive/
├── app/                    # Next.js App Router
│   ├── (home)/            # 홈 페이지
│   ├── api/               # API 라우트
│   ├── book/              # 도서 카테고리
│   ├── engineering/       # 엔지니어링 포스트
│   ├── project/           # 프로젝트 쇼케이스
│   └── records/           # 개인 기록
├── content/               # MDX 콘텐츠 파일
│   ├── books/
│   ├── engineerings/
│   ├── projects/
│   └── records/
├── lib/                   # 유틸리티 & 라이브러리
│   ├── cache/            # 캐싱 시스템
│   ├── context/          # React 컨텍스트
│   ├── hooks/            # 커스텀 훅
│   ├── stores/           # Zustand 스토어
│   └── utils/            # 헬퍼 함수
├── modules/               # UI 컴포넌트
│   ├── common/           # 공유 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── mdx/              # MDX 컴포넌트
│   └── page/             # 페이지 컴포넌트 (메모이제이션 적용)
├── scripts/              # 빌드 & 변환 스크립트
└── types/                # TypeScript 정의
```

---

## 성능

### Lighthouse 점수

```
성능:          96/100 ⚡
접근성:        98/100 ♿
모범 사례:    100/100 ✅
SEO:         100/100 🔍
```

### Core Web Vitals

| 지표 | 점수 | 목표 | 상태 |
|--------|-------|--------|--------|
| LCP | 1.2s | < 2.5s | ✅ |
| FID | 12ms | < 100ms | ✅ |
| CLS | 0.02 | < 0.1 | ✅ |

### 렌더링 최적화

- **React.memo**: 6개 이상의 리스트 아이템 컴포넌트에 적용
- **useMemo**: 복잡한 계산 및 필터링 결과 캐싱
- **useCallback**: 이벤트 핸들러 안정화
- **결과**: 불필요한 리렌더링 89% 감소

자세한 최적화 전략은 [PERFORMANCE.ko.md](./docs/PERFORMANCE.ko.md)를 참조하세요.

---

## 주요 기술적 의사결정

### 왜 직접 Notion 렌더링 대신 MDX인가?

- **성능**: 런타임 API 호출 대신 정적 생성 (60% 빠름)
- **SEO**: 크롤러를 위한 완전한 HTML (100% 색인)
- **커스터마이징**: React 컴포넌트에 대한 완전한 제어
- **안정성**: Notion API 가용성에 대한 의존성 없음

### 왜 TanStack Query + Zustand인가?

- **TanStack Query**: 자동 캐싱, 재검증, 서버 상태 관리
- **Zustand**: 간단하고 성능 우수한 클라이언트 상태 관리
- **관심사 분리**: 서버 상태 vs 클라이언트 상태

### 왜 종합적인 메모이제이션인가?

- **큰 리스트**: 레코드 목록에 100개 이상의 항목
- **복잡한 필터링**: 다중 조건 필터링 및 정렬
- **성능 목표**: <100ms 상호작용 응답 시간
- **결과**: 89% 렌더링 감소 달성

자세한 분석은 [ARCHITECTURE.ko.md](./docs/ARCHITECTURE.ko.md)를 참조하세요.

---

## 벤치마크

### 마이그레이션 결과

| 지표 | 이전 (react-notion-x) | 이후 (MDX) | 개선 |
|--------|------------------------|-------------|-------------|
| 초기 로딩 | 2.5s | 1.0s | ↓ 60% |
| 번들 크기 | 2.3MB | 890KB | ↓ 61% |
| 빌드 시간 | 3분+ | 45초 | ↓ 75% |
| Lighthouse | 60 | 96 | ↑ 60% |
| 컴포넌트 렌더링 | 112회 | 12회 | ↓ 89% |

### 렌더링 최적화

| 컴포넌트 | 이전 | 이후 | 개선 |
|-----------|--------|-------|-------------|
| DateSortedRecords | 100회 렌더링 | 10회 렌더링 | ↓ 90% |
| LatestRecords | 3회 렌더링 | 1회 렌더링 | ↓ 67% |
| FeaturedRecords | 최적화됨 | 최적화됨 | ✅ |
| EntireRecords | 최적화됨 | 최적화됨 | ✅ |

---

## 로드맵

### v1.1 (2025 Q1)

- [ ] Service Worker & PWA 지원
- [x] React 메모이제이션 최적화
- [ ] RSS/Atom 피드
- [ ] 댓글 시스템 (Giscus)

### v2.0 (2025 Q2)

- [ ] 전체 i18n 지원 (한국어/영어)
- [ ] 웹 기반 MDX 에디터
- [ ] 분석 대시보드
- [ ] 고급 검색 필터

---

## 기여하기

기여를 환영합니다! 가이드라인은 [CONTRIBUTING.ko.md](./docs/CONTRIBUTING.ko.md)를 참조하세요.

### 개발 설정

1. 저장소 포크
2. 기능 브랜치 생성: `git checkout -b feature/my-feature`
3. 변경사항 작성
4. 테스트 실행: `npm run check:validity`
5. 커밋: `git commit -m 'feat: 새 기능 추가'`
6. 푸시: `git push origin feature/my-feature`
7. Pull Request 열기

---

## 라이선스

이 프로젝트는 [MIT License](LICENSE)로 배포됩니다.

---

## 작성자

**Ryoon with Wisdom Lights**

- 웹사이트: https://www.ryoonwithwisdomtrees.world/
- 이메일: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

---

## 감사의 말

이 프로젝트는 다음 놀라운 오픈소스 프로젝트들로 구축되었습니다:

- [Next.js](https://nextjs.org/) - React 프레임워크
- [Fumadocs](https://fumadocs.vercel.app/) - 문서화 시스템
- [Radix UI](https://www.radix-ui.com/) - Headless UI 컴포넌트
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [TanStack Query](https://tanstack.com/query) - 서버 상태 관리
- [Zustand](https://github.com/pmndrs/zustand) - 클라이언트 상태 관리
- [Vercel](https://vercel.com/) - 호스팅 플랫폼

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!**

Made with ❤️ by Ryoon with Wisdom Lights

</div>

