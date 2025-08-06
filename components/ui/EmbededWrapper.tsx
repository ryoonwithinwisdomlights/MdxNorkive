import * as React from "react";

interface EmbededWrapperProps {
  names: string;
  urls: string;
}

const assetStyle: React.CSSProperties = {};

export default function EmbededWrapper(props: EmbededWrapperProps) {
  const { names, urls } = props;

  if (!urls) return null;

  // Figma 링크인지 확인
  const isFigmaLink =
    urls.toLowerCase().includes("figma.com") ||
    urls.toLowerCase().includes("figma.site");

  // Figma 링크인 경우 iframe으로 임베드
  // if (isFigmaLink) {
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
  // }

  // 일반 링크인 경우 링크로 표시
  return (
    <div className="my-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <a
        href={urls}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-600 dark:text-neutral-400 hover:underline"
      >
        🔗 {urls}
      </a>
    </div>
  );
}
