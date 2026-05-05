"use client";

import { useState } from "react";
import type { ProjectBooking } from "@/lib/supabase/projects";

interface Props {
  projectId: string;
  initialBookings: ProjectBooking[];
  sectionLabel: string;
}

const STATUS_OPTIONS: { value: ProjectBooking["status"]; label: string; color: string }[] = [
  { value: "pending", label: "Chờ xác nhận", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "confirmed", label: "Đã xác nhận", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "done", label: "Hoàn tất", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "cancelled", label: "Đã huỷ", color: "bg-slate-100 text-slate-500 border-slate-200" },
];

export default function BookingsSection({ projectId, initialBookings, sectionLabel }: Props) {
  const [bookings, setBookings] = useState<ProjectBooking[]>(initialBookings);
  const [filter, setFilter] = useState<"all" | ProjectBooking["status"]>("all");

  const visible = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  async function updateStatus(id: string, status: ProjectBooking["status"]) {
    const prev = bookings;
    setBookings((curr) => curr.map((b) => (b.id === id ? { ...b, status } : b)));
    const res = await fetch(`/api/projects/${projectId}/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setBookings(prev);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          Tất cả ({bookings.length})
        </FilterPill>
        {STATUS_OPTIONS.map((opt) => {
          const count = bookings.filter((b) => b.status === opt.value).length;
          return (
            <FilterPill
              key={opt.value}
              active={filter === opt.value}
              onClick={() => setFilter(opt.value)}
            >
              {opt.label} ({count})
            </FilterPill>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-16 text-center">
          <p className="text-slate-400 text-sm">
            {bookings.length === 0
              ? `Chưa có ${sectionLabel.toLowerCase()} nào.`
              : `Không có ${sectionLabel.toLowerCase()} ở trạng thái này.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Khách</th>
                <th className="text-left px-4 py-3 font-semibold">Liên hệ</th>
                <th className="text-left px-4 py-3 font-semibold">Chương trình</th>
                <th className="text-left px-4 py-3 font-semibold">Lịch mong muốn</th>
                <th className="text-left px-4 py-3 font-semibold">Ngày gửi</th>
                <th className="text-left px-4 py-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((b) => {
                const opt = STATUS_OPTIONS.find((s) => s.value === b.status);
                return (
                  <tr key={b.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900">{b.client_name ?? "—"}</p>
                      {b.message && (
                        <p className="text-xs text-slate-500 line-clamp-2 max-w-xs mt-1">{b.message}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <p className="text-slate-700">{b.client_phone ?? "—"}</p>
                      <p className="text-slate-400">{b.client_email ?? ""}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{b.program_name ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{b.preferred_time ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(b.created_at).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value as ProjectBooking["status"])}
                        className={`text-[10px] font-bold px-2 py-1 rounded-full border ${opt?.color ?? ""} cursor-pointer`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}
