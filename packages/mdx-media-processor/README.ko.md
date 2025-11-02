# @norkive/mdx-media-processor

[![npm version](https://img.shields.io/npm/v/@norkive/mdx-media-processor)](https://www.npmjs.com/package/@norkive/mdx-media-processor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

의존성 주입 기반 MDX 콘텐츠 미디어 프로세서. Notion 이미지와 문서를 Cloudinary 또는 다른 업로더 서비스로 처리합니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [설치](#-설치)
- [빠른 시작](#-빠른-시작)
- [설정 가이드](#-설정-가이드)
  - [Cloudinary 설정](#step-2-cloudinary-설정)
  - [Redis 캐시 설정](#step-3-redis-캐시-설정-선택사항이지만-권장)
  - [대체 스토리지 서비스](#-대체-스토리지-서비스)
- [API 참조](#-api-참조)
- [설정 참조](#-설정-참조)
- [완전한 예제](#-완전한-예제)
- [사용 사례](#-사용-사례)
- [FAQ](#-faq)
- [문제 해결](#-문제-해결)

## ✨ 주요 기능

- 🔄 **의존성 주입**: 커스터마이징 가능한 업로더와 캐시를 가진 유연한 아키텍처
- 🖼️ **이미지 처리**: Notion 이미지를 Cloudinary 또는 다른 서비스로 변환
- 📄 **문서 처리**: PDF, DOC, RTF 등 다양한 문서 타입 처리
- 🎯 **Notion 통합**: Notion URL을 자동으로 감지하고 처리
- 💾 **캐시 지원**: 성능 향상을 위한 선택적 캐싱 레이어
- 📊 **통계**: 처리 통계 추적 (이미지, 문서, 캐시 히트)
- 🛡️ **TypeScript**: 완전한 타입 정의 포함
- 📦 **Zero Dependencies**: 가벼운 패키지

## 📦 설치

```bash
npm install @norkive/mdx-media-processor
# 또는
yarn add @norkive/mdx-media-processor
# 또는
pnpm add @norkive/mdx-media-processor
```

## 🚀 빠른 시작

### 최소 설정 (캐시 없음)

빠른 테스트나 작은 프로젝트용:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';

// 캐시 없이 간단한 업로더
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: async (url, fileName) => {
      // 여기에 업로드 구현
      // 전체 예제는 아래 설정 가이드 참조
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      // ... 스토리지 서비스에 업로드
      return {
        secure_url: 'https://your-storage.com/file.jpg',
        public_id: fileName,
        width: 0,
        height: 0,
        format: 'jpg',
        bytes: buffer.byteLength,
      };
    },
  },
});

// 사용
const processed = await processor.processNotionImages(mdxContent);
```

### 완전한 설정 (권장)

아래 [설정 가이드](#-설정-가이드) 섹션 참조:
- 전체 Cloudinary 설정
- Redis 캐싱 설정
- 프로덕션 준비 예제
- 대체 스토리지 서비스 (AWS S3, Imgix 등)

## 📖 API 참조

### `createMediaProcessor(config: MediaProcessorConfig): MediaProcessor`

제공된 설정으로 새로운 미디어 프로세서 인스턴스를 생성합니다.

**파라미터:**
- `config.uploader` - 업로더 구현체 (필수)
- `config.cache` - 선택적 캐시 매니저
- `config.options` - 처리 옵션

**반환값:**
- `MediaProcessor` 인스턴스

### `MediaProcessor.processNotionImages(content: string): Promise<string>`

MDX 콘텐츠의 Notion 이미지 URL을 처리합니다.

**파라미터:**
- `content` - MDX 콘텐츠 문자열

**반환값:**
- Cloudinary URL이 포함된 처리된 콘텐츠

**예제:**
```typescript
const processed = await processor.processNotionImages(`
![image.jpg](https://notion.so/image.jpg)
`);
```

### `MediaProcessor.processDocumentLinks(content: string): Promise<string>`

MDX 콘텐츠의 문서 링크 (PDF, DOC 등)를 처리합니다.

**파라미터:**
- `content` - MDX 콘텐츠 문자열

**반환값:**
- 업로드된 문서 URL이 포함된 처리된 콘텐츠

**예제:**
```typescript
const processed = await processor.processDocumentLinks(`
[document.pdf](https://notion.so/file.pdf)
`);
```

### `MediaProcessor.processPageCover(coverUrl: string | null): Promise<string | null>`

페이지 커버 이미지 URL을 처리합니다.

**파라미터:**
- `coverUrl` - 커버 이미지 URL 또는 null

**반환값:**
- 처리된 커버 URL 또는 null

### 통계

```typescript
// 통계 조회
const imageStats = processor.getImageStats();
const docStats = processor.getDocumentStats();

// 통계 출력
processor.printImageStats();
processor.printDocumentStats();

// 통계 초기화
processor.resetStats();
```

## 🔧 설정 가이드

이 패키지는 **의존성 주입** 패턴을 사용하므로, 파일 업로드와 캐싱(선택적)에 대한 자체 구현을 제공해야 합니다. 이를 통해 패키지가 유연해지고 모든 스토리지 서비스와 호환됩니다.

### Step 1: 필수 의존성 설치

Cloudinary (권장):
```bash
npm install cloudinary
npm install --save-dev @types/cloudinary
```

Redis 캐싱 (선택적):
```bash
npm install @upstash/redis
# 또는
npm install redis
```

### Step 2: Cloudinary 설정

#### 2.1 Cloudinary 계정 생성

1. [https://cloudinary.com/users/register](https://cloudinary.com/users/register)에서 회원가입
2. Dashboard → Settings 이동
3. 자격 증명 복사:
   - Cloud Name
   - API Key
   - API Secret

#### 2.2 환경 변수 설정

`.env.local` 또는 `.env` 파일 생성:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=uploads
```

#### 2.3 업로더 구현 생성

`lib/cloudinary-uploader.ts` 파일 생성:

```typescript
import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryUploadResult } from '@norkive/mdx-media-processor';

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * URL에서 파일을 다운로드하여 Cloudinary에 업로드
 */
export async function uploadFileFromUrl(
  url: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  try {
    // URL에서 파일 다운로드
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MediaProcessor/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`);
    }

    const fileBuffer = Buffer.from(await response.arrayBuffer());

    // 파일 타입 결정
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension);

    // base64로 변환
    const base64File = fileBuffer.toString('base64');
    const mimeType = isImage
      ? `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`
      : `application/${fileExtension}`;
    const dataURI = `data:${mimeType};base64,${base64File}`;

    // 파일명 안전하게 처리
    const sanitizedFileName = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
      .substring(0, 50);

    const timestamp = Date.now();
    const fileNameHash = Buffer.from(sanitizedFileName)
      .toString('base64')
      .substring(0, 10);
    const public_id = `${fileExtension}_${timestamp}_${fileNameHash}`;

    // Cloudinary에 업로드
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: isImage ? 'image' : 'raw',
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'uploads',
      public_id: public_id,
      overwrite: false,
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width || 0,
      height: result.height || 0,
      format: result.format || fileExtension,
      bytes: result.bytes || 0,
    };
  } catch (error) {
    console.error('Cloudinary 업로드 실패:', error);
    throw error;
  }
}
```

### Step 3: Redis 캐시 설정 (선택사항이지만 권장)

캐싱은 중복 업로드를 방지하여 성능을 크게 향상시킵니다.

#### 3.1 Upstash Redis 데이터베이스 생성

1. [https://upstash.com](https://upstash.com)에서 회원가입
2. 새로운 Redis 데이터베이스 생성
3. 자격 증명 복사:
   - REST URL
   - REST Token

#### 3.2 환경 변수 설정

```env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

#### 3.3 캐시 매니저 구현 생성

`lib/redis-cache.ts` 파일 생성:

```typescript
import { Redis } from '@upstash/redis';
import type { CacheManager } from '@norkive/mdx-media-processor';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_PREFIX = 'image_cache:';
const CACHE_EXPIRY = 24 * 60 * 60; // 24시간

export const cacheManager: CacheManager = {
  getCachedImageUrl: async (originalUrl: string): Promise<string | null> => {
    try {
      const cacheKey = `${CACHE_PREFIX}${hashUrl(originalUrl)}`;
      const cached = await redis.get(cacheKey);

      if (!cached || typeof cached !== 'string') return null;

      const cacheInfo = JSON.parse(cached);
      return cacheInfo.cachedUrl || null;
    } catch (error) {
      console.error('Redis 캐시 읽기 실패:', error);
      return null;
    }
  },

  cacheImageUrl: async (
    originalUrl: string,
    cachedUrl: string,
    metadata?: {
      fileName?: string;
      size?: number;
      contentType?: string;
    }
  ): Promise<void> => {
    try {
      const cacheKey = `${CACHE_PREFIX}${hashUrl(originalUrl)}`;
      const cacheInfo = {
        originalUrl,
        cachedUrl,
        ...metadata,
        cachedAt: new Date().toISOString(),
      };

      await redis.setex(cacheKey, CACHE_EXPIRY, JSON.stringify(cacheInfo));
    } catch (error) {
      console.error('Redis 캐시 쓰기 실패:', error);
    }
  },
};

function hashUrl(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32비트 정수로 변환
  }
  return Math.abs(hash).toString(36);
}
```

**대안: In-Memory 캐시 (테스트용)**

Redis를 사용하지 않으려면 간단한 인메모리 캐시를 사용할 수 있습니다:

```typescript
import type { CacheManager } from '@norkive/mdx-media-processor';

const cacheMap = new Map<string, { url: string; expiresAt: number }>();

export const memoryCache: CacheManager = {
  getCachedImageUrl: async (originalUrl: string) => {
    const cached = cacheMap.get(originalUrl);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url;
    }
    cacheMap.delete(originalUrl);
    return null;
  },

  cacheImageUrl: async (
    originalUrl: string,
    cachedUrl: string,
    metadata?: any
  ) => {
    cacheMap.set(originalUrl, {
      url: cachedUrl,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24시간
    });
  },
};
```

### Step 4: 미디어 프로세서 초기화

이제 모든 것을 함께 결합합니다:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';
import { uploadFileFromUrl } from './lib/cloudinary-uploader';
import { cacheManager } from './lib/redis-cache';

const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: uploadFileFromUrl,
    // 선택적: 이미지 및 PDF용 특정 메서드
    uploadImageFromUrl: uploadFileFromUrl,
    uploadPdfFromUrl: uploadFileFromUrl,
  },
  cache: cacheManager, // 선택적: 캐싱을 원하지 않으면 생략
});
```

## 🔧 설정 참조

### CloudinaryUploader 인터페이스

```typescript
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

interface CloudinaryUploader {
  uploadFileFromUrl(url: string, fileName: string): Promise<CloudinaryUploadResult>;
  uploadImageFromUrl?(url: string, fileName: string): Promise<CloudinaryUploadResult>;
  uploadPdfFromUrl?(url: string, fileName: string): Promise<CloudinaryUploadResult>;
}
```

### CacheManager 인터페이스

```typescript
interface CacheManager {
  getCachedImageUrl(originalUrl: string): Promise<string | null>;
  cacheImageUrl(
    originalUrl: string,
    cachedUrl: string,
    metadata?: {
      fileName?: string;
      size?: number;
      contentType?: string;
    }
  ): Promise<void>;
}
```

## 🌐 대체 스토리지 서비스

이 패키지는 **의존성 주입**을 사용하므로 Cloudinary에 제한되지 않습니다. 파일을 업로드하고 URL을 반환할 수 있는 모든 스토리지 서비스를 사용할 수 있습니다.

### 지원되는 서비스 (개념적)

`CloudinaryUploader` 인터페이스는 의도적으로 일반적으로 설계되어 다음을 포함한 모든 스토리지 서비스에 대한 업로더를 구현할 수 있습니다:

- **Cloudinary** (위에 작동하는 예제와 함께 문서화됨)
- **AWS S3** - `@aws-sdk/client-s3`를 사용하여 업로드 구현
- **Google Cloud Storage** - `@google-cloud/storage`를 사용하여 업로드 구현
- **Azure Blob Storage** - `@azure/storage-blob`를 사용하여 업로드 구현
- **Imgix** - 먼저 서버에 업로드한 다음 Imgix를 통해 제공
- **자신의 서버** - 자체 파일 업로드 API 구현
- **모든 스토리지 서비스** - 파일을 받고 URL을 반환할 수 있는 한

### 구현 요구사항

다른 스토리지 서비스를 사용하려면 `CloudinaryUploader` 인터페이스를 구현해야 합니다:

```typescript
const uploader: CloudinaryUploader = {
  uploadFileFromUrl: async (url: string, fileName: string) => {
    // 1. URL에서 파일 다운로드
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    // 2. 스토리지 서비스에 업로드
    // (여기에 스토리지 서비스의 SDK 사용)
    const uploadedUrl = await yourStorageService.upload(buffer, fileName);
    
    // 3. 필요한 형식으로 반환
    return {
      secure_url: uploadedUrl,
      public_id: fileName,
      width: 0,      // 선택적: 가능하면 이미지에서 추출
      height: 0,     // 선택적: 가능하면 이미지에서 추출
      format: fileName.split('.').pop() || 'unknown',
      bytes: buffer.byteLength,
    };
  },
};
```

**참고**: 위의 예제는 개념적입니다. 실제 구현 세부사항은 스토리지 서비스의 공식 문서를 참조하세요.

## 💡 완전한 예제

Notion → MDX 변환 스크립트를 위한 완전한 예제입니다:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';
import { uploadFileFromUrl } from './lib/cloudinary-uploader';
import { cacheManager } from './lib/redis-cache';

// 프로세서 초기화
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: uploadFileFromUrl,
  },
  cache: cacheManager, // 선택적이지만 권장
});

// Notion 콘텐츠 처리
async function convertNotionToMDX(notionContent: string, coverUrl?: string) {
  let processedContent = notionContent;

  // 1. 이미지 처리
  console.log('이미지 처리 중...');
  processedContent = await processor.processNotionImages(processedContent);

  // 2. 문서 처리 (PDF, DOC 등)
  console.log('문서 처리 중...');
  processedContent = await processor.processDocumentLinks(processedContent);

  // 3. 커버 이미지 처리
  let processedCover = coverUrl;
  if (coverUrl) {
    console.log('커버 이미지 처리 중...');
    processedCover = await processor.processPageCover(coverUrl);
  }

  // 4. 통계 출력
  processor.printImageStats();
  processor.printDocumentStats();

  return {
    content: processedContent,
    cover: processedCover,
    stats: {
      images: processor.getImageStats(),
      documents: processor.getDocumentStats(),
    },
  };
}

// 사용
const result = await convertNotionToMDX(rawMarkdown, coverImageUrl);
console.log(`처리된 이미지 ${result.stats.images.processedImagesCount}개`);
```

## 🎯 사용 사례

- Notion to MDX 변환 파이프라인
- 콘텐츠 마이그레이션 도구
- 이미지 최적화 워크플로우
- 문서 관리 시스템
- 블로그 및 CMS 플랫폼

## ❓ FAQ

### Cloudinary가 필요한가요?

아니요! 이 패키지는 모든 스토리지 서비스와 함께 작동합니다. Cloudinary는 단지 한 예시일 뿐입니다. 다음을 사용할 수 있습니다:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- Imgix
- 자신의 서버
- 파일을 저장할 수 있는 모든 서비스

### 캐싱을 위해 Redis가 필요한가요?

아니요, 캐싱은 선택적입니다. 하지만 프로덕션 사용에서는 다음 이유로 강력히 권장됩니다:
- 스토리지 서비스에 대한 API 호출 감소
- 성능 크게 향상
- 비용 절감

개발 또는 작은 프로젝트에는 인메모리 캐싱도 사용할 수 있습니다 (설정 가이드 참조).

### Notion 없이 사용할 수 있나요?

네! 이 패키지는 모든 MDX 콘텐츠를 처리합니다. 함수 이름의 "Notion"은 단지 감지하는 URL 패턴(예: Notion의 보안 S3 URL)을 의미합니다. 모든 MDX 콘텐츠와 함께 사용할 수 있습니다.

## 🐛 문제 해결

### Module not found: '@norkive/mdx-media-processor'

패키지가 설치되었는지 확인하세요:
```bash
npm install @norkive/mdx-media-processor
```

### 타입 오류

TypeScript가 설치되어 있고 `tsconfig.json`에 적절한 모듈 해석이 있는지 확인하세요:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### 업로드 오류

- 환경 변수가 올바르게 설정되었는지 확인
- Cloudinary/AWS 자격 증명이 유효한지 확인
- 스토리지 서비스에 대한 네트워크 연결 확인
- 콘솔 로그의 오류 메시지 검토

## 📄 라이선스

MIT

## 🔗 관련 패키지

- [@norkive/mdx-safe-processor](https://www.npmjs.com/package/@norkive/mdx-safe-processor) - MDX 콘텐츠 정제
- [@norkive/youtube-utils](https://www.npmjs.com/package/@norkive/youtube-utils) - YouTube URL 유틸리티

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해주세요.

## 📧 연락처

ryoon.with.wisdomtrees@gmail.com

