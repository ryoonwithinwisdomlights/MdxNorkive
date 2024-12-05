"use client";
import { BLOG } from "@/blog.config";
import Tabs from "@/components/shared/Tabs";
import { isBrowser } from "@/lib/utils";
import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";

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
  const { siteInfo, frontMatter, className } = props;
  const pathname = usePathname();
  /**
   *   const searchParams = useSearchParams()
  searchParams.get('foo') // returns 'bar' when ?foo=bar
   */
  const searchParams = useSearchParams();

  const url = `${pathname}?${searchParams}`;
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

  return (
    <div
      key={frontMatter?.id}
      id="comment"
      className={`comment mt-5 text-neutral-800 dark:text-neutral-300 ${
        className || ""
      }`}
    >
      <Tabs className="px-2">
        {BLOG.COMMENT_GISCUS_REPONAME && (
          <div key="Giscus">
            <GiscusComponent />
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default Comment;
