// components/mdx/atoms/Image.tsx
import { cn } from "@/lib/utils/utils";
import ImageNext, { ImageProps } from "next/image";

export function Image(props: ImageProps) {
  return (
    <ImageNext
      {...props}
      className={cn("rounded-md border", props.className)}
    />
  );
}
