import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getMessages } from "@/lib/supabase/chat";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const messages = await getMessages(id);
  return Response.json({ messages });
}
