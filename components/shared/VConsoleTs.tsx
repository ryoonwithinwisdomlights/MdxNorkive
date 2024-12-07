"use client";
import { loadExternalResource } from "@/lib/utils/utils";
import { useEffect, useRef } from "react";

const VConsoleTs = ({ currentTime }) => {
  const clickCountRef = useRef<number>(0); // 클릭 횟수
  const lastClickTimeRef = useRef<number>(0); // 마지막 클릭 시간 타임스탬프
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조

  const loadVConsole = async (): Promise<void> => {
    try {
      const url = await loadExternalResource(
        "https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js",
        "js"
      );
      if (!url) {
        return;
      }
      const VConsole = (window as any).VConsole;
      const vConsole = new VConsole();
      return vConsole;
    } catch (error) {
      console.error("Failed to load vConsole:", error);
    }
  };

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      //   const now = Date.now();
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const range = 50;
      const inRange =
        event.clientX >= centerX - range &&
        event.clientX <= centerX + range &&
        event.clientY >= centerY - range &&
        event.clientY <= centerY + range;

      if (!inRange) {
        return;
      }

      if (
        currentTime - lastClickTimeRef.current < 1000 &&
        clickCountRef.current + 1 === 8
      ) {
        loadVConsole();
        clickCountRef.current = 0; // 계수기 초기화
        if (timerRef.current) {
          clearTimeout(timerRef.current); // 타이머 초기화
        }
        window.removeEventListener("click", clickListener);
      } else {
        lastClickTimeRef.current = currentTime;
        clickCountRef.current += 1;

        if (clickCountRef.current > 0) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
          }, 1000);
        }
      }
    };

    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("click", clickListener);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return null;
};

export default VConsoleTs;
