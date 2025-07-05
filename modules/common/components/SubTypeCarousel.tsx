// components/SubTypeCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SubMenuItem {
  id: string;
  title: string;
  href: string;
}

interface Props {
  items: SubMenuItem[];
}

export default function SubTypeCarousel({ items }: Props) {
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
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {canScrollLeft && (
        <button
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-black p-2 shadow rounded-full"
          onClick={() => scrollBy(-200)}
        >
          <ChevronLeft />
        </button>
      )}

      <div
        ref={containerRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-10 py-3"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex-shrink-0 whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {item.title}
          </Link>
        ))}
      </div>

      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white dark:bg-black p-2 shadow rounded-full"
          onClick={() => scrollBy(200)}
        >
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
