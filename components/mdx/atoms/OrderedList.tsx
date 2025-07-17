// components/mdx/atoms/OrderedList.tsx

import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

type OlProps = ComponentPropsWithoutRef<"ol">;

export function OrderedList({ className, ...props }: OlProps) {
  return <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />;
}
