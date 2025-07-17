// components/mdx/Heading.tsx
//이건 H1~H6용 커스텀 heading, 자동 anchor 링크, TOC 등을 위한 id 부여 및 디자인 대응.
// export default function Heading({
//   as: Tag = "h2",
//   children,
//   id,
// }: {
//   as?: keyof JSX.IntrinsicElements;
//   id?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Tag id={id} className="scroll-mt-20 font-semibold text-foreground">
//       {children}
//     </Tag>
//   );
// }
// components/mdx/atoms/Heading.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1"> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({ level, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  const baseStyles = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-semibold tracking-tight",
    3: "text-2xl font-semibold tracking-tight",
    4: "text-xl font-semibold tracking-tight",
    5: "text-lg font-medium tracking-tight",
    6: "text-base font-medium tracking-tight",
  };

  return (
    <Tag
      className={cn(baseStyles[level], "mt-8 scroll-m-20", className)}
      {...props}
    />
  );
}
