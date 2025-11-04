/**
 * @norkive/mdx-ui
 *
 * EmbededWrapper component
 * Migrated from modules/mdx/EmbededWrapper.tsx
 */

import * as React from "react";
import type { WrapperProps } from "../../types/components";
import { assetStyle } from "../../utils/assetStyle";

export default function EmbededWrapper(props: WrapperProps) {
  const { names, urls } = props;

  if (!urls) return null;

  return (
    <div className="my-4">
      <iframe
        src={urls}
        width="100%"
        height="600"
        style={assetStyle}
        allowFullScreen
        loading="lazy"
        title="Embedded Content"
      />
    </div>
  );
}
