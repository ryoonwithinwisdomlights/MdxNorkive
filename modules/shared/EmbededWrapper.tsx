import * as React from "react";

const assetStyle: React.CSSProperties = {};
interface WrapperProps {
  names: string;
  urls: string;
}

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
