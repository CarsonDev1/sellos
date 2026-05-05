import { NextRequest } from "next/server";
import { requireProjectOwner } from "@/lib/supabase/authz";
import { updateProjectContent } from "@/lib/supabase/projects";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;

  const body = await req.json();
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid content" }, { status: 400 });
  }
  await updateProjectContent(id, body as Record<string, unknown>);
  return Response.json({ success: true });
}
