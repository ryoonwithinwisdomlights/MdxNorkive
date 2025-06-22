"use client";
import { useState, useEffect } from "react";
import { WindowSize } from "@/types";

// Window size를 담은 객체의 타입을 정의합니다.

function useWindowSize(): WindowSize {
  // window size 상태를 저장할 useState를 선언합니다.
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 현재 window의 size를 설정하는 핸들러 함수입니다.
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 컴포넌트가 마운트될 때 현재 window size를 설정합니다.
    handleResize();

    // window의 resize 이벤트에 핸들러를 등록합니다.
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // 빈 의존성 배열은 훅이 마운트될 때 한 번만 실행되게 합니다.

  return windowSize;
}

export default useWindowSize;
