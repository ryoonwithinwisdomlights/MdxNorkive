"use client";

import { useUIStore } from "@/lib/stores";
import NorkiveIntro from "@/modules/page/intropage/NorkiveIntro";
import { useEffect } from "react";

export default function Page() {
  const { setRightSideInfoBarMode } = useUIStore();
  useEffect(() => {
    setRightSideInfoBarMode("info");
  }, []);

  return <NorkiveIntro />;
}
