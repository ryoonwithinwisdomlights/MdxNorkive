"use client";

import { LazyImageProps } from "@/types/components/common";
import { compressImage } from "@/lib/utils/image";
import React, { useEffect, useRef, useState } from "react";
import { DEV_CONFIG } from "@/config/dev.config";
import Image from "next/image";

/**
 * Optimized image component with lazy loading support
 * - priority=true: Uses Next.js Image for optimal LCP performance
 * - priority=false: Uses IntersectionObserver-based lazy loading
 */
export default function LazyImage({
  priority = false,
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
  // priority가 true인 경우: Next.js Image 사용 (LCP 최적화)
  if (priority) {
    const numWidth = typeof width === "number" ? width : 800;
    const numHeight = typeof height === "number" ? height : Math.round(numWidth * 0.75);

    return (
      <Image
        id={id}
        src={src}
        alt={alt || ""}
        width={numWidth}
        height={numHeight}
        className={className}
        style={style}
        title={title}
        priority={true}
        quality={quality}
        sizes={sizes || `(max-width: 768px) 100vw, ${numWidth}px`}
        onLoad={onLoad}
      />
    );
  }

  // priority가 false인 경우: 기존 lazy loading 로직
  return (
    <LazyLoadedImage
      id={id}
      src={src}
      alt={alt}
      placeholderSrc={placeholderSrc}
      className={className}
      width={width}
      height={height}
      title={title}
      onLoad={onLoad}
      style={style}
      sizes={sizes}
      quality={quality}
    />
  );
}

/**
 * Internal component for lazy-loaded images (non-priority)
 */
function LazyLoadedImage({
  id,
  src,
  alt,
  placeholderSrc,
  className,
  width,
  height,
  title,
  onLoad,
  style,
  sizes,
  quality = 80,
}: Omit<LazyImageProps, "priority">) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (typeof onLoad === "function") {
      onLoad();
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
        rootMargin: "50px",
        threshold: 0.1,
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

  // 이미지 최적화된 URL 생성 (Cloudinary, Unsplash 등 외부 이미지용)
  const optimizedSrc =
    compressImage({
      image: src,
      width: typeof width === "number" ? width : 800,
      height: typeof height === "number" ? height : undefined,
      quality,
      fmt: "webp",
    }) || src;

  return (
    <img
      ref={imageRef}
      id={id}
      src={imageLoaded ? optimizedSrc : placeholderSrc}
      alt={alt || ""}
      title={title}
      width={width && width !== "auto" ? width : undefined}
      height={height && height !== "auto" ? height : undefined}
      className={className}
      style={style}
      sizes={sizes}
      onLoad={handleImageLoad}
      loading="lazy"
      decoding="async"
    />
  );
}
