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
  const { record, prev, next, siteInfo } = props;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px");

  // Article lock🔐
  const [lock, setLock] = useState(record?.password && record?.password !== "");
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Verify article password
   * @param {*} result
   */
  const validPassword = (passInput) => {
    const encrypt = md5(record.slug + passInput);
    if (passInput && encrypt === record.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  // Article loading
  useEffect(() => {
    // 404
    if (!record) {
      setTimeout(() => {
        if (!isMobile) {
          console.warn("Page not found", `${pathname}/${params}`);
          router.push("/404");
        }
      }, 8 * 1000); // 404 duration 8 seconds
    }

    // // Archive encryption
    if (record?.password && record?.password !== "") {
      setLock(true);
    } else {
      setLock(false);
      // if (!lock && record?.blockMap?.block) {
      //   record.content = Object.keys(record.blockMap.block).filter(
      //     (key) => record.blockMap.block[key]?.value?.parent_id === record.id
      //   );
      //   record.tableOfContents = getPageTableOfContents(
      //     record,
      //     record.blockMap
      //   );
      // }
    }
  }, [record]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && (
        <div id="container">
          {/* Notion기사 서문 */}
          <SingleRecordsIntroForPage record={record} siteInfo={siteInfo} />
          {/* Notion기사 본문 */}
          {record && (
            <SingleRecordsBodyForPage record={record} prev={prev} next={next} />
          )}
        </div>
      )}
    </>
  );
};

export default SingleRecords;
