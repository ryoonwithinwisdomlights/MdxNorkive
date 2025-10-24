import * as React from "react";
import { LiteYouTubeEmbed } from "../../modules/shared/LiteYouTubeEmbed";
import { getUrlParams, getYoutubeId } from "@/lib/utils";
import { WrapperProps } from "@/types/components/common";
import { assetStyle } from "@/constants/ui.constants";

export default function YoutubeWrapper(props: WrapperProps) {
  const { names, urls } = props;

  // URL 유효성 검사
  if (!urls || urls === "https://www.youtube.com/watch") {
    console.warn(`⚠️ YoutubeWrapper: 유효하지 않은 YouTube URL: ${urls}`);
    return (
      <div className="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          ⚠️ YouTube URL이 유효하지 않습니다: {urls}
        </p>
      </div>
    );
  }

  const youtubeVideoId = getYoutubeId(urls);
  const params = getUrlParams(urls);

  if (!youtubeVideoId) {
    console.warn(`⚠️ YoutubeWrapper: YouTube ID를 추출할 수 없습니다: ${urls}`);
    return (
      <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-800 dark:text-red-200 text-sm">
          ❌ YouTube ID를 추출할 수 없습니다: {urls}
        </p>
      </div>
    );
  }

  return (
    <LiteYouTubeEmbed
      id={youtubeVideoId}
      style={assetStyle}
      className="w-full h-full border-radius-1px"
      params={params}
    />
  );
}
