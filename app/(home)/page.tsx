"use client";

import { useUIStore } from "@/lib/stores";
import NorkiveIntro from "@/modules/page/intropage/NorkiveIntro";
import { useEffect } from "react";

export default function Page() {
  const { setRightSideInfoBarMode } = useUIStore();
  useEffect(() => {
    setRightSideInfoBarMode("info");
  }, []); // 의존성 배열을 비워서 한 번만 실행되도록 함

  return <NorkiveIntro />;
}
