"use client";

import React, { useEffect, useImperativeHandle, RefObject } from "react";

interface CollapseProps {
  type?: "horizontal" | "vertical";
  isOpen?: boolean;
  collapseRef?: RefObject<{
    updateCollapseHeight: (params: {
      height: number;
      increase: boolean;
    }) => void;
  }>;
  onHeightChange?: (params: { height: number; increase: boolean }) => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Folding panel component, supports horizontal folding and vertical folding
 * @param {type:['horizontal','vertical'],isOpen} props
 * @returns
 */
const Collapse = (props: CollapseProps) => {
  const { collapseRef } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const type = props.type || "vertical";

  useImperativeHandle(collapseRef, () => {
    return {
      /**
       * When the height of the child element changes,
       *  this method can be called to update the height
       * of the collapsed component.
       * @param param0 - Height change parameters
       */
      updateCollapseHeight: ({
        height,
        increase,
      }: {
        height: number;
        increase: boolean;
      }) => {
        if (ref.current) {
          ref.current.style.height = ref.current.scrollHeight.toString();
          ref.current.style.height = "auto";
        }
      },
    };
  });

  /**
   * fold
   * @param element - Element to collapse
   */
  const collapseSection = (element: HTMLElement | null) => {
    if (!element) return;
    const sectionHeight = element.scrollHeight;
    const sectionWidth = element.scrollWidth;

    requestAnimationFrame(function () {
      switch (type) {
        case "horizontal":
          element.style.width = sectionWidth + "px";
          requestAnimationFrame(function () {
            element.style.width = 0 + "px";
          });
          break;
        case "vertical":
          element.style.height = sectionHeight + "px";
          requestAnimationFrame(function () {
            element.style.height = 0 + "px";
          });
      }
    });
  };

  /**
   * Expand
   * @param element - Element to expand
   */
  const expandSection = (element: HTMLElement | null) => {
    if (!element) return;

    const sectionHeight = element.scrollHeight;
    const sectionWidth = element.scrollWidth;
    let clearTime: NodeJS.Timeout | number = 0;
    switch (type) {
      case "horizontal":
        element.style.width = sectionWidth + "px";
        clearTime = setTimeout(() => {
          element.style.width = "auto";
        }, 400);
        break;
      case "vertical":
        element.style.height = sectionHeight + "px";
        clearTime = setTimeout(() => {
          element.style.height = "auto";
        }, 400);
    }

    clearTimeout(clearTime);
  };

  useEffect(() => {
    if (props.isOpen) {
      expandSection(ref.current);
    } else {
      collapseSection(ref.current);
    }
    // Notify parent component of height change
    if (props?.onHeightChange && ref.current) {
      props.onHeightChange({
        height: ref.current.scrollHeight,
        increase: props.isOpen || false,
      });
    }
  }, [props.isOpen, props.onHeightChange]);

  return (
    <div
      ref={ref}
      style={
        type === "vertical"
          ? { height: "0px", willChange: "height" }
          : { width: "0px", willChange: "width" }
      }
      className={`${props.className || ""} overflow-hidden duration-200 `}
    >
      {props.children}
    </div>
  );
};

export default Collapse;
