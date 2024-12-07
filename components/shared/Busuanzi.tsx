"use client"; // 클라이언트 컴포넌트
import busuanzi from "@/lib/plugins/busuanzi";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Busuanzi() {
  const pathname = usePathname();
  const params = useParams();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const newPath = `${pathname}/${params}`;
    console.log("newPathnewPath:", newPath);
    if (newPath !== currentUrl) {
      setCurrentUrl(newPath);
      busuanzi.fetch();
    }
  }, [pathname, params]); // pathname 또는 search가 변경될 때마다 useEffect를 트리거합니다.
  //  const shareUrl = BLOG.LINK + `${pathname}?${params}`;
  return null;
}
