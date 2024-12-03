"use client"; // 클라이언트 컴포넌트
import busuanzi from "@/lib/plugins/busuanzi";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/providers/globalProvider";
import React, { useEffect } from "react";

let path = "";
export default function Busuanzi() {
  const { theme } = useGlobal({ from: "index" });
  const Router = useRouter();
  // Router.events.on("routeChangeComplete", (url, option) => {
  //   if (url !== path) {
  //     path = url;
  //     busuanzi.fetch();
  //   }
  // });

  // // Update when changing themes
  // React.useEffect(() => {
  //   if (theme) {
  //     busuanzi.fetch();
  //   }
  // }, [theme]);
  // return null;
}
