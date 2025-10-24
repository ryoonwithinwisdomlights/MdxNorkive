// components/SubOptionCarousel.tsx
"use client";

import { useThemeStore } from "@/lib/stores";
import { OptionCarouselProps } from "@/types/components/pageutils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function OptionCarousel({
  allOptions,
  currentOption,
  initString,
  handleOptionTypeChange,
  className,
}: OptionCarouselProps) {
  const { locale } = useThemeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  const scrollBy = (distance: number) => {
    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => checkScroll();
    el.addEventListener("scroll", handleScroll);

    // 윈도우 리사이즈 시에도 스크롤 상태 체크
    const handleResize = () => checkScroll();
    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // "전체" 옵션 찾기 (id가 -1인 항목)
  const allOption = allOptions.find((item) => item.id === -1);

  // 첫 번째 요소를 제외한 나머지 요소들 (스크롤 영역용)
  const scrollOptions = allOptions.filter((item) => item.id !== -1);

  // console.log("currentOption:", currentOption);
  return (
    <div className={`relative ${className}`}>
      {/* 1. 고정 "전체" 버튼 */}
      {allOption && (
        <button
          className={`absolute left-0 top-1/2 z-30 -translate-y-1/2
            bg-fd-secondary/50 hover:text-fd-accent-foreground
        border-neutral-200 dark:border-neutral-400
          px-3 py-2 text-sm rounded-md border transition-colors
          hover:bg-neutral-300/50 dark:hover:bg-neutral-600 ${
            allOption.isActive
              ? "bg-neutral-300/50 dark:bg-neutral-700 border-neutral-400/50 text-fd-accent-foreground"
              : "text-fd-muted-foreground"
          }`}
          onClick={() => handleOptionTypeChange(allOption.option)}
        >
          {initString ? initString : locale.COMMON.ALL}
        </button>
      )}

      {/* 2. 고정 왼쪽 스크롤 버튼 - 항상 표시하되 비활성화 상태로 표시 */}
      <button
        className={`absolute left-24 top-1/2 z-20 -translate-y-1/2
          p-2 shadow-lg rounded-md border transition-colors ${
            canScrollLeft
              ? "bg-neutral-200 dark:bg-black border-neutral-400 dark:border-neutral-400 hover:border-neutral-600 dark:hover:border-neutral-100 cursor-pointer"
              : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 cursor-not-allowed opacity-50"
          }`}
        onClick={() => canScrollLeft && scrollBy(-200)}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 3. 스크롤 영역 - 첫 번째 요소 제외한 나머지 요소들 */}
      <div
        ref={containerRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-3 ml-34 mr-16"
      >
        {scrollOptions.map((item) => (
          <button
            key={item.id}
            onClick={() => handleOptionTypeChange(item.option)}
            className={`flex-shrink-0 bg-fd-secondary/50  hover:bg-neutral-300/50 hover:dark:bg-neutral-700 whitespace-nowrap rounded-md border px-4 py-2 text-sm  hover:text-fd-accent-foreground transition-colors ${
              item.isActive
                ? "bg-neutral-300/50 text-fd-accent-foreground dark:bg-neutral-700 border-neutral-400/50 dark:border-neutral-400"
                : "hover:bg-neutral-200/50 dark:hover:bg-neutral-700 text-fd-muted-foreground"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* 4. 고정 오른쪽 스크롤 버튼 - 항상 표시하되 비활성화 상태로 표시 */}
      <button
        className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 
          p-2 shadow-lg rounded-md border transition-colors ${
            canScrollRight
              ? "bg-neutral-200 dark:bg-black border-neutral-400 dark:border-neutral-400 hover:border-neutral-600 dark:hover:border-neutral-100 cursor-pointer"
              : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-600 cursor-not-allowed opacity-50"
          }`}
        onClick={() => canScrollRight && scrollBy(200)}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
