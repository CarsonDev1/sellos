"use client";

import type { Conversation } from "@/lib/supabase/chat";

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function ConversationSidebar({ conversations, activeId, onSelect, onNew, onDelete, open, onClose }: Props) {
  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86400000) return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    if (diff < 604800000) return d.toLocaleDateString("vi-VN", { weekday: "short" });
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  }

  const content = (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Chat mới
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2">
        {conversations.length === 0 ? (
          <p className="text-center text-xs text-slate-400 mt-8 px-4">Chưa có cuộc trò chuyện nào</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`group flex items-center gap-2 mx-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                activeId === conv.id
                  ? "bg-white shadow-sm border border-slate-200 text-slate-900"
                  : "hover:bg-white/70 text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => onSelect(conv.id)}
            >
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeId === conv.id ? "bg-blue-500" : "bg-transparent group-hover:bg-slate-300"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate leading-snug">{conv.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{formatDate(conv.updated_at)}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-slate-400 shrink-0"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex w-64 shrink-0 flex-col">{content}</div>

      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="relative w-72 h-full">{content}</div>
        </div>
      )}
    </>
  );
}
