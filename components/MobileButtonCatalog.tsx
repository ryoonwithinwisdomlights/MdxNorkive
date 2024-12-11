"use client";
import { useGlobal } from "@/lib/providers/globalProvider";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faListOl);
/**
 * Mobile directory button
 */
export default function MobileButtonCatalog() {
  const { tocVisible, changeTocVisible } = useGitBookGlobal();
  const { locale } = useGlobal({});

  const toggleToc = () => {
    changeTocVisible();
  };
  return (
    <div
      onClick={toggleToc}
      className={
        "text-black flex justify-center items-center dark:text-gray-200 dark:bg-hexo-black-gray py-2 px-2"
      }
    >
      <a
        id="toc-button"
        className={
          "space-x-4 text-xs cursor-pointer hover:scale-150 transform duration-200"
        }
      >
        <FontAwesomeIcon icon={faListOl} />
        <span>{locale.COMMON.TABLE_OF_CONTENTS}</span>
      </a>
    </div>
  );
}
