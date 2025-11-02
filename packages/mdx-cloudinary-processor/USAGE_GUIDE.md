# Usage Guide: @norkive/mdx-cloudinary-processor

This guide provides detailed usage scenarios and best practices for using `@norkive/mdx-cloudinary-processor`.

## Table of Contents

- [Factory Pattern (Recommended)](#factory-pattern-recommended)
- [Direct Usage](#direct-usage)
- [Caching Strategies](#caching-strategies)
- [Error Handling](#error-handling)
- [Performance Tips](#performance-tips)

## Factory Pattern (Recommended)

The factory pattern centralizes all configuration in one place, making it easy to reuse across your application.

### Basic Factory Setup

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
} from "@norkive/mdx-cloudinary-processor";
import { EXTERNAL_CONFIG } from "@/config/external.config";

// 1. Initialize Cloudinary (required)
initializeCloudinary({
  cloud_name: EXTERNAL_CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: EXTERNAL_CONFIG.CLOUDINARY_API_KEY,
  api_secret: EXTERNAL_CONFIG.CLOUDINARY_API_SECRET,
});
setDefaultFolder(EXTERNAL_CONFIG.CLOUDINARY_UPLOAD_FOLDER);

// 2. Create uploader
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

// 3. Export processor (without cache)
export const mediaProcessor = createMediaProcessor({
  uploader,
  // cache omitted - works without it
});
```

### Factory with Cache

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
import { redisCacheManager } from "@/lib/cache/redis_cache_manager";

// Initialize Cloudinary
initializeCloudinary({ /* ... */ });

// Create cache manager
const cache: CacheManager = {
  getCachedImageUrl: redisCacheManager.getCachedImageUrl.bind(redisCacheManager),
  cacheImageUrl: redisCacheManager.cacheImageUrl.bind(redisCacheManager),
};

// Create uploader
const uploader: CloudinaryUploader = {
  uploadFileFromUrl,
  uploadImageFromUrl,
  uploadPdfFromUrl,
};

// Export processor (with cache)
export const mediaProcessor = createMediaProcessor({
  uploader,
  cache, // Cache is included
});
```

### Usage from Factory

```typescript
// scripts/notion-mdx-all-in-one.ts
import { mediaProcessor } from "@/lib/media-processor-factory";

// Just use it - no configuration needed
const processed = await mediaProcessor.processNotionImages(mdxContent);
```

## Direct Usage

You can also create processors directly without a factory:

```typescript
import {
  createMediaProcessor,
  initializeCloudinary,
  uploadFileFromUrl,
  type CloudinaryUploader,
} from "@norkive/mdx-cloudinary-processor";

// Initialize once
initializeCloudinary({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Create processor
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl,
  },
  // No cache
});

// Use it
const result = await processor.processNotionImages(content);
```

## Caching Strategies

### When to Use Cache

**✅ Use cache when:**
- Processing the same content multiple times
- Production environment
- Large number of images/documents
- Want to reduce API costs
- Need better performance

**❌ Skip cache when:**
- Development/testing
- One-time migrations
- Small projects (< 100 images)
- Want fresh uploads every time
- Cache infrastructure is complex

### Cache Implementation Options

#### 1. Redis (Recommended for Production)

```typescript
import { Redis } from "@upstash/redis";

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
    await redis.set(`img:${original}`, cached, { ex: 86400 }); // 24 hours
  },
};
```

#### 2. In-Memory (For Development)

```typescript
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
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
  },
};
```

#### 3. File-Based Cache

```typescript
import fs from "fs/promises";
import path from "path";

const cacheDir = path.join(process.cwd(), ".cache");

const cache: CacheManager = {
  getCachedImageUrl: async (url) => {
    const key = Buffer.from(url).toString("base64");
    const filePath = path.join(cacheDir, `${key}.json`);
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const cached = JSON.parse(data);
      if (cached.expiresAt > Date.now()) {
        return cached.url;
      }
      await fs.unlink(filePath);
      return null;
    } catch {
      return null;
    }
  },
  cacheImageUrl: async (original, cached) => {
    const key = Buffer.from(original).toString("base64");
    const filePath = path.join(cacheDir, `${key}.json`);
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(
      filePath,
      JSON.stringify({ url: cached, expiresAt: Date.now() + 86400000 })
    );
  },
};
```

## Error Handling

### Basic Error Handling

```typescript
try {
  const processed = await mediaProcessor.processNotionImages(content);
} catch (error) {
  console.error("Processing failed:", error);
  // Fallback: use original content
  return content;
}
```

### Retry Logic

```typescript
async function processWithRetry(content: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await mediaProcessor.processNotionImages(content);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Retry ${i + 1}/${maxRetries}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Partial Processing

```typescript
async function processSafely(content: string) {
  // Process images one by one to avoid total failure
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let processed = content;
  const matches = [...content.matchAll(imageRegex)];

  for (const match of matches) {
    try {
      const [fullMatch, alt, url] = match;
      if (isNotionUrl(url)) {
        const processedUrl = await mediaProcessor.processPageCover(url);
        processed = processed.replace(fullMatch, `![${alt}](${processedUrl})`);
      }
    } catch (error) {
      console.error(`Failed to process image: ${match[2]}`, error);
      // Keep original URL on failure
    }
  }

  return processed;
}
```

## Performance Tips

### 1. Use Cache for Repeated Processing

```typescript
// Without cache: uploads every time
const processed1 = await processor.processNotionImages(content); // Uploads
const processed2 = await processor.processNotionImages(content); // Uploads again!

// With cache: uploads once
const processed1 = await processor.processNotionImages(content); // Uploads
const processed2 = await processor.processNotionImages(content); // Uses cache
```

### 2. Batch Processing

```typescript
// Process multiple contents in parallel
const contents = [content1, content2, content3];
const processed = await Promise.all(
  contents.map((content) => mediaProcessor.processNotionImages(content))
);
```

### 3. Process Only Once

```typescript
// Don't process already-processed content
function isAlreadyProcessed(content: string): boolean {
  return content.includes("res.cloudinary.com");
}

if (!isAlreadyProcessed(content)) {
  content = await mediaProcessor.processNotionImages(content);
}
```

### 4. Statistics for Monitoring

```typescript
const stats = mediaProcessor.getImageStats();
console.log(`Processed: ${stats.processedImagesCount}`);
console.log(`Cache hits: ${stats.cacheHitCount}`);
console.log(`Uploads: ${stats.cloudinaryUploadCount}`);
console.log(`Cache hit rate: ${stats.cacheHitCount / stats.processedImagesCount * 100}%`);
```

## Common Patterns

### Pattern 1: Notion to MDX Pipeline

```typescript
import { mediaProcessor } from "@/lib/media-processor-factory";

async function convertNotionToMDX(notionContent: string, coverUrl?: string) {
  let processed = notionContent;

  // 1. Process images
  processed = await mediaProcessor.processNotionImages(processed);

  // 2. Process documents
  processed = await mediaProcessor.processDocumentLinks(processed);

  // 3. Process cover
  const processedCover = coverUrl
    ? await mediaProcessor.processPageCover(coverUrl)
    : null;

  return { content: processed, cover: processedCover };
}
```

### Pattern 2: Conditional Processing

```typescript
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl,
  },
  cache: process.env.NODE_ENV === "production" ? redisCache : undefined,
});
```

### Pattern 3: Custom Error Handling

```typescript
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: async (url, fileName) => {
      try {
        return await uploadFileFromUrl(url, fileName);
      } catch (error) {
        console.error(`Upload failed for ${fileName}:`, error);
        // Return fallback or throw
        throw error;
      }
    },
  },
});
```

---

For more examples, see the [README.md](./README.md) file.

