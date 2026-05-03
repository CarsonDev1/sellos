import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function admin() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export type Project = {
  id: string;
  user_id: string;
  name: string;
  template_id: string | null;
  generated_content: Record<string, unknown> | null;
  slug: string | null;
  published: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ProjectProduct = {
  id: string;
  project_id: string;
  name: string;
  slug: string | null;
  description: string | null;
  price: number | null;
  original_price: number | null;
  image_url: string | null;
  images: string[];
  category: string | null;
  badge: string | null;
  sizes: string[];
  colors: string[];
  stock: number;
  available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectOrder = {
  id: string;
  project_id: string;
  order_number: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  customer_note: string | null;
  items: Array<{ id: string; name: string; qty: number; price: number; image_url?: string }>;
  subtotal: number;
  discount: number;
  total: number;
  payment_method: string | null;
  status: "pending" | "confirmed" | "shipping" | "done" | "cancelled";
  created_at: string;
  updated_at: string;
};

export type ProjectBooking = {
  id: string;
  project_id: string;
  client_name: string | null;
  client_phone: string | null;
  client_email: string | null;
  program_name: string | null;
  preferred_time: string | null;
  message: string | null;
  status: "pending" | "confirmed" | "done" | "cancelled";
  created_at: string;
};

// ── Projects ────────────────────────────────────────────────

export async function getProjects(userId: string): Promise<Project[]> {
  const { data } = await admin()
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data ?? []) as Project[];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data } = await admin()
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  return data as Project | null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data } = await admin()
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data as Project | null;
}

export async function createProject(
  userId: string,
  name: string,
  templateId: string
): Promise<Project | null> {
  const slug = `${templateId}-${Date.now()}`;
  const { data } = await admin()
    .from("projects")
    .insert({ user_id: userId, name, template_id: templateId, slug, status: "draft" })
    .select()
    .single();
  return data as Project | null;
}

export async function updateProjectContent(
  id: string,
  content: Record<string, unknown>
): Promise<void> {
  await admin()
    .from("projects")
    .update({ generated_content: content, status: "active" })
    .eq("id", id);
}

export async function updateProject(
  id: string,
  patch: Partial<{ name: string; slug: string; published: boolean; status: "draft" | "active" | "paused" }>
): Promise<void> {
  await admin().from("projects").update(patch).eq("id", id);
}

export async function deleteProject(id: string): Promise<void> {
  await admin().from("projects").delete().eq("id", id);
}

// ── Products ─────────────────────────────────────────────────

export async function getProjectProducts(projectId: string): Promise<ProjectProduct[]> {
  const { data } = await admin()
    .from("project_products")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order");
  return (data ?? []) as ProjectProduct[];
}

export async function upsertProjectProducts(
  projectId: string,
  products: Array<Partial<ProjectProduct> & { name: string }>
): Promise<void> {
  const rows = products.map((p, i) => ({
    ...p,
    project_id: projectId,
    sort_order: p.sort_order ?? i,
    slug: p.slug ?? slugify(p.name),
  }));
  await admin().from("project_products").upsert(rows, { onConflict: "id" });
}

export async function deleteProjectProduct(id: string): Promise<void> {
  await admin().from("project_products").delete().eq("id", id);
}

// ── Orders ────────────────────────────────────────────────────

export async function getProjectOrders(projectId: string): Promise<ProjectOrder[]> {
  const { data } = await admin()
    .from("project_orders")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  return (data ?? []) as ProjectOrder[];
}

export async function createOrder(order: Omit<ProjectOrder, "id" | "created_at" | "updated_at">): Promise<ProjectOrder | null> {
  const orderNumber = `#${order.project_id.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const { data } = await admin()
    .from("project_orders")
    .insert({ ...order, order_number: orderNumber })
    .select()
    .single();
  return data as ProjectOrder | null;
}

export async function updateOrderStatus(
  id: string,
  status: ProjectOrder["status"]
): Promise<void> {
  await admin().from("project_orders").update({ status }).eq("id", id);
}

// ── Bookings ──────────────────────────────────────────────────

export async function getProjectBookings(projectId: string): Promise<ProjectBooking[]> {
  const { data } = await admin()
    .from("project_bookings")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });
  return (data ?? []) as ProjectBooking[];
}

export async function createBooking(
  booking: Omit<ProjectBooking, "id" | "created_at">
): Promise<ProjectBooking | null> {
  const { data } = await admin()
    .from("project_bookings")
    .insert(booking)
    .select()
    .single();
  return data as ProjectBooking | null;
}

export async function updateBookingStatus(
  id: string,
  status: ProjectBooking["status"]
): Promise<void> {
  await admin().from("project_bookings").update({ status }).eq("id", id);
}

// ── Stats ─────────────────────────────────────────────────────

export async function getProjectStats(projectId: string, templateId: string) {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString();

  if (templateId === "coaching") {
    const [allBookings, thisMonth, lastMonth, confirmed] = await Promise.all([
      admin().from("project_bookings").select("id", { count: "exact" }).eq("project_id", projectId),
      admin().from("project_bookings").select("id", { count: "exact" }).eq("project_id", projectId).gte("created_at", thisMonthStart),
      admin().from("project_bookings").select("id", { count: "exact" }).eq("project_id", projectId).gte("created_at", lastMonthStart).lte("created_at", lastMonthEnd),
      admin().from("project_bookings").select("id", { count: "exact" }).eq("project_id", projectId).eq("status", "confirmed"),
    ]);
    return {
      type: "coaching" as const,
      totalBookings: allBookings.count ?? 0,
      thisMonthBookings: thisMonth.count ?? 0,
      lastMonthBookings: lastMonth.count ?? 0,
      confirmedBookings: confirmed.count ?? 0,
    };
  }

  const [orders, thisMonthOrders, lastMonthOrders, products] = await Promise.all([
    admin().from("project_orders").select("total, status").eq("project_id", projectId),
    admin().from("project_orders").select("total").eq("project_id", projectId).gte("created_at", thisMonthStart).neq("status", "cancelled"),
    admin().from("project_orders").select("total").eq("project_id", projectId).gte("created_at", lastMonthStart).lte("created_at", lastMonthEnd).neq("status", "cancelled"),
    admin().from("project_products").select("id", { count: "exact" }).eq("project_id", projectId),
  ]);

  const allOrders = orders.data ?? [];
  const revenue = allOrders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + (o.total ?? 0), 0);
  const thisMonthRevenue = (thisMonthOrders.data ?? []).reduce((sum, o) => sum + (o.total ?? 0), 0);
  const lastMonthRevenue = (lastMonthOrders.data ?? []).reduce((sum, o) => sum + (o.total ?? 0), 0);
  const pendingOrders = allOrders.filter((o) => o.status === "pending").length;

  return {
    type: "shop" as const,
    totalOrders: allOrders.length,
    revenue,
    thisMonthRevenue,
    lastMonthRevenue,
    pendingOrders,
    totalProducts: products.count ?? 0,
  };
}

// ── Helpers ───────────────────────────────────────────────────

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
