"use client"; // 클라이언트 컴포넌트
import busuanzi from "@/lib/plugins/busuanzi";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Busuanzi() {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // console.log("newPathnewPath:", pathname);
    if (pathname !== currentUrl) {
      setCurrentUrl(pathname);
      busuanzi.fetch();
    }
  }, [pathname]); // pathname 또는 search가 변경될 때마다 useEffect를 트리거합니다.
  return null;
}
