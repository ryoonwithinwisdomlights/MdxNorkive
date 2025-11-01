import { WrapperProps } from "@/types/components/common";
import { assetStyle } from "@/constants/ui.constants";
import * as React from "react";

export default function EmbededWrapper(props: WrapperProps) {
  const { names, urls } = props;

  if (!urls) return null;

  // Figma 링크인지 확인
  // const isFigmaLink =
  //   urls.toLowerCase().includes("figma.com") ||
  //   urls.toLowerCase().includes("figma.site");

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
