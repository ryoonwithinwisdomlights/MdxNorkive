"use client"; // 클라이언트 컴포넌트
import busuanzi from "@/lib/plugins/busuanzi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Busuanzi() {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && pathname !== currentUrl) {
      setCurrentUrl(pathname);
      // 약간의 지연을 두어 DOM이 완전히 준비된 후 실행
      setTimeout(() => {
        busuanzi.fetch();
      }, 100);
    }
  }, [pathname, currentUrl, isMounted]);

  // 클라이언트에서 마운트되기 전까지는 아무것도 렌더링하지 않음
  if (!isMounted) {
    return null;
  }

  return null;
}
