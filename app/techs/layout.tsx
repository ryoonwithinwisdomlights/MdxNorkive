import { techsSource } from "@/lib/source";
import DocsLayoutWrapper from "@/modules/layout/templates/docs-layout-wrapper";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutWrapper source={techsSource}>{children}</DocsLayoutWrapper>;
}
