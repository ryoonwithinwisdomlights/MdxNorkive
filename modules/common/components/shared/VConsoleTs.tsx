"use client";
import { loadExternalResource } from "@/lib/utils/general";
import { useEffect, useRef, useLayoutEffect, useState } from "react";

const VConsoleTs = () => {
  const [currentTime, setTime] = useState<number>();
  useLayoutEffect(() => {
    // You can determine when and how often to update
    // the time here. In this example we update it only once
    const now = Date.now();
    setTime(now);
  }, []);
  const clickCountRef = useRef<number>(0); // 클릭 횟수
  const lastClickTimeRef = useRef<number>(0); // 마지막 클릭 시간 타임스탬프
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조 NodeJS.Timeout 타입을 사용하여 타이머에 대한 참조를 저장합니다. 이는 Node.js와 브라우저 둘 다에서 작동하는 타입입니다.

  const loadVConsole = async (): Promise<void> => {
    try {
      const url = await loadExternalResource(
        "https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js",
        "js"
      );
      if (!url) {
        return;
      }
      const VConsole = (window as any).VConsole; //window 객체에 VConsole이 없는 관계로 (window as any).VConsole을 사용하여 타입스크립트의 타입 검사를 우회
      const vConsole = new VConsole();
      return vConsole;
    } catch (error) {
      console.error("Failed to load vConsole:", error);
    }
  };

  /**
   * 이 코드는 브라우저에서 8번 연속으로 클릭 이벤트가 발생하면
   * vConsole을 로드하는 방식으로 작동합니다.
   * 각 클릭 이벤트는 중앙에서 100x100 픽셀 범위 내에서 발생해야 합니다.
   */
  useEffect(() => {
    if (currentTime) {
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
    }
  }, []);

  return null;
};

export default VConsoleTs;
