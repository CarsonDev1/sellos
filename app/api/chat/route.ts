import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/lib/supabase/profile";
import { createAdminClient } from "@/lib/supabase/server";
import { getMessages, saveMessage, updateConversationTitle, createConversation } from "@/lib/supabase/chat";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const QUICK_PROMPTS_BY_TYPE: Record<string, string> = {
  "khoa-hoc": "Bạn bán khóa học. Hãy tư vấn về content marketing, email sequence, TikTok/YouTube, và chiến lược giá.",
  "shop-online": "Bạn bán hàng online. Hãy tư vấn về quảng cáo Facebook/TikTok, mô tả sản phẩm, flash sale, và chăm sóc khách hàng.",
  "coaching": "Bạn làm coaching/tư vấn. Hãy tư vấn về personal branding, landing page, script DM, và case study.",
  "dich-vu": "Bạn cung cấp dịch vụ. Hãy tư vấn về proposal, pricing packages, cold outreach, và referral.",
};

function buildSystemPrompt(profile: {
  business_type: string;
  brand_name: string;
  description: string | null;
  product_name: string | null;
  price: number | null;
  target_audience: string | null;
  usp: string | null;
}): string {
  const typeHint = QUICK_PROMPTS_BY_TYPE[profile.business_type] ?? "";

  return `Bạn là SellOS AI — chuyên gia tư vấn bán hàng và marketing của nền tảng SellOS.

THÔNG TIN DOANH NGHIỆP NGƯỜI DÙNG:
- Tên thương hiệu: ${profile.brand_name}
- Loại hình: ${profile.business_type}
- Mô tả: ${profile.description ?? "Chưa có"}
- Sản phẩm chính: ${profile.product_name ?? "Chưa có"}${profile.price ? ` — ${profile.price.toLocaleString("vi-VN")}đ` : ""}
- Khách hàng mục tiêu: ${profile.target_audience ?? "Chưa có"}
- Điểm nổi bật: ${profile.usp ?? "Chưa có"}

${typeHint}

NGUYÊN TẮC TRẢ LỜI:
- Luôn dùng tiếng Việt, thực tế, có thể áp dụng ngay
- Khi viết content/script: cung cấp bản nháp hoàn chỉnh, không chỉ gợi ý chung
- Dùng markdown để trình bày rõ ràng (tiêu đề, danh sách, code block khi cần)
- Cá nhân hóa theo thông tin doanh nghiệp bên trên
- Nếu chưa có đủ thông tin, hỏi lại ngắn gọn trước khi trả lời`.trim();
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { message, conversationId: reqConvId } = await req.json();
  if (!message?.trim()) return new Response("Empty message", { status: 400 });

  const profile = await getProfile(userId);
  if (!profile) return new Response("Profile not found", { status: 404 });

  // Load business context
  const supabase = await createAdminClient();
  const [{ data: bizInfo }, { data: product }] = await Promise.all([
    supabase.from("business_info").select("*").eq("user_id", profile.id).maybeSingle(),
    supabase.from("products").select("*").eq("user_id", profile.id).order("created_at").limit(1).maybeSingle(),
  ]);

  const systemPrompt = buildSystemPrompt({
    business_type: bizInfo?.business_type ?? profile.email,
    brand_name: bizInfo?.brand_name ?? "Doanh nghiệp của bạn",
    description: bizInfo?.description ?? null,
    product_name: product?.name ?? null,
    price: product?.price ?? null,
    target_audience: product?.target_audience ?? null,
    usp: product?.usp ?? null,
  });

  // Create or use existing conversation
  let conversationId = reqConvId;
  if (!conversationId) {
    const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");
    const conv = await createConversation(profile.id, title);
    conversationId = conv?.id;
  }

  // Load history (last 20 messages)
  const history = conversationId ? await getMessages(conversationId) : [];

  // Save user message
  if (conversationId) {
    await saveMessage(conversationId, "user", message);
    // Auto-update title from first user message
    if (history.length === 0) {
      await updateConversationTitle(conversationId, message.slice(0, 60));
    }
  }

  const groqMessages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-20).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: message },
  ];

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: groqMessages,
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.text();
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }

  // Stream response + collect full text to save afterward
  const encoder = new TextEncoder();
  let fullResponse = "";

  const stream = new ReadableStream({
    async start(controller) {
      // First chunk: send conversationId so client knows which conv was created
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ conversationId })}\n\n`));

      const reader = groqRes.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (raw === "[DONE]") {
            // Save full assistant response
            if (conversationId && fullResponse) {
              await saveMessage(conversationId, "assistant", fullResponse);
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }
          try {
            const token = JSON.parse(raw)?.choices?.[0]?.delta?.content ?? "";
            if (token) {
              fullResponse += token;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
            }
          } catch { /* incomplete chunk */ }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
