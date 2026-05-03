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
  const stats = project.template_id ? await getProjectStats(id, project.template_id) : null;

  return <ProjectOverviewClient project={project} tpl={tpl ?? null} stats={stats} />;
}
