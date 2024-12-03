"use client"; // 클라이언트 컴포넌트
import { BLOG } from "@/blog.config";
import { useGlobal } from "@/lib/providers/globalProvider";
import Giscus from "@giscus/react";

/**
 * Giscus Reviews @see https://giscus.app/ko
 * Contribute by @txs
 * @returns {JSX.Element}
 * @constructor
 */
const GiscusComponent = () => {
  const { isDarkMode } = useGlobal({ from: "index" });
  const theme = isDarkMode ? "dark" : "light";

  return (
    // <Giscus
    //   repo={`${BLOG.COMMENT_GISCUS_REPOUSERNAME}/${BLOG.COMMENT_GISCUS_REPONAME}`}
    //   repoId={BLOG.COMMENT_GISCUS_REPO_ID}
    //   category="General"
    //   categoryId={BLOG.COMMENT_GISCUS_CATEGORY_ID}
    //   mapping={BLOG.COMMENT_GISCUS_MAPPING}
    //   reactionsEnabled={BLOG.COMMENT_GISCUS_REACTIONS_ENABLED}
    //   emitMetadata={BLOG.COMMENT_GISCUS_EMIT_METADATA}
    //   theme={theme}
    //   inputPosition={BLOG.COMMENT_GISCUS_INPUT_POSITION}
    //   lang={BLOG.COMMENT_GISCUS_LANG}
    //   loading={BLOG.COMMENT_GISCUS_LOADING}
    //   crossorigin={BLOG.COMMENT_GISCUS_CROSSORIGIN}
    // />
    <Giscus
      repo={`${BLOG.COMMENT_GISCUS_REPOUSERNAME}/${BLOG.COMMENT_GISCUS_REPONAME}`}
      repoId={BLOG.COMMENT_GISCUS_REPO_ID}
      category="General"
      categoryId={BLOG.COMMENT_GISCUS_CATEGORY_ID}
      mapping={"pathname"}
      reactionsEnabled={"1"}
      emitMetadata={"0"}
      theme={theme}
      inputPosition={"bottom"}
      lang={BLOG.COMMENT_GISCUS_LANG}
      loading={"lazy"}
    />
  );
};

export default GiscusComponent;
