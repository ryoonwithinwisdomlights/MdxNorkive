// components/mdx/atoms/Strong.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type StrongProps = ComponentPropsWithoutRef<"strong">;

export function Strong({ className, ...props }: StrongProps) {
  return (
    <strong
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}
