import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/supabase/profile";
import ThongTinForm from "./ThongTinForm";

export const metadata = { title: "Thông tin & Sản phẩm — SellOS" };

export default async function ThongTinPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const supabase = await createAdminClient();
  const [{ data: businessInfo }, { data: products }] = await Promise.all([
    supabase.from("business_info").select("*").eq("user_id", profile.id).maybeSingle(),
    supabase.from("products").select("*").eq("user_id", profile.id).order("created_at"),
  ]);

  return (
    <ThongTinForm
      profileId={profile.id}
      initialBusiness={businessInfo}
      initialProducts={products ?? []}
    />
  );
}
