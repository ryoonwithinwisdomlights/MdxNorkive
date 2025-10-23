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
import {
  DocsBody,
  DocsPage,
} from "@/modules/layout/templates/docs-page-layout";
import ShareBar from "@/modules/shared/ShareBar";
import { MDXContent } from "@content-collections/mdx/react";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { useSidebar } from "fumadocs-ui/provider";
import { Book, CalendarIcon, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState, Suspense, lazy } from "react";

import { getMDXComponents } from "@/getMDXComponents";
import TagItemMini from "@/modules/common/tag/TagItemMini";
import LockedPage from "@/modules/page/components/LockedPage";

const LoadingCover = lazy(() => import("@/modules/shared/LoadingCover"));

function getResource(resource: string) {
  if (resource === "engineering") return engineeringSource;
  if (resource === "book") return bookSource;
  if (resource === "project") return projectSource;
  if (resource === "record") return recordSource;
  if (resource === "submenupages") return submenuPageSource;
  else return null;
}

export default function CustomedMDXPage({
  className,
  slug,
  resource,
}: {
  className: string;
  slug: string[] | undefined;
  resource: string;
}) {
  const page = getResource(resource)?.getPage(slug);

  if (!page) notFound();

  const [lock, setLock] = useState(page?.data?.password !== "");

  const { body, toc, lastEditedDate } = page.data;

  const { locale, handleChangeRightSideInfoBarMode, handleSetTocContent } =
    useGeneralSiteSettings();
  const { RECORD } = locale;
  const { setCollapsed } = useSidebar();

  useEffect(() => {
    setCollapsed(false);
    handleSetTocContent(toc);
    handleChangeRightSideInfoBarMode("author");
  }, []);

  const validPassword = (passInput: string) => {
    if (passInput === page?.data?.password) {
      setLock(false);
      return true;
    }
    return false;
  };

  return (
    <article
      className={`flex flex-col pb-20 justify-center items-center w-full h-full ${className}`}
    >
      {lock ? (
        <LockedPage validPassword={validPassword} />
      ) : (
        <div className="flex flex-col w-full">
          <DocsPage
            full={page.data.full}
            lastUpdate={lastEditedDate}
            breadcrumb={{ enabled: false }}
          >
            <div
              className="container rounded-xl py-12 px-10 relative overflow-hidden mb-4"
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
                  background: "rgba(39,39,42,0.75)",
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
                    <div className="flex flex-row gap-2 items-center">
                      <span className="text-white text-sm">
                        {RECORD.READING_TIME ?? "Reading Time"}
                      </span>
                      -
                      <span className="text-white text-sm">
                        {page.data.readingTime} {RECORD.MINUTE ?? "min"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <span className=" flex flex-row gap-2 items-center text-white text-sm">
                      <Rocket className="w-4 h-4" />
                      <span>{RECORD.VIEW ?? "View"}</span>
                      <span className=" busuanzi_value_page_pv" />
                    </span>
                  </div>
                </div>

                <p className="mb-6 text-white/80">{page.data.summary}</p>

                <div className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {getYearMonthDay(page.data.date, locale.LOCALE ?? "en-US")}{" "}
                    {getDistanceFromToday(
                      page.data.date,
                      locale.LOCALE ?? "en-US"
                    )}
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
                children={RECORD.TABLE_OF_CONTENTS ?? "Table Of Contents"}
                className="block md:hidden bg-neutral-100 dark:bg-neutral-800 mb-4"
              />
            )}

            <DocsBody className="">
              <Suspense fallback={<LoadingCover />}>
                <MDXContent code={body} components={getMDXComponents()} />
              </Suspense>
            </DocsBody>

            <ShareBar data={page.data} url={page.url} />
          </DocsPage>
        </div>
      )}
    </article>
  );
}
