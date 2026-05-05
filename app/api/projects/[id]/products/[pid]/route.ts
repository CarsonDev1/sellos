import { NextRequest } from "next/server";
import { requireProjectOwner } from "@/lib/supabase/authz";
import { deleteProjectProduct, updateProjectProduct } from "@/lib/supabase/projects";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; pid: string }> }
) {
  const { id, pid } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  const body = await req.json();
  await updateProjectProduct(pid, body);
  return Response.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; pid: string }> }
) {
  const { id, pid } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  await deleteProjectProduct(pid);
  return Response.json({ success: true });
}
