"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[du-an/[id]]", error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto py-20 text-center">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
      <h2 className="text-lg font-heading font-bold text-slate-900 mb-2">Không tải được dự án</h2>
      <p className="text-slate-500 text-sm mb-6">
        Có lỗi xảy ra khi tải thông tin dự án. Thử lại hoặc quay về danh sách.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Thử lại
        </button>
        <Link
          href="/dashboard/du-an"
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
        >
          ← Quay về danh sách
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs text-slate-300 mt-6">Mã lỗi: {error.digest}</p>
      )}
    </div>
  );
}
