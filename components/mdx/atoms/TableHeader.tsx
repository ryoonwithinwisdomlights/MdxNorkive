// components/mdx/atoms/TableHeader.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function TableHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return <th className={cn("px-4 py-2 font-bold", className)} {...props} />;
}
