import * as React from "react";
import { LiteYouTubeEmbed } from "../../modules/shared/LiteYouTubeEmbed";
import { getUrlParams } from "@/lib/utils/general";
import { getYoutubeId } from "@/lib/utils/youtube";

const assetStyle: React.CSSProperties = {};
interface YoutubeWrappereProps {
  names: string;
  urls: string;
}

export default function YoutubeWrapper(props: YoutubeWrappereProps) {
  const { names, urls } = props;
  const youtubeVideoId = getYoutubeId(urls);
  const params = getUrlParams(urls);
  if (!youtubeVideoId) return null;

  return (
    <LiteYouTubeEmbed
      id={youtubeVideoId}
      style={assetStyle}
      className="w-full h-full border-radius-1px"
      params={params}
    />
  );
}
