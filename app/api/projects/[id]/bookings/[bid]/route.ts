import { NextRequest } from "next/server";
import { requireProjectOwner } from "@/lib/supabase/authz";
import { updateBookingStatus } from "@/lib/supabase/projects";

const ALLOWED = ["pending", "confirmed", "done", "cancelled"] as const;
type BookingStatus = typeof ALLOWED[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; bid: string }> }
) {
  const { id, bid } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  const { status } = await req.json();
  if (!ALLOWED.includes(status)) {
    return Response.json({ error: "Invalid status" }, { status: 400 });
  }
  await updateBookingStatus(bid, status as BookingStatus);
  return Response.json({ success: true });
}
