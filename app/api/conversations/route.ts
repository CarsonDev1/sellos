import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/lib/supabase/profile";
import { getConversations, deleteConversation } from "@/lib/supabase/chat";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProfile(userId);
  if (!profile) return Response.json({ conversations: [] });

  const conversations = await getConversations(profile.id);
  return Response.json({ conversations });
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await deleteConversation(id);
  return Response.json({ success: true });
}
