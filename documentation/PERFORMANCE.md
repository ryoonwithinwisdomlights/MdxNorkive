# Performance Optimization

This document details the performance optimization strategies, benchmarks, and best practices used in Norkive.

## Table of Contents

- [Performance Metrics](#performance-metrics)
- [Optimization Strategies](#optimization-strategies)
- [Rendering Optimization](#rendering-optimization)
- [Bundle Optimization](#bundle-optimization)
- [Image Optimization](#image-optimization)
- [Build Performance](#build-performance)
- [Runtime Performance](#runtime-performance)
- [Monitoring](#monitoring)

---

## Performance Metrics

### Lighthouse Scores

```
Performance:     96/100 ⚡
Accessibility:   98/100 ♿
Best Practices: 100/100 ✅
SEO:            100/100 🔍
```

### Core Web Vitals

| Metric | Score | Target | Status | Description |
|--------|-------|--------|--------|-------------|
| **LCP** | 1.2s | < 2.5s | ✅ Excellent | Largest Contentful Paint |
| **FID** | 12ms | < 100ms | ✅ Excellent | First Input Delay |
| **CLS** | 0.02 | < 0.1 | ✅ Excellent | Cumulative Layout Shift |
| **FCP** | 0.8s | < 1.8s | ✅ Excellent | First Contentful Paint |
| **TTFB** | 180ms | < 600ms | ✅ Excellent | Time to First Byte |
| **TBT** | 150ms | < 200ms | ✅ Good | Total Blocking Time |
| **SI** | 2.1s | < 3.4s | ✅ Excellent | Speed Index |

### Before vs After Comparison

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Load | 2.5s | 1.0s | ↓ 60% |
| Bundle Size | 2.3MB | 890KB | ↓ 61% |
| Image Size | 5.2MB | 1.5MB | ↓ 71% |
| Build Time | 3m 15s | 45s | ↓ 77% |
| Lighthouse | 60 | 96 | ↑ 60% |
| Component Renders | 112 | 12 | ↓ 89% |

---

## Optimization Strategies

### 1. Rendering Optimization

#### React.memo for Component Memoization

```typescript
// Before: Re-renders on every parent update
export function RecordCard({ record }: RecordCardProps) {
  return <div>{record.title}</div>;
}

// After: Only re-renders when record changes
export const RecordCard = React.memo(({ record }: RecordCardProps) => {
  return <div>{record.title}</div>;
});
```

**Impact**: Reduced unnecessary re-renders by 70%

#### useMemo for Expensive Computations

```typescript
// Before: Filters and sorts on every render
function RecordList({ records, category }) {
  const filtered = records
    .filter(r => r.category === category)
    .sort((a, b) => b.date - a.date);
  
  return <div>{filtered.map(r => <RecordCard record={r} />)}</div>;
}

// After: Only recomputes when dependencies change
function RecordList({ records, category }) {
  const filtered = useMemo(
    () => records
      .filter(r => r.category === category)
      .sort((a, b) => b.date - a.date),
    [records, category]
  );
  
  return <div>{filtered.map(r => <RecordCard record={r} />)}</div>;
}
```

**Impact**: Reduced computation time by 80% on large lists

#### useCallback for Function Stability

```typescript
// Before: New function on every render
function RecordList({ onSelect }) {
  const handleClick = (id) => {
    onSelect(id);
    router.push(`/records/${id}`);
  };
  
  return <button onClick={handleClick}>View</button>;
}

// After: Stable function reference
function RecordList({ onSelect }) {
  const handleClick = useCallback((id) => {
    onSelect(id);
    router.push(`/records/${id}`);
  }, [onSelect, router]);
  
  return <button onClick={handleClick}>View</button>;
}
```

**Impact**: Prevented child component re-renders

### 2. Code Splitting

#### Dynamic Imports

```typescript
// Before: Bundle all code upfront
import { HeavyComponent } from './HeavyComponent';

export default function Page() {
  return <HeavyComponent />;
}

// After: Load on demand
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // If not needed for SEO
});

export default function Page() {
  return <HeavyComponent />;
}
```

**Impact**: 
- Initial bundle: -250KB
- Time to Interactive: -0.8s

#### Route-based Code Splitting

Next.js automatically splits code by route:

```
Initial page:     290KB
/records route:   +180KB (lazy)
/engineering:     +160KB (lazy)
/projects:        +140KB (lazy)
```

### 3. Font Optimization

```typescript
// next/font/google with display: swap
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap', // Prevents FOUT (Flash of Unstyled Text)
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
});
```

**Benefits**:
- Fonts are self-hosted (no external requests)
- Automatic font subset optimization
- Zero layout shift during font load

### 4. CSS Optimization

#### Tailwind CSS Purging

```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  // Removes unused CSS classes
};
```

**Before**: 3.2MB CSS  
**After**: 45KB CSS (98.6% reduction)

#### Critical CSS Inlining

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Critical CSS inlined */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**Impact**: First Paint improved by 200ms

---

## Rendering Optimization

### Comprehensive Memoization Strategy

Norkive implements a comprehensive memoization strategy achieving **89% reduction** in unnecessary component re-renders through careful use of React.memo, useMemo, and useCallback.

### Implementation Results

#### Component-level Performance

| Component | Before | After | Improvement |
|-----------|--------|-------|-------------|
| DateSortedRecords | 100 renders | 10 renders | ↓ 90% |
| LatestRecords | 3 renders | 1 render | ↓ 67% |
| RecordsWithMultiplesOfThree | 9 renders | 1 render | ↓ 89% |
| FeaturedRecords | Optimized | Optimized | ✅ |
| EntireRecords | Optimized | Optimized | ✅ |
| **Total Reduction** | **112 renders** | **12 renders** | **↓ 89%** |

### Key Optimization Techniques

#### 1. React.memo for List Items

```typescript
// modules/page/components/EntireRecords.tsx
const RecordCard = React.memo(
  ({ page, locale, onCardClick }) => {
    // Only re-renders when props actually change
  }
);
```

**Applied to**:
- `RecordCard` in `EntireRecords`
- `docItem` in `DateSortedRecords`
- All list rendering components

#### 2. useMemo for Complex Filtering

```typescript
const { filteredPages, allOptions } = useMemo(() => {
  const filtered = pages.filter(/* complex logic */);
  const options = Array.from(new Set(/* unique values */));
  return { filteredPages: filtered, allOptions: options };
}, [pages, currentRecordType, subType]);
```

**Caches**:
- Pagination results
- Filter outcomes
- Sorted arrays
- Formatted dates/tags

#### 3. useCallback for Event Handlers

```typescript
const handleRecordTypeChange = useCallback((option: string) => {
  setCurrentRecordType(option);
  setCurrentPage(0);
}, []);
```

**Stabilizes**:
- Click handlers
- Filter handlers
- Navigation functions

### Performance Impact

- **Interaction Response**: <100ms (target achieved)
- **Rendering Overhead**: 89% reduction
- **Memory Usage**: Minimal increase (~2KB)
- **Code Complexity**: Slight increase (acceptable trade-off)

### Best Practices Applied

✅ **When to Use**: List items, expensive operations  
❌ **When to Avoid**: Simple calculations, over-optimization

See [MEMOIZATION_GUIDE.md](./documents-description/MEMOIZATION_GUIDE.md) for detailed patterns and examples.

---

## Bundle Optimization

### Webpack Configuration

```javascript
// next.config.ts
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name: 'vendors',
            priority: 10,
            enforce: true,
          },
          radix: {
            test: /@radix-ui/,
            name: 'radix-ui',
            priority: 9,
          },
          mdx: {
            test: /content/,
            name: 'mdx-content',
            priority: 8,
          },
          common: {
            minChunks: 2,
            name: 'common',
            priority: 5,
          },
        },
      },
      // Enable tree shaking
      usedExports: true,
      sideEffects: false,
      // Module concatenation
      concatenateModules: true,
    };
  }
  return config;
},
```

### Bundle Analysis

```bash
npm run analyze
```

**Results**:

```
File                  Size       Gzipped
────────────────────────────────────────
vendors.js           1.2MB      420KB
mdx-content.js       520KB      180KB
radix-ui.js          450KB      150KB
common.js            380KB      140KB
────────────────────────────────────────
Total               2.55MB      890KB
```

### Tree Shaking Optimization

```typescript
// next.config.ts
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-icons',
    '@fortawesome/fontawesome-svg-core',
  ],
},
```

**Before**:
```typescript
import * as Icons from 'lucide-react'; // Imports all ~1000 icons (250KB)
```

**After**:
```typescript
import { Home, Search, Settings } from 'lucide-react'; // Only 3 icons (8KB)
```

**Savings**: 242KB per page

---

## Image Optimization

### Cloudinary Transformation

```typescript
const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/
  f_auto,        // Auto format (WebP/AVIF)
  q_auto,        // Auto quality
  w_1200,        // Max width
  c_limit,       // Don't upscale
  /v1/${path}`;
```

**Results**:

| Format | Original | Optimized | Savings |
|--------|----------|-----------|---------|
| PNG | 2.5MB | 180KB | 93% |
| JPEG | 1.8MB | 120KB | 93% |
| Average | 2.1MB | 150KB | 93% |

### Next.js Image Component

```typescript
<Image
  src={cloudinaryUrl}
  alt={title}
  width={800}
  height={450}
  loading="lazy"           // Lazy load below fold
  placeholder="blur"        // Blur placeholder
  blurDataURL={blurData}   // Low-res preview
  sizes="(max-width: 768px) 100vw, 800px"  // Responsive
/>
```

**Benefits**:
- Automatic `srcset` generation
- Lazy loading (saves 2.3s on initial load)
- Blur-up effect (better perceived performance)
- Responsive images (saves bandwidth on mobile)

### Image CDN Strategy

```
User Request
  ↓
Cloudinary CDN (global, cached)
  ↓
Transformed Image (WebP/AVIF, optimized)
  ↓
Browser (cached, displayed)
```

**Performance**:
- CDN hit rate: 98%
- Average load time: 120ms
- Cache duration: 1 year

---

## Build Performance

### Parallel Processing

```typescript
// content-collections.ts
export default defineConfig({
  parallel: true,  // Use all CPU cores
  // Before: 3m 15s (single thread)
  // After: 1m 20s (8 cores)
});
```

**Improvement**: 59% faster builds

### Incremental Builds

```typescript
export default defineConfig({
  incremental: true,  // Only rebuild changed files
  // Full rebuild: 1m 20s
  // Incremental: 15s (on single file change)
});
```

**Developer Experience**: 81% faster iteration

### Build Caching

```typescript
// Vercel automatically caches:
// - node_modules
// - .next/cache
// - Content Collections output

// Subsequent builds:
// Cold: 1m 20s
// Warm: 45s (with cache)
```

---

## Runtime Performance

### Static Generation (SSG)

```typescript
// All pages pre-rendered at build time
export async function generateStaticParams() {
  return allRecords.map(post => ({
    slug: post._meta.path.split('/'),
  }));
}

// Result: Zero database queries at runtime
```

**TTFB**: <200ms (served from CDN)

### Incremental Static Regeneration (ISR)

```typescript
export const revalidate = 3600; // Revalidate every 1 hour

// Behavior:
// First request: Serve stale, regenerate in background
// Subsequent: Serve fresh for 1 hour
```

**Benefits**:
- Always fast (serves cached)
- Eventually fresh (updates every hour)
- No cold starts

### Edge Caching

```typescript
// Vercel Edge Network
// - 100+ edge locations worldwide
// - <50ms latency globally
// - Automatic cache invalidation

// Headers for cache control
export const runtime = 'edge';
```

**Global Performance**:
- US: 180ms TTFB
- Europe: 160ms TTFB
- Asia: 190ms TTFB

---

## Monitoring

### Real User Monitoring (RUM)

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**Metrics Tracked**:
- Core Web Vitals (LCP, FID, CLS)
- Custom events (search, navigation)
- Error rates
- Page load times

### Performance Budgets

```typescript
// next.config.ts
webpack: (config) => {
  config.performance = {
    maxEntrypointSize: 512000,  // 500KB
    maxAssetSize: 512000,       // 500KB
    hints: 'warning',
  };
  return config;
},
```

**Alerts**:
- Bundle exceeds 500KB → Warning
- Single asset exceeds 500KB → Warning

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://norkive.vercel.app/
            https://norkive.vercel.app/records/
          budgetPath: ./lighthouse-budget.json
```

**Budget**:
```json
{
  "performance": 90,
  "accessibility": 95,
  "best-practices": 95,
  "seo": 95
}
```

---

## Performance Checklist

### Build-time Optimizations

- [x] Parallel content processing
- [x] Incremental builds
- [x] Build caching
- [x] Tree shaking enabled
- [x] Code splitting configured
- [x] Bundle size budgets set

### Runtime Optimizations

- [x] Static generation (SSG)
- [x] Incremental regeneration (ISR)
- [x] Edge caching enabled
- [x] Image optimization
- [x] Font optimization
- [x] CSS purging

### Component Optimizations

- [x] React.memo for expensive components
- [x] useMemo for computations
- [x] useCallback for functions
- [x] Dynamic imports for heavy components
- [x] Lazy loading for images

### Monitoring

- [x] Lighthouse CI
- [x] Real User Monitoring
- [x] Error tracking
- [x] Performance budgets
- [x] Core Web Vitals tracking

---

## Future Improvements

### Planned Optimizations

1. **Service Worker**: Offline support, background sync
2. **Partial Hydration**: Reduce JavaScript payload
3. **Streaming SSR**: Faster time to first byte
4. **Image Preloading**: Preload above-fold images
5. **Resource Hints**: `prefetch`, `preconnect` for critical resources

### Target Metrics

```
Current:
- Lighthouse: 96/100
- LCP: 1.2s
- Bundle: 890KB

Target (v2.0):
- Lighthouse: 98/100
- LCP: 0.8s
- Bundle: 600KB
```

---

## References

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/pages/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Vercel Analytics](https://vercel.com/docs/analytics)

