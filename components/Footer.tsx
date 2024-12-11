import { BLOG } from "@/blog.config";
import SocialButton from "./SocialButton";

function toBlogNumber(a: any) {
  let tempVal: any;
  if (typeof a === "string") {
    tempVal = Number.isInteger(BLOG.SINCE);
  } else if (typeof a === "number") {
    tempVal = BLOG.SINCE;
    return tempVal;
  }
}

const Footer = () => {
  const d = new Date();
  const currentYear = d.getFullYear();
  const blogSince = toBlogNumber(BLOG.SINCE);
  const copyrightDate = (function () {
    if (Number.isInteger(BLOG.SINCE) && blogSince < currentYear) {
      return BLOG.SINCE + "-" + currentYear;
    }
    return currentYear;
  })(); // 바로실행함수

  return (
    <footer className="z-20 py-2 bg-white  dark:bg-neutral-900 dark:text-neutral-300 justify-center text-center w-full text-sm relative">
      <hr className="pb-2" />
      <div className="flex justify-center text-xs">
        <div>
          <a
            href={BLOG.LINK}
            className="underline font-bold text-neutral-500 dark:text-neutral-300 "
          >
            {BLOG.AUTHOR}
          </a>
          .<br />
        </div>
        © {`${copyrightDate}`}
      </div>
      <span className="hidden busuanzi_container_site_pv">
        <i className="fas fa-eye" />
        <span className="px-1 busuanzi_value_site_pv"> </span>{" "}
      </span>
      <span className="pl-2 hidden busuanzi_container_site_uv">
        <i className="fas fa-users" />{" "}
        <span className="px-1 busuanzi_value_site_uv"> </span>{" "}
      </span>
      <div className="text-xs font-sans">
        Powered By{" "}
        <a
          href={BLOG.CONTACT_GITHUB}
          className="underline text-gray-500 dark:text-gray-300 font-semibold"
        >
          Norkive
        </a>
      </div>
      {/* SEO title */}
      <h1 className="pt-1 hidden">{BLOG.TITLE}</h1>
    </footer>
  );
};

export default Footer;
