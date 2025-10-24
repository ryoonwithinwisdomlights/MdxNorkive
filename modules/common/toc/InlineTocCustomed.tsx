"use client";
import { useThemeStore } from "@/lib/stores";
import { cn } from "@/lib/utils/general";
import { TOCItemType } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "fumadocs-ui/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { ComponentProps } from "react";
export interface InlineTocProps extends ComponentProps<typeof Collapsible> {
  items: TOCItemType[];
}
const InlineTocCustomed = ({ items, ...props }: InlineTocProps) => {
  const { locale } = useThemeStore();
  return (
    <Collapsible
      {...props}
      className={cn(
        "not-prose rounded-lg border md:w-[225px] bg-fd-card text-fd-card-foreground ",
        props.className
      )}
    >
      <CollapsibleTrigger className="group inline-flex w-full items-center justify-between px-4 py-2.5 font-medium">
        <span className="text-base text-neutral-600 dark:text-neutral-200">
          {locale.RECORD.TABLE_OF_CONTENTS}
        </span>
        <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="h-56 overflow-y-auto">
        <div className="flex flex-col p-4 pt-0 text-sm text-fd-muted-foreground">
          {items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              className="border-s py-1.5 hover:text-fd-accent-foreground"
              style={{
                paddingInlineStart: 12 * Math.max(item.depth - 1, 0),
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InlineTocCustomed;
