"use client";

import { tokenize } from "@/modules/common/search/tokenizer";
import { create } from "@orama/orama";
import { useDocsSearch } from "fumadocs-core/search/client";
import { useOnChange } from "fumadocs-core/utils/use-on-change";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from "fumadocs-ui/components/dialog/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/modules/shared/ui/DocButton";
import { cn } from "@/lib/utils/general";
import type { SharedProps, TagItem } from "fumadocs-ui/contexts/search";
import { type ReactNode, useEffect, useState } from "react";

export interface DefaultSearchDialogProps extends SharedProps {
  defaultTag?: string;

  tags?: TagItem[];

  /**
   * Search API URL
   */
  api?: string;

  footer?: ReactNode;

  /**
   * Allow to clear tag filters
   *
   * @defaultValue false
   */
  allowClear?: boolean;
}

const oramaClient = create({
  schema: { _: "string" },
  components: {
    tokenizer: {
      language: "english",
      tokenize,
    },
  },
});

const initOrama = () => oramaClient;

const items: {
  name: string;
  value: string | undefined;
  description?: string;
}[] = [
  {
    name: "All",
    value: undefined,
  },
  {
    name: "General",
    value: "records",
    description: "Only results about General",
  },
  {
    name: "Books",
    value: "books",
    description: "Only results about Books",
  },
  {
    name: "Engineering",
    value: "engineerings",
    description: "Only results about Engineering",
  },
  {
    name: "Projects",
    value: "projects",
    description: "Only results about Projects",
  },
];

export default function DefaultSearchDialog({
  defaultTag,
  tags = [],
  api,
  footer,
  allowClear = false,
  ...props
}: DefaultSearchDialogProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState(defaultTag || undefined);
  const { search, setSearch, query } = useDocsSearch({
    type: api ? "fetch" : "static",
    initOrama: api ? undefined : initOrama,
    from: api,
    tag,
  });

  useOnChange(defaultTag, (v) => {
    setTag(v);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent aria-describedby={undefined} className="">
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : null} />
        <SearchDialogFooter>
          {/* <SearchTags items={items} tag={tag} setTag={setTag} allowClear={allowClear} /> */}
          <SearchPopover
            items={items}
            open={open}
            setOpen={setOpen}
            tag={tag}
            setTag={setTag}
          />

          {footer}
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}

export const SearchTags = ({
  items,
  tag,
  setTag,
  allowClear = false,
}: {
  items: { name: string; value: string | undefined; description?: string }[];
  tag: string | undefined;
  setTag: (tag: string) => void;
  allowClear?: boolean;
}) => {
  return (
    <div className="flex flex-row gap-2 justify-between w-full">
      {items.length > 0 && (
        <TagsList tag={tag} onTagChange={setTag} allowClear={allowClear}>
          {items.map((item, i) => (
            <TagsListItem key={i} value={item.value || ""}>
              {item.name}
            </TagsListItem>
          ))}
        </TagsList>
      )}
      <a
        href="https://orama.com"
        rel="noreferrer noopener"
        className="text-xs text-nowrap text-fd-muted-foreground"
      >
        Powered by Orama
      </a>
    </div>
  );
};

export const SearchPopover = ({
  items,
  open,
  setOpen,
  tag,
  setTag,
}: {
  items: {
    name: string;
    value: string | undefined;
    description?: string;
  }[];
  open: boolean;
  setOpen: (open: boolean) => void;
  tag: string | undefined;
  setTag: (tag: string | undefined) => void;
}) => {
  useEffect(() => {
    console.log(tag);
    setTag(undefined);
  }, []);
  return (
    <div className="flex flex-row gap-2 justify-between w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={buttonVariants({
            size: "sm",
            color: "ghost",
            className: "-m-1.5 me-auto",
          })}
        >
          <span className="text-fd-muted-foreground/80 me-2">Filter</span>
          {items.find((item) => item.value === tag)?.name || "All"}
          <ChevronDown className="size-3.5 text-fd-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-1 gap-1" align="start">
          {items.map((item, i) => {
            const isSelected = item.value === tag;

            return (
              <button
                key={i}
                onClick={() => {
                  setTag(item.value);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg text-start px-2 py-1.5",
                  isSelected
                    ? "text-fd-primary bg-fd-primary/10"
                    : "hover:text-fd-accent-foreground hover:bg-fd-accent"
                )}
              >
                <p className="font-medium mb-0.5">{item.name}</p>
                <p className="text-xs opacity-70">{item.description}</p>
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
      <a
        href="https://orama.com"
        rel="noreferrer noopener"
        className="text-xs text-nowrap text-fd-muted-foreground"
      >
        Powered by Orama
      </a>
    </div>
  );
};
