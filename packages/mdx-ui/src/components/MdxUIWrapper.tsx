/**
 * @norkive/mdx-ui
 *
 * MdxUIWrapper component
 * Optional wrapper component to scope tooltip styles
 */

import * as React from "react";

export interface MdxUIWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Optional wrapper component for MDX UI components.
 *
 * This wrapper is not required, but can be used to scope tooltip styles
 * if you want to ensure complete isolation from global styles.
 *
 * @example
 * ```tsx
 * <MdxUIWrapper>
 *   <FileWrapper names="file.pdf" urls="https://..." />
 * </MdxUIWrapper>
 * ```
 */
export function MdxUIWrapper({ children, className }: MdxUIWrapperProps) {
  return <div className={`mdx-ui-wrapper ${className || ""}`}>{children}</div>;
}
