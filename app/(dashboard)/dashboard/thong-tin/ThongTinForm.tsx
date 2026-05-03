"use client";

import { useState, useRef } from "react";
import { saveBusinessInfo, saveProducts } from "./actions";
import type { Database } from "@/lib/supabase/types";

type BusinessInfo = Database["public"]["Tables"]["business_info"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

const BUSINESS_TYPES = [
  {
    value: "khoa-hoc",
    label: "Khóa học",
    sublabel: "Online & Offline",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "shop-online",
    label: "Shop Online",
    sublabel: "Thương mại điện tử",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "dich-vu",
    label: "Dịch vụ",
    sublabel: "Agency & Freelance",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
  },
  {
    value: "coaching",
    label: "Coaching",
    sublabel: "Tư vấn & Mentor",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80",
  },
];

const SALES_CHANNELS = [
  "Facebook", "TikTok", "Zalo", "Website", "Shopee", "Instagram", "YouTube", "Lazada",
];

interface Props {
  profileId: string;
  initialBusiness: BusinessInfo | null;
  initialProducts: Product[];
}

const FIELD = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";

async function streamGenerate(
  payload: Record<string, string>,
  onChunk: (t: string) => void,
  onDone: () => void,
  onError: (e: string) => void
) {
  const res = await fetch("/api/generate-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok || !res.body) { onError("Không kết nối được Groq API"); return; }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const lines = decoder.decode(value).split("\n");
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const raw = line.slice(6).trim();
      if (raw === "[DONE]") { onDone(); return; }
      try {
        const token = JSON.parse(raw)?.choices?.[0]?.delta?.content ?? "";
        if (token) onChunk(token);
      } catch { /* incomplete chunk */ }
    }
  }
  onDone();
}

export default function ThongTinForm({ initialBusiness, initialProducts }: Props) {
  const [step, setStep] = useState<"business" | "product">("business");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customType, setCustomType] = useState("");
  const [genBiz, setGenBiz] = useState(false);
  const [genProd, setGenProd] = useState<number | null>(null);

  const bizDescRef = useRef<HTMLTextAreaElement>(null);

  const [business, setBusiness] = useState({
    brand_name: initialBusiness?.brand_name ?? "",
    business_type: initialBusiness?.business_type ?? "",
    description: initialBusiness?.description ?? "",
    phone: initialBusiness?.phone ?? "",
    website: initialBusiness?.website ?? "",
  });

  const [products, setProducts] = useState<Partial<Product>[]>(
    initialProducts.length > 0
      ? initialProducts
      : [{ name: "", description: "", price: undefined, usp: "", target_audience: "", sales_channels: [] }]
  );

  const selectedPreset = BUSINESS_TYPES.find((t) => t.value === business.business_type);
  const bizTypeLabel = selectedPreset?.label ?? business.business_type;

  // ── AI Generate: business description ──────────────────────────────────
  async function generateBizDescription() {
    if (!business.brand_name && !business.business_type) return;
    setGenBiz(true);
    setBusiness((b) => ({ ...b, description: "" }));
    await streamGenerate(
      { type: "business", brand_name: business.brand_name, business_type: bizTypeLabel },
      (token) => setBusiness((b) => ({ ...b, description: b.description + token })),
      () => setGenBiz(false),
      (e) => { setGenBiz(false); setError(e); }
    );
  }

  // ── AI Generate: product description ───────────────────────────────────
  async function generateProdDescription(index: number) {
    const p = products[index];
    if (!p.name) return;
    setGenProd(index);
    updateProduct(index, "description", "");
    await streamGenerate(
      {
        type: "product",
        product_name: p.name ?? "",
        business_type: bizTypeLabel || business.business_type,
        target: p.target_audience ?? "",
      },
      (token) => setProducts((prev) =>
        prev.map((pr, i) => i === index ? { ...pr, description: (pr.description ?? "") + token } : pr)
      ),
      () => setGenProd(null),
      (e) => { setGenProd(null); setError(e); }
    );
  }

  // ── Save ────────────────────────────────────────────────────────────────
  async function handleSaveBusiness() {
    if (!business.brand_name || !business.business_type) return;
    setSaving(true); setError(null);
    const res = await saveBusinessInfo(business);
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setStep("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSaveProducts() {
    setSaving(true); setError(null);
    const res = await saveProducts(
      products.map((p) => ({
        id: p.id, name: p.name ?? "", description: p.description ?? "",
        price: p.price ?? null, usp: p.usp ?? "",
        target_audience: p.target_audience ?? "", sales_channels: p.sales_channels ?? [],
      }))
    );
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setSaved(true);
  }

  function updateProduct(index: number, field: string, value: unknown) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function toggleChannel(index: number, ch: string) {
    const cur = products[index].sales_channels ?? [];
    updateProduct(index, "sales_channels", cur.includes(ch) ? cur.filter((c) => c !== ch) : [...cur, ch]);
  }

  // ── Success ─────────────────────────────────────────────────────────────
  if (saved) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-3xl text-slate-900 mb-3">Hoàn tất!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Thông tin đã được lưu. AI đã sẵn sàng tư vấn chiến lược bán hàng cá nhân hóa cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/dashboard/ai-chat" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-100">
              Chat với AI ngay →
            </a>
            <a href="/dashboard" className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl transition-colors">
              Về Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <a href="/dashboard" className="hover:text-slate-600 transition-colors">Dashboard</a>
          <span>/</span>
          <span className="text-slate-700 font-medium">Thông tin & Sản phẩm</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
              {step === "business" ? "Thông tin doanh nghiệp" : "Thông tin sản phẩm"}
            </h1>
            <p className="text-slate-400 mt-1 text-sm">
              {step === "business" ? "Giúp AI hiểu rõ mô hình kinh doanh của bạn" : "Mô tả sản phẩm / dịch vụ bạn đang bán"}
            </p>
          </div>
          {/* Steps */}
          <div className="flex items-center gap-2 shrink-0">
            <StepPill n={1} label="Doanh nghiệp" active={step === "business"} done={step === "product"} />
            <div className={`w-8 h-0.5 rounded-full transition-colors ${step === "product" ? "bg-blue-400" : "bg-slate-200"}`} />
            <StepPill n={2} label="Sản phẩm" active={step === "product"} done={false} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm flex items-center gap-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* ── STEP 1 ── */}
      {step === "business" && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* LEFT */}
          <div className="space-y-5">

            {/* Business type */}
            <Section title="Loại hình kinh doanh" subtitle="Chọn hoặc nhập loại hình của bạn" required>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                {BUSINESS_TYPES.map((t) => {
                  const sel = business.business_type === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => { setBusiness({ ...business, business_type: t.value }); setCustomType(""); }}
                      className={`relative overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-200 ${
                        sel ? "ring-2 ring-blue-500 ring-offset-2 shadow-xl" : "hover:scale-[1.02] hover:shadow-lg opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img src={t.image} alt={t.label} className="absolute inset-0 w-full h-full object-cover" />
                      <div className={`absolute inset-0 transition-all ${sel ? "bg-blue-900/65" : "bg-slate-900/50"}`} />
                      {sel && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-2.5">
                        <p className="text-white font-bold text-xs leading-tight">{t.label}</p>
                        <p className="text-white/60 text-[10px]">{t.sublabel}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <input
                  type="text"
                  value={customType}
                  onChange={(e) => { setCustomType(e.target.value); setBusiness({ ...business, business_type: e.target.value }); }}
                  placeholder="Nhập loại hình khác: Nhà hàng, Spa, Bất động sản..."
                  className={`${FIELD} pl-10 ${customType && !BUSINESS_TYPES.find(t => t.value === business.business_type) ? "border-blue-400 ring-2 ring-blue-100" : ""}`}
                />
              </div>
            </Section>

            {/* Brand info */}
            <Section title="Thông tin thương hiệu" subtitle="Tên và cách liên hệ với doanh nghiệp của bạn">
              <div className="space-y-4">
                <Field label="Tên thương hiệu" required>
                  <input
                    type="text"
                    value={business.brand_name}
                    onChange={(e) => setBusiness({ ...business, brand_name: e.target.value })}
                    placeholder="VD: NOVA Store, Khóa học Toán Thầy An..."
                    className={FIELD}
                  />
                </Field>

                {/* Description with AI generate */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-slate-700">Mô tả doanh nghiệp</label>
                    <button
                      onClick={generateBizDescription}
                      disabled={genBiz || (!business.brand_name && !business.business_type)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 disabled:opacity-40 disabled:cursor-not-allowed text-violet-700 text-xs font-semibold transition-all border border-violet-200"
                    >
                      {genBiz ? (
                        <><Spinner /> Đang tạo...</>
                      ) : (
                        <><Sparkle /> Tạo bằng AI</>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      ref={bizDescRef}
                      value={business.description}
                      onChange={(e) => setBusiness({ ...business, description: e.target.value })}
                      placeholder="Mô tả ngắn về doanh nghiệp của bạn... hoặc nhấn 'Tạo bằng AI' để AI viết tự động"
                      rows={4}
                      className={`${FIELD} resize-none ${genBiz ? "bg-violet-50/50 border-violet-200" : ""}`}
                    />
                    {genBiz && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-violet-100 text-violet-600 text-xs font-medium px-2.5 py-1 rounded-lg">
                        <Spinner /> AI đang viết...
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">
                    {business.description.length > 0 ? `${business.description.length} ký tự` : "Nhập tên thương hiệu + loại hình trước, rồi nhấn Tạo bằng AI"}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Số điện thoại">
                    <input
                      type="tel"
                      value={business.phone}
                      onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                      placeholder="0901 234 567"
                      className={FIELD}
                    />
                  </Field>
                  <Field label="Website">
                    <input
                      type="text"
                      value={business.website}
                      onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                      placeholder="https://yoursite.com"
                      className={FIELD}
                    />
                  </Field>
                </div>
              </div>
            </Section>

            <button
              onClick={handleSaveBusiness}
              disabled={!business.brand_name || !business.business_type || saving}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-blue-100 hover:shadow-lg flex items-center justify-center gap-2"
            >
              {saving ? <><Spinner />Đang lưu...</> : <>Tiếp theo: Thông tin sản phẩm <ArrowRight /></>}
            </button>
          </div>

          {/* RIGHT: preview */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Xem trước</p>
              <div className="space-y-3">
                {[
                  ["Loại hình", bizTypeLabel || "—"],
                  ["Thương hiệu", business.brand_name || "—"],
                  ["Mô tả", business.description ? business.description.slice(0, 80) + (business.description.length > 80 ? "…" : "") : "—"],
                  ["SĐT", business.phone || "—"],
                  ["Website", business.website || "—"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-3">
                    <span className="text-[11px] font-medium text-slate-400 w-20 shrink-0 pt-0.5">{label}</span>
                    <span className="text-[11px] text-slate-700 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-5">
              <p className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2"><span>💡</span> Mẹo điền form</p>
              <ul className="space-y-2 text-xs text-blue-700 leading-relaxed">
                <li>→ Nhập tên + chọn loại hình, nhấn <strong>Tạo bằng AI</strong> để có mô tả chuyên nghiệp ngay</li>
                <li>→ Mô tả càng chi tiết, AI tư vấn càng chính xác</li>
                <li>→ Bạn có thể chỉnh sửa thông tin bất kỳ lúc nào</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2 ── */}
      {step === "product" && (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="space-y-4">
            {products.map((product, index) => (
              <Section
                key={index}
                title={products.length > 1 ? `Sản phẩm ${index + 1}` : "Sản phẩm / Dịch vụ"}
                subtitle="Thông tin cụ thể về những gì bạn đang bán"
                action={products.length > 1 ? (
                  <button onClick={() => setProducts((p) => p.filter((_, i) => i !== index))} className="text-xs text-red-400 hover:text-red-600 font-medium">
                    Xóa
                  </button>
                ) : undefined}
              >
                <div className="space-y-4">
                  <Field label="Tên sản phẩm / dịch vụ" required>
                    <input
                      type="text"
                      value={product.name ?? ""}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                      placeholder="VD: Khóa học IELTS 6.5+, Áo Đầm Mùa Hè, Dịch vụ chạy Ads..."
                      className={FIELD}
                    />
                  </Field>

                  {/* Product description with AI */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-semibold text-slate-700">Mô tả sản phẩm</label>
                      <button
                        onClick={() => generateProdDescription(index)}
                        disabled={genProd === index || !product.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 disabled:opacity-40 disabled:cursor-not-allowed text-violet-700 text-xs font-semibold transition-all border border-violet-200"
                      >
                        {genProd === index ? <><Spinner /> Đang tạo...</> : <><Sparkle /> Tạo bằng AI</>}
                      </button>
                    </div>
                    <div className="relative">
                      <textarea
                        value={product.description ?? ""}
                        onChange={(e) => updateProduct(index, "description", e.target.value)}
                        placeholder="Mô tả chi tiết sản phẩm... hoặc nhấn 'Tạo bằng AI'"
                        rows={4}
                        className={`${FIELD} resize-none ${genProd === index ? "bg-violet-50/50 border-violet-200" : ""}`}
                      />
                      {genProd === index && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-violet-100 text-violet-600 text-xs font-medium px-2.5 py-1 rounded-lg">
                          <Spinner /> AI đang viết...
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Giá bán">
                      <div className="relative">
                        <input
                          type="number"
                          value={product.price ?? ""}
                          onChange={(e) => updateProduct(index, "price", e.target.value ? Number(e.target.value) : null)}
                          placeholder="499000"
                          className={`${FIELD} pr-12`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">VNĐ</span>
                      </div>
                    </Field>
                    <Field label="Khách hàng mục tiêu">
                      <input
                        type="text"
                        value={product.target_audience ?? ""}
                        onChange={(e) => updateProduct(index, "target_audience", e.target.value)}
                        placeholder="Nữ 22–35 tuổi, học sinh lớp 12..."
                        className={FIELD}
                      />
                    </Field>
                  </div>

                  <Field label="Điểm nổi bật (USP)">
                    <input
                      type="text"
                      value={product.usp ?? ""}
                      onChange={(e) => updateProduct(index, "usp", e.target.value)}
                      placeholder="Điều gì làm bạn khác biệt? VD: Hoàn tiền 100% nếu không hài lòng..."
                      className={FIELD}
                    />
                  </Field>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 block mb-2">Kênh bán hàng</label>
                    <div className="flex flex-wrap gap-2">
                      {SALES_CHANNELS.map((ch) => {
                        const active = (product.sales_channels ?? []).includes(ch.toLowerCase());
                        return (
                          <button
                            key={ch}
                            onClick={() => toggleChannel(index, ch.toLowerCase())}
                            className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                              active
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-200"
                                : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Section>
            ))}

            <button
              onClick={() => setProducts((p) => [...p, { name: "", description: "", price: undefined, usp: "", target_audience: "", sales_channels: [] }])}
              className="w-full py-3.5 border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sản phẩm khác
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => { setStep("business"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-6 py-4 border border-slate-200 hover:border-slate-300 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Quay lại
              </button>
              <button
                onClick={handleSaveProducts}
                disabled={products.every((p) => !p.name) || saving}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-blue-100 flex items-center justify-center gap-2"
              >
                {saving ? <><Spinner />Đang lưu...</> : "Lưu & Hoàn tất"}
              </button>
            </div>
          </div>

          {/* RIGHT: tips */}
          <div className="hidden lg:flex flex-col gap-4 sticky top-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Thông tin đã lưu</p>
              <div className="space-y-2.5">
                {[["Thương hiệu", business.brand_name], ["Loại hình", bizTypeLabel]].map(([l, v]) => (
                  <div key={l} className="flex gap-3">
                    <span className="text-[11px] text-slate-400 w-20 shrink-0">{l}</span>
                    <span className="text-[11px] font-medium text-slate-700">{v || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl border border-violet-100 p-5">
              <p className="text-sm font-semibold text-violet-900 mb-3 flex items-center gap-2"><span>🤖</span> AI sẽ dùng để</p>
              <ul className="space-y-2 text-xs text-violet-700 leading-relaxed">
                <li>→ Viết content bán hàng phù hợp thương hiệu</li>
                <li>→ Gợi ý chiến lược giá và khuyến mãi</li>
                <li>→ Tạo kịch bản chatbot tự động</li>
                <li>→ Phân tích đối tượng khách hàng mục tiêu</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small reusable components ────────────────────────────────────────────

function Section({ title, subtitle, required, action, children }: {
  title: string; subtitle?: string; required?: boolean; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-7">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-semibold text-slate-900 text-base flex items-center gap-1.5">
            {title}
            {required && <span className="text-red-400 text-xs">*</span>}
          </h2>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function StepPill({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
      active ? "bg-blue-600 text-white shadow-md shadow-blue-100"
        : done ? "bg-emerald-100 text-emerald-700"
        : "bg-slate-100 text-slate-400"
    }`}>
      {done ? (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <span className="text-xs w-3.5 text-center">{n}</span>
      )}
      {label}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l1.5 4.5L11 9l-4.5 1.5L5 15l-1.5-4.5L-1 9l4.5-1.5L5 3zM19 9l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
