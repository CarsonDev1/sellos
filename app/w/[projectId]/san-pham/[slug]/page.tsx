import { notFound } from "next/navigation";
import {
  getProject,
  getProjectProductBySlug,
  getProjectProducts,
} from "@/lib/supabase/projects";
import { createAdminClient } from "@/lib/supabase/server";
import ProductDetailClient from "./ProductDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string; slug: string }>;
}) {
  const { projectId, slug } = await params;
  const product = await getProjectProductBySlug(projectId, slug);
  return {
    title: product?.name ?? "Sản phẩm",
    description: product?.description ?? "",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ projectId: string; slug: string }>;
}) {
  const { projectId, slug } = await params;
  const [project, product] = await Promise.all([
    getProject(projectId),
    getProjectProductBySlug(projectId, slug),
  ]);

  if (!project || !project.published) notFound();
  if (!product) notFound();

  const supabase = await createAdminClient();
  const { data: bizInfo } = await supabase
    .from("business_info")
    .select("brand_name")
    .eq("user_id", project.user_id)
    .single();

  const allProducts = await getProjectProducts(projectId);
  const related = allProducts
    .filter((p) => p.id !== product.id)
    .filter((p) => !product.category || p.category === product.category)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      related={related}
      projectId={projectId}
      brandName={bizInfo?.brand_name ?? project.name}
    />
  );
}
