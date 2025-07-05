"use client";
import { ArchiveLock } from "@/modules/blog/records/ArchiveLock";
import md5 from "js-md5";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import SingleRecordsBodyForPage from "./SingleRecordsBodyForPage";
import SingleRecordsIntroForPage from "./SingleRecordsIntroForPage";
import { useGlobal } from "@/lib/context/EssentialNavInfoProvider";

const SingleRecords = ({ props }) => {
  const { page } = props;
  const { siteInfo } = useGlobal({ from: "SingleRecords" });
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px");

  // Article lock🔐
  const [lock, setLock] = useState(page?.password && page?.password !== "");
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Verify article password
   * @param {*} result
   */
  const validPassword = (passInput) => {
    const encrypt = md5(page.slug + passInput);
    if (passInput && encrypt === page.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  // Page loading
  useEffect(() => {
    // 404
    if (!page) {
      setTimeout(() => {
        if (!isMobile) {
          console.warn("Page not found", `${pathname}/${params}`);
          router.push("/404");
        }
      }, 8 * 1000); // 404 duration 8 seconds
    }

    // // Archive encryption
    if (page?.password && page?.password !== "") {
      setLock(true);
    } else {
      setLock(false);
    }
  }, [page]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // none of the modals are gonna be rendered unless we are fully on the client side.
  if (!isMounted) return null;

  return (
    <div
      id="main-scroll-container"
      className="dark:bg-black dark:text-neutral-100 text-neutral-800 md:px-20 
    md:w-[60%] flex flex-col overflow-y-auto h-full  scrollbar-hide overscroll-contain "
    >
      {lock && <ArchiveLock validPassword={validPassword} />}
      {!lock && (
        <div
          id="container"
          className="justify-center flex flex-col w-full gap-y-6"
        >
          {/* Notion기사 서문 */}
          <SingleRecordsIntroForPage record={page} siteInfo={siteInfo} />
          {/* Notion기사 본문 */}
          <SingleRecordsBodyForPage page={page} />
        </div>
      )}
    </div>
  );
};

export default SingleRecords;
