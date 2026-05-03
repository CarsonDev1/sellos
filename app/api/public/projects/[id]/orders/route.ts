import { NextRequest } from "next/server";
import { createOrder } from "@/lib/supabase/projects";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const order = await createOrder({ ...body, project_id: id });
  return Response.json({ order });
}
