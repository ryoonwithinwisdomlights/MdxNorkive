// components/mdx/atoms/Anchor.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function Anchor({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-blue-600 underline-offset-4 hover:underline",
        className
      )}
      {...props}
    />
  );
}
