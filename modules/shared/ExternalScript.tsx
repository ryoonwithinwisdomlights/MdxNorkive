"use client";

import { isBrowser } from "@/lib/utils/general";

/**
 * custom external script
 * The incoming parameters will be converted to <script>Label.
 * @returns
 */
const ExternalScript = (props: { src: string }) => {
  const { src } = props;
  if (!isBrowser || !src) {
    return null;
  }

  const element = document.querySelector(`script[src="${src}"]`);
  if (element) {
    return null;
  }
  const script: HTMLScriptElement = document.createElement("script");
  Object.entries(props).forEach(([key, value]: [string, string | number]) => {
    script.setAttribute(key, value.toString());
  });
  document.head.appendChild(script);
  console.log("Load external script", props, script);
  return null;
};

export default ExternalScript;
