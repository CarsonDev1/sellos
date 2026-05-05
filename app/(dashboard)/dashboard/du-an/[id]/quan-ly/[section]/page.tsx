import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import {
  getProject,
  getProjectProducts,
  getProjectOrders,
  getProjectBookings,
} from "@/lib/supabase/projects";
import { getTemplate } from "@/lib/templates";
import SectionShell from "./SectionShell";
import ProductsSection from "./ProductsSection";
import OrdersSection from "./OrdersSection";
import BookingsSection from "./BookingsSection";
import ContentSection from "./ContentSection";
import SettingsSection from "./SettingsSection";

export default async function ManageSectionPage({
  params,
}: {
  params: Promise<{ id: string; section: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const { id, section } = await params;
  const project = await getProject(id);
  if (!project || project.user_id !== profile.id) notFound();

  const tpl = getTemplate(project.template_id ?? "");
  if (!tpl) notFound();

  const sectionConfig = tpl.adminSections.find((s) => s.key === section);
  if (!sectionConfig) notFound();

  // Fetch data based on section flags / key
  const isProducts = sectionConfig.hasProducts;
  const isOrders = sectionConfig.hasOrders;
  const isBookings = sectionConfig.hasBookings;
  const isContent = section === "content";
  const isSettings = section === "settings";

  const [products, orders, bookings] = await Promise.all([
    isProducts ? getProjectProducts(id) : Promise.resolve([]),
    isOrders ? getProjectOrders(id) : Promise.resolve([]),
    isBookings ? getProjectBookings(id) : Promise.resolve([]),
  ]);

  return (
    <SectionShell
      projectId={id}
      projectName={project.name}
      templateName={tpl.name}
      adminSections={tpl.adminSections}
      currentSection={section}
    >
      {isProducts && (
        <ProductsSection
          projectId={id}
          initialProducts={products}
          sectionLabel={sectionConfig.label}
        />
      )}
      {isOrders && !isProducts && (
        <OrdersSection
          projectId={id}
          initialOrders={orders}
          sectionLabel={sectionConfig.label}
        />
      )}
      {isBookings && !isProducts && (
        <BookingsSection
          projectId={id}
          initialBookings={bookings}
          sectionLabel={sectionConfig.label}
        />
      )}
      {isContent && (
        <ContentSection
          projectId={id}
          initialContent={(project.generated_content ?? {}) as Record<string, unknown>}
        />
      )}
      {isSettings && (
        <SettingsSection
          projectId={id}
          initialName={project.name}
          initialSlug={project.slug ?? ""}
          initialPublished={project.published}
        />
      )}
    </SectionShell>
  );
}
