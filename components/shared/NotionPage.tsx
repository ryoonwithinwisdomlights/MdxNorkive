"use client";
import { BLOG } from "@/blog.config";
import { mapImgUrl } from "@/lib/notion/mapImage";
import { isBrowser } from "@/lib/utils";
import mediumZoom from "@fisch0920/medium-zoom";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { formatDate } from "notion-utils";
import React, { useEffect, useMemo, useRef } from "react";
import { NotionComponents, NotionRenderer } from "react-notion-x";
import TweetEmbed from "react-tweet-embed";
import { useWindowSize } from "usehooks-ts";
import PrismMac from "./PrismMac";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    // add / remove any prism syntaxes here
    await Promise.allSettled([
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

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
);

const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
);

// https://github.com/txs
// import PrismMac from '@/components/PrismMac'
// const PrismMac = dynamic(() => import("@/components/PrismMac"), {
//   ssr: false,
// });

const Modal = dynamic(
  () =>
    import("react-notion-x/build/third-party/modal").then((m) => {
      m.Modal.setAppElement(".notion-viewport");
      return m.Modal;
    }),
  {
    ssr: false,
  }
);
function Tweet({ id }: { id: string }) {
  return <TweetEmbed tweetId={id} />;
}

// Helper functions for custom Notion rendering
const propertyLastEditedTimeValue = (
  { block, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && block?.last_edited_time) {
    return `Last updated ${formatDate(block?.last_edited_time, {
      month: "long",
    })}`;
  }

  return defaultFn();
};

const propertyDateValue = (
  { data, schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === "published") {
    const publishDate = data?.[0]?.[1]?.[0]?.[1]?.start_date;

    if (publishDate) {
      return `${formatDate(publishDate, {
        month: "long",
      })}`;
    }
  }

  return defaultFn();
};

const propertyTextValue = (
  { schema, pageHeader },
  defaultFn: () => React.ReactNode
) => {
  if (pageHeader && schema?.name?.toLowerCase() === "author") {
    return <b>{defaultFn()}</b>;
  }

  return defaultFn();
};

const NotionPage = ({ post }) => {
  useEffect(() => {
    autoScrollToTarget();
  }, []);

  const components = useMemo<Partial<NotionComponents>>(
    () => ({
      nextLegacyImage: Image,
      nextLink: Link,
      Code,
      Collection,
      Equation,
      Pdf,
      Modal,
      Tweet,
      propertyLastEditedTimeValue,
      propertyTextValue,
      propertyDateValue,
    }),
    []
  );
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const zoom = mediumZoom({
    container: ".notion-viewport",
    background: "rgba(0, 0, 0, 0.2)",
    margin: getMediumZoomMargin({ width: windowWidth }),
  });
  const zoomRef = useRef(zoom ? zoom.clone() : null);

  useEffect(() => {
    // Add the zoom function to the pictures in the gallery
    if (JSON.parse(BLOG.POST_DISABLE_GALLERY_CLICK.toString())) {
      setTimeout(() => {
        if (isBrowser) {
          const imgList: any = document?.querySelectorAll(
            ".notion-collection-card-cover img"
          );
          if (imgList && zoomRef.current) {
            for (let i = 0; i < imgList.length; i++) {
              zoomRef.current.attach(imgList[i]);
            }
          }

          const cards: any = document.getElementsByClassName(
            "notion-collection-card"
          );
          for (const e of cards) {
            e.removeAttribute("href");
          }
        }
      }, 800);
    }

    /**
     * Handling intra-page connection jumps
     * If the link is the current website, no new window will be opened for access.
     */
    if (isBrowser && typeof window !== "undefined") {
      const currentURL = window.location.origin + window.location.pathname;
      const allAnchorTags: any = document.getElementsByTagName("a"); // Or use document.querySelectorAll('a') Obtain NodeList
      for (const anchorTag of allAnchorTags) {
        if (anchorTag?.target === "_blank") {
          const hrefWithoutQueryHash = anchorTag.href
            .split("?")[0]
            .split("#")[0];
          const hrefWithRelativeHash =
            currentURL.split("#")[0] + anchorTag.href.split("#")[1];

          if (
            currentURL === hrefWithoutQueryHash ||
            currentURL === hrefWithRelativeHash
          ) {
            anchorTag.target = "_self";
          }
        }
      }
    }
  }, []);

  if (!post || !post.blockMap) {
    return <>{post?.summary || ""}</>;
  }

  return (
    <div id="notion-article" className={`mx-auto overflow-hidden `}>
      <NotionRenderer
        recordMap={post.blockMap}
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={components}
      />

      <PrismMac />
    </div>
  );
};

/**
 * Automatically scroll to the specified area based on url parameters
 */
const autoScrollToTarget = () => {
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
