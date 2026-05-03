import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getProfile } from "@/lib/supabase/profile";
import { createAdminClient } from "@/lib/supabase/server";
import { getTemplate, type TemplateConfig } from "@/lib/templates";
import { createProject, updateProjectContent, upsertProjectProducts } from "@/lib/supabase/projects";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProfile(userId);
  if (!profile) return Response.json({ error: "Profile not found" }, { status: 404 });

  const { templateId, projectName } = await req.json();
  const tpl = getTemplate(templateId);
  if (!tpl) return Response.json({ error: "Invalid template" }, { status: 400 });

  const supabase = await createAdminClient();
  const [bizRes, productsRes] = await Promise.all([
    supabase.from("business_info").select("*").eq("user_id", profile.id).single(),
    supabase.from("products").select("*").eq("user_id", profile.id).order("created_at"),
  ]);

  const bizInfo = bizRes.data;
  const products = productsRes.data ?? [];

  if (!bizInfo) return Response.json({ error: "Chưa có thông tin doanh nghiệp" }, { status: 400 });

  const project = await createProject(profile.id, projectName ?? `${bizInfo.brand_name} — Website`, templateId);
  if (!project) return Response.json({ error: "Không tạo được project" }, { status: 500 });

  // Fire generation in background — response returns immediately
  doGenerateWebsite(project.id, tpl, bizInfo, products).catch((err) => {
    console.error("[generate-website] background error:", err);
  });

  return Response.json({ projectId: project.id });
}

async function doGenerateWebsite(
  projectId: string,
  tpl: TemplateConfig,
  bizInfo: { brand_name: string; description: string | null; phone: string | null; website: string | null },
  products: Array<{ name: string; description: string | null; price: number | null }>
) {
  const prompt = tpl.buildPrompt(
    {
      brand_name: bizInfo.brand_name,
      description: bizInfo.description,
      phone: bizInfo.phone,
      website: bizInfo.website,
    },
    products.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
    }))
  );

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Bạn là AI chuyên tạo nội dung website cho doanh nghiệp Việt Nam. Luôn trả về JSON hợp lệ, không có markdown, không có ```json.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      stream: true,
    }),
  });

  if (!groqRes.ok) {
    const err = await groqRes.text();
    throw new Error(`Groq error: ${err}`);
  }

  const reader = groqRes.body!.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

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
        const token = parsed.choices?.[0]?.delta?.content ?? "";
        fullText += token;
      } catch { /* partial chunk */ }
    }
  }

  // Parse generated JSON
  let content: Record<string, unknown> = {};
  try {
    const cleaned = fullText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    content = JSON.parse(cleaned);
  } catch {
    const match = fullText.match(/\{[\s\S]*\}/);
    if (match) {
      try { content = JSON.parse(match[0]); } catch { /* use empty */ }
    }
  }

  await updateProjectContent(projectId, content);

  const aiProducts = extractAiProducts(content, tpl.id, bizInfo.brand_name, products);
  if (aiProducts.length > 0) {
    await upsertProjectProducts(projectId, aiProducts);
  }
}

function extractAiProducts(
  _content: Record<string, unknown>,
  templateId: string,
  _brandName: string,
  userProducts: Array<{ name: string; description: string | null; price: number | null }>
) {
  if (templateId === "coaching") {
    return userProducts.map((p, i) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      category: "program",
      sort_order: i,
    }));
  }

  return userProducts.map((p, i) => ({
    name: p.name,
    description: p.description,
    price: p.price,
    category: "general",
    sort_order: i,
    badge: i === 0 ? "HOT" : i === 1 ? "NEW" : undefined,
  }));
}
