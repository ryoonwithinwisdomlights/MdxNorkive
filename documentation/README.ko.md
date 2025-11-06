# Norkive 문서

Norkive 문서에 오신 것을 환영합니다! 이 디렉토리는 개발자와 기여자를 위한 포괄적인 가이드를 제공합니다.

## 📚 문서 목차

### 시작하기

- **[개발 가이드](./DEVELOPMENT.ko.md)** - 로컬 설정 및 개발을 위한 완전한 가이드
  - 사전 요구사항 및 설치
  - 프로젝트 구조
  - 일일 개발 워크플로우
  - 콘텐츠 및 컴포넌트 추가
  - 문제 해결

### 기술 심화

- **[아키텍처](./ARCHITECTURE.ko.md)** - 시스템 설계 및 기술적 의사결정
  - 데이터 플로우 및 변환 파이프라인
  - 핵심 컴포넌트 (Fumadocs + Content Collections)
  - 캐싱 전략 (3계층 아키텍처)
  - 번들 최적화
  - 트레이드오프를 포함한 설계 결정

- **[마이그레이션 스토리](./MIGRATION.ko.md)** - react-notion-x에서 MDX로의 진화
  - Phase 1: react-notion-x (중단됨)
  - Phase 2: Notion API SSR/ISR 실험
  - Phase 3: 하이브리드 접근 시도
  - Phase 4: MDX 정적 생성 (최종)
  - 배운 교훈 및 인사이트

- **[성능 최적화](./PERFORMANCE.ko.md)** - 최적화 전략 및 벤치마크
  - Core Web Vitals (Lighthouse 96/100)
  - 번들 최적화 (61% 감소)
  - 이미지 최적화 (70% 크기 감소)
  - 빌드 성능 (75% 단축)
  - 모니터링 및 메트릭

### 기여하기

- **[기여 가이드](./CONTRIBUTING.ko.md)** - 이 프로젝트에 기여하는 방법
  - 행동 강령
  - 버그 리포트 및 기능 제안
  - Pull Request 프로세스
  - 코딩 표준
  - 커밋 가이드라인

---

## 빠른 네비게이션

### 신규 개발자를 위해

1. [개발 가이드](./DEVELOPMENT.ko.md)로 시작
2. 시스템을 이해하기 위해 [아키텍처](./ARCHITECTURE.ko.md) 읽기
3. 변경하기 전에 [기여 가이드](./CONTRIBUTING.ko.md) 확인

### 성능 애호가를 위해

- [성능 가이드](./PERFORMANCE.ko.md) - 상세한 최적화 기법
- [아키텍처](./ARCHITECTURE.ko.md) - 번들 최적화 및 캐싱

### 역사에 관심 있는 분들을 위해

- [마이그레이션 스토리](./MIGRATION.ko.md) - 기술적 진화 및 배운 교훈

---

## 추가 리소스

### 외부 문서

- [Next.js 문서](https://nextjs.org/docs)
- [Content Collections](https://www.content-collections.dev/)
- [Fumadocs](https://fumadocs.vercel.app/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### 프로젝트 링크

- [GitHub 저장소](https://github.com/ryoonwithinwisdomlights/norkive)
- [라이브 데모](https://mdx-norkive.vercel.app/)
- [이슈 트래커](https://github.com/ryoonwithinwisdomlights/norkive/issues)

---

## 문서 규칙

### 코드 예시

모든 코드 예시는 TypeScript를 사용하며 다음 규칙을 따릅니다:

```typescript
// ✅ 좋은 예 - 권장하는 방법
const goodExample = "모범 사례를 보여줍니다";

// ❌ 나쁜 예 - 피해야 할 방법
const badExample = "하지 말아야 할 것을 보여줍니다";
```

### 파일 경로

```bash
# 프로젝트 루트로부터의 절대 경로
/Users/.../norkive/app/page.tsx

# 상대 경로 (문서에서 선호)
app/page.tsx
modules/common/Button.tsx
```

### 명령줄

```bash
# 주석은 명령이 하는 일을 설명합니다
npm run dev  # 개발 서버 시작
```

---

## 문서 개선하기

문서 개선은 언제나 환영합니다! 다음을 발견하시면:
- 오타 또는 문법 오류
- 오래된 정보
- 누락된 설명
- 혼란스러운 섹션

이슈를 열거나 Pull Request를 제출해주세요.

### 문서 스타일 가이드

1. **명확하게**: 단순하고 직접적인 언어 사용
2. **완전하게**: 필요한 모든 맥락 포함
3. **실용적으로**: 실제 예시 제공
4. **최신으로**: 코드 변경 사항과 함께 문서 업데이트

---

## 문서 버전 관리

| 문서 | 최종 업데이트 | 버전 |
|----------|--------------|---------|
| 아키텍처 | 2025-01-15 | 1.0 |
| 마이그레이션 | 2025-01-15 | 1.0 |
| 성능 | 2025-01-15 | 1.0 |
| 개발 | 2025-01-15 | 1.0 |
| 기여하기 | 2025-01-15 | 1.0 |

---

## 궁금한 점이 있으신가요?

원하는 정보를 찾을 수 없다면:

1. 메인 README의 [FAQ](../README.md#faq) 확인
2. [GitHub Issues](https://github.com/ryoonwithinwisdomlights/norkive/issues) 검색
3. [GitHub Discussions](https://github.com/ryoonwithinwisdomlights/norkive/discussions)에 질문
4. 이메일: ryoon.with.wisdomtrees@gmail.com

---

즐거운 코딩 되세요! 🚀

