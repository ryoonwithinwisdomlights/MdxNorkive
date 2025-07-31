// components/SubTypeCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SubMenuItem {
  id: number;
  title: string;
  href: string;
  isActive?: boolean;
}

interface Props {
  items: SubMenuItem[];
}

export default function CategoryCarousel({ items }: Props) {
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

  return (
    <div className="relative w-full overflow-hidden md:max-w-3xl max-md:max-w-full">
      {canScrollLeft && (
        <button
          className="absolute left-1 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-black p-2 shadow-lg rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => scrollBy(-200)}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={containerRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-4 py-3"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-shrink-0 whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-sm transition-colors ${
              item.isActive
                ? "bg-neutral-200 dark:bg-neutral-700 border-neutral-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {canScrollRight && (
        <button
          className="absolute right-1 top-1/2 z-20 -translate-y-1/2 bg-white dark:bg-black p-2 shadow-lg rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => scrollBy(200)}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
