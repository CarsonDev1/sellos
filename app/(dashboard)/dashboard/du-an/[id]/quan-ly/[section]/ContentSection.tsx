"use client";

import { useState } from "react";

interface Props {
  projectId: string;
  initialContent: Record<string, unknown>;
}

export default function ContentSection({ projectId, initialContent }: Props) {
  const [text, setText] = useState(() => JSON.stringify(initialContent, null, 2));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  async function handleSave() {
    setStatus(null);
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(text);
    } catch {
      setStatus({ type: "err", msg: "JSON không hợp lệ — kiểm tra dấu phẩy / ngoặc nhé." });
      return;
    }
    setSaving(true);
    const res = await fetch(`/api/projects/${projectId}/content`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    setSaving(false);
    if (res.ok) {
      setStatus({ type: "ok", msg: "Đã lưu nội dung." });
    } else {
      setStatus({ type: "err", msg: "Không lưu được — thử lại." });
    }
  }

  function handleReset() {
    setText(JSON.stringify(initialContent, null, 2));
    setStatus(null);
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
        <p className="font-semibold mb-1">Nội dung do AI tạo</p>
        <p className="text-blue-800/80 text-xs leading-relaxed">
          Đây là JSON được render trên website công khai. Sửa text ở đây rồi bấm <strong>Lưu</strong> — thay đổi sẽ áp dụng ngay khi làm mới trang.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="w-full h-[60vh] font-mono text-xs px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 resize-none bg-slate-50"
      />

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
          onClick={handleReset}
          disabled={saving}
          className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Khôi phục bản cũ
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {saving ? "Đang lưu..." : "Lưu nội dung"}
        </button>
      </div>
    </div>
  );
}
