"use client";
import { ArticleLock } from "@/modules/common/components/article/ArticleLock";
import md5 from "js-md5";
import { useParams, usePathname, useRouter } from "next/navigation";
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
    }
  }, [record]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <div
      className="dark:bg-black dark:text-neutral-300 pb-20 md:px-20 px-10 py-3 
    md:w-[60%] flex flex-col overflow-y-auto h-screen  scrollbar-hide overscroll-contain "
    >
      {lock && <ArticleLock validPassword={validPassword} />}
      {!lock && (
        <div id="container" className=" justify-center flex flex-col w-full">
          {/* Notion기사 서문 */}
          <SingleRecordsIntroForPage record={record} siteInfo={siteInfo} />
          {/* Notion기사 본문 */}
          {record && (
            <SingleRecordsBodyForPage props={props} prev={prev} next={next} />
          )}
        </div>
      )}
    </div>
  );
};

export default SingleRecords;
