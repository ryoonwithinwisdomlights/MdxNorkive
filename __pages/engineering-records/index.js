/* eslint-disable no-unused-vars */
import { getGlobalData } from "@/lib/notion/getNotionData";
import React from "react";
import { useGlobal } from "@/lib/global";
import { BLOG } from "@/blog.config";
import { useRouter } from "next/router";
import { getLayoutByTheme } from "@/themes/theme";
import { formatDateFmt } from "@/lib/formatDate";

/**
 * Classification homepage
 * @param {*} props
 * @returns
 */
export default function Engineering(props) {
  const { locale } = useGlobal();
  const { siteInfo } = props;

  // Load different Layout files based on page path
  const Layout = getLayoutByTheme(useRouter());

  const meta = {
    title: `${locale.NAV.ENGINEERING} | ${siteInfo?.title}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: "Engineering-records",
    type: "website",
  };
  props = { ...props, meta };

  return <Layout {...props} />;
}

export async function getStaticProps() {
  const props = await getGlobalData({
    from: "Engineering-index-props",
    type: "Engineering-records",
  });

  props.posts = props.allPages?.filter((page) => {
    return page.type === "Engineering-records" && page.status === "Published";
  });

  props.EngineeringPosts = props.posts;

  delete props.allPages;

  return {
    props,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND),
  };
}
