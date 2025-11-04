/**
 * @norkive/mdx-ui
 * 
 * MDX UI components for rendering content in browsers
 * 
 * This package consolidates:
 * - @norkive/youtube-utils (deprecated)
 * - @norkive/lite-youtube-embed (deprecated)
 * - MDX wrapper components from modules/mdx
 * 
 * IMPORTANT: Don't forget to import the CSS styles:
 * ```typescript
 * import "@norkive/mdx-ui/styles.css";
 * ```
 */

// Export all components
export * from "./components";

// Export utilities
export * from "./utils/youtube";
export { assetStyle } from "./utils/assetStyle";

// Export types
export type { WrapperProps } from "./types/components";
