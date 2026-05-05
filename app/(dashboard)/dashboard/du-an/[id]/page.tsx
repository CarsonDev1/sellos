import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import { getProject, getProjectStats } from "@/lib/supabase/projects";
import { getTemplate } from "@/lib/templates";
import ProjectOverviewClient from "./ProjectOverviewClient";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const { id } = await params;
  const project = await getProject(id);

  if (!project || project.user_id !== profile.id) notFound();

  const tpl = getTemplate(project.template_id ?? "");

  // Serializable subset — TemplateConfig contains functions (buildPrompt) which
  // cannot be passed to Client Components.
  const tplClient = tpl
    ? {
        id: tpl.id,
        name: tpl.name,
        description: tpl.description,
        color: tpl.color,
        textColor: tpl.textColor,
        previewUrl: tpl.previewUrl,
        adminSections: tpl.adminSections,
      }
    : null;

  let stats = null;
  try {
    stats = project.template_id ? await getProjectStats(id, project.template_id) : null;
  } catch {
    // stats are non-critical; render page without them
  }

  // Strip generated_content — large and not needed in the admin overview
  const { generated_content: _gc, ...projectSafe } = project as typeof project & { generated_content?: unknown };
  void _gc;

  return <ProjectOverviewClient project={projectSafe as typeof project} tpl={tplClient} stats={stats} />;
}
