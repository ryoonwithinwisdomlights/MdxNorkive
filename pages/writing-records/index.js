/* eslint-disable no-unused-vars */
import { getGlobalData } from "@/lib/notion/getNotionData";
import { useEffect } from "react";
import { useGlobal } from "@/lib/global";
import { BLOG } from "@/blog.config";
import { useRouter } from "next/router";
import { getLayoutByTheme } from "@/themes/theme";
import { isBrowser } from "@/lib/utils";
import { formatDateFmt } from "@/lib/formatDate";

const WritingIndex = (props) => {
  const { siteInfo } = props;
  const { locale } = useGlobal();

  const Layout = getLayoutByTheme(useRouter()); // Load different Layout files based on page path

  const meta = {
    title: `${locale.NAV.WRITING} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: "writing-records",
    type: "website",
  };

  useEffect(() => {
    if (isBrowser) {
      const anchor = window.location.hash;
      if (anchor) {
        setTimeout(() => {
          const anchorElement = document.getElementById(anchor.substring(1));
          if (anchorElement) {
            anchorElement.scrollIntoView({
              block: "start",
              behavior: "smooth",
            });
          }
        }, 300);
      }
    }
  }, []);

  props = { ...props, meta };

  return <Layout {...props} />;
};

export async function getStaticProps() {
  const from = "writing-index";
  const props = await getGlobalData({ from: from, type: "Writing-records" });

  props.writingPosts = props.allPages?.filter(
    (page) => page.type === "Writing-records" && page.status === "Published"
  );

  const postsSortByDate = Object.create(props.writingPosts);

  postsSortByDate.sort((a, b) => {
    return b?.publishDate - a?.publishDate;
  });

  const writingPosts = {};

  postsSortByDate.forEach((post) => {
    const date = formatDateFmt(post.publishDate, "yyyy-MM");
    if (writingPosts[date]) {
      writingPosts[date].push(post);
    } else {
      writingPosts[date] = [post];
    }
  });

  props.writingPosts = writingPosts;
  delete props.allPages;

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}

export default WritingIndex;
