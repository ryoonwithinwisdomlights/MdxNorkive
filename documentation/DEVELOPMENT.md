# Development Guide

Complete guide for setting up and developing Norkive locally.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Adding Content](#adding-content)
- [Creating Components](#creating-components)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: >= 20.17.0
- **Package Manager**: npm, pnpm, or yarn
- **Git**: Latest version

### Recommended Tools

- **VS Code**: With extensions
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - MDX
- **Browser**: Chrome or Firefox with DevTools

### Optional Services

- **Notion**: For content management
- **Cloudinary**: For image optimization
- **Upstash Redis**: For caching

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/ryoonwithinwisdomlights/norkive.git
cd norkive
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended for faster installs)
pnpm install

# Using yarn
yarn install
```

### 3. Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required: Site configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_LANG=kr-KR

# Optional: Notion (only if converting from Notion)
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# Optional: Cloudinary (only if using image optimization)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Redis (only if using caching)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Development Workflow

### Daily Development

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development server
npm run dev

# 4. Make changes
# Edit files in app/, modules/, lib/, etc.

# 5. Test locally
# Check http://localhost:3000

# 6. Lint and format
npm run lint
npm run prettier:write

# 7. Commit changes
git add .
git commit -m "feat: your changes"
git push origin your-branch
```

### Hot Reload

Next.js automatically reloads when you edit:
- **Page files** (`app/**/*.tsx`) - Full reload
- **Components** (`modules/**/*.tsx`) - Fast refresh
- **Utilities** (`lib/**/*.ts`) - Full reload
- **Styles** (`*.css`) - Instant update

### Development Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server (after build)
npm start

# Lint code
npm run lint

# Format code
npm run prettier:write

# Validate MDX files
npm run validate:mdx

# Analyze bundle size
npm run analyze
```

---

## Project Structure

### Directory Overview

```
norkive/
├── app/                      # Next.js App Router
│   ├── (home)/              # Home page group
│   │   ├── layout.tsx       # Home layout
│   │   └── page.tsx         # Home page
│   ├── api/                 # API routes
│   │   ├── cache/           # Cache endpoints
│   │   ├── cron/            # Scheduled jobs
│   │   └── search/          # Search API
│   ├── book/                # Book category
│   ├── engineering/         # Engineering posts
│   ├── project/             # Projects
│   ├── records/             # Records
│   ├── tag/                 # Tag pages
│   ├── category/            # Category pages
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading UI
│   ├── error.tsx            # Error UI
│   └── not-found.tsx        # 404 page
│
├── config/                  # Configuration files
│   ├── site.config.ts       # Site metadata
│   ├── analytics.config.ts  # Analytics
│   ├── font.config.ts       # Font settings
│   └── ...
│
├── content/                 # MDX content
│   ├── books/              # Book reviews
│   ├── engineerings/       # Technical posts
│   ├── projects/           # Project docs
│   ├── records/            # Personal records
│   └── submenupages/       # About, Contact
│
├── lib/                     # Utilities & libraries
│   ├── cache/              # Caching system (Redis, Memory)
│   ├── context/            # React contexts
│   ├── hooks/              # Custom hooks
│   ├── stores/             # Zustand stores (theme, UI, search, settings)
│   ├── plugins/            # Browser plugins (busuanzi analytics)
│   ├── styles/             # Style utilities
│   ├── utils/              # Helper functions
│   │   ├── mdx-data-processing/  # MDX transformation pipeline
│   │   │   ├── convert-unsafe-mdx/  # Link transformation
│   │   │   ├── cloudinary/        # Image processing
│   │   │   ├── data-manager.ts    # Content management
│   │   │   └── mdx-validator.ts   # Validation
│   │   ├── image.ts        # Image utilities
│   │   ├── records.ts      # Record processing
│   │   ├── notion-adaptor-utils.ts  # Notion adapter
│   │   ├── youtube.ts      # YouTube utilities
│   │   └── ...
│   ├── cloudinary.ts       # Cloudinary config
│   ├── redis.ts            # Redis config
│   └── source.ts           # Content source
│
├── modules/                 # UI components
│   ├── common/             # Shared components
│   │   ├── cards/          # Card components (ImageCard, GridCard)
│   │   ├── buttons/        # Button components
│   │   ├── tag/            # Tag components
│   │   └── ...
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── templates/      # Layout templates
│   │   └── navigation/     # Navigation components
│   ├── mdx/                # MDX components
│   │   ├── YoutubeWrapper.tsx      # YouTube embed
│   │   ├── FileWrapper.tsx         # File download
│   │   ├── GoogleDriveWrapper.tsx  # Google Drive
│   │   ├── EmbededWrapper.tsx      # Generic embed
│   │   ├── BookMarkWrapper.tsx     # Bookmark
│   │   └── ...
│   ├── page/               # Page-specific components
│   │   ├── components/     # Memoized list components
│   │   └── intropage/      # Intro page components
│   └── shared/             # Shared utilities
│       ├── loading/        # Loading states
│       └── ...
│
├── scripts/                 # Build scripts
│   ├── notion-mdx-all-in-one.ts
│   ├── redis-image-processor.ts
│   └── validate-mdx-files.ts
│
├── types/                   # TypeScript types
│   ├── general.model.ts
│   ├── mdx.model.ts
│   └── ...
│
├── public/                  # Static assets
│   ├── images/
│   ├── fonts/
│   └── ...
│
├── content-collections.ts   # Content schema
├── getMDXComponents.tsx     # MDX component mapping
├── blog.config.ts          # Blog config
├── next.config.ts          # Next.js config
└── tailwind.config.ts      # Tailwind config
```

### Key Files Explained

#### `content-collections.ts`

Defines type-safe schemas for content:

```typescript
const records = defineCollection({
  name: 'records',
  directory: 'content/records',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // ...
  }),
});
```

#### `getMDXComponents.tsx`

Maps MDX elements to React components:

```typescript
export function getMDXComponents(): MDXComponents {
  return {
    pre: CodeBlock,
    img: OptimizedImage,
    // ...
  };
}
```

#### `blog.config.ts`

Central configuration for the blog:

```typescript
export const BLOG = {
  APP_NAME: "Norkive",
  AUTHOR: "ryoonwithinwisdomlights",
  // ...
};
```

### Directory Details

#### `lib/stores/`

Zustand stores for client state management:

- `themeStore.ts` - Theme (light/dark) and locale management
- `uiStore.ts` - UI state (sidebar, menus, modals)
- `searchStore.ts` - Search functionality state
- `settingsStore.ts` - User preferences

#### `lib/utils/mdx-data-processing/`

Advanced MDX transformation pipeline:

- `convert-unsafe-mdx/` - Link transformation (YouTube, files, embeds)
- `cloudinary/` - Image processing utilities
- `data-manager.ts` - Content collection management
- `mdx-validator.ts` - MDX content validation

#### `modules/mdx/`

Custom MDX wrapper components:

- `YoutubeWrapper.tsx` - YouTube video embeds with lazy loading
- `FileWrapper.tsx` - File download links with icons
- `GoogleDriveWrapper.tsx` - Google Drive document links
- `EmbededWrapper.tsx` - Generic iframe embeds (Figma, Maps, etc.)
- `BookMarkWrapper.tsx` - Rich link previews

#### `modules/page/components/`

Memoized list components for performance:

- `EntireRecords.tsx` - Full records list with filtering
- `DateSortedRecords.tsx` - Records grouped by date
- `LatestRecords.tsx` - Recent posts with pagination
- `FeaturedRecords.tsx` - Featured content carousel
- `RecordsWithMultiplesOfThree.tsx` - Grid layout

---

## Adding Content

### Method 1: Direct MDX (Recommended for Development)

1. Create file in `content/records/my-post.mdx`
2. Add frontmatter:

```mdx
---
notionId: "unique-id-123"
title: "My New Post"
date: 2025-01-15
category: "Engineering"
doc_type: "Tutorial"
tags: ["Next.js", "TypeScript"]
summary: "A brief description"
draft: false
favorite: false
---

# My Post Title

Content goes here with **markdown** formatting.

## Code Example

\`\`\`typescript
const example = "Hello, world!";
console.log(example);
\`\`\`
```

3. Save and refresh browser

### Method 2: From Notion

1. Create content in Notion database
2. Run conversion script:

```bash
npx tsx scripts/notion-mdx-all-in-one.ts
```

3. MDX files generated in `content/`
4. Commit to git

### Frontmatter Schema

All fields validated by Zod schema:

```typescript
{
  notionId: string;           // Unique identifier
  title: string;              // Required
  date: Date;                 // Publication date
  category?: string;          // "Engineering" | "Project" | etc.
  doc_type?: string;          // Sub-category
  tags?: string[];            // Array of tags
  summary?: string;           // Short description
  pageCover?: string | null;  // Cover image URL
  draft?: boolean;            // Default: false
  favorite?: boolean;         // Default: false
  author?: string;            // Author name
  // ... more fields
}
```

---

## Creating Components

### Component Structure

```typescript
// modules/common/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function MyComponent({ 
  title, 
  className, 
  children 
}: MyComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### Using Components in MDX

1. **Create component**:

```typescript
// modules/mdx/Callout.tsx
export function Callout({ type, children }) {
  return (
    <div className={`callout callout-${type}`}>
      {children}
    </div>
  );
}
```

2. **Register in getMDXComponents.tsx**:

```typescript
import { Callout } from '@/modules/mdx/Callout';

export function getMDXComponents() {
  return {
    Callout,
    // ...
  };
}
```

3. **Use in MDX**:

```mdx
<Callout type="warning">
  This is a warning message!
</Callout>
```

### Styling Guidelines

Use Tailwind CSS:

```typescript
// ✅ Good: Tailwind utilities
<div className="flex items-center justify-between p-4 rounded-lg" />

// ❌ Avoid: Inline styles
<div style={{ display: 'flex', padding: '16px' }} />

// ✅ Good: Conditional classes with cn()
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

---

## Testing

### MDX Validation

```bash
npm run validate:mdx
```

Checks:
- Frontmatter schema compliance
- MDX syntax errors
- Missing required fields

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] Content displays correctly
- [ ] Images load and are optimized
- [ ] Links work (internal and external)
- [ ] Dark mode toggle works
- [ ] Search functionality works
- [ ] Mobile responsive
- [ ] Lighthouse score > 90

### Performance Testing

```bash
# Build production bundle
npm run build

# Analyze bundle
npm run analyze

# Check Lighthouse
# Open DevTools > Lighthouse > Run
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
Error: Port 3000 is already in use
```

**Solution**:
```bash
# Find and kill process
lsof -ti:3000 | xargs kill
# Or use different port
PORT=3001 npm run dev
```

#### 2. Module Not Found

```bash
Error: Cannot find module '@/lib/utils'
```

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

#### 3. TypeScript Errors

```bash
Type 'X' is not assignable to type 'Y'
```

**Solution**:
```bash
# Regenerate types
npx content-collections build

# Or restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P > TypeScript: Restart TS Server
```

#### 4. Image Not Loading

**Checklist**:
- [ ] Image path is correct
- [ ] Image is in `public/` directory
- [ ] Image extension is supported (.jpg, .png, .webp)
- [ ] Cloudinary URL is valid (if using Cloudinary)

#### 5. Build Fails

```bash
Error: Build failed
```

**Debug**:
```bash
# Clear Next.js cache
rm -rf .next

# Clear Content Collections cache
rm -rf .content-collections

# Rebuild
npm run build
```

### Getting Help

1. **Check documentation** in `docs/`
2. **Search issues** on GitHub
3. **Create new issue** with:
   - Error message
   - Steps to reproduce
   - Environment (OS, Node version)
   - Expected vs actual behavior

---

## Best Practices

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Format with Prettier
- Use meaningful variable names
- Add JSDoc comments for complex functions

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make small, focused commits
git commit -m "feat: add new component"
git commit -m "fix: resolve layout issue"

# Push and create PR
git push origin feature/my-feature
```

### Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Performance

- Use `React.memo` for expensive components
- Use `useMemo` and `useCallback` appropriately
- Lazy load heavy components
- Optimize images before committing
- Monitor bundle size

---

## Development Tools

### VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx"
  ]
}
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "([\"'`][^\"'`]*.*?[\"'`])"]
  ]
}
```

---

## Next Steps

After setup, explore:

- [Architecture](./ARCHITECTURE.md) - System design
- [Performance](./PERFORMANCE.md) - Optimization techniques
- [Contributing](./CONTRIBUTING.md) - Contribution guidelines
- [Migration](./MIGRATION.md) - Technical evolution story

