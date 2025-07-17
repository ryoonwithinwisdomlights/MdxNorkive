// components/mdx/atoms/List.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function List({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
}
