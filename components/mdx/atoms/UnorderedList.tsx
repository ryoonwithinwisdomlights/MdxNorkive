// components/mdx/atoms/UnorderedList.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type UlProps = ComponentPropsWithoutRef<"ul">;

export function UnorderedList({ className, ...props }: UlProps) {
  return <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />;
}
