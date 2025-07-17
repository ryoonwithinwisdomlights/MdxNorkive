//커스텀 코드블럭 (Shiki렌더링 + 토글 등)
// components/mdx/CodeBlock.tsx
type CodeBlockProps = {
  code: string;
  lang: string;
  meta?: string;
};

export default function CodeBlock({ code, lang, meta }: CodeBlockProps) {
  return (
    <div data-language={lang}>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
    </div>
  );
}
//이후 이 코드는 @shikijs/rehype로 미리 HTML로 렌더링된 상태로 넘어오므로 dangerouslySetInnerHTML을 써도 안전해.
