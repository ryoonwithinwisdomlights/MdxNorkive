# @norkive/youtube-utils

[![npm version](https://badge.fury.io/js/%40norkive%2Fyoutube-utils.svg)](https://badge.fury.io/js/%40norkive%2Fyoutube-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lightweight utility to extract YouTube video IDs from URLs. Zero dependencies, TypeScript support.

## Features

- ✅ Extract YouTube ID from various URL formats
- ✅ Validate YouTube URLs
- ✅ Extract URL parameters
- ✅ Zero Dependencies
- ✅ TypeScript Support
- ✅ Small Bundle Size (< 1KB)

## Installation

```bash
npm install @norkive/youtube-utils
```

## Usage

### Basic Usage

```typescript
import { getYoutubeId } from '@norkive/youtube-utils';

// Extract YouTube ID
const id = getYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// 'dQw4w9WgXcQ'

const id2 = getYoutubeId('https://youtu.be/dQw4w9WgXcQ');
// 'dQw4w9WgXcQ'

const id3 = getYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ');
// 'dQw4w9WgXcQ'

// Invalid URL returns null
const id4 = getYoutubeId('https://example.com');
// null
```

### Validate YouTube URL

```typescript
import { isValidYoutubeUrl, getYoutubeId } from '@norkive/youtube-utils';

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

if (isValidYoutubeUrl(url)) {
  const id = getYoutubeId(url);
  console.log('YouTube ID:', id);
}
```

### Extract URL Parameters

```typescript
import { getYoutubeParams } from '@norkive/youtube-utils';

const params = getYoutubeParams('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10');
// { v: 'dQw4w9WgXcQ', t: '10' }
```

## Supported URL Formats

- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`
- `https://www.youtube-nocookie.com/embed/VIDEO_ID`

## API

### `getYoutubeId(url: string): string | null`

Extracts YouTube video ID from URL.

**Parameters:**
- `url` - YouTube URL string

**Returns:**
- Video ID string or `null` if invalid

### `isValidYoutubeUrl(url: string): boolean`

Checks if URL is a valid YouTube URL.

**Parameters:**
- `url` - URL string to validate

**Returns:**
- `true` if valid YouTube URL, `false` otherwise

### `getYoutubeParams(url: string): Record<string, string>`

Extracts URL parameters from YouTube URL.

**Parameters:**
- `url` - YouTube URL string

**Returns:**
- Object with URL parameters

## License

MIT

## Author

Ryoon with Wisdom Lights

- Email: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

