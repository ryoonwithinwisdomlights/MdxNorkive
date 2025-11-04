# @norkive/lite-youtube-embed

> ⚠️ **DEPRECATED**: This package has been merged into [`@norkive/mdx-ui`](https://www.npmjs.com/package/@norkive/mdx-ui). Please migrate to the new package for continued support and updates.

[![npm version](https://badge.fury.io/js/%40norkive%2Flite-youtube-embed.svg)](https://badge.fury.io/js/%40norkive%2Flite-youtube-embed)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight YouTube embed component with lazy loading, preconnect optimization, and WebP thumbnails.

## 🚨 Migration Notice

This package has been **deprecated** and merged into [`@norkive/mdx-ui`](https://www.npmjs.com/package/@norkive/mdx-ui). 

### Quick Migration

**Before:**
```typescript
import { LiteYouTubeEmbed } from '@norkive/lite-youtube-embed';
import '@norkive/lite-youtube-embed/dist/styles.css';
```

**After:**
```typescript
import { LiteYouTubeEmbed } from '@norkive/mdx-ui';
import '@norkive/mdx-ui/styles.css';
```

### Migration Steps

1. **Install the new package:**
   ```bash
   npm install @norkive/mdx-ui
   ```

2. **Update imports:**
   ```typescript
   // Old
   import { LiteYouTubeEmbed } from '@norkive/lite-youtube-embed';
   import '@norkive/lite-youtube-embed/dist/styles.css';
   
   // New
   import { LiteYouTubeEmbed } from '@norkive/mdx-ui';
   import '@norkive/mdx-ui/styles.css';
   ```

3. **Uninstall the old package:**
   ```bash
   npm uninstall @norkive/lite-youtube-embed
   ```

The component API remains **100% compatible** - no code changes needed except the import path!

For more information, see the [migration guide](https://github.com/ryoonwithinwisdomlights/MdxNorkive/blob/main/packages/mdx-ui/README.md#migration-guide).

## Features

- ✅ Lazy Loading - Load iframe only when clicked
- ✅ Preconnect Optimization - Faster video loading
- ✅ WebP Thumbnails - Smaller file sizes
- ✅ Responsive Design - Works on all screen sizes
- ✅ TypeScript Support - Full type definitions
- ✅ Small Bundle Size - Optimized for performance
- ✅ Accessibility Support - ARIA labels and keyboard navigation

## Installation

```bash
npm install @norkive/lite-youtube-embed
```

## Usage

### Basic Usage

```tsx
import { LiteYouTubeEmbed } from '@norkive/lite-youtube-embed';
import '@norkive/lite-youtube-embed/dist/styles.css';

function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      alt="Video preview"
    />
  );
}
```

### With Options

```tsx
import { LiteYouTubeEmbed } from '@norkive/lite-youtube-embed';

function App() {
  return (
    <LiteYouTubeEmbed
      id="dQw4w9WgXcQ"
      defaultPlay={false}
      mute={false}
      lazyImage={true}
      iframeTitle="My Video"
      alt="Video preview"
      params={{ start: 10 }}
      className="my-custom-class"
      style={{ width: '100%', aspectRatio: '16/9' }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | YouTube video ID |
| defaultPlay | boolean | false | Auto-play on load |
| mute | boolean | false | Mute video |
| lazyImage | boolean | false | Lazy load thumbnail |
| iframeTitle | string | "YouTube video" | iframe title attribute |
| alt | string | "Video preview" | Image alt text |
| params | Record<string, string> | {} | YouTube player params |
| adLinksPreconnect | boolean | true | Preconnect ad links |
| style | CSSProperties | undefined | Custom styles |
| className | string | undefined | Custom class name |

## Supported URL Formats

Works with YouTube video IDs from:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

Use `@norkive/youtube-utils` to extract video ID from URLs:

```tsx
import { getYoutubeId } from '@norkive/youtube-utils';
import { LiteYouTubeEmbed } from '@norkive/lite-youtube-embed';

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const id = getYoutubeId(url);

<LiteYouTubeEmbed id={id} />
```

## CSS Styles

Don't forget to import the CSS file:

```tsx
import '@norkive/lite-youtube-embed/dist/styles.css';
```

Or include it in your global CSS:

```css
@import '@norkive/lite-youtube-embed/dist/styles.css';
```

## Performance

- **Lazy Loading**: iframe loads only when user clicks
- **Preconnect**: Preconnects to YouTube domains on hover
- **WebP Thumbnails**: Smaller image sizes
- **Responsive Images**: srcSet for different screen sizes

## License

MIT

## Author

Ryoon with Wisdom Lights

- Email: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

