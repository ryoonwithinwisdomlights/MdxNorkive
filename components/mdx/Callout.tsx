// components/mdx/Callout.tsx
//// 노션 스타일 주석 박스
export default function Callout({
  emoji,
  children,
}: {
  emoji?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-primary pl-4 py-2 bg-muted/40 rounded">
      {emoji && <span className="mr-2">{emoji}</span>}
      {children}
    </div>
  );
}
