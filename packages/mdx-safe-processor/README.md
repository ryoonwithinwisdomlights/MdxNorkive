# @norkive/mdx-safe-processor

[![npm version](https://img.shields.io/npm/v/@norkive/mdx-safe-processor)](https://www.npmjs.com/package/@norkive/mdx-safe-processor)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)

Safe MDX content processor with XSS prevention, link transformation, and code block protection. Built with functional programming architecture for maximum reusability and testability.

## ✨ Features

- 🛡️ **XSS Prevention**: Strict HTML tag whitelist with attribute validation
- 🔗 **Link Transformation**: Automatic conversion of YouTube, files, Google Drive, bookmarks, and embeds
- 📝 **Code Block Protection**: Preserves code blocks and blockquotes during processing
- 🎨 **Markdown Syntax Conversion**: Converts bold, italic, and inline code to HTML
- 🔒 **Safe HTML Sanitization**: Removes unsafe tags and attributes
- 🔄 **Functional Pipeline**: Pure functions with pipeline pattern for easy composition
- 📦 **Zero Dependencies**: Lightweight package with no external dependencies
- 🎯 **TypeScript**: Full type definitions included

## 📦 Installation

```bash
npm install @norkive/mdx-safe-processor
# or
yarn add @norkive/mdx-safe-processor
# or
pnpm add @norkive/mdx-safe-processor
```

## 🚀 Quick Start

```typescript
import {
  processMdxContentFn,
  decodeUrlEncodedLinks,
  validateAndFixMdxContent,
} from '@norkive/mdx-safe-processor';

// Basic usage
const processed = processMdxContentFn(mdxContent);

// With URL decoding
const decoded = decodeUrlEncodedLinks(mdxContent);
const processed = processMdxContentFn(decoded);

// With validation
const result = await validateAndFixMdxContent(mdxContent, 'my-file.mdx');
if (result.isValid) {
  console.log('Processed content:', result.content);
} else {
  console.error('Errors:', result.errors);
}
```

## 📖 API Reference

### `processMdxContentFn(content: string): string`

Main processing function that transforms MDX content safely.

**Parameters:**
- `content` - Raw MDX content string

**Returns:**
- Processed MDX content string

**Example:**
```typescript
const processed = processMdxContentFn(`
# Hello World

[video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

\`\`\`javascript
console.log('code block');
\`\`\`
`);
```

### `decodeUrlEncodedLinks(content: string): string`

Decodes URL-encoded link text in markdown links.

**Parameters:**
- `content` - MDX content with URL-encoded links

**Returns:**
- Content with decoded link text

**Example:**
```typescript
const decoded = decodeUrlEncodedLinks('[Hello%20World](url)');
// Returns: '[Hello World](url)'
```

### `validateAndFixMdxContent(content: string, filename?: string): Promise<MdxValidationResult>`

Validates and fixes MDX content, returning validation result.

**Parameters:**
- `content` - MDX content to validate
- `filename` - Optional filename for error reporting (default: "unknown")

**Returns:**
- Promise resolving to `MdxValidationResult`:
  ```typescript
  {
    isValid: boolean;
    content: string;
    errors: string[];
  }
  ```

**Example:**
```typescript
const result = await validateAndFixMdxContent(mdxContent, 'post.mdx');
if (result.isValid) {
  // Use result.content
} else {
  // Handle errors
  console.error(result.errors);
}
```

### `processMdxContentWithLoggingFn(content: string): string`

Processes MDX content with console logging for debugging.

**Parameters:**
- `content` - Raw MDX content string

**Returns:**
- Processed MDX content string

**Example:**
```typescript
const processed = processMdxContentWithLoggingFn(mdxContent);
// Logs: "🔄 MDX 처리 시작...", "📝 링크 변환 중...", etc.
```

### `convertUnsafeTags(content: string): string`

Alias for `processMdxContentFn` - converts unsafe HTML tags to HTML entities.

## 🔧 Link Transformation

The processor automatically transforms various link types:

### YouTube Links
```markdown
[video](https://www.youtube.com/watch?v=xxx)
```
→
```jsx
<YoutubeWrapper names={"video"} urls={"https://www.youtube.com/watch?v=xxx"} />
```

### File Links
```markdown
[document.pdf](https://example.com/file.pdf)
```
→
```jsx
<FileWrapper names={"document.pdf"} urls={"https://example.com/file.pdf"} />
```

### Google Drive Links
```markdown
[My Doc](https://drive.google.com/file/d/xxx)
```
→
```jsx
<GoogleDriveWrapper names={"My Doc"} urls={"https://drive.google.com/file/d/xxx"} />
```

### Embed Links
```markdown
[embed](https://example.com)
```
→
```jsx
<EmbededWrapper names={"embed"} urls={"https://example.com"} />
```

### Bookmark Links
```markdown
[bookmark](https://example.com)
```
→
```jsx
<BookMarkWrapper names={"bookmark"} urls={"https://example.com"} />
```

## 🛡️ Security Features

### XSS Prevention

The processor uses a strict whitelist of allowed HTML tags:

- Basic structure: `h1-h6`, `p`, `span`, `div`, `br`, `hr`
- Text styling: `strong`, `b`, `em`, `i`, `u`, `s`, etc.
- Links and quotes: `a`, `blockquote`, `cite`
- Code: `code`, `pre`, `kbd`, `samp`, `var`
- Lists: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- Tables: `table`, `thead`, `tbody`, `tr`, `td`, `th`
- Media: `img`, `video`, `audio`, `figure`
- Custom components: `YoutubeWrapper`, `FileWrapper`, etc.

### Allowed JSX Attributes

- Basic: `className`, `id`, `style`
- Links: `src`, `href`, `alt`, `target`, `rel`
- Forms: `value`, `type`, `placeholder`, `disabled`, etc.
- Accessibility: All `data-*` and `aria-*` attributes

Any tag or attribute not in the whitelist is converted to HTML entities for safety.

## 🏗️ Architecture

### Functional Programming

The processor uses functional programming principles:

- **Pure Functions**: No side effects, predictable output
- **Pipeline Pattern**: Data flows through transformation steps
- **Function Composition**: Small functions combined into complex logic
- **Immutability**: Original content is never modified

### Processing Pipeline

```
Input MDX
  ↓
1. Link Transformation (YouTube, files, embeds, etc.)
  ↓
2. Code Block Protection (temporary markers)
  ↓
3. Blockquote Protection (temporary markers)
  ↓
4. Table Block Fixing
  ↓
5. Heading Block Fixing
  ↓
6. Markdown Syntax Conversion (bold, italic, code)
  ↓
7. Unclosed Tag Fixing
  ↓
8. Unsafe Tag Sanitization (XSS prevention)
  ↓
9. Protected Content Restoration
  ↓
10. HTML Entity Decoding
  ↓
11. MDX Extension Removal
  ↓
Output MDX
```

## 📊 Performance

- **Bundle Size**: ~15 KB (minified)
- **Zero Dependencies**: No external runtime dependencies
- **Tree Shakeable**: ESM support for optimal bundling
- **Type Safe**: Full TypeScript support

## 🧪 Example Usage

### Basic Processing

```typescript
import { processMdxContentFn } from '@norkive/mdx-safe-processor';

const mdxContent = `
# My Post

This is **bold** and *italic* text.

[video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

\`\`\`javascript
const code = 'preserved';
\`\`\`
`;

const processed = processMdxContentFn(mdxContent);
```

### With Validation

```typescript
import { validateAndFixMdxContent } from '@norkive/mdx-safe-processor';

const result = await validateAndFixMdxContent(mdxContent, 'post.mdx');

if (result.isValid) {
  // Use processed content
  console.log(result.content);
} else {
  // Handle errors
  console.error('Validation errors:', result.errors);
}
```

### Complete Pipeline

```typescript
import {
  decodeUrlEncodedLinks,
  processMdxContentFn,
} from '@norkive/mdx-safe-processor';

// Step 1: Decode URL-encoded links
const decoded = decodeUrlEncodedLinks(rawMdxContent);

// Step 2: Process content
const processed = processMdxContentFn(decoded);

// Use processed content
```

## 🔗 Related Packages

- [`@norkive/youtube-utils`](https://www.npmjs.com/package/@norkive/youtube-utils) - YouTube URL utilities
- [`@norkive/lite-youtube-embed`](https://www.npmjs.com/package/@norkive/lite-youtube-embed) - Lightweight YouTube embed component

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Author

**Ryoon with Wisdom Lights**

- Email: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@norkive/mdx-safe-processor)
- [GitHub Repository](https://github.com/ryoonwithinwisdomlights/MdxNorkive)
- [Documentation](https://github.com/ryoonwithinwisdomlights/MdxNorkive/tree/main/packages/mdx-safe-processor)

---

Made with ❤️ by Ryoon with Wisdom Lights

