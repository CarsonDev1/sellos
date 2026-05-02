"use server";

import { auth } from "@clerk/nextjs/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";
import type { BusinessType } from "@/lib/supabase/types";

export async function saveBusinessInfo(formData: {
  brand_name: string;
  business_type: string;
  description: string;
  phone: string;
  website: string;
}) {
  const { userId } = await auth();
  if (!userId) return { error: "Chưa đăng nhập" };

  const profile = await getProfile(userId);
  if (!profile) return { error: "Không tìm thấy profile" };

  const supabase = await createAdminClient();
  const { error } = await supabase.from("business_info").upsert(
    {
      user_id: profile.id,
      brand_name: formData.brand_name,
      business_type: formData.business_type as BusinessType,
      description: formData.description || null,
      phone: formData.phone || null,
      website: formData.website || null,
    },
    { onConflict: "user_id" }
  );

  if (error) return { error: error.message };
  return { success: true };
}

export async function saveProducts(
  products: Array<{
    id?: string;
    name: string;
    description?: string;
    price?: number | null;
    usp?: string;
    target_audience?: string;
    sales_channels?: string[];
  }>
) {
  const { userId } = await auth();
  if (!userId) return { error: "Chưa đăng nhập" };

  const profile = await getProfile(userId);
  if (!profile) return { error: "Không tìm thấy profile" };

  const supabase = await createAdminClient();

  for (const p of products) {
    if (!p.name) continue;
    const payload = {
      user_id: profile.id,
      name: p.name,
      description: p.description || null,
      price: p.price ?? null,
      usp: p.usp || null,
      target_audience: p.target_audience || null,
      sales_channels: p.sales_channels ?? [],
    };

    if (p.id) {
      await supabase.from("products").update(payload).eq("id", p.id);
    } else {
      await supabase.from("products").insert(payload);
    }
  }

  await supabase
    .from("profiles")
    .update({ onboarding_done: true })
    .eq("id", profile.id);

  return { success: true };
}
