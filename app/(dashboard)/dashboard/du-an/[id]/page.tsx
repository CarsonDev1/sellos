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

  let stats = null;
  try {
    stats = project.template_id ? await getProjectStats(id, project.template_id) : null;
  } catch {
    // stats are non-critical; render page without them
  }

  // Strip generated_content — it's large and not needed in the admin overview
  const projectSafe = { ...project, generated_content: null };

  return <ProjectOverviewClient project={projectSafe} tpl={tpl ?? null} stats={stats} />;
}
