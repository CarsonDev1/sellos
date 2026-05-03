import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];

function admin() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function getConversations(userId: string): Promise<Conversation[]> {
  const { data } = await admin()
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  return data ?? [];
}

export async function createConversation(userId: string, title: string): Promise<Conversation | null> {
  const { data } = await admin()
    .from("conversations")
    .insert({ user_id: userId, title })
    .select()
    .single();
  return data;
}

export async function updateConversationTitle(id: string, title: string) {
  await admin().from("conversations").update({ title }).eq("id", id);
}

export async function deleteConversation(id: string) {
  await admin().from("conversations").delete().eq("id", id);
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data } = await admin()
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  return data ?? [];
}

export async function saveMessage(conversationId: string, role: "user" | "assistant", content: string) {
  const { data } = await admin()
    .from("messages")
    .insert({ conversation_id: conversationId, role, content })
    .select()
    .single();
  return data;
}
