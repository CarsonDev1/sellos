import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import { getProject } from "@/lib/supabase/projects";
import { getTemplate } from "@/lib/templates";

export default async function QuanLyHubPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const { id } = await params;
  const project = await getProject(id);
  if (!project || project.user_id !== profile.id) notFound();

  const tpl = getTemplate(project.template_id ?? "");
  // Redirect to the first non-overview section so the user always lands somewhere usable
  const first = tpl?.adminSections.find((s) => s.key !== "overview");
  if (first) redirect(`/dashboard/du-an/${id}/quan-ly/${first.key}`);

  // Fallback: send back to overview
  redirect(`/dashboard/du-an/${id}`);
}
