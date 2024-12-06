import { BLOG } from "@/blog.config";
import Giscus from "@giscus/react";

/**
 * Giscus Reviews @see https://giscus.app/ko
 * Contribute by @txs
 * @returns {JSX.Element}
 * @constructor
 */
const GiscusComponent = (props) => {
  const { theme } = props;

  return (
    /**
     * id, host, repo, repoId, category,
     *  categoryId, mapping, term,
     * strict, reactionsEnabled, emitMetadata,
     *  inputPosition, theme,
     * lang, loading,
     */
    <Giscus
      id="giscus"
      repo={`${BLOG.COMMENT_GISCUS_REPOUSERNAME}/${BLOG.COMMENT_GISCUS_REPONAME}`}
      repoId={BLOG.COMMENT_GISCUS_REPO_ID as string}
      category={BLOG.COMMENT_GISCUS_CATEGORY as string}
      categoryId={BLOG.COMMENT_GISCUS_CATEGORY_ID as string}
      mapping={"pathname"}
      reactionsEnabled={"1"}
      emitMetadata={"0"}
      inputPosition={"bottom"}
      theme={theme}
      lang={BLOG.COMMENT_GISCUS_LANG}
      loading={"lazy"}
    />
  );
};

export default GiscusComponent;
