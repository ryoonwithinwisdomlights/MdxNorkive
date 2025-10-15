# Norkive

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> A type-safe knowledge archive platform that converts Notion content to MDX and deploys as a static Next.js 15 blog

🌐 **Live Demo**: https://mdx-norkive.vercel.app/  
📦 **Repository**: https://github.com/ryoonwithinwisdomlights/norkive

---

## Overview

Norkive is a modern knowledge management platform that bridges the gap between Notion's intuitive editing experience and a high-performance static blog. It automatically converts Notion databases into type-safe MDX content, optimizes images through Cloudinary CDN, and deploys as a blazing-fast Next.js application.

### Key Features

- 🔄 **Automated Pipeline**: Notion → MDX conversion with full metadata preservation
- 🖼️ **Image Optimization**: Cloudinary integration with 70% size reduction
- 🎨 **MDX Components**: Rich interactive components with Shiki syntax highlighting
- 🔍 **Advanced Search**: Command palette (`⌘K`) with fuzzy search
- ⚡ **Performance**: Lighthouse 96/100, < 1s initial load
- 🎯 **Type Safety**: Zod schemas + Content Collections for runtime validation
- 📱 **Responsive**: Mobile-first design with dark mode support

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript 5.6 (87.3% of codebase)
- **Styling**: Tailwind CSS 4.1
- **Content**: MDX + Content Collections + Fumadocs
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
git clone https://github.com/ryoonwithinwisdomlights/norkive.git
cd norkive

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

## Usage

### Adding Content

**Option A: Using Notion (Recommended)**

1. Create content in your Notion database
2. Run the conversion script:
   ```bash
   npx tsx scripts/notion-mdx-all-in-one.ts
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
```

---

## Documentation

- 📐 **[Architecture](./docs/ARCHITECTURE.md)** - System design, data flow, and technical decisions
- 🔄 **[Migration Guide](./docs/MIGRATION.md)** - react-notion-x → MDX migration story
- ⚡ **[Performance](./docs/PERFORMANCE.md)** - Optimization strategies and benchmarks
- 🛠️ **[Development](./docs/DEVELOPMENT.md)** - Local setup and development guide
- 🤝 **[Contributing](./docs/CONTRIBUTING.md)** - How to contribute to this project

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
│   └── utils/            # Helper functions
├── modules/               # UI components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   └── mdx/              # MDX components
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

See [PERFORMANCE.md](./docs/PERFORMANCE.md) for detailed optimization strategies.

---

## Key Technical Decisions

### Why MDX over Direct Notion Rendering?

- **Performance**: Static generation vs. runtime API calls (60% faster)
- **SEO**: Complete HTML for crawlers (100% indexing)
- **Customization**: Full control over React components
- **Reliability**: No dependency on Notion API availability

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed analysis.

### Why Content Collections + Fumadocs?

- **Type Safety**: Zod schemas prevent runtime errors
- **DX**: Auto-completion and type inference
- **Build-time Validation**: Catch errors before deployment

---

## Benchmarks

### Migration Results

| Metric | Before (react-notion-x) | After (MDX) | Improvement |
|--------|------------------------|-------------|-------------|
| Initial Load | 2.5s | 1.0s | ↓ 60% |
| Bundle Size | 2.3MB | 890KB | ↓ 61% |
| Build Time | 3m+ | 45s | ↓ 75% |
| Lighthouse | 60 | 96 | ↑ 60% |

---

## Roadmap

### v1.1 (Q1 2025)

- [ ] Service Worker & PWA support
- [ ] Full-text search
- [ ] RSS/Atom feeds
- [ ] Comment system (Giscus)

### v2.0 (Q2 2025)

- [ ] i18n support (Korean/English)
- [ ] Web-based MDX editor
- [ ] Analytics dashboard

See [full roadmap](./docs/ROADMAP.md) for details.

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm run validate:mdx`
5. Commit: `git commit -m 'feat: add new feature'`
6. Push: `git push origin feature/my-feature`
7. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Ryoon with Wisdom Lights**

- Website: https://www.ryoonwithwisdomtrees.world/
- Email: ryoon.with.wisdomtrees@gmail.com
- GitHub: [@ryoonwithinwisdomlights](https://github.com/ryoonwithinwisdomlights)

---

## Acknowledgments

Built with these amazing open-source projects:

- [Next.js](https://nextjs.org/) - React framework
- [Fumadocs](https://fumadocs.vercel.app/) - Documentation system
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">

**⭐ If you find this project helpful, please consider giving it a star!**

Made with ❤️ by Ryoon with Wisdom Lights

</div>
