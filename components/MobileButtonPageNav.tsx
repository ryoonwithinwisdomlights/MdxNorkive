import { useGlobal } from "@/lib/providers/globalProvider";
import { useGitBookGlobal } from "@/lib/providers/themeGitbookProvider";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// 사전에 사용할 아이콘 추가
library.add(faBook);

/**
 * Mobile article navigation buttons
 */
export default function MobileButtonPageNav() {
  const { pageNavVisible, changePageNavVisible } = useGitBookGlobal();
  const { locale } = useGlobal({});
  const togglePageNavVisible = () => {
    if (changePageNavVisible) {
      changePageNavVisible();
    }
  };
  return (
    <div
      onClick={togglePageNavVisible}
      className={
        "text-black flex justify-center items-center dark:text-gray-200 dark:bg-hexo-black-gray py-2 px-2"
      }
    >
      <a
        id="nav-button"
        className={
          "space-x-4 cursor-pointer hover:scale-150 transform duration-200"
        }
      >
        <FontAwesomeIcon icon={faBook} />
        <span>{locale.COMMON.ARTICLE_LIST}</span>
      </a>
    </div>
  );
}
