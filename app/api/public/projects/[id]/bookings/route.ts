import { NextRequest } from "next/server";
import { createBooking } from "@/lib/supabase/projects";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const booking = await createBooking({ ...body, project_id: id, status: "pending" });
  return Response.json({ booking });
}
