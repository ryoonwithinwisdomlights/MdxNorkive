"use client";
import { ArticleLock } from "@/modules/common/components/article/ArticleLock";
import md5 from "js-md5";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getPageTableOfContents } from "notion-utils";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import SingleRecordsBodyForPage from "./SingleRecordsBodyForPage";
import SingleRecordsIntroForPage from "./SingleRecordsIntroForPage";

const SingleRecords = ({ props }) => {
  const { post, prev, next, siteInfo } = props;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px");
  // Article lock🔐
  const [lock, setLock] = useState(post?.password && post?.password !== "");
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Verify article password
   * @param {*} result
   */
  const validPassword = (passInput) => {
    const encrypt = md5(post.slug + passInput);
    if (passInput && encrypt === post.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  // Article loading
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (!isMobile) {
          console.warn("Page not found", `${pathname}/${params}`);
          router.push("/404");
        }
      }, 8 * 1000); // 404 duration 8 seconds
    }

    // Article encryption
    if (post?.password && post?.password !== "") {
      setLock(true);
    } else {
      setLock(false);
      if (!lock && post?.blockMap?.block) {
        post.content = Object.keys(post.blockMap.block).filter(
          (key) => post.blockMap.block[key]?.value?.parent_id === post.id
        );
        post.toc = getPageTableOfContents(post, post.blockMap);
      }
    }
  }, [post]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  // console.log("post:::", post);
  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && (
        <div id="container">
          {/* Notion기사 서문 */}
          <SingleRecordsIntroForPage post={post} siteInfo={siteInfo} />
          {/* Notion기사 본문 */}
          {post && (
            <SingleRecordsBodyForPage post={post} prev={prev} next={next} />
          )}
        </div>
      )}
    </>
  );
};

export default SingleRecords;
