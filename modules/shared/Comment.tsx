"use client";
import { BLOG } from "@/blog.config";
import { isBrowser } from "@/lib/utils/utils";
import Tabs from "@/modules/shared/Tabs";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingCover from "../common/icons/LoadingCover";
import GiscusComponent from "./Giscus";

// const GiscusComponent = dynamic(
//   () => {
//     return import("@/modules/red/Giscus");
//   },
//   { ssr: false }
// );

/**
 * Comment component
 * @param {*} param0
 * @returns
 */
const Comment = (props) => {
  const { frontMatter } = props;
  const pathname = usePathname();
  //devproject/1341eb5c-0337-81ad-a46c-d94c8abcdada

  const [shouldLoad, setShouldLoad] = useState(false);

  const commentRef = useRef(null);
  const searchParams = useSearchParams();
  const url = `${pathname}`;

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

  // Jump to the comment area when there are special parameters in the connection
  if (
    isBrowser &&
    (pathname.includes("giscus") || searchParams.get("target") === "comment")
  ) {
    setTimeout(() => {
      const newurl = url.replace("?target=comment", "");
      // console.log("newurlnewurl:", newurl);
      history.replaceState({}, "", newurl);
      document
        ?.getElementById("comment")
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 1000);
  }

  if (!frontMatter) {
    return <LoadingCover />;
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
          <LoadingCover />
        </div>
      )}
      {shouldLoad && (
        <Tabs className="px-2">
          {BLOG.COMMENT_GISCUS_REPONAME && (
            <div key="Giscus">
              <GiscusComponent />
            </div>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Comment;
