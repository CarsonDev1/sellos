"use client";

import { useState } from "react";
import type { ProjectProduct } from "@/lib/supabase/projects";

interface Props {
  projectId: string;
  initialProducts: ProjectProduct[];
  sectionLabel: string;
}

type FormState = {
  id: string | null;
  name: string;
  description: string;
  price: string;
  original_price: string;
  image_url: string;
  category: string;
  badge: string;
  stock: string;
  available: boolean;
};

const EMPTY: FormState = {
  id: null,
  name: "",
  description: "",
  price: "",
  original_price: "",
  image_url: "",
  category: "",
  badge: "",
  stock: "0",
  available: true,
};

function fmt(n: number | null) {
  if (!n) return "—";
  return n.toLocaleString("vi-VN") + "đ";
}

export default function ProductsSection({ projectId, initialProducts, sectionLabel }: Props) {
  const [products, setProducts] = useState<ProjectProduct[]>(initialProducts);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startCreate() {
    setForm(EMPTY);
    setError(null);
    setOpen(true);
  }

  function startEdit(p: ProjectProduct) {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      price: p.price?.toString() ?? "",
      original_price: p.original_price?.toString() ?? "",
      image_url: p.image_url ?? "",
      category: p.category ?? "",
      badge: p.badge ?? "",
      stock: p.stock?.toString() ?? "0",
      available: p.available ?? true,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Tên sản phẩm bắt buộc");
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: form.price ? parseInt(form.price, 10) : null,
      original_price: form.original_price ? parseInt(form.original_price, 10) : null,
      image_url: form.image_url.trim() || null,
      category: form.category.trim() || null,
      badge: form.badge.trim() || null,
      stock: parseInt(form.stock, 10) || 0,
      available: form.available,
    };

    try {
      if (form.id) {
        const res = await fetch(`/api/projects/${projectId}/products/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Không cập nhật được");
        setProducts((prev) =>
          prev.map((p) =>
            p.id === form.id ? ({ ...p, ...payload } as ProjectProduct) : p
          )
        );
      } else {
        const res = await fetch(`/api/projects/${projectId}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Không tạo được");
        const data = await res.json();
        if (data.product) setProducts((prev) => [...prev, data.product]);
      }
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi không xác định");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Xoá sản phẩm này?")) return;
    const res = await fetch(`/api/projects/${projectId}/products/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {products.length === 0
            ? `Chưa có ${sectionLabel.toLowerCase()} nào.`
            : `${products.length} ${sectionLabel.toLowerCase()}`}
        </p>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Thêm mới
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-16 text-center">
          <p className="text-slate-400 text-sm">
            Bấm <strong>Thêm mới</strong> để tạo {sectionLabel.toLowerCase()} đầu tiên.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Tên</th>
                <th className="text-left px-4 py-3 font-semibold">Giá</th>
                <th className="text-left px-4 py-3 font-semibold">Danh mục</th>
                <th className="text-left px-4 py-3 font-semibold">Tồn kho</th>
                <th className="text-left px-4 py-3 font-semibold">Trạng thái</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-100" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        {p.badge && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{fmt(p.price)}</td>
                  <td className="px-4 py-3 text-slate-500">{p.category ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${
                        p.available
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {p.available ? "Đang bán" : "Tạm ẩn"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-xs mr-3"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-600 font-semibold text-xs"
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={() => !saving && setOpen(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-heading font-bold text-slate-900">
                {form.id ? "Sửa" : "Thêm"} {sectionLabel.toLowerCase()}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Field label="Tên *">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </Field>

              <Field label="Mô tả ngắn">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Giá bán (VNĐ)">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                </Field>
                <Field label="Giá gốc (VNĐ)">
                  <input
                    type="number"
                    value={form.original_price}
                    onChange={(e) => setForm({ ...form, original_price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                </Field>
              </div>

              <Field label="Ảnh (URL)">
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Danh mục">
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                </Field>
                <Field label="Nhãn (HOT, NEW...)">
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Tồn kho">
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                  />
                </Field>
                <Field label="Trạng thái">
                  <label className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.available}
                      onChange={(e) => setForm({ ...form, available: e.target.checked })}
                    />
                    <span>Đang bán</span>
                  </label>
                </Field>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={saving}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Huỷ
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {saving ? "Đang lưu..." : form.id ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</span>
      {children}
    </label>
  );
}
