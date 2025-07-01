"use client";

import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { TableOfContentsEntry, uuidToId } from "notion-utils";

export function useTableOfContentsScrollSpy(
  toc: TableOfContentsEntry[]
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const throttleMs = 100;

    const handler = throttle(() => {
      const sections = document.getElementsByClassName("notion-h");
      let currentSectionId: string | null = null;
      let prevBBox: DOMRect | null = null;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!(section instanceof Element)) continue;

        const id = section.getAttribute("data-id");
        if (!id) continue;

        const bbox = section.getBoundingClientRect();
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
        const offset = Math.max(150, prevHeight / 4);

        if (bbox.top - offset < 0) {
          currentSectionId = id;
          prevBBox = bbox;
        } else {
          break;
        }
      }

      if (currentSectionId) {
        setActiveId(currentSectionId);
      }
    }, throttleMs);

    window.addEventListener("scroll", handler);
    handler();

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [toc]);

  const activeUuid = activeId
    ? (toc.find((t) => uuidToId(t.id) === activeId)?.id ?? null)
    : null;

  return activeUuid;
}
