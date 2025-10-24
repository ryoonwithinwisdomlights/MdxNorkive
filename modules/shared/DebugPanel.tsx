"use client";
/* eslint-disable multiline-ternary */
import { BLOG } from "@/blog.config";
import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { BugIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

/**
 *
 * @returns Debug panel
 */
const DebugPanel = () => {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { locale } = useGeneralSiteSettings();
  const [siteConfig, updateSiteConfig] = useState({});

  useEffect(() => {
    setMounted(true);
    updateSiteConfig(Object.assign({}, BLOG));
  }, []);

  function toggleShow() {
    setShow(!show);
  }

  function filterResult(text: string) {
    switch (text) {
      case "true":
        return <span className="text-green-500">true</span>;
      case "false":
        return <span className="text-red-500">false</span>;
      case "":
        return "-";
    }
    return text;
  }

  // hydration 에러 방지: 클라이언트에서만 렌더링
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div
        style={{ writingMode: "vertical-lr" }}
        className={`bg-black dark:bg-neutral-800 rounded-l-xl  border-[1px] border-neutral-700 dark:border-white text-xs text-white  shadow-2xl p-1.5  cursor-pointer  ${
          show ? "md:right-1/2 right-0 " : "right-0"
        } fixed bottom-72 duration-200 z-50`}
        onClick={toggleShow}
      >
        {show ? (
          <div className="flex flex-row p-1 gap-1">
            <XIcon className="w-4" />
            {locale.COMMON.DEBUG_CLOSE}
          </div>
        ) : (
          <div className="flex flex-row p-1 gap-1">
            <BugIcon className="w-4" />
            <span>{locale.COMMON.DEBUG_OPEN}</span>
          </div>
        )}
      </div>

      {/* Debugging side pull drawers */}
      <div
        className={` ${
          show
            ? "shadow-card md:w-1/2 w-5/6 right-0"
            : "-right-1/2 invisible w-0"
        } overflow-y-scroll h-5/6 p-5   bg-white dark:bg-neutral-800 rounded-l-xl  border-[1px] dark:border-neutral-700 fixed bottom-0 z-50 duration-200`}
      >
        <div
          className="flex font-bold rounded-md  text-neutral-700 dark:text-neutral-200  justify-between space-x-1 p"
          onClick={toggleShow}
        >
          <div className="mr-2 bg-neutral-100 dark:bg-neutral-700  rounded w-full px-2">
            {locale.SITE.DEBUG_PANEL_TITLE}
          </div>
          <XIcon className="w-5 bg-neutral-100 dark:bg-neutral-700 dark:hover:text-white hover:bg-neutral-300  dark:hover:bg-neutral-600  rounded-md py-1" />
        </div>

        <div className="text-xs py-2">
          {siteConfig &&
            Object.keys(siteConfig).map((k) => (
              <div key={k} className="justify-between flex py-1">
                <span className="bg-neutral-200 dark:bg-neutral-700 p-0.5 rounded dark:text-white mr-2 px-1">
                  {k}
                </span>
                <span className="text-white">
                  {filterResult(siteConfig[k as keyof typeof siteConfig] + "")}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
