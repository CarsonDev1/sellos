"use client";

import { useRef, useEffect, KeyboardEvent } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function ChatInput({ value, onChange, onSend, loading, disabled }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.min(ref.current.scrollHeight, 160) + "px";
    }
  }, [value]);

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && value.trim()) onSend();
    }
  }

  return (
    <div className="border-t border-slate-100 bg-white px-4 py-3">
      <div className={`flex items-end gap-3 bg-slate-50 border rounded-2xl px-4 py-2.5 transition-all ${
        disabled ? "opacity-50" : "border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white"
      }`}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled || loading}
          placeholder="Hỏi bất cứ điều gì về chiến lược bán hàng của bạn..."
          rows={1}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 resize-none focus:outline-none min-h-[24px] max-h-[160px] leading-relaxed"
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || loading || disabled}
          className="shrink-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl flex items-center justify-center transition-all mb-0.5"
        >
          {loading ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-slate-300 mt-2">Enter để gửi · Shift+Enter xuống dòng</p>
    </div>
  );
}
