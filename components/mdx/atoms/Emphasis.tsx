// components/mdx/atoms/Emphasis.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function Emphasis({
  className,
  ...props
}: ComponentPropsWithoutRef<"em">) {
  return <em className={cn("italic", className)} {...props} />;
}
