"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";

/**
 * Mobile floating directory button
 */
export default function FloatTocButton() {
  const { showTocButton } = useGlobal({ from: "index" });
  const { tocVisible, changeTocVisible } = useGitBookGlobal();

  const toggleToc = () => {
    if (tocVisible) {
      changeTocVisible();
    }
  };

  // Mobile floating directory button
  return showTocButton && !tocVisible ? (
    <div className="md:hidden fixed right-0 bottom-52 z-30 bg-white border-l border-t border-b dark:border-neutral-800 rounded">
      <div
        onClick={toggleToc}
        className={
          "text-black flex justify-center items-center dark:text-neutral-200 dark:bg-neutral-700 py-2 px-2"
        }
      >
        <a
          id="toc-button"
          className={
            "fa-list-ol cursor-pointer fas hover:scale-150 transform duration-200"
          }
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
