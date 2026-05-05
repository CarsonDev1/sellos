import { notFound } from "next/navigation";
import { getProject, getProjectProducts } from "@/lib/supabase/projects";
import { createAdminClient } from "@/lib/supabase/server";
import { getTemplate, normalizeContent } from "@/lib/templates";
import CategoryClient from "./CategoryClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string; slug: string }>;
}) {
  const { slug } = await params;
  return { title: `Danh mục ${slug}` };
}

interface CategoryEntry {
  name?: string;
  slug?: string;
  description?: string;
  image_keyword?: string;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ projectId: string; slug: string }>;
}) {
  const { projectId, slug } = await params;
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

  // Try to find the category metadata in the AI-generated content
  const tpl = getTemplate(project.template_id ?? "");
  const content = tpl
    ? (normalizeContent(project.generated_content ?? {}, tpl.schema) as Record<string, unknown>)
    : ({} as Record<string, unknown>);
  const categories = (content.categories ?? []) as CategoryEntry[];
  const cat = categories.find((c) => c.slug === slug);

  // Filter products by category name (slug-derived names won't match perfectly,
  // so try both literal name and case-insensitive contains)
  const filtered = products.filter((p) => {
    if (!p.category) return false;
    if (cat?.name && p.category.toLowerCase() === cat.name.toLowerCase()) return true;
    return p.category.toLowerCase().includes(slug.replace(/-/g, " "));
  });

  return (
    <CategoryClient
      products={filtered.length > 0 ? filtered : products}
      projectId={projectId}
      brandName={bizInfo?.brand_name ?? project.name}
      categoryName={cat?.name ?? slug}
      categoryDesc={cat?.description ?? ""}
      hasMatch={filtered.length > 0}
    />
  );
}
