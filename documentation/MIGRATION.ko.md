# 마이그레이션 가이드: react-notion-x → MDX

이 문서는 Norkive가 런타임 Notion 렌더러에서 정적 MDX 기반 아키텍처로 진화한 과정을 기록합니다.

## 목차

- [개요](#개요)
- [Phase 1: react-notion-x](#phase-1-react-notion-x)
- [Phase 2: Notion API SSR/ISR](#phase-2-notion-api-ssrisr)
- [Phase 3: 하이브리드 접근](#phase-3-하이브리드-접근)
- [Phase 4: MDX 정적 생성](#phase-4-mdx-정적-생성-최종)
- [배운 교훈](#배운-교훈)
- [마이그레이션 체크리스트](#마이그레이션-체크리스트)

---

## 개요

### 타임라인

```
2024 Q1: react-notion-x (중단된 라이브러리)
    ↓
2024 Q2: Notion API SSR/ISR 실험
    ↓
2024 Q3: 하이브리드 렌더러 시도
    ↓
2024 Q4: MDX 정적 생성 (✅ 현재)
```

### 결정 요인

1. **성능**: 1초 미만 페이지 로딩 필요
2. **SEO**: 검색 엔진 크롤러를 위한 완전한 HTML
3. **안정성**: Notion API에 대한 런타임 의존성 제거
4. **유지보수성**: 더 단순한 아키텍처, 디버깅 용이
5. **타입 안전성**: 컴파일 타임 검사로 런타임 오류 방지

---

## Phase 1: react-notion-x

### 구현

```typescript
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';

export default async function Page({ params }) {
  const notion = new NotionAPI();
  const docMap = await notion.getPage(params.id);
  
  return <NotionRenderer docMap={docMap} />;
}
```

### 발생한 문제

#### 1. 라이브러리 유지보수

```
마지막 업데이트: 2년 전
열린 이슈: 150+
보안 취약점: 3개 치명적
커뮤니티 활동: 감소 중
```

**영향**: 보안 위험, 버그 수정 없음, React 19와 호환 불가

#### 2. 하이드레이션 오류

```typescript
// 서버가 렌더링한 것
<div>서버 콘텐츠</div>

// 클라이언트가 렌더링한 것
<div>클라이언트 콘텐츠</div>

// 결과: 하이드레이션 불일치 오류
Warning: Text content did not match. Server: "..." Client: "..."
```

**빈도**: 페이지 로딩의 20-30%  
**사용자 영향**: 깨진 레이아웃, 스타일이 없는 콘텐츠 깜빡임

#### 3. 번들 크기

```
react-notion-x:           245KB
notion-client:            180KB
notion-utils:             120KB
react-notion-x/styles:     55KB
────────────────────────────────
총합:                     600KB (Notion 렌더링만을 위해!)
```

**영향**: 
- 초기 로딩: 2.5s → 3.2s (+28%)
- Lighthouse 성능: 65 → 58

#### 4. SEO 문제

```html
<!-- 크롤러가 보는 것 (JS 전) -->
<div id="root">Loading...</div>

<!-- 크롤러가 봐야 하는 것 -->
<article>
  <h1>내 블로그 포스트</h1>
  <p>실제 콘텐츠가 여기에...</p>
</article>
```

**Google Search Console**: 페이지의 40%가 색인되지 않음

### 왜 다른 방법을 찾았는가

| 문제 | 심각도 | 영향 |
|-------|----------|--------|
| 유지보수 중단된 라이브러리 | 치명적 | 보안, 호환성 |
| 하이드레이션 오류 | 높음 | 사용자 경험 |
| 큰 번들 | 높음 | 성능 |
| 낮은 SEO | 높음 | 가시성 |

**결정**: react-notion-x 포기, 대안 탐색

---

## Phase 2: Notion API SSR/ISR

### 구현

```typescript
// app/records/[id]/page.tsx
export async function generateStaticParams() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const database = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  
  return database.results.map(page => ({
    id: page.id,
  }));
}

export const revalidate = 60; // ISR: 매 분마다 재검증

export default async function Page({ params }) {
  const page = await notion.pages.retrieve({ page_id: params.id });
  const blocks = await notion.blocks.children.list({ block_id: params.id });
  
  return <CustomNotionRenderer page={page} blocks={blocks} />;
}
```

### 발생한 문제

#### 1. Rate Limiting

```
Notion API 제한:
- 초당 3개 요청
- 10분당 1,000개 요청

우리의 필요:
- 100개 페이지 × 2개 요청 (페이지 + 블록) = 200개 요청
- 빌드 시간: 200 ÷ 3 = 67초 (최소)
- 실제: 재시도로 인해 5분 이상
```

**해결 시도**:
```typescript
// 배치 처리
const batches = chunk(pages, 3);
for (const batch of batches) {
  await Promise.all(batch.map(fetchPage));
  await sleep(1000); // Rate limit 버퍼
}
```

**결과**: 빌드 시간 여전히 3-5분, API 장애로 불안정

#### 2. 캐시 복잡성

```typescript
// 3계층 캐싱
const cached = await memoryCache.get(key)       // L1: 빠름, 일시적
  || await redis.get(key)                       // L2: 공유, 영구
  || await fetchFromNotion(id);                 // L3: 느림, 원본

// 캐시 무효화 악몽
if (notionDataChanged) {
  memoryCache.delete(key);
  redis.del(key);
  revalidatePath(`/records/${slug}`);
}
```

**복잡성**: 디버그 어려움, 캐시 불일치

#### 3. 빌드/런타임 혼동

```typescript
// 때로는 빌드 타임에 실행
const data = await fetchNotionPage(id);

// 때로는 요청 타임에 실행 (ISR)
const data = await fetchNotionPage(id);

// 같은 코드, 다른 실행 컨텍스트!
```

**개발자 경험**: 혼란스럽고 추론하기 어려움

#### 4. API 의존성

```
Notion API 가동 시간: 99.9%
↓
우리 사이트 가용성: 99.9%

하지만:
- API 문제 → 사이트 장애
- API Rate Limit → 느린 빌드
- API 변경 → 코드 장애
```

### 왜 다른 방법을 찾았는가

복잡성 대비 이점 비율이 너무 높았습니다. 필요한 것:
- 더 빠른 빌드
- 더 단순한 캐싱
- 더 나은 안정성

**결정**: 양쪽의 장점을 모두 얻기 위해 하이브리드 접근 시도

---

## Phase 3: 하이브리드 접근

### 구현

```typescript
// 정적(MDX)과 동적(Notion API)을 혼합하려는 시도
export default async function Page({ params }) {
  const slug = params.slug.join('/');
  
  // 정적 MDX가 존재하는지 확인
  const staticPost = allRecords.find(p => p.slug === slug);
  
  if (staticPost) {
    // MDX에서 렌더링 (빠름, 정적)
    return <MDXRenderer content={staticPost} />;
  } else {
    // Notion API로 폴백 (느림, 동적)
    const notionData = await fetchNotionPage(slug);
    return <NotionRenderer data={notionData} />;
  }
}
```

### 발생한 문제

#### 1. 이중 코드 경로

```typescript
// MDX 렌더링
<MDXComponent 
  components={getMDXComponents()}
  content={staticPost.body}
/>

// Notion 렌더링
<NotionRenderer 
  blocks={notionBlocks}
  config={notionConfig}
/>

// 결과: 2배의 코드, 2배의 버그
```

#### 2. 일관성 없는 UX

```
정적 페이지: 0.8초에 로딩
동적 페이지: 2.5초에 로딩

사용자 경험: 혼란스럽고 깨진 것처럼 느껴짐
```

#### 3. 테스트 악몽

```typescript
// 테스트 매트릭스
for (const source of ['mdx', 'notion']) {
  for (const condition of ['success', 'error', 'timeout']) {
    for (const cacheState of ['hit', 'miss', 'stale']) {
      // 3 × 3 × 3 = 27개 테스트 케이스!
    }
  }
}
```

#### 4. 유지보수 부담

```
컴포넌트 변경이 필요한 곳:
- MDX 렌더러
- Notion 렌더러
- 공유 컴포넌트
- 타입 정의
- 테스트

1개 기능에 5배의 유지보수
```

### 왜 다른 방법을 찾았는가

**복잡성이 폭발했습니다**. 하이브리드 접근은 양쪽의 최악을 결합했습니다:
- 런타임 Notion API의 모든 복잡성
- MDX의 모든 빌드 타임 복잡성
- 둘 다의 단순함은 없음

**결정**: 한 가지 접근법에 전념

---

## Phase 4: MDX 정적 생성 (최종)

### 구현

```typescript
// 1단계: Notion → MDX 변환 (빌드 타임)
async function convertNotionToMDX(databaseId: string) {
  const pages = await notion.databases.query({ database_id: databaseId });
  
  for (const page of pages.results) {
    const mdString = await n2m.pageToMarkdown(page.id);
    const frontmatter = extractFrontmatter(page.properties);
    
    const mdx = `---
${yaml.stringify(frontmatter)}
---

${mdString}`;
    
    await fs.writeFile(`content/records/${slug}.mdx`, mdx);
  }
}

// 2단계: 빌드 타임 인덱싱 (Content Collections)
const records = defineCollection({
  name: 'records',
  directory: 'content/records',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // ... 타입 안전 스키마
  }),
  transform: transformMDX,
});

// 3단계: 정적 생성 (Next.js)
export async function generateStaticParams() {
  return allRecords.map(post => ({
    slug: post._meta.path.split('/'),
  }));
}

export default function Page({ params }) {
  const post = allRecords.find(p => p.slug === params.slug);
  return <MDXRenderer content={post} />;
}
```

### 달성한 이점

#### 1. 성능

```
이전 (Notion API SSR):  2.5초 초기 로딩
이후 (정적 MDX):       1.0초 초기 로딩
개선:                  60% 빠름
```

```
이전: 3-5분 빌드
이후: 45초 빌드
개선: 75% 빠름
```

#### 2. 안정성

```typescript
// 런타임 의존성 없음
// ✅ Notion API 장애? 사이트는 여전히 작동
// ✅ Rate Limit? 문제 없음
// ✅ API 변경? 빌드 단계에만 영향
```

#### 3. SEO

```html
<!-- 초기 응답의 완전한 HTML -->
<!DOCTYPE html>
<html>
  <body>
    <article>
      <h1>내 블로그 포스트</h1>
      <p>완전한 콘텐츠, JS 필요 없음</p>
    </article>
  </body>
</html>
```

**Google Search Console**: 100% 페이지 색인됨

#### 4. 타입 안전성

```typescript
// 자동 생성된 타입
import { allRecords } from '.content-collections/generated';

allRecords.forEach(post => {
  console.log(post.title);     // ✅ TypeScript가 이것을 알고 있음
  console.log(post.nonExistent); // ❌ 컴파일 오류
});
```

#### 5. 개발자 경험

```typescript
// 단일 렌더링 경로
<MDXContent components={getMDXComponents()} />

// 명확한 빌드/런타임 분리
빌드 타임:   Notion → MDX 변환
런타임:      MDX → HTML 렌더링

// 빠른 피드백
MDX 편집 → 1초 미만에 변경사항 확인 (hot reload)
```

### 트레이드오프

#### 포기한 것

- ❌ 실시간 콘텐츠 업데이트 (이제 1시간 ISR 지연)
- ❌ 라이브 편집을 위한 Notion의 WYSIWYG 에디터

#### 얻은 것

- ✅ 60% 빠른 페이지 로딩
- ✅ 75% 빠른 빌드
- ✅ 100% SEO 색인
- ✅ 타입 안전성
- ✅ 더 단순한 아키텍처
- ✅ 더 나은 오프라인 개발

**결론**: 콘텐츠 사이트의 경우 트레이드오프가 가치 있음

---

## 배운 교훈

### 1. 단순함이 영리함을 이긴다

> "작동하게 만들고, 올바르게 만들고, 빠르게 만들어라 - 이 순서로"

우리의 여정:
1. ❌ 영리함: 하이브리드 렌더러 (복잡함, 버그 많음)
2. ✅ 단순함: 정적 MDX (직관적, 안정적)

**교훈**: 작동할 수 있는 가장 단순한 솔루션으로 시작

### 2. 모든 것을 측정하라

모든 단계에서 우리가 측정한 것:
- 빌드 시간
- 페이지 로딩 시간
- 번들 크기
- Lighthouse 점수
- 개발자 생산성

**데이터 없이는**, 다음을 했을 것입니다:
- 잘못된 것 최적화
- 퇴보 놓침
- 직감에 기반한 결정

### 3. 런타임 의존성은 부채다

외부 API 의존성은 복합적입니다:
```
API 가용성:        99.9%
코드 안정성:       99.9%
결합된 가용성:     99.8% (더 나쁨!)

플러스:
- Rate Limit
- 변경 사항
- 유지보수 부담
```

**교훈**: 가능할 때 외부 의존성을 빌드 타임으로 이동

### 4. 타입 안전성은 보상이 있다

이전 (런타임 오류):
```typescript
const title = post.titel; // 오타 → 프로덕션에서 런타임 오류!
```

이후 (컴파일 오류):
```typescript
const title = post.titel; // 오타 → 컴파일 오류, 배포되지 않음
```

**ROI**: 첫 달에 ~50개 런타임 버그 방지

### 5. 빠르게 실패하고, 더 빠르게 배우라

최종 솔루션에 도달하기 전에 3가지 접근을 시도했습니다. 각 "실패"가 가르쳐준 것:
- Phase 1: 유지보수 중단된 라이브러리에 의존하지 말 것
- Phase 2: 런타임 API 호출은 느리고 복잡함
- Phase 3: 하이브리드 접근은 거의 작동하지 않음

**교훈**: 실패를 패배가 아닌 학습으로 받아들이기

---

## 마이그레이션 체크리스트

### react-notion-x에서 마이그레이션하는 경우

- [ ] Notion 데이터베이스 구조 감사
- [ ] Notion API 통합 설정
- [ ] MDX 변환 스크립트 생성
- [ ] Content Collections 스키마 정의
- [ ] 이미지 URL 처리 테스트 (만료됨!)
- [ ] Cloudinary 또는 유사한 CDN 설정
- [ ] 이미지를 위한 Redis 캐싱 구현
- [ ] Notion 블록 대신 MDX를 사용하도록 컴포넌트 업데이트
- [ ] 모든 페이지가 올바르게 렌더링되는지 테스트
- [ ] 적절한 재검증 시간으로 ISR 설정
- [ ] 배포 설정 업데이트
- [ ] react-notion-x 의존성 제거
- [ ] 테스트 업데이트
- [ ] 팀을 위한 새 워크플로우 문서화

### 처음부터 구축하는 경우

- [ ] 첫날부터 MDX로 시작
- [ ] 타입 안전성을 위해 Content Collections 사용
- [ ] CMS로 Notion 고려 (선택사항)
- [ ] 이미지 최적화 파이프라인 설정
- [ ] 적절한 캐싱 전략 구현
- [ ] 성능 메트릭 모니터링

---

## 결론

react-notion-x에서 정적 MDX로의 마이그레이션은 9개월과 3번의 실패한 시도가 걸렸지만, 결과가 스스로 말합니다:

```
성능:       +60%
빌드 속도:  +75%
타입 안전성: +100%
SEO 색인:   +100%
코드 복잡성: -40%
```

**다시 할까요?** 절대적으로. 개선된 안정성, 성능, 개발자 경험은 이 프로젝트를 위한 최고의 기술적 결정 중 하나입니다.

**핵심 요점**: 콘텐츠 중심 사이트의 경우, 정적 생성이 런타임 API 렌더링을 거의 모든 중요한 메트릭에서 압도합니다.

---

## 추가 자료

- [Next.js 정적 생성](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [Content Collections 문서](https://www.content-collections.dev/)
- [Notion API 모범 사례](https://developers.notion.com/docs/working-with-page-content)
- [MDX 문서](https://mdxjs.com/)

