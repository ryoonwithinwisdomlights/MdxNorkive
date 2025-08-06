// MDX 파일에서 중첩된 링크 패턴을 감지하는 ESLint 규칙
export const mdxRules = {
  "no-nested-links": {
    create(context) {
      return {
        Literal(node) {
          if (typeof node.value === "string" && node.value.includes(".mdx")) {
            const content = node.value;
            const nestedLinkPattern = /\[(\*\*[^*]+\*\*)\]\([^)]+\)/g;

            if (nestedLinkPattern.test(content)) {
              context.report({
                node,
                message:
                  "중첩된 링크 패턴이 감지되었습니다. [**text**](url) 형태를 피하세요.",
              });
            }
          }
        },
      };
    },
  },
};
