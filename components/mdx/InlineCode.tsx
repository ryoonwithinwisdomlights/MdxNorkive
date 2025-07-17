// components/mdx/InlineCode.tsx
/// 인라인 코드

export default function InlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="px-1 py-0.5 rounded bg-muted font-mono text-sm">
      {children}
    </code>
  );
}
