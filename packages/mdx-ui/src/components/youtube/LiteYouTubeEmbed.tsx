/**
 * @norkive/mdx-ui
 * 
 * LiteYouTubeEmbed component
 * Migrated from @norkive/lite-youtube-embed
 */

import React from "react";

export const cs = (...classes: Array<string | undefined | false>) =>
  classes.filter((a) => !!a).join(" ");

const qs = (params: Record<string, string>) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key]!)}`
    )
    .join("&");
};

type ImageType = "jpg" | "webp";

const resolutions = [120, 320, 480, 640, 1280] as const;
type VideoResolution = (typeof resolutions)[number];

const resolutionMap: Record<VideoResolution, string> = {
  120: "default",
  320: "mqdefault",
  480: "hqdefault",
  640: "sddefault",
  1280: "maxresdefault",
  // 2k, 4k, 8k images don't seem to be available
  // Source: https://longzero.com/articles/youtube-thumbnail-sizes-url/
};

const resolutionSizes = resolutions
  .map((resolution) => `(max-width: ${resolution}px) ${resolution}px`)
  .join(", ");

function getPosterUrl(
  id: string,
  resolution: VideoResolution = 480,
  type: ImageType = "jpg"
): string {
  if (type === "webp") {
    return `https://i.ytimg.com/vi_webp/${id}/${resolutionMap[resolution]}.webp`;
  }

  // Default to jpg
  return `https://i.ytimg.com/vi/${id}/${resolutionMap[resolution]}.jpg`;
}

function generateSrcSet(id: string, type: ImageType = "jpg"): string {
  return resolutions
    .map((resolution) => `${getPosterUrl(id, resolution, type)} ${resolution}w`)
    .join(", ");
}

export interface LiteYouTubeEmbedProps {
  /** YouTube 비디오 ID */
  id: string;

  /** 기본 재생 여부 (기본값: false) */
  defaultPlay?: boolean;

  /** 음소거 여부 (기본값: false) */
  mute?: boolean;

  /** 썸네일 lazy loading 여부 (기본값: false) */
  lazyImage?: boolean;

  /** iframe title 속성 (기본값: "YouTube video") */
  iframeTitle?: string;

  /** 이미지 alt 텍스트 (기본값: "Video preview") */
  alt?: string;

  /** YouTube 플레이어 파라미터 */
  params?: Record<string, string>;

  /** 광고 링크 preconnect 여부 (기본값: true) */
  adLinksPreconnect?: boolean;

  /** 커스텀 스타일 */
  style?: React.CSSProperties;

  /** 커스텀 클래스명 */
  className?: string;
}

export function LiteYouTubeEmbed({
  id,
  defaultPlay = false,
  mute = false,
  lazyImage = false,
  iframeTitle = "YouTube video",
  alt = "Video preview",
  params = {},
  adLinksPreconnect = true,
  style,
  className,
}: LiteYouTubeEmbedProps) {
  const muteParam = mute || defaultPlay ? "1" : "0";
  const queryString = React.useMemo(
    () => qs({ autoplay: "1", mute: muteParam, ...params }),
    [muteParam, params]
  );

  const ytUrl = "https://www.youtube-nocookie.com";
  const iframeSrc = `${ytUrl}/embed/${id}?${queryString}`;

  const [isPreconnected, setIsPreconnected] = React.useState(false);
  const [iframeInitialized, setIframeInitialized] = React.useState(defaultPlay);
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);

  const warmConnections = React.useCallback(() => {
    if (isPreconnected) return;
    setIsPreconnected(true);
  }, [isPreconnected]);

  const onLoadIframe = React.useCallback(() => {
    if (iframeInitialized) return;
    setIframeInitialized(true);
  }, [iframeInitialized]);

  const onIframeLoaded = React.useCallback(() => {
    setIsIframeLoaded(true);
  }, []);

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={getPosterUrl(id)}
        imageSrcSet={generateSrcSet(id, "webp")}
        imageSizes={resolutionSizes}
        type="image/webp"
      />

      {isPreconnected && (
        <>
          {/* The iframe document and most of its subresources come from youtube.com */}
          <link rel="preconnect" href={ytUrl} />

          {/* The botguard script is fetched off from google.com */}
          <link rel="preconnect" href="https://www.google.com" />
        </>
      )}

      {isPreconnected && adLinksPreconnect && (
        <>
          <link rel="preconnect" href="https://static.doubleclick.net" />
          <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        </>
      )}

      <div
        onClick={onLoadIframe}
        onPointerOver={warmConnections}
        className={cs(
          "youtube-lite",
          isIframeLoaded && "youtube-loaded",
          iframeInitialized && "youtube-initialized",
          className
        )}
        style={style}
      >
        <picture>
          {resolutions.map((resolution) => (
            <source
              key={resolution}
              srcSet={`${getPosterUrl(id, resolution, "webp")} ${resolution}w`}
              media={`(max-width: ${resolution}px)`}
              type="image/webp"
            />
          ))}

          <img
            src={getPosterUrl(id)}
            className="youtube-thumbnail"
            loading={lazyImage ? "lazy" : undefined}
            alt={alt}
          />
        </picture>

        <div className="youtube-playbtn" />

        {iframeInitialized && (
          <iframe
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={iframeTitle}
            src={iframeSrc}
            onLoad={onIframeLoaded}
          />
        )}
      </div>
    </>
  );
}

