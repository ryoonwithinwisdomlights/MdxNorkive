"use client";
import { BLOG } from "@/blog.config";
import Tabs from "@/components/shared/Tabs";
import { useGlobal } from "@/lib/providers/globalProvider";
import { isBrowser } from "@/lib/utils/utils";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import GiscusComponent from "./Giscus";

const GiscusComponent = dynamic(
  () => {
    return import("@/components/shared/Giscus");
  },
  { ssr: false }
);

/**
 * Comment component
 * @param {*} param0
 * @returns
 */
const Comment = (props) => {
  const { frontMatter } = props;
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);
  const commentRef = useRef(null);
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const { isDarkMode } = useGlobal({ from: "index" });
  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    // Check if the component is visible in the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (commentRef.current) {
      observer.observe(commentRef.current);
    }

    return () => {
      if (commentRef.current) {
        observer.unobserve(commentRef.current);
      }
    };
  }, [frontMatter]);
  /**
   *   const searchParams = useSearchParams()
  searchParams.get('foo') // returns 'bar' when ?foo=bar
   */

  // Jump to the comment area when there are special parameters in the connection
  if (
    isBrowser &&
    (pathname.includes("giscus") || searchParams.get("target") === "comment")
  ) {
    setTimeout(() => {
      const newurl = url.replace("?target=comment", "");
      history.replaceState({}, "", newurl);
      document
        ?.getElementById("comment")
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 1000);
  }

  if (!frontMatter) {
    return <>Loading...</>;
  }

  if (frontMatter?.comment === "Hide") {
    return null;
  }
  return (
    <div
      key={frontMatter?.id}
      id="comment"
      ref={commentRef}
      className={`comment mt-5 text-neutral-800 dark:text-neutral-300 
      }`}
    >
      {/* Lazy loading of comment area */}
      {!shouldLoad && (
        <div className="text-center">
          Loading...
          <i className="fas fa-spinner animate-spin text-3xl " />
        </div>
      )}
      {shouldLoad && (
        <Tabs className="px-2">
          {BLOG.COMMENT_GISCUS_REPONAME && (
            <div key="Giscus">
              <GiscusComponent theme={theme} />
            </div>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Comment;
