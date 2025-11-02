# @norkive/mdx-media-processor

[![npm version](https://img.shields.io/npm/v/@norkive/mdx-media-processor)](https://www.npmjs.com/package/@norkive/mdx-media-processor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

MDX content media processor with dependency injection. Process images and documents from Notion to Cloudinary or any uploader service.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Setup Guide](#-setup-guide)
  - [Cloudinary Setup](#step-2-setup-cloudinary)
  - [Redis Cache Setup](#step-3-setup-redis-cache-optional-but-recommended)
  - [Alternative Storage Services](#-alternative-storage-services)
- [API Reference](#-api-reference)
- [Configuration Reference](#-configuration-reference)
- [Complete Example](#-complete-example)
- [Use Cases](#-use-cases)
- [FAQ](#-faq)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- 🔄 **Dependency Injection**: Flexible architecture with customizable uploader and cache
- 🖼️ **Image Processing**: Convert Notion images to Cloudinary or any service
- 📄 **Document Processing**: Handle PDF, DOC, RTF and other document types
- 🎯 **Notion Integration**: Automatically detect and process Notion URLs
- 💾 **Cache Support**: Optional caching layer for performance
- 📊 **Statistics**: Track processing stats (images, documents, cache hits)
- 🛡️ **TypeScript**: Full type definitions included
- 📦 **Zero Dependencies**: Lightweight package

## 📦 Installation

```bash
npm install @norkive/mdx-media-processor
# or
yarn add @norkive/mdx-media-processor
# or
pnpm add @norkive/mdx-media-processor
```

## 🚀 Quick Start

### Minimal Setup (No Cache)

For quick testing or small projects:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';

// Simple uploader without caching
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: async (url, fileName) => {
      // Your upload implementation here
      // See Setup Guide below for complete examples
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      // ... upload to your storage service
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

// Use it
const processed = await processor.processNotionImages(mdxContent);
```

### Complete Setup (Recommended)

See the [Setup Guide](#-setup-guide) section below for:
- Full Cloudinary configuration
- Redis caching setup
- Production-ready examples
- Alternative storage services (AWS S3, Imgix, etc.)

## 📖 API Reference

### `createMediaProcessor(config: MediaProcessorConfig): MediaProcessor`

Creates a new media processor instance with the provided configuration.

**Parameters:**
- `config.uploader` - Uploader implementation (required)
- `config.cache` - Optional cache manager
- `config.options` - Processing options

**Returns:**
- `MediaProcessor` instance

### `MediaProcessor.processNotionImages(content: string): Promise<string>`

Processes Notion image URLs in MDX content.

**Parameters:**
- `content` - MDX content string

**Returns:**
- Processed content with Cloudinary URLs

**Example:**
```typescript
const processed = await processor.processNotionImages(`
![image.jpg](https://notion.so/image.jpg)
`);
```

### `MediaProcessor.processDocumentLinks(content: string): Promise<string>`

Processes document links (PDF, DOC, etc.) in MDX content.

**Parameters:**
- `content` - MDX content string

**Returns:**
- Processed content with uploaded document URLs

**Example:**
```typescript
const processed = await processor.processDocumentLinks(`
[document.pdf](https://notion.so/file.pdf)
`);
```

### `MediaProcessor.processPageCover(coverUrl: string | null): Promise<string | null>`

Processes page cover image URL.

**Parameters:**
- `coverUrl` - Cover image URL or null

**Returns:**
- Processed cover URL or null

### Statistics

```typescript
// Get statistics
const imageStats = processor.getImageStats();
const docStats = processor.getDocumentStats();

// Print statistics
processor.printImageStats();
processor.printDocumentStats();

// Reset statistics
processor.resetStats();
```

## 🔧 Setup Guide

This package uses **dependency injection** pattern, which means you need to provide your own implementations for uploading files and caching (optional). This makes the package flexible and compatible with any storage service.

### Step 1: Install Required Dependencies

For Cloudinary (recommended):
```bash
npm install cloudinary
npm install --save-dev @types/cloudinary
```

For Redis caching (optional):
```bash
npm install @upstash/redis
# or
npm install redis
```

### Step 2: Setup Cloudinary

#### 2.1 Create Cloudinary Account

1. Sign up at [https://cloudinary.com/users/register](https://cloudinary.com/users/register)
2. Go to Dashboard → Settings
3. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

#### 2.2 Set Environment Variables

Create `.env.local` or `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=uploads
```

#### 2.3 Create Uploader Implementation

Create a file `lib/cloudinary-uploader.ts`:

```typescript
import { v2 as cloudinary } from 'cloudinary';
import type { CloudinaryUploadResult } from '@norkive/mdx-media-processor';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Upload file from URL to Cloudinary
 */
export async function uploadFileFromUrl(
  url: string,
  fileName: string
): Promise<CloudinaryUploadResult> {
  try {
    // Download file from URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MediaProcessor/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`);
    }

    const fileBuffer = Buffer.from(await response.arrayBuffer());

    // Determine file type
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension);

    // Convert to base64
    const base64File = fileBuffer.toString('base64');
    const mimeType = isImage
      ? `image/${fileExtension === 'jpg' ? 'jpeg' : fileExtension}`
      : `application/${fileExtension}`;
    const dataURI = `data:${mimeType};base64,${base64File}`;

    // Sanitize file name
    const sanitizedFileName = fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9가-힣_-]/g, '_')
      .substring(0, 50);

    const timestamp = Date.now();
    const fileNameHash = Buffer.from(sanitizedFileName)
      .toString('base64')
      .substring(0, 10);
    const public_id = `${fileExtension}_${timestamp}_${fileNameHash}`;

    // Upload to Cloudinary
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
    console.error('Cloudinary upload failed:', error);
    throw error;
  }
}
```

### Step 3: Setup Redis Cache (Optional but Recommended)

Caching significantly improves performance by avoiding duplicate uploads.

#### 3.1 Create Upstash Redis Database

1. Sign up at [https://upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy your credentials:
   - REST URL
   - REST Token

#### 3.2 Set Environment Variables

```env
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

#### 3.3 Create Cache Manager Implementation

Create a file `lib/redis-cache.ts`:

```typescript
import { Redis } from '@upstash/redis';
import type { CacheManager } from '@norkive/mdx-media-processor';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_PREFIX = 'image_cache:';
const CACHE_EXPIRY = 24 * 60 * 60; // 24 hours

export const cacheManager: CacheManager = {
  getCachedImageUrl: async (originalUrl: string): Promise<string | null> => {
    try {
      const cacheKey = `${CACHE_PREFIX}${hashUrl(originalUrl)}`;
      const cached = await redis.get(cacheKey);

      if (!cached || typeof cached !== 'string') return null;

      const cacheInfo = JSON.parse(cached);
      return cacheInfo.cachedUrl || null;
    } catch (error) {
      console.error('Redis cache read failed:', error);
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
      console.error('Redis cache write failed:', error);
    }
  },
};

function hashUrl(url: string): string {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
```

**Alternative: In-Memory Cache (for testing)**

If you don't want to use Redis, you can use a simple in-memory cache:

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
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
  },
};
```

### Step 4: Initialize Media Processor

Now combine everything together:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';
import { uploadFileFromUrl } from './lib/cloudinary-uploader';
import { cacheManager } from './lib/redis-cache';

const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: uploadFileFromUrl,
    // Optional: specific methods for images and PDFs
    uploadImageFromUrl: uploadFileFromUrl,
    uploadPdfFromUrl: uploadFileFromUrl,
  },
  cache: cacheManager, // Optional: omit if you don't want caching
});
```

## 🔧 Configuration Reference

### CloudinaryUploader Interface

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

### CacheManager Interface

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

## 🌐 Alternative Storage Services

This package is not limited to Cloudinary. You can use any storage service:

### AWS S3 Example

```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploader: CloudinaryUploader = {
  uploadFileFromUrl: async (url, fileName) => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `uploads/${fileName}`,
        Body: Buffer.from(buffer),
      })
    );

    return {
      secure_url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${fileName}`,
      public_id: fileName,
      width: 0,
      height: 0,
      format: fileName.split('.').pop() || 'unknown',
      bytes: buffer.byteLength,
    };
  },
};
```

### Imgix Example

```typescript
const uploader: CloudinaryUploader = {
  uploadFileFromUrl: async (url, fileName) => {
    // Upload to your server first, then serve via Imgix
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    
    // Upload to your storage and get URL
    const uploadedUrl = await uploadToYourStorage(buffer, fileName);
    
    return {
      secure_url: `https://your-domain.imgix.net/${uploadedUrl}`,
      public_id: fileName,
      width: 0,
      height: 0,
      format: fileName.split('.').pop() || 'unknown',
      bytes: buffer.byteLength,
    };
  },
};
```

## 💡 Complete Example

Here's a complete example for a Notion → MDX conversion script:

```typescript
import { createMediaProcessor } from '@norkive/mdx-media-processor';
import { uploadFileFromUrl } from './lib/cloudinary-uploader';
import { cacheManager } from './lib/redis-cache';

// Initialize processor
const processor = createMediaProcessor({
  uploader: {
    uploadFileFromUrl: uploadFileFromUrl,
  },
  cache: cacheManager, // Optional but recommended
});

// Process Notion content
async function convertNotionToMDX(notionContent: string, coverUrl?: string) {
  let processedContent = notionContent;

  // 1. Process images
  console.log('Processing images...');
  processedContent = await processor.processNotionImages(processedContent);

  // 2. Process documents (PDF, DOC, etc.)
  console.log('Processing documents...');
  processedContent = await processor.processDocumentLinks(processedContent);

  // 3. Process cover image
  let processedCover = coverUrl;
  if (coverUrl) {
    console.log('Processing cover image...');
    processedCover = await processor.processPageCover(coverUrl);
  }

  // 4. Print statistics
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

// Usage
const result = await convertNotionToMDX(rawMarkdown, coverImageUrl);
console.log(`Processed ${result.stats.images.processedImagesCount} images`);
```

## 🎯 Use Cases

- Notion to MDX conversion pipelines
- Content migration tools
- Image optimization workflows
- Document management systems
- Blog and CMS platforms

## ❓ FAQ

### Do I need Cloudinary?

No! This package works with any storage service. Cloudinary is just one example. You can use:
- AWS S3
- Google Cloud Storage
- Azure Blob Storage
- Imgix
- Your own server
- Any service that can store files

### Do I need Redis for caching?

No, caching is optional. However, it's highly recommended for production use as it:
- Reduces API calls to storage services
- Improves performance significantly
- Saves costs

You can also use in-memory caching for development or small projects (see Setup Guide).

### Can I use this without Notion?

Yes! This package processes any MDX content. The "Notion" name in function names just refers to the URL patterns it detects (like Notion's secure S3 URLs). You can use it with any MDX content.

## 🐛 Troubleshooting

### Module not found: '@norkive/mdx-media-processor'

Make sure you've installed the package:
```bash
npm install @norkive/mdx-media-processor
```

### Type errors

Make sure you have TypeScript installed and your `tsconfig.json` has proper module resolution:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Upload errors

- Check your environment variables are set correctly
- Verify your Cloudinary/AWS credentials are valid
- Check network connectivity to the storage service
- Review error messages in console logs

## 📄 License

MIT

## 🔗 Related

- [@norkive/mdx-safe-processor](https://www.npmjs.com/package/@norkive/mdx-safe-processor) - MDX content sanitization
- [@norkive/youtube-utils](https://www.npmjs.com/package/@norkive/youtube-utils) - YouTube URL utilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

ryoon.with.wisdomtrees@gmail.com

