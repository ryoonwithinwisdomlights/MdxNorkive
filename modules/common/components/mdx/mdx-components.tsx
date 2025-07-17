import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";

export const components = {
  a: (props: ComponentProps<"a">) => {
    const isInternal = props.href?.startsWith("/");
    if (isInternal) {
      return <Link {...props} className="text-blue-600 underline" />;
    }
    return (
      <a
        {...props}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  },
  pre: (props: ComponentProps<"pre">) => {
    return (
      <pre
        {...props}
        className="bg-zinc-950 text-white p-4 rounded-md overflow-auto my-4"
      />
    );
  },
  code: (props: ComponentProps<"code">) => {
    return <code {...props} className="font-mono text-sm" />;
  },
  blockquote: (props: ComponentProps<"blockquote">) => {
    return (
      <blockquote
        {...props}
        className="border-l-4 pl-4 italic text-zinc-600 dark:text-zinc-300"
      />
    );
  },
  img: (props: ComponentProps<"img">) => {
    return (
      <div className="my-4">
        <img {...props} className="rounded-md shadow max-w-full h-auto" />
      </div>
    );
  },
  // 기타 커스텀 블록은 추후 추가 가능
};
