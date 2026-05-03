import { getProject } from "@/lib/supabase/projects";
import { notFound } from "next/navigation";
import CartProviderWrapper from "./CartProviderWrapper";

export default async function PublicSiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project || !project.published) notFound();

  return <CartProviderWrapper projectId={projectId}>{children}</CartProviderWrapper>;
}
