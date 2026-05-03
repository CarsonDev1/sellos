import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import { createAdminClient } from "@/lib/supabase/server";
import TemplatePickerClient from "./TemplatePickerClient";

export const metadata = { title: "Chọn Template — SellOS" };

export default async function ChonTemplatePage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const supabase = await createAdminClient();
  const { data: bizInfo } = await supabase
    .from("business_info")
    .select("brand_name, business_type, description")
    .eq("user_id", profile.id)
    .single();

  if (!bizInfo?.brand_name) redirect("/dashboard/thong-tin");

  return <TemplatePickerClient brandName={bizInfo.brand_name} businessType={bizInfo.business_type ?? ""} />;
}
