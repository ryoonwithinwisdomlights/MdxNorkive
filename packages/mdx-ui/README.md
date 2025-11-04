# @norkive/mdx-ui

MDX UI components for rendering content in browsers. Includes YouTube embeds, file links, bookmarks, Google Drive links, and embedded content.

## 📦 Installation

```bash
npm install @norkive/mdx-ui
```

## 🚀 Quick Start

### Basic Usage

```typescript
import {
  YoutubeWrapper,
  FileWrapper,
  GoogleDriveWrapper,
  BookMarkWrapper,
  EmbededWrapper,
} from "@norkive/mdx-ui";

// YouTube
<YoutubeWrapper names="Video Title" urls="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

// File
<FileWrapper names="document.pdf" urls="https://example.com/document.pdf" />

// Google Drive
<GoogleDriveWrapper names="My Document" urls="https://drive.google.com/..." />

// Bookmark
<BookMarkWrapper names="Example" urls="https://example.com" />

// Embed
<EmbededWrapper names="Embed" urls="https://example.com/embed" />
```

### YouTube Utilities

```typescript
import { getYoutubeId, isValidYoutubeUrl, getYoutubeParams } from "@norkive/mdx-ui";

const videoId = getYoutubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
// "dQw4w9WgXcQ"

const isValid = isValidYoutubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
// true

const params = getYoutubeParams("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10");
// { v: "dQw4w9WgXcQ", t: "10" }
```

### Customizing Asset Styles

You can customize the default styles for YouTube and Embed components globally:

```typescript
import { assetStyle } from "@norkive/mdx-ui";

// Customize globally
Object.assign(assetStyle, {
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});
```

Or customize per-instance using the `style` prop on `LiteYouTubeEmbed`:

```typescript
import { LiteYouTubeEmbed } from "@norkive/mdx-ui";

<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  style={{
    borderRadius: "12px",
    border: "2px solid #333",
  }}
/>
```

### LiteYouTubeEmbed Component

```typescript
import { LiteYouTubeEmbed } from "@norkive/mdx-ui";

<LiteYouTubeEmbed
  id="dQw4w9WgXcQ"
  defaultPlay={false}
  mute={false}
  lazyImage={true}
  params={{ autoplay: "1" }}
/>
```

### Styles

Import the CSS styles:

```typescript
import "@norkive/mdx-ui/styles.css";
```

Or use the export:

```typescript
import "@norkive/mdx-ui/dist/styles.css";
```

**Note**: The tooltip styles (`data-tooltip`) are scoped with the `.mdx-ui-tooltip` class to avoid conflicts with existing project styles. If your project already has global `[data-tooltip]` styles, both will work together without conflicts.

### Optional Wrapper Component

If you want complete style isolation, you can use the `MdxUIWrapper` component:

```typescript
import { MdxUIWrapper, FileWrapper } from "@norkive/mdx-ui";

<MdxUIWrapper>
  <FileWrapper names="document.pdf" urls="https://example.com/document.pdf" />
</MdxUIWrapper>
```

This is optional - the components work fine without it.

## 📚 Components

### YoutubeWrapper

YouTube video wrapper component with URL validation and error handling.

**Props:**
- `names: string` - Video title (not used, for compatibility)
- `urls: string` - YouTube URL

### FileWrapper

File link wrapper component with icon.

**Props:**
- `names: string` - File name
- `urls: string` - File URL

### GoogleDriveWrapper

Google Drive link wrapper component with icon.

**Props:**
- `names: string` - File name
- `urls: string` - Google Drive URL

### BookMarkWrapper

Bookmark link wrapper component with icon.

**Props:**
- `names: string` - Bookmark title
- `urls: string` - Bookmark URL

### EmbededWrapper

Embedded content wrapper component with iframe.

**Props:**
- `names: string` - Embed title (not used, for compatibility)
- `urls: string` - Embed URL

### LiteYouTubeEmbed

Lightweight YouTube embed component with lazy loading, preconnect optimization, and WebP thumbnails.

**Props:**
- `id: string` - YouTube video ID (required)
- `defaultPlay?: boolean` - Auto-play on load (default: false)
- `mute?: boolean` - Mute video (default: false)
- `lazyImage?: boolean` - Lazy load thumbnail (default: false)
- `iframeTitle?: string` - iframe title (default: "YouTube video")
- `alt?: string` - Image alt text (default: "Video preview")
- `params?: Record<string, string>` - YouTube player parameters
- `adLinksPreconnect?: boolean` - Preconnect to ad links (default: true)
- `style?: React.CSSProperties` - Custom styles
- `className?: string` - Custom class name

## 🛠️ Utilities

### YouTube Utilities

- `getYoutubeId(url: string): string | null` - Extract YouTube video ID from URL
- `isValidYoutubeUrl(url: string): boolean` - Check if URL is a valid YouTube URL
- `getYoutubeParams(url: string): Record<string, string>` - Extract URL parameters

## 📦 Migration Guide

This package consolidates the following deprecated packages:

### From @norkive/youtube-utils

```typescript
// Before
import { getYoutubeId } from "@norkive/youtube-utils";

// After
import { getYoutubeId } from "@norkive/mdx-ui";
```

### From @norkive/lite-youtube-embed

```typescript
// Before
import { LiteYouTubeEmbed } from "@norkive/lite-youtube-embed";

// After
import { LiteYouTubeEmbed } from "@norkive/mdx-ui";
```

## 🎨 Styling

All components use Tailwind CSS classes. Make sure your project has Tailwind CSS configured.

For YouTube components, import the CSS:

```typescript
import "@norkive/mdx-ui/styles.css";
```

## 📝 TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { WrapperProps, LiteYouTubeEmbedProps } from "@norkive/mdx-ui";
```

## 🔗 Related Packages

- `@norkive/mdx-safe-processor` - MDX content safety processing
- `@norkive/mdx-cloudinary-processor` - MDX media processing with Cloudinary

## 📄 License

MIT

## 👤 Author

ryoon.with.wisdomtrees@gmail.com

---

**Note**: This package consolidates `@norkive/youtube-utils` and `@norkive/lite-youtube-embed` which are now deprecated. See the migration guide above.

