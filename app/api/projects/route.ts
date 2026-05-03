import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/lib/supabase/profile";
import { getProjects } from "@/lib/supabase/projects";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProfile(userId);
  if (!profile) return Response.json({ projects: [] });

  const projects = await getProjects(profile.id);
  return Response.json({ projects });
}
