import { createClient } from "./server";
import type { Database } from "./types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function syncProfile(clerkUser: {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
}): Promise<Profile | null> {
  const supabase = await createClient();
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const fullName = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        clerk_id: clerkUser.id,
        email,
        full_name: fullName,
        avatar_url: clerkUser.imageUrl || null,
      },
      { onConflict: "clerk_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("syncProfile error:", error.message);
    return null;
  }
  return data;
}

export async function getProfile(clerkId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();
  return data;
}

export async function isAdmin(clerkId: string): Promise<boolean> {
  const profile = await getProfile(clerkId);
  return profile?.role === "admin";
}
