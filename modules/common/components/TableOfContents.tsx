"use client";
import { useCallback, useEffect, useState } from "react";
import { uuidToId } from "notion-utils";
import throttle from "lodash.throttle";
import { isBrowser } from "@/lib/utils/utils";

const TableOfContents = ({ props }) => {
  if (!props || !props.record) {
    return null;
  } else if (props.record?.tableOfContents?.length === 0) {
    return null;
  }

  const toc = props.record.tableOfContents;
  console.log("TableOfContents::::,", toc);
  // Synchronize selected directory events
  const [activeSection, setActiveSection] = useState(null);

  // listen for scroll events
  useEffect(() => {
    window.addEventListener("scroll", actionSectionScrollSpy);
    actionSectionScrollSpy();
    return () => {
      window.removeEventListener("scroll", actionSectionScrollSpy);
    };
  }, [props.record]);

  const throttleMs = 200;
  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName("notion-h");
      let prevBBox;
      let currentSectionId;
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i];
        if (!section || !(section instanceof Element)) continue;
        if (!currentSectionId) {
          currentSectionId = section.getAttribute("data-id");
        }
        const bbox = section.getBoundingClientRect();
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
        const offset = Math.max(150, prevHeight / 4);
        // GetBoundingClientRect returns values relative to viewport
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute("data-id");
          prevBBox = bbox;
          continue;
        }
        // No need to continue loop, if last element has been detected
        break;
      }
      setActiveSection(currentSectionId);
      const tocIds =
        props.record?.tableOfContents?.map((t) => uuidToId(t.id)) || [];
      const index = tocIds.indexOf(currentSectionId) || 0;
      if (!isBrowser && tocIds?.length > 0) {
        for (const tocWrapper of document?.getElementsByClassName(
          "toc-wrapper"
        )) {
          tocWrapper?.scrollTo({ top: 28 * index, behavior: "smooth" });
        }
      }
    }, throttleMs),
    [props.record]
  );
  if (!toc || toc?.length < 1) {
    return <></>;
  }

  return (
    <div
      id="toc-wrapper"
      className="toc-wrapper overflow-y-auto my-2 max-h-80 overscroll-none scroll-hidden"
    >
      <nav className="h-full text-black ">
        {toc.map((tocItem) => {
          const id = uuidToId(tocItem.id);
          return (
            <a
              key={id}
              href={`#${id}`}
              className={`${
                activeSection === id &&
                "border-amber-500 text-amber-500 font-bold"
              }  hover:text-amber-500 border-l duration-300   notion-table-of-contents-item  transform font-light dark:text-gray-300
              notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `}
            >
              <span
                style={{
                  display: "inline-block",
                  marginLeft: tocItem.indentLevel * 16,
                }}
                className={`truncate `}
              >
                {tocItem.text}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;
