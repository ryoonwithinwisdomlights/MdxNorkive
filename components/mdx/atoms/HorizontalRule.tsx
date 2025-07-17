// components/mdx/atoms/HR.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type HRProps = ComponentPropsWithoutRef<"hr">;

export function HR({ className, ...props }: HRProps) {
  return <hr className={cn("my-4 border-border", className)} {...props} />;
}
