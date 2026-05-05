import { NextRequest } from "next/server";
import { requireProjectOwner } from "@/lib/supabase/authz";
import { updateOrderStatus } from "@/lib/supabase/projects";

const ALLOWED = ["pending", "confirmed", "shipping", "done", "cancelled"] as const;
type OrderStatus = typeof ALLOWED[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; oid: string }> }
) {
  const { id, oid } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  const { status } = await req.json();
  if (!ALLOWED.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }
  await updateOrderStatus(oid, status as OrderStatus);
  return Response.json({ success: true });
}
