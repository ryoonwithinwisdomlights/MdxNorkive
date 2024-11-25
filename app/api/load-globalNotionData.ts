import React from "react";
import { getGlobalData } from "../../lib/notion/getNotionData";
import { BLOG } from "@/blog.config";
import { getPostBlocks } from "@/lib/notion";
import { generateRss } from "@/lib/rss";
import { generateRobotsTxt } from "@/lib/robots.txt";

export default async function loadGlobalNotionData(from: string = "index") {
  // const from = "index";
  const props = await getGlobalData({ from });

  props.posts = props.allPages?.filter(
    (page) =>
      page.type !== "CONFIG" &&
      page.type !== "Menu" &&
      page.type !== "SubMenu" &&
      page.type !== "Notice" &&
      page.type !== "Page" &&
      page.status === "Published"
  );

  // Handle pagination
  if (BLOG.POST_LIST_STYLE === "scroll") {
    // The scrolling list returns all data to the front end by default
  } else if (BLOG.POST_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE);
  }

  // Preview article content
  if (BLOG.POST_LIST_PREVIEW === "true") {
    for (const i in props.posts) {
      const post = props.posts[i];
      if (post.password && post.password !== "") {
        continue;
      }
      post.blockMap = await getPostBlocks(
        post.id,
        "slug",
        BLOG.POST_PREVIEW_LINES
      );
    }
  }

  // Generate robotTxt
  generateRobotsTxt();
  // Generate feed subscription
  if (JSON.parse(BLOG.ENABLE_RSS.toString())) {
    generateRss(props?.latestPosts || []);
  }

  // Generate full-text index - only executed when yarn build && process.env.npm_lifecycle_event === 'build'

  delete props.allPages;

  return props;
}
