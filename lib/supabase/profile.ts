import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function syncProfile(clerkUser: {
  id: string;
  emailAddresses: Array<{ emailAddress: string }>;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
}): Promise<Profile | null> {
  const supabase = getAdminClient();
  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const fullName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

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
    console.error("[syncProfile]", error.message);
    return null;
  }
  return data;
}

export async function getProfile(clerkId: string): Promise<Profile | null> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();
  if (error) console.error("[getProfile]", error.message);
  return data ?? null;
}

export async function isAdmin(clerkId: string): Promise<boolean> {
  const profile = await getProfile(clerkId);
  return profile?.role === "admin";
}
