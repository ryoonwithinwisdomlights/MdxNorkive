"use client";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import {
  bookSource,
  engineeringSource,
  projectSource,
  recordSource,
  submenuPageSource,
} from "@/lib/source";
import { getDistanceFromToday, getYearMonthDay } from "@/lib/utils/date";
import { getReadingTime } from "@/lib/utils/read";
import ShareBar from "@/modules/shared/ShareBar";
import { MDXContent } from "@content-collections/mdx/react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { useSidebar } from "fumadocs-ui/provider";
import { Book, CalendarIcon, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

import { getMDXComponents } from "@/getMDXComponents";
import LockedPage from "@/modules/page/components/LockedPage";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import Comment from "./Comment";

function getResource(resource: string) {
  if (resource === "engineering") return engineeringSource;
  if (resource === "book") return bookSource;
  if (resource === "project") return projectSource;
  if (resource === "record") return recordSource;
  if (resource === "submenupage") return submenuPageSource;
  else return null;
}

export default function CustomedMDXPage({ className, slug, resource }) {
  const page = getResource(resource)?.getPage(slug);

  if (!page) notFound();
  // Article lock🔐
  const [lock, setLock] = useState(page?.data?.password !== "");
  const { body, toc, lastEditedDate } = page.data;

  const { locale, lang } = useGeneralSiteSettings();
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(false);
  }, []);

  const validPassword = (passInput) => {
    // const encrypt = md5(passInput);

    if (passInput === page?.data?.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  // console.log("page::", page);
  return (
    <article
      className={`flex flex-col   pb-20  justify-center items-center w-full h-full ${className}`}
    >
      {lock ? (
        <LockedPage validPassword={validPassword} />
      ) : (
        <div className="flex flex-col  w-full">
          <DocsPage
            // toc={toc}

            full={page.data.full}
            lastUpdate={lastEditedDate}
            breadcrumb={{ enabled: false }}
          >
            <div
              className="container rounded-xl py-12 px-10 relative overflow-hidden"
              style={{
                backgroundColor: "black",
                backgroundImage: page.data.pageCover
                  ? `url(${page.data.pageCover})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* 오버레이 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(39,39,42,0.75)", // bg-neutral-800 + 거의 불투명
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              <div className="relative z-10 flex flex-col gap-3">
                <span className="text-xs text-white uppercase tracking-wide">
                  {page.data.type} / {page.data?.sub_type}
                </span>
                <h1 className="mb-2 text-3xl font-bold text-white">
                  {page.data.title}
                </h1>
                <div className=" flex flex-row gap-4 items-center text-white text-sm">
                  <div className="flex flex-row gap-2 items-center">
                    <Book className="w-4 h-4" />
                    <span className="flex flex-row gap-2 items-center">
                      {locale.COMMON.READING_TIME}&nbsp;&nbsp;-&nbsp;&nbsp;
                      {page.data.readingTime} {locale.COMMON.MINUTE}
                      {locale.COMMON.MINUTE}
                    </span>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span className=" flex flex-row gap-2 items-center text-white text-sm">
                      <Rocket className="w-4 h-4" />
                      <span>{locale.COMMON.VIEWS}</span>
                      <span className=" busuanzi_value_page_pv" />
                    </span>
                  </div>
                </div>

                <p className="mb-6 text-white/80">{page.data.summary}</p>

                <div className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {getYearMonthDay(
                      page.data.date,
                      locale === "kr-KR" ? "kr-KR" : "en-US"
                    )}
                    &nbsp; &nbsp;
                    {getDistanceFromToday(page.data.date, lang)}
                  </span>
                </div>
                {page.data.tags && page.data.tags.length > 0 && (
                  <TagItemMini
                    tags={page.data.tags}
                    className="bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                  />
                )}
              </div>
            </div>
            {toc.length > 0 && (
              <InlineTOC
                items={toc}
                className="bg-neutral-100 dark:bg-neutral-800 mb-4"
              />
            )}

            <DocsBody className="  ">
              <MDXContent code={body} components={getMDXComponents()} />
            </DocsBody>
            <ShareBar data={page.data} />
          </DocsPage>
          <Comment frontMatter={page.data} className="  max-w-6xl mx-auto" />
        </div>
      )}
    </article>
  );
}
