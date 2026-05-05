import { notFound } from "next/navigation";
import { getProject, getProjectProducts } from "@/lib/supabase/projects";
import { createAdminClient } from "@/lib/supabase/server";
import ProductsListClient from "./ProductsListClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  return { title: `Sản phẩm — ${project?.name ?? ""}` };
}

export default async function ProductsListPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const [project, products] = await Promise.all([
    getProject(projectId),
    getProjectProducts(projectId),
  ]);

  if (!project || !project.published) notFound();

  const supabase = await createAdminClient();
  const { data: bizInfo } = await supabase
    .from("business_info")
    .select("brand_name")
    .eq("user_id", project.user_id)
    .single();

  return (
    <ProductsListClient
      products={products}
      projectId={projectId}
      brandName={bizInfo?.brand_name ?? project.name}
    />
  );
}
