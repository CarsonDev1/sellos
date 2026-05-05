import { auth } from "@clerk/nextjs/server";
import { getProfile } from "./profile";
import { getProject } from "./projects";

/**
 * Verify the current Clerk user owns the given project.
 * Returns the project on success, or a Response on failure (auth/forbidden/not-found).
 */
export async function requireProjectOwner(projectId: string) {
  const { userId } = await auth();
  if (!userId) return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };

  const profile = await getProfile(userId);
  if (!profile) return { error: Response.json({ error: "Profile not found" }, { status: 404 }) };

  const project = await getProject(projectId);
  if (!project) return { error: Response.json({ error: "Project not found" }, { status: 404 }) };
  if (project.user_id !== profile.id) {
    return { error: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { project, profile };
}
