# 🎯 Dynamic Import 대상 라이브러리 분석

> 조건부로 사용되는 큰 라이브러리를 찾아 동적 import로 최적화

---

## 📊 발견된 조건부 라이브러리

### ✅ 이미 동적 Import 적용됨

```typescript
// app/layout.tsx
const AuxiliaryBlogComponent = lazy(() => import("..."));
const LoadingCover = lazy(() => import("..."));
const JumpToTopButton = lazy(() => import("..."));
const JumpToBackButton = lazy(() => import("..."));
```

---

## 🔍 추가 최적화 가능한 라이브러리

### 1. **react-share** (ShareBar 컴포넌트)

**현재 위치:** `modules/shared/ShareBar.tsx`
**사용 위치:** MDX 페이지 하단 (모든 포스트에 표시)

**크기:** 약 50-80KB
**사용 빈도:** 모든 MDX 페이지

**최적화 방법:**
```typescript
// modules/shared/ShareBar.tsx
import { lazy, Suspense } from 'react';

const ShareButtons = lazy(() => import('./ShareButtons'));

const ShareBar = ({ data, url }) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <Suspense fallback={<div className="h-8" />}>
        <ShareButtons data={data} url={url} />
      </Suspense>
    </div>
  );
};
```

**효과:**
- 모든 페이지에 즉시 로드되지 않음
- 사용자가 스크롤해서 하단에 도달할 때 로드
- 초기 번들 크기 감소: 약 50KB

---

### 2. **@orama/orama** (검색 기능)

**현재 위치:** `modules/common/search/search.tsx`
**사용 위치:** 검색 다이얼로그 (사용자가 검색 열 때만)

**크기:** 약 100-150KB
**사용 빈도:** 검색 기능 사용 시에만

**최적화 방법:**
```typescript
// modules/common/search/search.tsx
import { lazy, Suspense } from 'react';

const SearchDialogContent = lazy(() => 
  import('fumadocs-ui/components/dialog/search').then(m => ({
    default: m.SearchDialogContent
  }))
);

// 또는
const initializeOrama = async () => {
  const { create } = await import('@orama/orama');
  return create({ ... });
};
```

**효과:**
- 검색 안 쓰는 사용자는 로드 안 됨
- 초기 번들 크기 감소: 약 100KB

---

### 3. **fuse.js** (헤더 검색)

**현재 위치:** `modules/shared/HeaderSearch.tsx`
**사용 위치:** 헤더 검색바 (사용자가 입력할 때만)

**크기:** 약 60-80KB
**사용 빈도:** 검색 입력 시에만

**최적화 방법:**
```typescript
// modules/shared/HeaderSearch.tsx
import { useState, useEffect } from 'react';

export default function HeaderSearch() {
  const [fuse, setFuse] = useState(null);
  
  useEffect(() => {
    const loadFuse = async () => {
      const Fuse = (await import('fuse.js')).default;
      setFuse(new Fuse(groupedArray, { keys: ['title'], threshold: 0.3 }));
    };
    
    // 사용자가 포커스할 때만 로드
    const handleFocus = () => {
      if (!fuse) loadFuse();
    };
    
    return () => {}; // cleanup
  }, []);
}
```

**효과:**
- 검색 안 쓰는 사용자는 로드 안 됨
- 초기 번들 크기 감소: 약 60KB

---

### 4. **@headlessui/react** (드롭다운 메뉴)

**현재 위치:** 
- `modules/layout/components/dark-mode-toggle.tsx`
- `modules/page/components/InjectedOptionMenu.tsx`
- `modules/shared/ui/MenuSample.tsx`

**사용 위치:** 특정 UI 컴포넌트에만 사용

**크기:** 약 30-50KB
**사용 빈도:** 낮음

**최적화 방법:**
```typescript
// 이미 동적 import 사용 가능
const DarkModeToggle = lazy(() => import('./dark-mode-toggle'));
```

**효과:**
- 필요한 페이지에서만 로드
- 초기 번들 크기 감소: 약 30KB

---

## 📊 전체 최적화 효과

| 라이브러리 | 크기 | 위치 | 최적화 방법 | 예상 감소 |
|-----------|------|------|-------------|-----------|
| react-share | 50KB | ShareBar | Lazy load | 50KB |
| @orama/orama | 100KB | Search | Lazy load | 100KB |
| fuse.js | 60KB | HeaderSearch | Conditional load | 60KB |
| @headlessui | 30KB | DarkModeToggle | Lazy load | 30KB |

**총 예상 감소: 240KB (24%)**

---

## 🎯 우선순위별 적용

### P0: 즉시 적용 (효과 큼)

#### 1. react-share (ShareBar)
```typescript
// modules/shared/ShareBar.tsx
import { lazy, Suspense } from 'react';

const ShareButtons = lazy(() => import('./ShareButtons'));

export default function ShareBar({ data, url }) {
  return (
    <div className="mt-16 overflow-x-auto">
      <Suspense fallback={<div className="h-8 animate-pulse bg-gray-200" />}>
        <ShareButtons data={data} url={url} />
      </Suspense>
    </div>
  );
}
```

**이유:**
- 모든 MDX 페이지에 포함됨
- 사용자가 스크롤해서 하단에 도달할 때 로드 가능
- 즉시 적용 가능
- 효과 큼 (50KB 감소)

---

### P1: 추가 개선 (검색 사용 시)

#### 2. @orama/orama (검색)
```typescript
// modules/common/search/search.tsx
useEffect(() => {
  const initializeSearch = async () => {
    if (open) { // 검색 열렸을 때만
      const { create } = await import('@orama/orama');
      // 초기화 로직
    }
  };
  
  initializeSearch();
}, [open]);
```

**이유:**
- 검색 안 쓰는 사용자는 로드 안 됨
- 효과 큼 (100KB 감소)
- 구현 복잡도 중간

---

### P2: 선택적 적용

#### 3. fuse.js (헤더 검색)
- 검색 기능을 항상 사용한다면 적용 안 함
- 사용률이 낮다면 적용 권장

#### 4. @headlessui/react
- 이미 특정 컴포넌트에만 사용됨
- 추가 최적화 필요성 낮음

---

## 🚀 즉시 적용 가능한 코드

### ShareBar 동적 로딩

```typescript
// modules/shared/ShareBar.tsx
"use client";
import { lazy, Suspense } from "react";

const ShareButtons = lazy(() => import("./ShareButtons"));

const ShareBar = ({ data, url }) => {
  return (
    <div className="mt-16 overflow-x-auto">
      <Suspense fallback={<div className="h-8" />}>
        <ShareButtons data={data} url={url} />
      </Suspense>
    </div>
  );
};

export default ShareBar;
```

---

## ✅ 체크리스트

- [ ] ShareBar 동적 로딩 적용
- [ ] @orama/orama 조건부 로딩 검토
- [ ] fuse.js 조건부 로딩 검토
- [ ] 번들 크기 재측정
- [ ] 성능 개선 확인

---

## 📈 예상 결과

### Before
```
초기 번들: 617MB
react-share 포함: 모든 페이지

Performance: 39/100
```

### After
```
초기 번들: ~570MB (47MB 감소)
react-share: 스크롤 시 로드

Performance: 45-50/100 (예상)
```

---

**가장 효과적인 최적화: ShareBar 동적 로딩!** 🚀

모든 MDX 페이지에 포함되어 있고, 구현이 간단하며 효과가 큽니다.

