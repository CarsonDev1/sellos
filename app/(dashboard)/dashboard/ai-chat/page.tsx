import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import { getConversations } from "@/lib/supabase/chat";
import { createAdminClient } from "@/lib/supabase/server";
import AiChatClient from "./AiChatClient";

export const metadata = { title: "AI Chat — SellOS" };

export default async function AiChatPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const [clerkUser, profile] = await Promise.all([
    currentUser(),
    getProfile(userId),
  ]);

  if (!profile) redirect("/dashboard");

  const supabase = await createAdminClient();
  const { data: bizInfo } = await supabase
    .from("business_info")
    .select("brand_name, business_type")
    .eq("user_id", profile.id)
    .single();

  const conversations = await getConversations(profile.id);

  const userName =
    clerkUser
      ? [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ")
      : "";

  return (
    <AiChatClient
      initialConversations={conversations}
      brandName={bizInfo?.brand_name ?? ""}
      businessType={bizInfo?.business_type ?? ""}
      userName={userName}
    />
  );
}
