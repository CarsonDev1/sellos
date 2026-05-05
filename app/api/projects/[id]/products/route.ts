import { NextRequest } from "next/server";
import { requireProjectOwner } from "@/lib/supabase/authz";
import { createProjectProduct, getProjectProducts } from "@/lib/supabase/projects";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  const products = await getProjectProducts(id);
  return Response.json({ products });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const auth = await requireProjectOwner(id);
  if ("error" in auth) return auth.error;
  const body = await req.json();
  if (!body?.name) return Response.json({ error: "name is required" }, { status: 400 });

  const product = await createProjectProduct(id, body);
  return Response.json({ product });
}
