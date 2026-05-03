import { NextRequest } from "next/server";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

function buildPrompt(type: string, data: Record<string, string>): string {
  if (type === "business") {
    return `Bạn là chuyên gia marketing người Việt. Viết mô tả giới thiệu doanh nghiệp ngắn gọn (3-4 câu, dưới 120 từ) bằng tiếng Việt, chuyên nghiệp và thu hút khách hàng.

Thông tin:
- Tên thương hiệu: ${data.brand_name}
- Loại hình: ${data.business_type}${data.extra ? `\n- Thêm: ${data.extra}` : ""}

Yêu cầu: Viết liền mạch (không gạch đầu dòng, không tiêu đề). Nêu bật giá trị cốt lõi, điểm khác biệt, và lợi ích cho khách hàng. Giọng văn tự tin, gần gũi.`;
  }

  return `Bạn là chuyên gia marketing người Việt. Viết mô tả sản phẩm/dịch vụ (3-4 câu, dưới 150 từ) bằng tiếng Việt, thuyết phục và chuyên nghiệp.

Thông tin:
- Tên sản phẩm: ${data.product_name}
- Loại hình doanh nghiệp: ${data.business_type}${data.target ? `\n- Khách hàng mục tiêu: ${data.target}` : ""}${data.extra ? `\n- Thêm: ${data.extra}` : ""}

Yêu cầu: Viết liền mạch. Nhấn mạnh lợi ích thực tế, tạo sự tin tưởng, có call-to-action nhẹ ở cuối. Không dùng gạch đầu dòng hay tiêu đề.`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, ...data } = body;

  const prompt = buildPrompt(type, data);

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
      stream: true,
      max_tokens: 300,
      temperature: 0.75,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.text();
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }

  return new Response(groqRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
