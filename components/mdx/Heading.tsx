// components/mdx/Heading.tsx
//이건 H1~H6용 커스텀 heading, 자동 anchor 링크, TOC 등을 위한 id 부여 및 디자인 대응.
export default function Heading({
  as: Tag = "h2",
  children,
  id,
}: {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag id={id} className="scroll-mt-20 font-semibold text-foreground">
      {children}
    </Tag>
  );
}
