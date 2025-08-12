"use client";

import { ProgressProvider } from "@bprogress/next/app";
export default function ProgressBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProgressProvider
      height="4px"
      color="#d4d4d4"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}
