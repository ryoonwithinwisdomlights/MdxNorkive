// components/mdx/atoms/ListItem.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type ListItemProps = ComponentPropsWithoutRef<"li">;

export function ListItem({ className, ...props }: ListItemProps) {
  return <li className={cn("mt-2", className)} {...props} />;
}
