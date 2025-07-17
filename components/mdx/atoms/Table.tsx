// components/mdx/atoms/Table.tsx
import { cn } from "@/lib/utils/utils";
import { ComponentPropsWithoutRef } from "react";

export function Table({
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full text-sm text-left", className)} {...props} />
    </div>
  );
}
