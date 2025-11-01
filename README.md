![logo](/public/images/Norkive_intro.png)
![logo](/public/images/Norkive_kv.png)
# Norkive

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90.5-FF4154?logo=react)](https://tanstack.com/query)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> A type-safe knowledge archive platform that converts Notion content to MDX and deploys as a static Next.js 15 blog

🌐 **Live Demo**: https://mdx-norkive.vercel.app/  
📦 **Repository**: https://github.com/ryoonwithinwisdomlights/MdxNorkive

---

## Overview

Norkive is a modern knowledge management platform that bridges the gap between Notion's intuitive editing experience and a high-performance static blog. It automatically converts Notion databases into type-safe MDX content, optimizes images through Cloudinary CDN, and deploys as a blazing-fast Next.js application with advanced rendering optimizations.

### Key Features

- 🔄 **Automated Pipeline**: Notion → MDX conversion with full metadata preservation
- 🖼️ **Image Optimization**: Cloudinary integration with 70% size reduction
- 🎨 **MDX Components**: Rich interactive components with Shiki syntax highlighting
- 🎬 **Rich Media Support**: YouTube, PDF, Google Drive, Embeds, Bookmarks with custom wrappers
- 🔍 **Advanced Search**: Command palette (`⌘K`) with fuzzy search (Orama)
- ⚡ **Performance**: Lighthouse 96/100, < 1s initial load, 89% rendering reduction
- 🎯 **Type Safety**: Zod schemas + Content Collections for runtime validation
- 🚀 **React Optimization**: Comprehensive memoization with React.memo, useMemo, useCallback
- 📱 **Responsive**: Mobile-first design with dark mode support (Zustand)
- 🔄 **State Management**: TanStack Query for server state, Zustand for client state
- 🛡️ **Safe MDX Processing**: Advanced link transformation, code block protection, XSS prevention

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript 5.6 (87.3% of codebase)
- **Styling**: Tailwind CSS 4.1
- **Content**: MDX + Content Collections + Fumadocs
- **State**: TanStack Query (server), Zustand (client)
- **Search**: Orama (full-text search engine)
- **Infrastructure**: Vercel, Cloudinary, Upstash Redis
- **Quality**: ESLint, Prettier, Zod validation

---

## Quick Start

### Prerequisites

- Node.js >= 20.17.0
- npm/pnpm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ryoonwithinwisdomlights/MdxNorkive.git
cd MdxNorkive

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit http://localhost:3000

### Environment Variables

```env
# Notion API (optional - for MDX conversion)
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id

# Cloudinary (for image optimization)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Upstash Redis (for caching)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_LANG=kr-KR
```

---

## Supported Blocks & Components

Norkive provides comprehensive support for Notion blocks through custom MDX components and safe content processing.

### Media Blocks

| Block Type | Component | Status | Description |
|------------|-----------|--------|-------------|
| **YouTube** | `YoutubeWrapper` | ✅ Supported | Lite YouTube embed with lazy loading |
| **Video** | Native iframe | ✅ Supported | Generic video embeds |
| **Audio** | Native audio | ✅ Supported | HTML5 audio player |
| **Image** | Next Image | ✅ Supported | Optimized with Cloudinary |
| **PDF** | File wrapper | ✅ Supported | PDF preview and download |
| **Figma** | EmbededWrapper | ✅ Supported | Figma design embeds |
| **Google Maps** | EmbededWrapper | ✅ Supported | iframe embed |

### File & Drive Blocks

| Block Type | Component | Status | Extensions |
|------------|-----------|--------|------------|
| **PDF Files** | `FileWrapper` | ✅ Supported | `.pdf` |
| **Documents** | `FileWrapper` | ✅ Supported | `.doc`, `.docx`, `.rtf`, `.txt`, `.md`, `.odt` |
| **Spreadsheets** | `FileWrapper` | ✅ Supported | `.xls`, `.xlsx`, `.key`, `.numbers` |
| **Presentations** | `FileWrapper` | ✅ Supported | `.ppt`, `.pptx` |
| **Google Drive** | `GoogleDriveWrapper` | ✅ Supported | Docs, Sheets, Slides |

### Link & Embed Blocks

| Block Type | Component | Status | Features |
|------------|-----------|--------|----------|
| **Bookmark** | `BookMarkWrapper` | ✅ Supported | Rich link preview with metadata |
| **Embed** | `EmbededWrapper` | ✅ Supported | Generic iframe embeds |
| **External Link** | Custom component | ✅ Supported | SEO-friendly external links |
| **Page Link** | Native link | ✅ Supported | Internal page navigation |

### Content Blocks

| Block Type | Status | Features |
|------------|--------|----------|
| **Heading** | ✅ Supported | H1-H6 with TOC support |
| **Paragraph** | ✅ Supported | Rich text formatting |
| **Quote / Callout** | ✅ Supported | Fumadocs callout components |
| **Code Block** | ✅ Supported | Shiki syntax highlighting |
| **Inline Code** | ✅ Supported | Monospace formatting |
| **Lists** | ✅ Supported | Ordered, unordered, task lists |
| **Tables** | ✅ Supported | Responsive tables |
| **Divider** | ✅ Supported | Horizontal rules |

### Advanced MDX Processing

Norkive implements sophisticated MDX transformation pipeline for safe and robust content processing:

#### 🔗 Link Transformation
```markdown
# YouTube
[video](https://www.youtube.com/watch?v=xxx) → <YoutubeWrapper />

# Files
[document.pdf](url) → <FileWrapper />

# Google Drive
[My Doc](drive.google.com/...) → <GoogleDriveWrapper />

# Embeds
[embed](url) → <EmbededWrapper />

# Bookmarks
[bookmark](url) → <BookMarkWrapper />
```

#### 🛡️ Safety Features
- **XSS Prevention**: Strict HTML tag whitelist
- **Code Block Protection**: Prevents transformation of code content
- **Blockquote Protection**: Preserves nested quotes
- **Nested Link Fixing**: Handles complex link structures
- **Invalid HTML Cleaning**: Removes unsafe attributes

#### ⚡ Processing Pipeline
1. **Link Detection**: Regex pattern matching
2. **Component Transformation**: Markdown → JSX components
3. **Code Protection**: Preserve code blocks and quotes
4. **Safety Validation**: XSS prevention
5. **Error Handling**: Graceful degradation

### Custom Component Architecture

All media components follow a consistent wrapper pattern:

```typescript
// YoutubeWrapper.tsx
export default function YoutubeWrapper({ urls, names }: WrapperProps) {
  const youtubeId = getYoutubeId(urls);
  return <LiteYouTubeEmbed id={youtubeId} />;
}

// FileWrapper.tsx
export default function FileWrapper({ urls, names }: WrapperProps) {
  return (
    <a href={urls} download>
      <FileTextIcon /> {names}
    </a>
  );
}
```

**Key Benefits:**
- ✨ Consistent API across all wrappers
- 🔒 Type-safe with TypeScript
- 🎨 Styled with Tailwind CSS
- ♿ Accessible with ARIA labels
- 📱 Responsive design
- 🌙 Dark mode support

### Content Processing Pipeline

```
Notion MDX → Link Detection → Component Transform → 
Code Protection → Safety Validation → Final MDX
```

**Processing Types:**
- **Functional Pipeline**: Pure functions, pipe composition
- **Plugin Architecture**: Modular transformation steps
- **Class-based**: Object-oriented transformer pattern

See [content-functional.ts](./lib/utils/mdx-data-processing/convert-unsafe-mdx/content-functional.ts) for implementation details.

---

## Usage

### Adding Content

**Option A: Using Notion (Recommended)**

1. Create content in your Notion database
2. Run the conversion script:
   ```bash
   npm run generate:mdx
   ```
3. MDX files are automatically generated in `content/` directory

**Option B: Direct MDX**

Create a file in `content/records/my-post.mdx`:

```mdx
---
notionId: "unique-id"
title: "My Post Title"
date: 2025-01-15
category: "Engineering"
tags: ["Next.js", "TypeScript"]
---

# Your content here

This is a paragraph with **bold** and *italic* text.

\`\`\`typescript
const example = "code block";
\`\`\`
```

### Available Commands

```bash
npm run dev              # Start development server
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
npm run validate:mdx     # Validate MDX files
npm run prettier:write   # Format code
npm run analyze          # Analyze bundle size
npm run check:validity   # Run validity checks and tests
```

---

## Documentation

- 📐 **[Architecture](./docs/ARCHITECTURE.md)** - System design, data flow, and technical decisions
- 🔄 **[Migration Guide](./docs/MIGRATION.md)** - react-notion-x → MDX migration story
- ⚡ **[Performance](./docs/PERFORMANCE.md)** - Optimization strategies and benchmarks
- 🛠️ **[Development](./docs/DEVELOPMENT.md)** - Local setup and development guide
- 🤝 **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute to this project
- 🚀 **[Memoization Guide](./documents-description/MEMOIZATION_GUIDE.md)** - React rendering optimization

---

## Project Structure

```
norkive/
├── app/                    # Next.js App Router
│   ├── (home)/            # Home page
│   ├── api/               # API routes
│   ├── book/              # Book category
│   ├── engineering/       # Engineering posts
│   ├── project/           # Project showcase
│   └── records/           # Personal records
├── content/               # MDX content files
│   ├── books/
│   ├── engineerings/
│   ├── projects/
│   └── records/
├── lib/                   # Utilities & libraries
│   ├── cache/            # Caching system
│   ├── context/          # React contexts
│   ├── hooks/            # Custom hooks
│   ├── stores/           # Zustand stores
│   └── utils/            # Helper functions
├── modules/               # UI components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   ├── mdx/              # MDX components
│   └── page/             # Page components (memoized)
├── scripts/              # Build & conversion scripts
└── types/                # TypeScript definitions
```

---

## Performance

### Lighthouse Scores

```
Performance:     96/100 ⚡
Accessibility:   98/100 ♿
Best Practices: 100/100 ✅
SEO:            100/100 🔍
```

### Core Web Vitals

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| LCP | 1.2s | < 2.5s | ✅ |
| FID | 12ms | < 100ms | ✅ |
| CLS | 0.02 | < 0.1 | ✅ |

### Rendering Optimization

- **React.memo**: Applied to 6+ list item components
- **useMemo**: Complex calculations and filtering cached
- **useCallback**: Event handlers stabilized
- **Result**: 89% reduction in unnecessary re-renders

See [PERFORMANCE.md](./docs/PERFORMANCE.md) for detailed optimization strategies.

---

## Key Technical Decisions

### Why MDX over Direct Notion Rendering?

- **Performance**: Static generation vs. runtime API calls (60% faster)
- **SEO**: Complete HTML for crawlers (100% indexing)
- **Customization**: Full control over React components
- **Reliability**: No dependency on Notion API availability

### Why TanStack Query + Zustand?

- **TanStack Query**: Automatic caching, revalidation, and server state management
- **Zustand**: Simple, performant client state (replaces complex Context)
- **Separation of Concerns**: Server state vs client state

### Why Comprehensive Memoization?

- **Large Lists**: 100+ items in records list
- **Complex Filtering**: Multi-criteria filtering and sorting
- **Performance Goal**: <100ms interaction response time
- **Result**: 89% rendering reduction achieved

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed analysis.

---

## Benchmarks

### Migration Results

| Metric | Before (react-notion-x) | After (MDX) | Improvement |
|--------|------------------------|-------------|-------------|
| Initial Load | 2.5s | 1.0s | ↓ 60% |
| Bundle Size | 2.3MB | 890KB | ↓ 61% |
| Build Time | 3m+ | 45s | ↓ 75% |
| Lighthouse | 60 | 96 | ↑ 60% |
| Component Renders | 112 | 12 | ↓ 89% |

### Rendering Optimization

| Component | Before | After | Improvement |
|-----------|--------|-------|-------------|
| DateSortedRecords | 100 renders | 10 renders | ↓ 90% |
| LatestRecords | 3 renders | 1 render | ↓ 67% |
| FeaturedRecords | Optimized | Optimized | ✅ |
| EntireRecords | Optimized | Optimized | ✅ |

---

## Roadmap

### v1.1 (Q1 2025)

- [ ] Service Worker & PWA support
- [x] React memoization optimization
- [ ] RSS/Atom feeds
- [ ] Comment system (Giscus)

### v2.0 (Q2 2025)

- [ ] Full i18n support (Korean/English)
- [ ] Web-based MDX editor
- [ ] Analytics dashboard
- [ ] Advanced search filters

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm run check:validity`
5. Commit: `git commit -m 'feat: add new feature'`
6. Push: `git push origin feature/my-feature`
7. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Ryoon with Wisdom Lights**


- Email: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

---

## 📦 Published npm Packages

This project includes reusable packages published to npm:

### @norkive/youtube-utils

[![npm version](https://img.shields.io/npm/v/@norkive/youtube-utils)](https://www.npmjs.com/package/@norkive/youtube-utils)
[![npm downloads](https://img.shields.io/npm/dm/@norkive/youtube-utils)](https://www.npmjs.com/package/@norkive/youtube-utils)

Lightweight utility to extract YouTube video IDs from URLs. Zero dependencies, TypeScript support.

```bash
npm install @norkive/youtube-utils
```

```typescript
import { getYoutubeId } from '@norkive/youtube-utils';

const id = getYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// 'dQw4w9WgXcQ'
```

**Features:**
- ✅ Extract YouTube ID from various URL formats
- ✅ Validate YouTube URLs
- ✅ Zero Dependencies
- ✅ TypeScript Support
- ✅ Small Bundle Size (< 1KB)

📖 [Full Documentation](https://www.npmjs.com/package/@norkive/youtube-utils)

### More Packages Coming Soon

- `@norkive/mdx-safe-processor` - Safe MDX content processor
- `@norkive/lite-youtube-embed` - Lightweight YouTube embed component
- `@norkive/mdx-validator` - MDX file validator
- `@norkive/image-optimizer` - Image optimization utilities

See [packages-guide](./packages-guide/README.md) for more information.

---

## Acknowledgments

Built with these amazing open-source projects:

- [Next.js](https://nextjs.org/) - React framework
- [Fumadocs](https://fumadocs.vercel.app/) - Documentation system
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Zustand](https://github.com/pmndrs/zustand) - Client state management
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ by Ryoon with Wisdom Lights

</div>
