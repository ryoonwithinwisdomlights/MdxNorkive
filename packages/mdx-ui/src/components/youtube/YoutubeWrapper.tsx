/**
 * @norkive/mdx-ui
 *
 * YoutubeWrapper component
 * Migrated from modules/mdx/YoutubeWrapper.tsx
 */

import * as React from "react";
import {
  getYoutubeId,
  isValidYoutubeUrl,
  getYoutubeParams,
} from "../../utils/youtube";
import { LiteYouTubeEmbed } from "./LiteYouTubeEmbed";
import type { WrapperProps } from "../../types/components";
import { assetStyle } from "../../utils/assetStyle";

export default function YoutubeWrapper(props: WrapperProps) {
  const { urls } = props;
  const isValid = isValidYoutubeUrl(urls);
  // URL 유효성 검사
  if (!isValid) {
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
  const params = getYoutubeParams(urls);

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
