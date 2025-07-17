// components/mdx/atoms/Blockquote.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export function Blockquote({ className, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
