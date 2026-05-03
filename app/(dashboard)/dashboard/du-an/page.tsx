import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/lib/supabase/profile";
import { getProjects } from "@/lib/supabase/projects";
import { TEMPLATES } from "@/lib/templates";
import Link from "next/link";

export const metadata = { title: "Dự án của tôi — SellOS" };

export default async function DuAnPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const profile = await getProfile(userId);
  if (!profile) redirect("/dashboard");

  const projects = await getProjects(profile.id);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">Dự án của tôi</h1>
          <p className="text-slate-400 text-sm mt-1">{projects.length} website đã tạo</p>
        </div>
        <Link href="/dashboard/chon-template"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tạo website mới
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-700 mb-2">Chưa có website nào</h3>
          <p className="text-slate-400 text-sm mb-6">Tạo website đầu tiên của bạn với AI trong vài phút</p>
          <Link href="/dashboard/chon-template" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Tạo ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const tpl = TEMPLATES.find((t) => t.id === project.template_id);
            const isReady = project.status === "active" && project.generated_content;
            return (
              <Link key={project.id} href={`/dashboard/du-an/${project.id}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md overflow-hidden transition-all">
                {/* Preview banner */}
                <div className={`h-24 bg-gradient-to-br ${tpl?.color ?? "from-slate-400 to-slate-600"} flex items-center justify-center relative`}>
                  <span className="font-heading font-bold text-white/80 text-lg">{project.name}</span>
                  {project.published && (
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                      Đang hiển thị
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">{project.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{tpl?.name ?? project.template_id}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      isReady ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-600"
                    }`}>
                      {isReady ? "Hoàn tất" : "Đang tạo"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(project.created_at).toLocaleDateString("vi-VN")}</span>
                    {isReady && (
                      <span className="text-blue-500 group-hover:text-blue-600 font-medium">
                        Quản lý →
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
