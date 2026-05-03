"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ConversationSidebar from "@/components/ai-chat/ConversationSidebar";
import MessageBubble from "@/components/ai-chat/MessageBubble";
import ChatInput from "@/components/ai-chat/ChatInput";
import QuickPrompts from "@/components/ai-chat/QuickPrompts";
import type { Conversation, Message } from "@/lib/supabase/chat";

interface Props {
  initialConversations: Conversation[];
  brandName: string;
  businessType: string;
  userName: string;
}

interface LocalMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export default function AiChatClient({ initialConversations, brandName, businessType, userName }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = useCallback(async (convId: string) => {
    setLoadingHistory(true);
    setMessages([]);
    const res = await fetch(`/api/conversations/${convId}`);
    const { messages: msgs } = await res.json();
    setMessages(msgs ?? []);
    setLoadingHistory(false);
  }, []);

  function handleSelectConv(id: string) {
    if (id === activeId) return;
    setActiveId(id);
    loadMessages(id);
    setSidebarOpen(false);
  }

  function handleNewChat() {
    setActiveId(null);
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  }

  async function handleDeleteConv(id: string) {
    await fetch("/api/conversations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) handleNewChat();
  }

  async function handleSend(overrideInput?: string) {
    const text = (overrideInput ?? input).trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: LocalMessage = {
      id: `tmp-user-${Date.now()}`,
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    const aiMsg: LocalMessage = {
      id: `tmp-ai-${Date.now()}`,
      role: "assistant",
      content: "",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setStreamingId(aiMsg.id);
    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId: activeId }),
        signal: abortRef.current.signal,
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") break;

          try {
            const parsed = JSON.parse(raw);

            // First chunk contains conversationId
            if (firstChunk && parsed.conversationId) {
              const newConvId = parsed.conversationId;
              setActiveId(newConvId);
              firstChunk = false;
              // Refresh sidebar
              const convRes = await fetch("/api/conversations");
              const { conversations: convs } = await convRes.json();
              setConversations(convs ?? []);
              continue;
            }
            firstChunk = false;

            if (parsed.token) {
              fullContent += parsed.token;
              setMessages((prev) =>
                prev.map((m) => m.id === aiMsg.id ? { ...m, content: fullContent } : m)
              );
            }
          } catch { /* partial chunk */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsg.id
              ? { ...m, content: "Có lỗi xảy ra. Vui lòng thử lại." }
              : m
          )
        );
      }
    } finally {
      setLoading(false);
      setStreamingId(null);
    }
  }

  const isEmpty = messages.length === 0 && !loadingHistory;

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-0px)] -m-6 lg:-m-8 overflow-hidden rounded-none md:rounded-2xl">
      {/* Sidebar */}
      <ConversationSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelectConv}
        onNew={handleNewChat}
        onDelete={handleDeleteConv}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-white min-w-0">
        {/* Top bar */}
        <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">SellOS AI</p>
                <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Sẵn sàng tư vấn
                </p>
              </div>
            </div>
          </div>

          {brandName && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {brandName}
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
          {loadingHistory && (
            <div className="flex items-center justify-center py-8">
              <svg className="w-5 h-5 animate-spin text-slate-300" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          )}

          {isEmpty && (
            <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-100">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="font-heading font-bold text-xl text-slate-900 mb-1">
                Xin chào{userName ? `, ${userName}` : ""}! 👋
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-sm">
                Tôi là SellOS AI — trợ lý tư vấn bán hàng của bạn.
                {brandName ? ` Tôi đã được cá nhân hóa cho ${brandName}.` : " Hỏi tôi bất cứ điều gì về chiến lược bán hàng."}
              </p>
              <div className="w-full max-w-md">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-3">Gợi ý câu hỏi</p>
                <QuickPrompts businessType={businessType} onSelect={(p) => handleSend(p)} />
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg as Message}
              isStreaming={msg.id === streamingId}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          loading={loading}
        />
      </div>
    </div>
  );
}
