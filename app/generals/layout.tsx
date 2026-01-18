import { generalsSource } from "@/lib/source";
import DocsLayoutWrapper from "@/modules/layout/templates/docs-layout-wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayoutWrapper source={generalsSource}>{children}</DocsLayoutWrapper>
  );
}
