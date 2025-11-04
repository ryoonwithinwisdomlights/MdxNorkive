# @norkive/mdx-cloudinary-processor

[![npm version](https://img.shields.io/npm/v/@norkive/mdx-cloudinary-processor)](https://www.npmjs.com/package/@norkive/mdx-cloudinary-processor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

MDX content media processor with Cloudinary integration. Process images and documents from Notion to Cloudinary.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
  - [With Factory (Recommended)](#with-factory-recommended)
  - [With Cache](#with-cache)
  - [Without Cache](#without-cache)
- [API Reference](#-api-reference)
- [Configuration](#-configuration)
- [Examples](#-examples)
- [Testing](#-testing)
- [FAQ](#-faq)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- 🔄 **Cloudinary Integration**: Built-in Cloudinary upload functions
- 🖼️ **Image Processing**: Convert Notion images to Cloudinary
- 📄 **Document Processing**: Handle PDF, DOC, RTF and other document types
- 🎯 **Notion Integration**: Automatically detect and process Notion URLs
- 💾 **Optional Caching**: Support for Redis or in-memory caching
- 📊 **Statistics**: Track processing stats (images, documents, cache hits)
- 🛡️ **TypeScript**: Full type definitions included
- 🏭 **Factory Pattern**: Easy initialization with factory file

## 📦 Installation

```bash
npm install @norkive/mdx-cloudinary-processor cloudinary
# or
yarn add @norkive/mdx-cloudinary-processor cloudinary
# or
pnpm add @norkive/mdx-cloudinary-processor cloudinary
```

## 🚀 Quick Start

### With Factory (Recommended)

The easiest way to use this package is with a factory file that handles all configuration:

**1. Create `lib/media-processor-factory.ts`:**

```typescript
import {
  createMediaProcessor,
  initializeCloudinary,
  setDefaultFolder,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  type CloudinaryUploader,
  type CacheManager,
  type CloudinaryConfig,
} from "@norkive/mdx-cloudinary-processor";

// Your environment variables or config
const cloudinaryConfig: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  folder: process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads",
};

// Initialize Cloudinary
initializeCloudinary(cloudinaryConfig);
setDefaultFolder(cloudinaryConfig.folder || "uploads");

// Optional: Set up cache (see examples below)
const cache: CacheManager | undefined = undefined; // or your cache implementation

// Create uploader
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

// Export processor
export const mediaProcessor = createMediaProcessor({
  uploader,
  cache, // Optional: omit if you don't want caching
});
```

**2. Use it:**

```typescript
import { mediaProcessor } from "@/lib/media-processor-factory";

// Process Notion content
const processed = await mediaProcessor.processNotionImages(mdxContent);
```

### With Cache

For production use, caching is highly recommended to avoid duplicate uploads:

```typescript
import {
  createMediaProcessor,
  initializeCloudinary,
  setDefaultFolder,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  type CloudinaryUploader,
  type CacheManager,
} from "@norkive/mdx-cloudinary-processor";

// 1. Initialize Cloudinary
initializeCloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
setDefaultFolder("uploads");

// 2. Create cache manager (Redis example)
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const cache: CacheManager = {
  getCachedImageUrl: async (url: string) => {
    const cached = await redis.get(`image_cache:${url}`);
    return cached ? (cached as string) : null;
  },
  cacheImageUrl: async (originalUrl: string, cachedUrl: string) => {
    await redis.set(`image_cache:${originalUrl}`, cachedUrl, {
      ex: 24 * 60 * 60, // 24 hours
    });
  },
};

// 3. Create processor
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

export const mediaProcessor = createMediaProcessor({
  uploader,
  cache, // Cache is included
});
```

### Without Cache

For small projects, testing, or when you don't need caching:

```typescript
import {
  createMediaProcessor,
  initializeCloudinary,
  setDefaultFolder,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  type CloudinaryUploader,
} from "@norkive/mdx-cloudinary-processor";

// 1. Initialize Cloudinary
initializeCloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
setDefaultFolder("uploads");

// 2. Create processor WITHOUT cache
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

export const mediaProcessor = createMediaProcessor({
  uploader,
  // cache is omitted - processor will work without it
});
```

**Note**: Without cache, every image/document will be uploaded every time, even if it was already processed. This is fine for:
- Development/testing
- One-time migrations
- Small projects with few images
- When you want fresh uploads every time

For production with many images, caching is strongly recommended.

## 📖 API Reference

### Cloudinary Functions

#### `initializeCloudinary(config: CloudinaryConfig): boolean`

Initialize Cloudinary SDK with your credentials.

```typescript
import { initializeCloudinary } from "@norkive/mdx-cloudinary-processor";

initializeCloudinary({
  cloud_name: "your-cloud",
  api_key: "your-key",
  api_secret: "your-secret",
  folder: "uploads", // optional
});
```

#### `setDefaultFolder(folder: string): void`

Set the default folder for uploads.

#### Upload Functions

All upload functions are exported from the package:

- `uploadFileToCloudinary(buffer, fileName, options?)`
- `uploadImageToCloudinary(buffer, fileName, options?)`
- `uploadPdfToCloudinary(buffer, fileName, options?)`
- `uploadFileFromUrl(url, fileName, options?)`
- `uploadImageFromUrl(url, fileName, options?)`
- `uploadPdfFromUrl(url, fileName, options?)`
- `deleteImageFromCloudinary(publicId)`
- `getOptimizedImageUrl(url, options?)`

### MediaProcessor

#### `createMediaProcessor(config: MediaProcessorConfig): MediaProcessor`

Creates a new media processor instance.

**Parameters:**
- `config.uploader` - Uploader implementation (required)
- `config.cache` - Optional cache manager
- `config.options` - Processing options (WebP, quality, etc.)

#### `processor.processNotionImages(content: string): Promise<string>`

Processes Notion image URLs in MDX content.

#### `processor.processDocumentLinks(content: string): Promise<string>`

Processes document links (PDF, DOC, etc.) in MDX content.

#### `processor.processPageCover(coverUrl: string | null): Promise<string | null>`

Processes page cover image URL.

#### Statistics

```typescript
const imageStats = processor.getImageStats();
const docStats = processor.getDocumentStats();
processor.printImageStats();
processor.printDocumentStats();
processor.resetStats();
```

## 🔧 Configuration

### Environment Variables

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_FOLDER=uploads

# Optional: For caching
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### Types

```typescript
interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  folder?: string;
}

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

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

## 💡 Examples

### Complete Example with Factory

```typescript
// lib/media-processor-factory.ts
import {
  createMediaProcessor,
  initializeCloudinary,
  setDefaultFolder,
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
  type CloudinaryUploader,
  type CacheManager,
} from "@norkive/mdx-cloudinary-processor";
import { Redis } from "@upstash/redis";

// Initialize Cloudinary
initializeCloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
setDefaultFolder(process.env.CLOUDINARY_UPLOAD_FOLDER || "uploads");

// Optional: Redis cache
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const cache: CacheManager = {
  getCachedImageUrl: async (url) => {
    const cached = await redis.get(`img:${url}`);
    return cached ? (cached as string) : null;
  },
  cacheImageUrl: async (original, cached) => {
    await redis.set(`img:${original}`, cached, { ex: 86400 });
  },
};

// Create uploader
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

// Export processor
export const mediaProcessor = createMediaProcessor({
  uploader,
  cache, // Optional: remove this line to disable caching
});

// Usage in your code
import { mediaProcessor } from "@/lib/media-processor-factory";

const processed = await mediaProcessor.processNotionImages(mdxContent);
```

### In-Memory Cache (No External Dependencies)

```typescript
import { createMediaProcessor, type CacheManager } from "@norkive/mdx-cloudinary-processor";

const memoryCache = new Map<string, { url: string; expiresAt: number }>();

const cache: CacheManager = {
  getCachedImageUrl: async (url) => {
    const cached = memoryCache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url;
    }
    memoryCache.delete(url);
    return null;
  },
  cacheImageUrl: async (original, cached) => {
    memoryCache.set(original, {
      url: cached,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
  },
};

const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl,
    uploadImageFromUrl,
    uploadPdfFromUrl,
  },
  cache: memoryCache, // Simple in-memory cache
});
```

## 🧪 Testing

### Example Test Setup

```typescript
// __tests__/media-processor.test.ts
import { createMediaProcessor, initializeCloudinary } from "@norkive/mdx-cloudinary-processor";

// Mock Cloudinary in tests
jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
    },
  },
}));

describe("MediaProcessor", () => {
  beforeAll(() => {
    initializeCloudinary({
      cloud_name: "test",
      api_key: "test",
      api_secret: "test",
    });
  });

  it("should process images without cache", async () => {
    const processor = createMediaProcessor({
      uploader: {
        uploadFileFromUrl: jest.fn().mockResolvedValue({
          secure_url: "https://cloudinary.com/image.jpg",
          public_id: "test",
          width: 100,
          height: 100,
          format: "jpg",
          bytes: 1000,
        }),
      },
      // No cache provided
    });

    const result = await processor.processNotionImages("![test](https://notion.so/image.jpg)");
    expect(result).toContain("cloudinary.com");
  });

  it("should use cache when provided", async () => {
    const mockCache = {
      getCachedImageUrl: jest.fn().mockResolvedValue("https://cached.com/image.jpg"),
      cacheImageUrl: jest.fn(),
    };

    const processor = createMediaProcessor({
      uploader: {
        uploadFileFromUrl: jest.fn(),
      },
      cache: mockCache,
    });

    const result = await processor.processNotionImages("![test](https://notion.so/image.jpg)");
    expect(mockCache.getCachedImageUrl).toHaveBeenCalled();
  });
});
```

## ❓ FAQ

### Do I need to provide a cache?

**No, caching is completely optional.** The processor will work without it. However:
- **With cache**: Faster, avoids duplicate uploads, saves API costs
- **Without cache**: Simpler setup, but every image/document uploads every time

### When should I use cache?

**Use cache if:**
- Production environment
- Processing many images/documents
- Want to avoid duplicate uploads
- Want better performance

**Skip cache if:**
- Development/testing
- One-time migrations
- Small projects with few images
- Want fresh uploads every time

### Can I use my own cache implementation?

Yes! Implement the `CacheManager` interface:

```typescript
const myCache: CacheManager = {
  getCachedImageUrl: async (url) => {
    // Your implementation
  },
  cacheImageUrl: async (original, cached, meta) => {
    // Your implementation
  },
};
```

### How do I handle errors?

The package throws errors that you can catch:

```typescript
try {
  const processed = await processor.processNotionImages(content);
} catch (error) {
  console.error("Processing failed:", error);
  // Handle error (fallback, retry, etc.)
}
```

## 🐛 Troubleshooting

### Cloudinary initialization fails

Make sure your environment variables are set correctly:
```bash
echo $CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY
echo $CLOUDINARY_API_SECRET
```

### Images not processing

1. Check that Notion URLs are being detected correctly
2. Verify Cloudinary upload is working: test `uploadImageFromUrl` directly
3. Check console logs for error messages

### Cache not working

1. Verify cache implementation matches `CacheManager` interface
2. Check cache connection (Redis, etc.)
3. Test cache functions directly

## 📄 License

MIT

## 🔗 Related

- [@norkive/mdx-safe-processor](https://www.npmjs.com/package/@norkive/mdx-safe-processor) - MDX content sanitization
- [@norkive/mdx-ui](https://www.npmjs.com/package/@norkive/mdx-ui) - MDX UI components (includes YouTube utilities)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

ryoon.with.wisdomtrees@gmail.com
