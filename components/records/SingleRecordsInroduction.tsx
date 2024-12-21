import { BLOG } from "@/blog.config";
import { CalendarIcon, EyeIcon, FolderClockIcon } from "lucide-react";
import Link from "next/link";
import LazyImage from "../shared/LazyImage";
import NotionIcon from "../shared/NotionIcon";
import { useGlobal } from "@/lib/providers/globalProvider";

const SingleRecordsInroduction = ({ post, siteInfo }) => {
  const { locale } = useGlobal({ from: "index" });
  return (
    <>
      {" "}
      <h1 className="text-3xl pt-12  dark:text-neutral-100">
        <NotionIcon icon={post?.pageIcon} />
        {post?.title}
      </h1>
      <section className="flex-wrap shadow-text-md flex text-sm justify-start mt-4 text-neutral-500 dark:text-neutral-400 font-light py-2 ">
        <div className="flex justify-start dark:text-neutral-200 flex-row items-center ">
          <span className="whitespace-nowrap flex flex-row items-center">
            <CalendarIcon className="mr-1 w-4 h-4" />
            {locale.COMMON.POST_TIME}: {post?.publishDay}
          </span>
          <span className="mx-1 ml-2 mr-2"> | </span>
          <span className="whitespace-nowrap mr-2 flex flex-row items-center">
            <FolderClockIcon className="mr-2 w-4 h-4" />
            {
              locale.COMMON.LAST_EDITED_TIME
            }: {post?.lastEditedDay}
          </span>
          {/* <span className="mx-1 ml-2 mr-2"> | </span> */}
          <span className="hidden flex-row items-center busuanzi_container_page_pv ">
            <div className="flex flex-row items-center">
              <EyeIcon className="mr-2 font-light whitespace-nowrap w-4 h-4 " />
              <span className="busuanzi_value_page_pv"></span>
              <span className="ml-1">{locale.COMMON.VIEW}</span>
            </div>
          </span>
        </div>
        <span className="mx-1 ml-2 mr-2"> | </span>
        <Link href="/" passHref legacyBehavior>
          <div className="flex flex-row items-center">
            <LazyImage
              src={siteInfo?.icon}
              className="rounded-full cursor-pointer dark:border dark:border-neutral-300"
              width={16}
              height={16}
              alt={BLOG.AUTHOR}
            />

            <div className="mr-3 ml-2 my-auto text-neutral-400 cursor-pointer">
              {BLOG.AUTHOR}
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default SingleRecordsInroduction;
