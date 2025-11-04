feat: create @norkive/mdx-ui package consolidating MDX UI components

## Summary
Created new `@norkive/mdx-ui` package that consolidates YouTube-related packages
(`@norkive/youtube-utils`, `@norkive/lite-youtube-embed`) and MDX UI components
from `modules/mdx/` into a single unified package.

## New Package: @norkive/mdx-ui
- **Package Structure**:
  - `components/youtube/`: LiteYouTubeEmbed, YoutubeWrapper
  - `components/file/`: FileWrapper
  - `components/drive/`: GoogleDriveWrapper
  - `components/bookmark/`: BookMarkWrapper
  - `components/embed/`: EmbededWrapper
  - `utils/youtube.ts`: YouTube URL utilities (migrated from @norkive/youtube-utils)
  - `utils/assetStyle.ts`: Mutable style object for component customization
  - `styles.css`: Consolidated styles with scoped selectors to prevent conflicts
  - `MdxUIWrapper.tsx`: Optional wrapper component for style isolation

- **Features**:
  - CSS scoping using `.mdx-ui-wrapper` and `.mdx-ui-tooltip` classes
  - Lazy loading support via React.lazy
  - TypeScript type definitions
  - CJS and ESM builds
  - Comprehensive README with usage examples

## Project Integration
- **Updated `getMDXComponents.tsx`**:
  - Changed imports to use `@norkive/mdx-ui` package
  - Updated lazy loading to use main package export

- **Updated `styles/globals.css`**:
  - Changed import from `@norkive/lite-youtube-embed/styles.css` to `@norkive/mdx-ui/styles.css`

- **Updated `package.json`**:
  - Added `@norkive/mdx-ui` as local file dependency

## Removed Files
- `modules/mdx/YoutubeWrapper.tsx` → moved to `packages/mdx-ui/src/components/youtube/`
- `modules/mdx/FileWrapper.tsx` → moved to `packages/mdx-ui/src/components/file/`
- `modules/mdx/GoogleDriveWrapper.tsx` → moved to `packages/mdx-ui/src/components/drive/`
- `modules/mdx/BookMarkWrapper.tsx` → moved to `packages/mdx-ui/src/components/bookmark/`
- `modules/mdx/EmbededWrapper.tsx` → moved to `packages/mdx-ui/src/components/embed/`
- `modules/shared/LiteYouTubeEmbed.tsx` → moved to `packages/mdx-ui/src/components/youtube/`
- `lib/utils/youtube.ts` → moved to `packages/mdx-ui/src/utils/youtube.ts`

## Technical Details
- Package exports configured for tree-shaking support
- Peer dependencies: react (>=18.0.0), react-dom (>=18.0.0), lucide-react (^0.525.0)
- Build system: tsup for CJS/ESM/DTS generation
- CSS scoping prevents style conflicts with main project

## Migration Notes
This package consolidates the following deprecated packages:
- `@norkive/youtube-utils` (functionality moved to `utils/youtube.ts`)
- `@norkive/lite-youtube-embed` (component moved to `components/youtube/LiteYouTubeEmbed.tsx`)

Users should migrate from the old packages to `@norkive/mdx-ui` for continued support.

## Next Steps
- [ ] Write tests for the new package
- [ ] Publish to npm
- [ ] Update documentation for deprecated packages

