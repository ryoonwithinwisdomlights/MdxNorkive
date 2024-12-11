"use client"; // 클라이언트 컴포넌트
/* eslint-disable multiline-ternary */
import { BLOG } from "@/blog.config";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { useGlobal } from "@/lib/providers/globalProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpRightFromSquare,
  faBullhorn,
  faCloudMoon,
  faCloudSun,
  faPodcast,
  faRotateRight,
  faSquareMinus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  ElementRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { useSetting } from "@/hooks/use-settings";
// 사전에 사용할 아이콘 추가
library.add(
  faBullhorn,
  faRotateRight,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faPodcast,
  faSquareMinus,
  faTag,
  faArrowUpRightFromSquare,
  faCloudSun,
  faCloudMoon
);
/**
 * Customize right-click menu
 * @param {*} props
 * @returns
 */
export default function RightClickMenu(props: any) {
  const { latestPosts, changeLang, isDarkMode, locale, handleChangeDarkMode } =
    useGlobal({ from: "index" });
  const [position, setPosition] = useState({ x: "0px", y: "0px" });
  const [show, setShow] = useState(false);
  const [copiedText, copyFn] = useCopyToClipboard();
  const menuRef = useRef<ElementRef<"div">>(null);
  const windowSize = useWindowSize();
  const setting = useSetting();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    if (menuRef.current) {
      setWidth(menuRef.current.offsetWidth);
      setHeight(menuRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (event: PointerEvent) => {
      event.preventDefault();
      // Calculate whether the click position plus menu width and height exceed the screen. If it exceeds, the edge will pop up.
      if (windowSize.width !== undefined && windowSize.height) {
        const x =
          event.clientX < windowSize.width - width
            ? event.clientX
            : windowSize.width - width;
        const y =
          event.clientY < windowSize.height - height
            ? event.clientY
            : windowSize.height - height;
        setPosition({ y: `${y}px`, x: `${x}px` });
        setShow(true);
      }
    };

    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [windowSize]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // not gonna be rendered unless we are fully on the client side.

  useEffect(() => {
    if (isMounted) {
      changeLang(BLOG.LANG);
    }
  }, []);

  if (!isMounted) return null;

  /**
   * Randomly jump to articles
   */
  function handleJumpToRandomPost(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
    const randomIndex = Math.floor(props * latestPosts.length);
    const randomPost: any = latestPosts[randomIndex];
    router.push(`/${randomPost?.slug}`);
  }

  function handleBack(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    event.stopPropagation();
    router.back();
  }

  function handleForward(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    event.stopPropagation();
    // if (typeof window !== "undefined") {
    //   window.history.forward();
    // }
    router.forward();
  }

  function handleRefresh(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    event.stopPropagation();
    // if (typeof window !== "undefined") {
    //   window.location.reload();
    // }
    router.refresh();
  }

  function handleScrollTop(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    event.stopPropagation();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShow(false);
    }
  }

  function handleCopyLink(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
    if (typeof window !== "undefined") {
      const url = window.location.href;
      copyFn(url)
        .then(() => {
          toast.success("The page address has been copied");
        })
        .catch((error) => {
          toast.error("Failed to copy page address");
        })
        .finally(() => {
          setShow((prev) => !prev);
        });
    }
  }

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className={`${
        show ? "" : "invisible opacity-0"
      } select-none transition-opacity duration-200 fixed z-50`}
    >
      {/* Menu content */}
      <div className="rounded-xl w-52 dark:hover:border-white bg-white dark:bg-[#040404] dark:text-neutral-200 dark:border-neutral-600 p-3 border drop-shadow-lg flex-col duration-300 transition-colors">
        {/* Top navigation buttons */}
        <div className="flex justify-between">
          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowLeft}
            onClick={(e) => {
              handleBack(e);
            }}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowRight}
            onClick={(e) => {
              handleForward(e);
            }}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faRotateRight}
            onClick={(e) => {
              handleRefresh(e);
            }}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowUp}
            onClick={(e) => {
              handleScrollTop(e);
            }}
          />
        </div>

        <hr className="my-2 border-dashed" />

        {/* Jump navigation button */}
        <div className="w-full px-2">
          <div
            onClick={(e) => {
              handleJumpToRandomPost(e);
            }}
            title={locale.MENU.WALK_AROUND}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer  dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faPodcast} />
            <div className="whitespace-nowrap">{locale.MENU.WALK_AROUND}</div>
          </div>

          <Link
            href="/category"
            title={locale.MENU.CATEGORY}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faSquareMinus} />

            <div className="whitespace-nowrap">{locale.MENU.CATEGORY}</div>
          </Link>

          <Link
            href="/tag"
            title={locale.MENU.TAGS}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faTag} />

            <div className="whitespace-nowrap">{locale.MENU.TAGS}</div>
          </Link>
        </div>

        <hr className="my-2 border-dashed" />

        {/* Function buttons */}
        <div className="w-full px-2">
          <div
            onClick={(e) => {
              handleCopyLink(e);
            }}
            title={locale.MENU.COPY_URL}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowUpRightFromSquare} />

            <div className="whitespace-nowrap">{locale.MENU.COPY_URL}</div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
              handleChangeDarkMode(!isDarkMode);
              toast.success(
                `Set to be ${isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE} `
              );
            }}
            title={isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2]  hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            {isDarkMode ? (
              <FontAwesomeIcon className="mr-2" icon={faCloudSun} />
            ) : (
              <FontAwesomeIcon className="mr-2" icon={faCloudMoon} />
            )}
            <div className="whitespace-nowrap">
              {isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
