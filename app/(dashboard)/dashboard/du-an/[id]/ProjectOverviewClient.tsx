"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/supabase/projects";
import type { AdminSection } from "@/lib/templates";

interface Stats {
  type: "shop" | "coaching";
  totalOrders?: number;
  revenue?: number;
  thisMonthRevenue?: number;
  lastMonthRevenue?: number;
  pendingOrders?: number;
  totalProducts?: number;
  totalBookings?: number;
  thisMonthBookings?: number;
  lastMonthBookings?: number;
  confirmedBookings?: number;
}

// Serializable subset of TemplateConfig (without functions like buildPrompt)
interface TemplateClientInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  textColor: string;
  previewUrl: string;
  adminSections: AdminSection[];
}

interface Props {
  project: Project;
  tpl: TemplateClientInfo | null;
  stats: Stats | null;
}

export default function ProjectOverviewClient({ project, tpl, stats }: Props) {
  const [published, setPublished] = useState(project.published);
  const [toggling, setToggling] = useState(false);
  const siteUrl = `/w/${project.id}`;

  async function togglePublish() {
    setToggling(true);
    await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setPublished(!published);
    setToggling(false);
  }

  function fmt(n: number) { return n.toLocaleString("vi-VN") + "đ"; }

  const isShop = stats?.type === "shop";
  const isCoaching = stats?.type === "coaching";

  const revenueGrowth = isShop && stats.lastMonthRevenue
    ? Math.round(((stats.thisMonthRevenue! - stats.lastMonthRevenue) / stats.lastMonthRevenue) * 100)
    : null;
  const bookingGrowth = isCoaching && stats.lastMonthBookings
    ? Math.round(((stats.thisMonthBookings! - stats.lastMonthBookings) / stats.lastMonthBookings) * 100)
    : null;

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/du-an" className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-heading font-bold text-slate-900">{project.name}</h1>
            <p className="text-slate-400 text-sm">{tpl?.name ?? project.template_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {published && (
            <a href={siteUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Xem website
            </a>
          )}
          <button onClick={togglePublish} disabled={toggling}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              published ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}>
            <span className={`w-2 h-2 rounded-full ${published ? "bg-emerald-500" : "bg-slate-400"}`} />
            {toggling ? "..." : published ? "Đang công khai" : "Công khai website"}
          </button>
          <Link href={`/dashboard/du-an/${project.id}/quan-ly`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
            Quản lý →
          </Link>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {isShop && <>
            <StatCard label="Tổng đơn hàng" value={String(stats.totalOrders ?? 0)} sub="đơn" color="blue" />
            <StatCard label="Doanh thu" value={fmt(stats.revenue ?? 0)} sub={revenueGrowth !== null ? `${revenueGrowth >= 0 ? "+" : ""}${revenueGrowth}% tháng này` : "tổng"} color="emerald" positive={revenueGrowth !== null ? revenueGrowth >= 0 : undefined} />
            <StatCard label="Chờ xử lý" value={String(stats.pendingOrders ?? 0)} sub="đơn chờ" color="amber" />
            <StatCard label="Sản phẩm" value={String(stats.totalProducts ?? 0)} sub="sản phẩm" color="violet" />
          </>}
          {isCoaching && <>
            <StatCard label="Tổng đặt lịch" value={String(stats.totalBookings ?? 0)} sub="lượt" color="violet" />
            <StatCard label="Tháng này" value={String(stats.thisMonthBookings ?? 0)} sub={bookingGrowth !== null ? `${bookingGrowth >= 0 ? "+" : ""}${bookingGrowth}% so với tháng trước` : "lượt"} color="blue" positive={bookingGrowth !== null ? bookingGrowth >= 0 : undefined} />
            <StatCard label="Đã xác nhận" value={String(stats.confirmedBookings ?? 0)} sub="lịch" color="emerald" />
            <StatCard label="Tỷ lệ xác nhận" value={stats.totalBookings ? `${Math.round((stats.confirmedBookings! / stats.totalBookings) * 100)}%` : "—"} sub="conversion" color="rose" />
          </>}
        </div>
      )}

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tpl?.adminSections.filter(s => s.key !== "overview").map((section) => (
          <Link key={section.key} href={`/dashboard/du-an/${project.id}/quan-ly/${section.key}`}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
              <SectionIcon icon={section.icon} />
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-sm">{section.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">Quản lý {section.label.toLowerCase()}</p>
            </div>
            <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-400 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      {/* URL share */}
      {published && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-emerald-900">Website đang công khai</p>
            <p className="text-xs text-emerald-600 mt-0.5 truncate">{typeof window !== "undefined" ? window.location.origin : ""}{siteUrl}</p>
          </div>
          <button onClick={() => navigator.clipboard.writeText(`${window.location.origin}${siteUrl}`)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap">
            Copy link
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, color, positive }: { label: string; value: string; sub: string; color: string; positive?: boolean }) {
  const colors: Record<string, string> = { blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", violet: "bg-violet-50 text-violet-600", rose: "bg-rose-50 text-rose-600" };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">{label}</p>
      <p className={`text-2xl font-heading font-bold ${colors[color]?.split(" ")[1] ?? "text-slate-900"}`}>{value}</p>
      <p className={`text-xs mt-1 ${positive === true ? "text-emerald-600" : positive === false ? "text-red-500" : "text-slate-400"}`}>{sub}</p>
    </div>
  );
}

function SectionIcon({ icon }: { icon: string }) {
  const paths: Record<string, string> = {
    chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    box: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
    shopping: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    settings: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    tag: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
    book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  };
  return (
    <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={paths[icon] ?? paths.chart} />
    </svg>
  );
}
