# Media Processor 리팩토링

## 📋 개요

의존성 주입 구조로 리팩토링하여 패키지화 준비를 완료했습니다.

## ✅ 완료된 작업

### 1. 인터페이스 정의
- `CloudinaryUploader` - 업로더 인터페이스
- `CacheManager` - 캐시 매니저 인터페이스
- `MediaProcessorConfig` - 프로세서 설정 타입

### 2. MediaProcessor 클래스
- 의존성 주입을 통한 유연한 구조
- 이미지 및 문서 처리 통합
- 통계 수집 기능

### 3. 팩토리 함수
- `createMediaProcessor()` - 프로세서 생성 함수

### 4. 하위 호환성 유지
- 기존 함수들은 내부적으로 MediaProcessor를 사용
- 기존 코드 변경 없이 동작

## 📦 파일 구조

```
cloudinary/
├── types.ts                    # 인터페이스 정의
├── media-processor.ts          # MediaProcessor 클래스
├── factory.ts                   # 팩토리 함수
├── image-processor.ts          # 기존 함수 (wrapper)
├── document-processor.ts       # 기존 함수 (wrapper)
├── enhanced-image-processor.ts # WebP 최적화
└── index.ts                    # Export 파일
```

## 🚀 사용 방법

### 새 방식 (권장)

```typescript
import { createMediaProcessor } from '@/lib/utils/mdx-data-processing/cloudinary';
import { uploadFileFromUrl } from '@/lib/cloudinary';
import { imageCacheManager } from '@/lib/cache/image_cache_manager';

// 프로세서 생성
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: async (url, fileName) => {
      return await uploadFileFromUrl(url, fileName);
    }
  },
  cache: {
    getCachedImageUrl: async (url) => {
      return await imageCacheManager.getCachedImageUrl(url);
    },
    cacheImageUrl: async (original, cached, meta) => {
      await imageCacheManager.cacheImageUrl(original, cached, meta);
    }
  },
  options: {
    enableWebP: true,
    quality: 85
  }
});

// 사용
const processedContent = await processor.processNotionImages(content);
const processedDocs = await processor.processDocumentLinks(content);
const coverUrl = await processor.processPageCover(cover);
```

### 기존 방식 (하위 호환성)

```typescript
import { processNotionImages, processDocumentLinks } from '@/lib/utils/mdx-data-processing/cloudinary';

// 기존 코드 그대로 동작
const processed = await processNotionImages(content);
```

## 📊 통계

```typescript
// 통계 조회
const imageStats = processor.getImageStats();
const documentStats = processor.getDocumentStats();

// 통계 출력
processor.printImageStats();
processor.printDocumentStats();

// 통계 초기화
processor.resetStats();
```

## 🔄 다음 단계

1. ✅ 인터페이스 정의 및 리팩토링 완료
2. 패키지 생성 및 빌드 설정
3. 의존성 정리 (Cloudinary, Redis)
4. 테스트 작성
5. npm 배포

---

**작성일**: 2025-11-01
**목적**: 의존성 주입 구조로 리팩토링하여 패키지화 준비

