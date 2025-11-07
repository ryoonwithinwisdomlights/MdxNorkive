"use client";

import { ImgProps, LazyImageProps } from "@/types/components/common";
import { compressImage } from "@/lib/utils/image";
import React, { useEffect, useRef, useState } from "react";
import { DEV_CONFIG } from "@/config/dev.config";

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
  placeholderSrc = DEV_CONFIG.IMG_LAZY_LOAD_PLACEHOLDER,
  className,
  width,
  height,
  title,
  onLoad,
  style,
  sizes,
  quality = 80,
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

  // 이미지 최적화된 URL 생성
  const optimizedSrc =
    compressImage({
      image: src,
      width: typeof width === "number" ? width : 800,
      height: typeof height === "number" ? height : undefined,
      quality,
      fmt: "webp",
    }) || src;

  // Dynamically add width, height and className properties only if they are valid values
  const imgProps: ImgProps = {
    ref: imageRef,
    src: imageLoaded ? optimizedSrc : placeholderSrc,
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

  // sizes 속성 추가 (반응형 이미지)
  if (sizes) {
    imgProps.sizes = sizes;
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
