"use client";
import { BLOG } from "@/blog.config";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface lazyImage {
  priority?: any;
  id?: any;
  src: any;
  alt?: any;
  placeholderSrc?: string;
  className?: any;
  width?: any;
  height?: any;
  title?: any;
  onLoad?: any;
  style?: any;
}

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
  placeholderSrc = BLOG.IMG_LAZY_LOAD_PLACEHOLDER,
  className,
  width,
  height,
  title,
  onLoad,
  style,
}: lazyImage) {
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
            const lazyImage: any = entry.target;
            lazyImage.src = src;
            observer.unobserve(lazyImage);
          }
        });
      },
      { rootMargin: "50px 0px" } // Adjust the rootMargin as needed to trigger the loading earlier or later
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  interface ImgProps {
    ref: React.RefObject<HTMLImageElement>;
    src: string;
    alt: string;
    onLoad: () => void;
    id?: string;
    title?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: React.CSSProperties;
  }

  // Dynamically add width, height and className properties only if they are valid values
  const imgProps: ImgProps = {
    ref: imageRef,
    src: imageLoaded ? src : placeholderSrc,
    alt: alt,
    onLoad: handleImageLoad,
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
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...imgProps} />
      {/* Preloading */}
      {priority && (
        <Head>
          <Link rel="preload" as="image" href={src} />
        </Head>
      )}
    </>
  );
}
