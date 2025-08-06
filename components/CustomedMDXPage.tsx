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
import TagList from "@/modules/blog/records/TagList";
import ShareBar from "@/modules/common/components/shared/ShareBar";
import { MDXContent } from "@content-collections/mdx/react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { useSidebar } from "fumadocs-ui/provider";
import { Book, CalendarIcon, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import Comment from "./Comment";
import { getMDXComponents } from "@/getMDXComponents";

function getResource(resource: string) {
  if (resource === "engineering") return engineeringSource;
  if (resource === "book") return bookSource;
  if (resource === "project") return projectSource;
  if (resource === "record") return recordSource;
  if (resource === "submenupage") return submenuPageSource;
  else return null;
}

// // MDX output
// page?.data.body;
// // Table of contents
// page?.data.toc;
// // Structured Data, for Search API
// page?.data.structuredData;
export default function CustomedMDXPage({ className, slug, resource }) {
  console.log("resource", resource);
  console.log("slug", slug);
  const page = getResource(resource)?.getPage(slug);
  console.log("page:", page);
  if (!page) notFound();
  const { body, toc, lastEditedDate } = page.data;

  const { locale, lang } = useGeneralSiteSettings();
  const { setCollapsed } = useSidebar();
  useEffect(() => {
    setCollapsed(false);
  }, []);

  // console.log("page::", page);
  return (
    <article
      className={`flex flex-col  justify-center items-center w-full h-full ${className}`}
    >
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
                  {getReadingTime(
                    page.data.title,
                    page.data?.summary || ""
                  )}{" "}
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
              <TagList
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
      <Comment frontMatter={page.data} className="p-10" />
    </article>
  );
}
