"use client";

import dynamic from "next/dynamic";

const TableOfContents = dynamic(() => import("./TableOfContents"), {
  ssr: false,
});

type Props = { record: any };

export default function TableOfContentsClientWrapper({ record }: Props) {
  return <TableOfContents record={record} />;
}
