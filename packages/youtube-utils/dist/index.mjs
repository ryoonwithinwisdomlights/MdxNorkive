// src/index.ts
var YOUTUBE_DOMAINS = /* @__PURE__ */ new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com"
]);
function getYoutubeId(url) {
  try {
    const { hostname } = new URL(url);
    if (!YOUTUBE_DOMAINS.has(hostname)) {
      return null;
    }
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;
    const match = url.match(regExp);
    if (match && match[2]?.length === 11) {
      return match[2];
    }
  } catch {
  }
  return null;
}
function isValidYoutubeUrl(url) {
  return getYoutubeId(url) !== null;
}
function getYoutubeParams(url) {
  try {
    const urlObj = new URL(url);
    const params = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch {
    return {};
  }
}
export {
  getYoutubeId,
  getYoutubeParams,
  isValidYoutubeUrl
};
