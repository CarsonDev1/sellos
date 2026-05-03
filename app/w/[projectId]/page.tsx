import { notFound } from "next/navigation";
import { getProject, getProjectProducts } from "@/lib/supabase/projects";
import { createAdminClient } from "@/lib/supabase/server";
import SiteRenderer from "./SiteRenderer";

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  const content = project?.generated_content as Record<string, { title?: string; description?: string }> | null;
  return {
    title: content?.seo?.title ?? project?.name ?? "Website",
    description: content?.seo?.description ?? "",
  };
}

export default async function PublicSitePage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const [project, products] = await Promise.all([
    getProject(projectId),
    getProjectProducts(projectId),
  ]);

  if (!project || !project.published || !project.generated_content) notFound();

  const supabase = await createAdminClient();
  const { data: bizInfo } = await supabase
    .from("business_info")
    .select("brand_name")
    .eq("user_id", project.user_id)
    .single();

  return (
    <SiteRenderer
      project={project}
      products={products}
      brandName={bizInfo?.brand_name ?? project.name}
    />
  );
}
