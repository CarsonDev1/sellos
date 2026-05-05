"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  projectId: string;
  initialName: string;
  initialSlug: string;
  initialPublished: boolean;
}

export default function SettingsSection({
  projectId,
  initialName,
  initialSlug,
  initialPublished,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const dirty =
    name !== initialName || slug !== initialSlug || published !== initialPublished;

  async function handleSave() {
    setStatus(null);
    setSaving(true);
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slug || null, published }),
    });
    setSaving(false);
    if (res.ok) {
      setStatus({ type: "ok", msg: "Đã lưu cài đặt." });
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus({
        type: "err",
        msg: data?.error ?? "Không lưu được — thử lại.",
      });
    }
  }

  async function handleDelete() {
    if (!confirm(`Xoá vĩnh viễn dự án "${initialName}"? Không khôi phục được.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/dashboard/du-an");
    } else {
      setDeleting(false);
      setStatus({ type: "err", msg: "Không xoá được — thử lại." });
    }
  }

  const siteUrl = `/w/${projectId}`;

  return (
    <div className="space-y-6 max-w-2xl">
      <Card title="Thông tin chung">
        <Field label="Tên dự án">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
          />
        </Field>
        <Field label="Slug (URL slug, tuỳ chọn)">
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="vd: shop-cua-may"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm font-mono"
          />
        </Field>
      </Card>

      <Card title="Hiển thị công khai">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="mt-1"
          />
          <div>
            <p className="font-semibold text-slate-900 text-sm">Công khai website</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Khi bật, mọi người có thể xem website tại{" "}
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-mono"
              >
                {siteUrl}
              </a>
            </p>
          </div>
        </label>
      </Card>

      {status && (
        <p
          className={`text-sm rounded-lg px-3 py-2 ${
            status.type === "ok"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {status.msg}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !dirty}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>

      <Card title="Vùng nguy hiểm" tone="danger">
        <p className="text-sm text-slate-600 mb-3">
          Xoá vĩnh viễn dự án và toàn bộ dữ liệu liên quan (sản phẩm, đơn hàng, đặt lịch). Hành động này không thể khôi phục.
        </p>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {deleting ? "Đang xoá..." : "Xoá dự án"}
        </button>
      </Card>
    </div>
  );
}

function Card({
  title,
  tone = "default",
  children,
}: {
  title: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 space-y-4 ${
        tone === "danger" ? "bg-red-50/40 border-red-200" : "bg-white border-slate-200"
      }`}
    >
      <h3
        className={`font-heading font-bold text-sm ${
          tone === "danger" ? "text-red-700" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
