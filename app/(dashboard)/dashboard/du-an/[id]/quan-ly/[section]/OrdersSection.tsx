"use client";

import { Fragment, useState } from "react";
import type { ProjectOrder } from "@/lib/supabase/projects";

interface Props {
  projectId: string;
  initialOrders: ProjectOrder[];
  sectionLabel: string;
}

const STATUS_OPTIONS: { value: ProjectOrder["status"]; label: string; color: string }[] = [
  { value: "pending", label: "Chờ xử lý", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "confirmed", label: "Đã xác nhận", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "shipping", label: "Đang giao", color: "bg-violet-50 text-violet-700 border-violet-200" },
  { value: "done", label: "Hoàn tất", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "cancelled", label: "Đã huỷ", color: "bg-slate-100 text-slate-500 border-slate-200" },
];

function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "đ";
}

export default function OrdersSection({ projectId, initialOrders, sectionLabel }: Props) {
  const [orders, setOrders] = useState<ProjectOrder[]>(initialOrders);
  const [filter, setFilter] = useState<"all" | ProjectOrder["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  async function updateStatus(id: string, status: ProjectOrder["status"]) {
    const prev = orders;
    setOrders((curr) => curr.map((o) => (o.id === id ? { ...o, status } : o)));
    const res = await fetch(`/api/projects/${projectId}/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setOrders(prev);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
          Tất cả ({orders.length})
        </FilterPill>
        {STATUS_OPTIONS.map((opt) => {
          const count = orders.filter((o) => o.status === opt.value).length;
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
            {orders.length === 0
              ? `Chưa có ${sectionLabel.toLowerCase()} nào.`
              : `Không có ${sectionLabel.toLowerCase()} ở trạng thái này.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Mã</th>
                <th className="text-left px-4 py-3 font-semibold">Khách</th>
                <th className="text-left px-4 py-3 font-semibold">Tổng</th>
                <th className="text-left px-4 py-3 font-semibold">Ngày</th>
                <th className="text-left px-4 py-3 font-semibold">Trạng thái</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => {
                const opt = STATUS_OPTIONS.find((s) => s.value === o.status);
                const isOpen = expanded === o.id;
                return (
                  <Fragment key={o.id}>
                    <tr
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer"
                      onClick={() => setExpanded(isOpen ? null : o.id)}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{o.order_number ?? o.id.slice(0, 8)}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{o.customer_name ?? "—"}</p>
                        <p className="text-xs text-slate-500">{o.customer_phone ?? ""}</p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900">{fmt(o.total)}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {new Date(o.created_at).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={o.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateStatus(o.id, e.target.value as ProjectOrder["status"])}
                          className={`text-[10px] font-bold px-2 py-1 rounded-full border ${opt?.color ?? ""} cursor-pointer`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300">
                        <svg
                          className={`w-4 h-4 inline-block transition-transform ${isOpen ? "rotate-90" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-slate-50">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                              <p className="text-slate-400 mb-1">Địa chỉ</p>
                              <p className="text-slate-700">{o.customer_address ?? "—"}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 mb-1">Ghi chú</p>
                              <p className="text-slate-700">{o.customer_note ?? "—"}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-slate-400 mb-2">Sản phẩm</p>
                              <ul className="space-y-1">
                                {o.items?.map((it, i) => (
                                  <li key={i} className="flex justify-between border-b border-slate-200 py-1">
                                    <span>
                                      {it.name} × {it.qty}
                                    </span>
                                    <span className="font-semibold">{fmt(it.price * it.qty)}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex justify-between mt-2 pt-2 border-t border-slate-300 font-semibold">
                                <span>Tổng cộng</span>
                                <span>{fmt(o.total)}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
