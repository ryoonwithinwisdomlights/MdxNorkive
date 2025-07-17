// components/mdx/atoms/Paragraph.tsx

// import { cn } from "@/lib/utils/utils";
// import { HTMLAttributes } from "react";

// interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}
/**
 * 	•	각각의 컴포넌트는 다음 원칙을 따름:
	•	TailwindCSS + cn 유틸로 className 확장
	•	정적 스타일링 유지 (클래식한 SSR/SEO 목적에도 안정적)
	•	MDX <-> HTML mapping을 고려한 구조
    각 컴포넌트는 components/mdx/atoms/에 배치되고, 
    최종적으로 이들을 index로 export하여 MDXRemote 혹은 content-collections에서 사용한는 아키텍쳐구조.
 */

// export function Paragraph({ className, ...props }: ParagraphProps) {
//   return (
//     <p
//       className={cn(
//         "leading-7 [&:not(:first-child)]:mt-6 text-base",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// components/mdx/atoms/paragraph.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";
/**
 * 
ComponentPropsWithoutRef<"p">로 바꾼 건 의도적이며 더 나은 방식이에요.
기존의 HTMLAttributes<HTMLParagraphElement>보다 짧고 직관적인 타입 선언 방식이며, ForwardRef 대응도 좋고, React 공식 문서나 실무에서도 더 선호되고 있습니다.
 */
export function Paragraph({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-base text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
