"use client";
import { Check, Share } from "lucide-react";
import { cn } from "@/lib/utils/general";
//  ;
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { buttonVariants } from "@/modules/shared/ui/button";

export function Control({ url }: { url: string }): React.ReactElement {
  const [isChecked, onCopy] = useCopyButton(() => {
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
  });

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({ className: "gap-2", variant: "secondary" })
      )}
      onClick={onCopy}
    >
      {isChecked ? <Check className="size-4" /> : <Share className="size-4" />}
      {isChecked ? "Copied URL" : "Share Post"}
    </button>
  );
}
