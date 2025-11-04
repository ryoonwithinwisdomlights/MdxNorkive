/**
 * @norkive/mdx-ui
 *
 * Default asset style for YouTube and Embed components.
 *
 * Users can customize this by importing and modifying:
 *
 * @example
 * ```typescript
 * import { assetStyle } from "@norkive/mdx-ui/utils/assetStyle";
 *
 * // Customize the style
 * Object.assign(assetStyle, {
 *   borderRadius: "8px",
 *   border: "1px solid #ccc",
 * });
 * ```
 *
 * Or use the style prop directly on components for per-instance customization.
 */
import * as React from "react";

/**
 * Default asset style object.
 *
 * This is a mutable object that can be modified globally.
 * For per-instance customization, use the `style` prop on components.
 */
export const assetStyle: React.CSSProperties = {};
