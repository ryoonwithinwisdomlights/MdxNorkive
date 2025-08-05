"use client";

import { useGeneralSiteSettings } from "@/lib/context/GeneralSiteSettingsProvider";
import { ErrorBoundary } from "react-error-boundary";

function Fallback({
  error,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: any is used to match the Error type
  error: any;
}) {
  const { locale } = useGeneralSiteSettings();
  return (
    <div role="alert">
      <p>{locale.COMMON.ERROR_OCCURRED}:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

interface Props {
  children: React.ReactNode;
}

export default function (props: Props) {
  const { children } = props;
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>;
}
