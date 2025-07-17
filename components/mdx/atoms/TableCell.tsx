// components/mdx/atoms/TableCell.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function TableCell({
  className,
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return <td className={cn("px-4 py-2", className)} {...props} />;
}
