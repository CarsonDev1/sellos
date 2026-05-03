"use client";

import { useState } from "react";
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
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "zalo", label: "Zalo" },
  { value: "website", label: "Website" },
  { value: "shopee", label: "Shopee" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "lazada", label: "Lazada" },
];

interface Props {
  profileId: string;
  initialBusiness: BusinessInfo | null;
  initialProducts: Product[];
}

const INPUT_CLASS =
  "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all";

const LABEL_CLASS = "block text-sm font-semibold text-slate-700 mb-1.5";

export default function ThongTinForm({ initialBusiness, initialProducts }: Props) {
  const [step, setStep] = useState<"business" | "product">("business");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customType, setCustomType] = useState("");

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

  async function handleSaveBusiness() {
    if (!business.brand_name || !business.business_type) return;
    setSaving(true);
    setError(null);
    const res = await saveBusinessInfo(business);
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setStep("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSaveProducts() {
    setSaving(true);
    setError(null);
    const res = await saveProducts(
      products.map((p) => ({
        id: p.id,
        name: p.name ?? "",
        description: p.description ?? "",
        price: p.price ?? null,
        usp: p.usp ?? "",
        target_audience: p.target_audience ?? "",
        sales_channels: p.sales_channels ?? [],
      }))
    );
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setSaved(true);
  }

  function updateProduct(index: number, field: string, value: unknown) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function toggleChannel(index: number, channel: string) {
    const current = products[index].sales_channels ?? [];
    const next = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    updateProduct(index, "sales_channels", next);
  }

  function selectBusinessType(value: string) {
    setBusiness({ ...business, business_type: value });
    setCustomType("");
  }

  function handleCustomType(val: string) {
    setCustomType(val);
    setBusiness({ ...business, business_type: val });
  }

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
            Thông tin doanh nghiệp đã được lưu. AI của SellOS đã sẵn sàng tư vấn chiến lược bán hàng được cá nhân hóa cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/dashboard/ai-chat"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-100"
            >
              Chat với AI ngay
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl transition-colors"
            >
              Về Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <a href="/dashboard" className="hover:text-slate-600 transition-colors">Dashboard</a>
          <span>/</span>
          <span className="text-slate-600 font-medium">Thông tin & Sản phẩm</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900">
              {step === "business" ? "Thông tin doanh nghiệp" : "Thông tin sản phẩm"}
            </h1>
            <p className="text-slate-500 mt-1">
              {step === "business"
                ? "Giúp AI hiểu rõ về mô hình kinh doanh của bạn"
                : "Mô tả sản phẩm / dịch vụ bạn đang bán"}
            </p>
          </div>

          {/* Step pills */}
          <div className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              step === "business" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-emerald-100 text-emerald-700"
            }`}>
              {step !== "business" ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : <span className="w-3.5 h-3.5 flex items-center justify-center text-xs">1</span>}
              Doanh nghiệp
            </div>
            <div className={`w-6 h-0.5 rounded-full ${step === "product" ? "bg-blue-300" : "bg-slate-200"}`} />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              step === "product" ? "bg-blue-600 text-white shadow-md shadow-blue-100" : "bg-slate-100 text-slate-400"
            }`}>
              <span className="w-3.5 h-3.5 flex items-center justify-center text-xs">2</span>
              Sản phẩm
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {/* ─── STEP 1: BUSINESS ─── */}
      {step === "business" && (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left: Form */}
          <div className="space-y-6">

            {/* Business type card selector */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
              <h2 className="font-semibold text-slate-900 text-base mb-1">Loại hình kinh doanh</h2>
              <p className="text-sm text-slate-400 mb-5">Chọn hoặc nhập loại hình phù hợp nhất</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {BUSINESS_TYPES.map((t) => {
                  const isSelected = business.business_type === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => selectBusinessType(t.value)}
                      className={`relative overflow-hidden rounded-2xl aspect-[4/3] group transition-all duration-200 ${
                        isSelected
                          ? "ring-2 ring-blue-500 ring-offset-2 shadow-lg"
                          : "hover:scale-[1.02] hover:shadow-md"
                      }`}
                    >
                      <img
                        src={t.image}
                        alt={t.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-900/70"
                          : "bg-slate-900/50 group-hover:bg-slate-900/40"
                      }`} />

                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                        <p className="text-white font-bold text-sm leading-tight">{t.label}</p>
                        <p className="text-white/70 text-xs mt-0.5">{t.sublabel}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom type input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={customType}
                  onChange={(e) => handleCustomType(e.target.value)}
                  placeholder="Hoặc nhập loại hình khác (VD: Nhà hàng, Spa, Bất động sản...)"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>
            </div>

            {/* Brand info */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
              <h2 className="font-semibold text-slate-900 text-base mb-5">Thông tin thương hiệu</h2>

              <div className="space-y-5">
                <div>
                  <label className={LABEL_CLASS}>
                    Tên thương hiệu <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={business.brand_name}
                    onChange={(e) => setBusiness({ ...business, brand_name: e.target.value })}
                    placeholder="VD: NOVA Store, Khóa học Toán Thầy An, Agency X..."
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS}>Mô tả ngắn về doanh nghiệp</label>
                  <textarea
                    value={business.description}
                    onChange={(e) => setBusiness({ ...business, description: e.target.value })}
                    placeholder="VD: Shop thời trang nữ cao cấp, chuyên áo đầm và phụ kiện, ship toàn quốc..."
                    rows={4}
                    className={`${INPUT_CLASS} resize-none`}
                  />
                  <p className="text-xs text-slate-400 mt-1.5">AI sẽ dùng thông tin này để tạo nội dung phù hợp với thương hiệu của bạn.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL_CLASS}>Số điện thoại</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🇻🇳</span>
                      <input
                        type="tel"
                        value={business.phone}
                        onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                        placeholder="0901 234 567"
                        className={`${INPUT_CLASS} pl-10`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLASS}>Website</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono text-xs">https://</span>
                      <input
                        type="url"
                        value={business.website}
                        onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                        placeholder="yoursite.com"
                        className={`${INPUT_CLASS} pl-16`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveBusiness}
              disabled={!business.brand_name || !business.business_type || saving}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang lưu...
                </>
              ) : (
                <>
                  Tiếp theo: Thông tin sản phẩm
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Right: Summary panel */}
          <div className="hidden lg:block space-y-4 sticky top-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Xem trước</p>
              <div className="space-y-3">
                <PreviewItem label="Loại hình" value={selectedPreset?.label ?? (customType || "—")} />
                <PreviewItem label="Thương hiệu" value={business.brand_name || "—"} />
                <PreviewItem label="Mô tả" value={business.description ? business.description.slice(0, 60) + (business.description.length > 60 ? "..." : "") : "—"} />
                <PreviewItem label="SĐT" value={business.phone || "—"} />
                <PreviewItem label="Website" value={business.website || "—"} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💡</span>
                <p className="text-sm font-semibold text-blue-900">Mẹo điền form</p>
              </div>
              <ul className="space-y-2 text-xs text-blue-700 leading-relaxed">
                <li className="flex gap-2"><span className="shrink-0 text-blue-400">→</span> Mô tả càng chi tiết, AI tư vấn càng chính xác</li>
                <li className="flex gap-2"><span className="shrink-0 text-blue-400">→</span> Thêm website giúp AI phân tích thương hiệu hiện tại</li>
                <li className="flex gap-2"><span className="shrink-0 text-blue-400">→</span> Bạn có thể chỉnh sửa thông tin này bất kỳ lúc nào</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─── STEP 2: PRODUCTS ─── */}
      {step === "product" && (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-semibold text-slate-900 text-base">
                      {products.length > 1 ? `Sản phẩm ${index + 1}` : "Sản phẩm / Dịch vụ"}
                    </h2>
                    <p className="text-sm text-slate-400">Thông tin cụ thể về những gì bạn đang bán</p>
                  </div>
                  {products.length > 1 && (
                    <button
                      onClick={() => setProducts((p) => p.filter((_, i) => i !== index))}
                      className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={LABEL_CLASS}>Tên sản phẩm / dịch vụ <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={product.name ?? ""}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                      placeholder="VD: Khóa học IELTS 6.5+, Áo Đầm Mùa Hè..."
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Mô tả sản phẩm</label>
                    <textarea
                      value={product.description ?? ""}
                      onChange={(e) => updateProduct(index, "description", e.target.value)}
                      placeholder="Mô tả chi tiết: nội dung, lợi ích, quy trình, cam kết..."
                      rows={4}
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL_CLASS}>Giá bán</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={product.price ?? ""}
                          onChange={(e) => updateProduct(index, "price", e.target.value ? Number(e.target.value) : null)}
                          placeholder="499000"
                          className={`${INPUT_CLASS} pr-10`}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">VNĐ</span>
                      </div>
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Khách hàng mục tiêu</label>
                      <input
                        type="text"
                        value={product.target_audience ?? ""}
                        onChange={(e) => updateProduct(index, "target_audience", e.target.value)}
                        placeholder="VD: Nữ 22–35, học sinh lớp 12..."
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Điểm nổi bật (USP)</label>
                    <input
                      type="text"
                      value={product.usp ?? ""}
                      onChange={(e) => updateProduct(index, "usp", e.target.value)}
                      placeholder="Điều gì làm bạn khác biệt? VD: Cam kết hoàn tiền 100%..."
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS}>Kênh bán hàng đang dùng</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {SALES_CHANNELS.map((ch) => {
                        const active = (product.sales_channels ?? []).includes(ch.value);
                        return (
                          <button
                            key={ch.value}
                            onClick={() => toggleChannel(index, ch.value)}
                            className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                              active
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                            }`}
                          >
                            {ch.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setProducts((p) => [...p, { name: "", description: "", price: undefined, usp: "", target_audience: "", sales_channels: [] }])}
              className="w-full py-3.5 border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sản phẩm khác
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => { setStep("business"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-6 py-4 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Quay lại
              </button>
              <button
                onClick={handleSaveProducts}
                disabled={products.every((p) => !p.name) || saving}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang lưu...
                  </>
                ) : "Lưu & Hoàn tất"}
              </button>
            </div>
          </div>

          {/* Right: Tips */}
          <div className="hidden lg:block space-y-4 sticky top-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Xem trước</p>
              <div className="space-y-3">
                <PreviewItem label="Thương hiệu" value={business.brand_name || "—"} />
                <PreviewItem label="Loại hình" value={selectedPreset?.label ?? (business.business_type || "—")} />
                <PreviewItem label="Sản phẩm" value={products[0]?.name || "—"} />
                <PreviewItem
                  label="Giá"
                  value={products[0]?.price ? `${Number(products[0].price).toLocaleString("vi-VN")}₫` : "—"}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl border border-violet-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🤖</span>
                <p className="text-sm font-semibold text-violet-900">AI sẽ dùng thông tin này để</p>
              </div>
              <ul className="space-y-2 text-xs text-violet-700 leading-relaxed">
                <li className="flex gap-2"><span className="shrink-0 text-violet-400">→</span> Viết content bán hàng phù hợp thương hiệu</li>
                <li className="flex gap-2"><span className="shrink-0 text-violet-400">→</span> Gợi ý chiến lược giá và khuyến mãi</li>
                <li className="flex gap-2"><span className="shrink-0 text-violet-400">→</span> Tạo kịch bản chatbot tự động</li>
                <li className="flex gap-2"><span className="shrink-0 text-violet-400">→</span> Phân tích đối tượng khách hàng</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs font-medium text-slate-400 w-20 shrink-0 mt-0.5">{label}</span>
      <span className="text-xs text-slate-700 font-medium leading-relaxed">{value}</span>
    </div>
  );
}
