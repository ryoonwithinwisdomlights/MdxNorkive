"use client";
import { siteConfig } from "@/lib/config";
import { compressImage, mapImgUrl } from "@/lib/notion/mapImage";
import { isBrowser } from "@/lib/utils/utils";
import mediumZoom from "@fisch0920/medium-zoom";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { NotionRenderer } from "react-notion-x";
import { useWindowSize } from "usehooks-ts";
import TweetEmbed from "react-tweet-embed";

const NotionPage = ({ post }) => {
  // Whether to turn off the click jump of the database and album
  const RECORD_DISABLE_GALLERY_CLICK = siteConfig({
    key: "RECORD_DISABLE_GALLERY_CLICK",
  });
  const RECORD_DISABLE_DATABASE_CLICK = siteConfig({
    key: "RECORD_DISABLE_DATABASE_CLICK",
  });

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const zoom = useMemo(() => {
    if (typeof window !== "undefined") {
      return mediumZoom({
        container: ".notion-viewport",
        background: "rgba(0, 0, 0, 0.2)",
        margin: getMediumZoomMargin({ width: windowWidth }), // window.innerWidth 사용으로 조정
      });
    }
    return null;
  }, [windowWidth]);
  const zoomRef = useRef(zoom ? zoom.clone() : null);

  // Hook executed when the page is first opened
  useEffect(() => {
    // Detect the current url and automatically scroll to the corresponding target
    if (typeof window !== "undefined") {
      // useEffect에 window 객체 사용을 검사
      autoScrollToHash();
    }
  }, []);

  // The hook that will be executed when the page article changes
  useEffect(() => {
    // Clicking on the album view prohibits jumping, and you can only enlarge the picture to view it.
    if (RECORD_DISABLE_GALLERY_CLICK) {
      // For the gallery view on the page, after clicking, whether to enlarge the picture or jump to the internal page of the gallery
      processGalleryImg(zoomRef?.current);
    }

    // Clicking on the in-page database prohibits jumping and can only be viewed.
    if (RECORD_DISABLE_DATABASE_CLICK) {
      processDisableDatabaseUrl();
    }

    /**
     * Replace the image with HD when viewing it enlarged
     */
    const observer = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          // Element로 타입 단언하기
          const target = mutation.target as Element;

          if (target.classList.contains("medium-zoom-image--opened")) {
            // 애니메이션 완료 후에 고해상도 이미지로 교체
            setTimeout(() => {
              // 해당 요소의 src 속성 가져오기
              const src = target.getAttribute("src");
              // 더 높은 해상도 이미지로 교체
              target.setAttribute(
                "src",
                compressImage(
                  src,
                  siteConfig({ key: "IMAGE_ZOOM_IN_WIDTH", defaultVal: 1200 })
                )
              );
            }, 800);
          }
        }
      });
    });

    // Monitor page element and attribute changes
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [zoomRef, RECORD_DISABLE_GALLERY_CLICK, RECORD_DISABLE_DATABASE_CLICK]);
  return (
    <div id="notion-article" className={`mx-auto overflow-hidden `}>
      <NotionRenderer
        recordMap={post?.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          Tweet,
        }}
      />

      <PrismMac />
    </div>
  );
};

// const Code = dynamic(
//   () =>
//     import("react-notion-x/build/third-party/code").then(async (m) => {
//       return m.Code;
//     }),
//   { ssr: false }
// );
const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // additional prism syntaxes
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-bash.js"),
      import("prismjs/components/prism-c.js"),
      import("prismjs/components/prism-cpp.js"),
      import("prismjs/components/prism-csharp.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-java.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-coffeescript.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-go.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-objectivec.js"),
      import("prismjs/components/prism-ocaml.js"),
      import("prismjs/components/prism-python.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-rust.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-solidity.js"),
      import("prismjs/components/prism-sql.js"),
      import("prismjs/components/prism-stylus.js"),
      import("prismjs/components/prism-swift.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ]);
    return m.Code;
  })
);
const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection
    ),
  {
    ssr: true,
  }
);

const Equation = dynamic(
  () =>
    import("@/components/shared/Equation").then(async (m) => {
      // chemical equation
      await import("@/lib/plugins/mhchem");
      return m.Equation;
    }),
  { ssr: false }
);

const Pdf = dynamic(
  () => import("@/components/shared/Pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

// https://github.com/txs
const PrismMac = dynamic(() => import("@/components/shared/PrismMac"), {
  ssr: false,
});

const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false }
);

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />;
};

/**
 * The database link of the page is prohibited from jumping and can only be viewed.
 */
const processDisableDatabaseUrl = () => {
  if (isBrowser) {
    const links = document.querySelectorAll(".notion-table a");
    for (const e of links) {
      e.removeAttribute("href");
    }
  }
};

/**
 * Gallery view, after clicking, whether to enlarge the picture or jump to the internal page of the gallery
 */
const processGalleryImg = (zoom) => {
  setTimeout(() => {
    if (isBrowser) {
      const imgList = document?.querySelectorAll(
        ".notion-collection-card-cover img"
      );
      if (imgList && zoom) {
        for (let i = 0; i < imgList.length; i++) {
          zoom.attach(imgList[i]);
        }
      }

      const cards = document.getElementsByClassName("notion-collection-card");
      for (const e of cards) {
        e.removeAttribute("href");
      }
    }
  }, 800);
};

/**
 * 
Automatically scroll to anchor position based on url parameters
 */
const autoScrollToHash = () => {
  setTimeout(() => {
    // Jump to specified title
    const needToJumpToTitle = window.location.hash;
    if (needToJumpToTitle) {
      const tocNode = document.getElementById(
        window.location.hash.substring(1)
      );
      if (tocNode && tocNode?.className?.indexOf("notion") > -1) {
        tocNode.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  }, 180);
};

/**
 * Map id to blog post internal link.
 * @param {*} id
 * @returns
 */
const mapPageUrl = (id) => {
  // return 'https://www.notion.so/' + id.replace(/-/g, '')
  return "/" + id.replace(/-/g, "");
};

/**
 * Zoom
 * @returns
 */
function getMediumZoomMargin(width) {
  // const width = window.innerWidth;

  if (width < 500) {
    return 8;
  } else if (width < 800) {
    return 20;
  } else if (width < 1280) {
    return 30;
  } else if (width < 1600) {
    return 40;
  } else if (width < 1920) {
    return 48;
  } else {
    return 72;
  }
}
export default NotionPage;
