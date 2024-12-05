"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import md5 from "js-md5";
import { getPageTableOfContents } from "notion-utils";
import { ArticleLock } from "../ArticleLock";
import { isBrowser } from "@/lib/utils";
import Link from "next/link";
import LazyImage from "@/components/shared/LazyImage";
import { BLOG } from "@/blog.config";
import NotionPage from "@/components/shared/NotionPage";
import ShareBar from "@/components/shared/ShareBar";
import GITBOOKCONFIG from "@/components/gitbook-config";
import CategoryItem from "../CategoryItem";
import TagItemMini from "../TagItemMini";
import ArticleAround from "../ArticleAround";
import Comment from "@/components/shared/Comment";
// type Props = {};

const SingleRecords = ({ props }) => {
  const { post, prev, next, siteInfo } = props;
  console.log(
    `SingleRecords \n- post: ${post},prev:${prev},next: ${next},siteInfo: ${siteInfo}, `
  );
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  // Article lock🔐
  const [lock, setLock] = useState(post?.password && post?.password !== "");
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
        if (isBrowser) {
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

  return (
    <div className="w-full h-full">
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && (
        <div id="container">
          {/* title */}
          <h1 className="text-3xl pt-12  dark:text-neutral-100">
            {post?.title}
          </h1>
          <section
            className="flex-wrap
          shadow-text-md flex text-sm
          justify-start mt-4 text-neutral-500
           dark:text-neutral-400 font-light py-2
           "
          >
            <div className="flex justify-start dark:text-neutral-200 ">
              <span className="whitespace-nowrap">
                <i className="far fa-calendar mr-2" />
                {post?.publishDay}
              </span>{" "}
              <span className="mx-1"> | </span>{" "}
              <span className="whitespace-nowrap mr-2">
                <i className="far fa-calendar-check mr-2" />
                {post?.lastEditedDay}
              </span>
              <div className="hidden busuanzi_container_page_pv font-light mr-2 whitespace-nowrap">
                <i className="mr-1 fas fa-eye" />
                <span className="busuanzi_value_page_pv" />
              </div>
            </div>
            <span className="mx-1"> | </span>{" "}
            <Link href="/archive" passHref legacyBehavior>
              <div className="flex flex-row">
                <LazyImage
                  src={siteInfo?.icon}
                  className="rounded-full cursor-pointer dark:border dark:border-neutral-300"
                  width={20}
                  height={20}
                  alt={BLOG.AUTHOR}
                />

                <div className="mr-3 ml-2 my-auto text-neutral-400 cursor-pointer">
                  {BLOG.AUTHOR}
                </div>
              </div>
            </Link>
          </section>
          {/* Notion기사 본문 */}
          {post && (
            <section
              id="article-wrapper"
              className="px-1 dark:text-neutral-200"
            >
              <NotionPage post={post} />

              {/* share */}
              <ShareBar post={post} />
              {/* Article classification and tag information */}
              <div className="flex justify-between">
                {GITBOOKCONFIG.POST_DETAIL_CATEGORY && post?.category && (
                  <CategoryItem category={post.category} />
                )}
                <div>
                  {GITBOOKCONFIG.POST_DETAIL_TAG &&
                    post?.tagItems?.map((tag) => (
                      <TagItemMini key={tag.name} tag={tag} />
                    ))}
                </div>
              </div>

              {post?.type !== "CONFIG" &&
                post?.type !== "Menu" &&
                post?.type !== "SubMenu" &&
                post?.type !== "Notice" &&
                post?.type !== "Page" &&
                post?.status === "Published" &&
                post.type === "Sideproject" && (
                  <ArticleAround prev={prev} next={next} />
                )}
              {/* <AdSlot /> */}

              <Comment frontMatter={post} />
            </section>
          )}
          {/* 
          <TocDrawer {...props} /> */}
        </div>
      )}
    </div>
  );
};

export default SingleRecords;
