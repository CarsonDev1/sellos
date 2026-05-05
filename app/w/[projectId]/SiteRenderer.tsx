"use client";

import { useCart } from "./CartProviderWrapper";
import type { Project, ProjectProduct } from "@/lib/supabase/projects";
import ThucPhamRenderer from "@/components/generated/thuc-pham/ThucPhamRenderer";
import CoachingRenderer from "@/components/generated/coaching/CoachingRenderer";
import ShopOnlineRenderer from "@/components/generated/shop-online/ShopOnlineRenderer";
import { getTemplate, normalizeContent } from "@/lib/templates";
import type { ThucPhamContent } from "@/lib/templates/thuc-pham";
import type { CoachingContent } from "@/lib/templates/coaching";
import type { ShopOnlineContent } from "@/lib/templates/shop-online";

interface Props {
  project: Project;
  products: ProjectProduct[];
  brandName: string;
}

export default function SiteRenderer({ project, products, brandName }: Props) {
  const { addItem, openCart, itemCount } = useCart();
  const id = project.id;
  const tpl = getTemplate(project.template_id ?? "");
  const rawContent = project.generated_content ?? {};

  // Fill in any fields the AI omitted with schema defaults so the renderer
  // never accesses `undefined.foo`.
  const content = tpl
    ? normalizeContent(rawContent, tpl.schema)
    : rawContent;

  switch (project.template_id) {
    case "thuc-pham":
      return (
        <ThucPhamRenderer
          content={content as unknown as ThucPhamContent}
          products={products}
          projectId={id}
          brandName={brandName}
          onAddToCart={addItem}
          cartCount={itemCount}
          onCartOpen={openCart}
        />
      );
    case "coaching":
      return (
        <CoachingRenderer
          content={content as unknown as CoachingContent}
          programs={products}
          projectId={id}
          brandName={brandName}
        />
      );
    case "shop-online":
      return (
        <ShopOnlineRenderer
          content={content as unknown as ShopOnlineContent}
          products={products}
          projectId={id}
          brandName={brandName}
          onAddToCart={addItem}
          cartCount={itemCount}
          onCartOpen={openCart}
        />
      );
    default:
      return (
        <div className="flex items-center justify-center min-h-screen text-slate-500">
          Template chưa hỗ trợ render công khai
        </div>
      );
  }
}
