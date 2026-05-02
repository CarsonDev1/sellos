import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/supabase/profile";
import { createAdminClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin — SellOS" };

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  if (!(await isAdmin(userId))) redirect("/dashboard");

  const supabase = await createAdminClient();

  const [{ data: profiles }, { data: businessInfos }, { data: projects }] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("business_info").select("*"),
    supabase.from("projects").select("*"),
  ]);

  const users = profiles ?? [];
  const totalOnboarded = users.filter((u) => u.onboarding_done).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-bold text-2xl text-slate-900">Quản trị Admin</h1>
        <p className="text-slate-500 mt-1">Quản lý người dùng và dự án trên SellOS.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Tổng người dùng", value: users.length, icon: "👥", color: "bg-blue-50 text-blue-600" },
          { label: "Đã onboarding", value: totalOnboarded, icon: "✅", color: "bg-emerald-50 text-emerald-600" },
          { label: "Thông tin doanh nghiệp", value: (businessInfos ?? []).length, icon: "🏢", color: "bg-violet-50 text-violet-600" },
          { label: "Dự án", value: (projects ?? []).length, icon: "🗂️", color: "bg-orange-50 text-orange-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-xl mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Danh sách người dùng</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Người dùng</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Onboarding</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">Chưa có người dùng nào.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                            {(user.full_name ?? user.email)[0].toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium text-slate-900">{user.full_name ?? "—"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.onboarding_done
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {user.onboarding_done ? "Hoàn thành" : "Chưa xong"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.created_at).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
