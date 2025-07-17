// components/mdx/atoms/InlineCode.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type InlineCodeProps = ComponentPropsWithoutRef<"code">;

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-1 font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  );
}
