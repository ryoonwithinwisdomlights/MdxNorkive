"use client";

import { IMG_LAZY_LOAD_PLACEHOLDER } from "@/constants/ui.constants";
import { ImgProps, LazyImageProps } from "@/types/components/common";
import React, { useEffect, useRef, useState } from "react";

/**
 * Lazy loading of images
 * @param {*} param0
 * @returns
 */
export default function LazyImage({
  priority,
  id,
  src,
  alt,
  placeholderSrc = IMG_LAZY_LOAD_PLACEHOLDER,
  className,
  width,
  height,
  title,
  onLoad,
  style,
}: LazyImageProps) {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (typeof onLoad === "function") {
      onLoad(); // Trigger the passed onLoad callback function
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // 50px 전에 미리 로드
        threshold: 0.1, // 10%가 보이면 시작
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  // Dynamically add width, height and className properties only if they are valid values
  const imgProps: ImgProps = {
    ref: imageRef,
    src: imageLoaded ? src : placeholderSrc,
    alt: alt || "",
    onLoad: handleImageLoad,
    loading: "lazy",
    decoding: "async", // 비동기 디코딩으로 메인 스레드 방해 최소화
    fetchPriority: "high",
  };

  if (id) {
    imgProps.id = id;
  }

  if (title) {
    imgProps.title = title;
  }

  if (width && width !== "auto") {
    imgProps.width = width;
  }

  if (height && height !== "auto") {
    imgProps.height = height;
  }
  if (className) {
    imgProps.className = className;
  }
  if (style) {
    imgProps.style = style;
  }

  // priority가 true면 loading="eager"와 fetchPriority="high"로 변경
  if (priority) {
    imgProps.loading = "eager";
    imgProps.fetchPriority = "high";
  } else {
    imgProps.loading = "lazy";
  }

  return (
    <>
      <img {...imgProps} />
    </>
  );
}
