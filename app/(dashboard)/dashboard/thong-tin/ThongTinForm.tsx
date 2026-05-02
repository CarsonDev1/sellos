"use client";

import { useState } from "react";
import { saveBusinessInfo, saveProducts } from "./actions";
import type { Database } from "@/lib/supabase/types";

type BusinessInfo = Database["public"]["Tables"]["business_info"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];

const BUSINESS_TYPES = [
  { value: "khoa-hoc", label: "Khóa học / Giáo dục", icon: "📚" },
  { value: "shop-online", label: "Shop Online / Thương mại", icon: "🛍️" },
  { value: "dich-vu", label: "Dịch vụ", icon: "⚙️" },
  { value: "coaching", label: "Coaching / Tư vấn", icon: "🎯" },
  { value: "khac", label: "Khác", icon: "💡" },
];

const SALES_CHANNELS = [
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "zalo", label: "Zalo" },
  { value: "website", label: "Website" },
  { value: "shopee", label: "Shopee" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
];

interface Props {
  profileId: string;
  initialBusiness: BusinessInfo | null;
  initialProducts: Product[];
}

export default function ThongTinForm({ initialBusiness, initialProducts }: Props) {
  const [step, setStep] = useState<"business" | "product">("business");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSaveBusiness() {
    if (!business.brand_name || !business.business_type) return;
    setSaving(true);
    setError(null);
    const res = await saveBusinessInfo(business);
    setSaving(false);
    if (res.error) { setError(res.error); return; }
    setStep("product");
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
    setProducts((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  }

  function toggleChannel(index: number, channel: string) {
    const current = products[index].sales_channels ?? [];
    const next = current.includes(channel)
      ? current.filter((c) => c !== channel)
      : [...current, channel];
    updateProduct(index, "sales_channels", next);
  }

  if (saved) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-heading font-bold text-2xl text-slate-900 mb-2">Đã lưu thông tin!</h2>
        <p className="text-slate-500 mb-6">AI đã có đủ thông tin để tư vấn chiến lược bán hàng cho bạn.</p>
        <a href="/dashboard/ai-chat" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Chat với AI ngay →
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading font-bold text-2xl text-slate-900">Thông tin & Sản phẩm</h1>
        <p className="text-slate-500 mt-1">Điền đầy đủ để AI tư vấn chính xác nhất cho doanh nghiệp của bạn.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {(["business", "product"] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              step === s
                ? "bg-blue-600 text-white"
                : i === 0 && step === "product"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-400"
            }`}>
              <span>{i + 1}</span>
              <span>{s === "business" ? "Doanh nghiệp" : "Sản phẩm"}</span>
            </div>
            {i === 0 && <div className="w-8 h-0.5 bg-slate-200" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Business */}
      {step === "business" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900 text-lg">Thông tin doanh nghiệp</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên thương hiệu *</label>
            <input
              type="text"
              value={business.brand_name}
              onChange={(e) => setBusiness({ ...business, brand_name: e.target.value })}
              placeholder="VD: NOVA Store, Khóa học Toán Thầy An..."
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Loại hình kinh doanh *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {BUSINESS_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setBusiness({ ...business, business_type: t.value })}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    business.business_type === t.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-600"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span className="text-xs leading-tight">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả ngắn</label>
            <textarea
              value={business.description}
              onChange={(e) => setBusiness({ ...business, description: e.target.value })}
              placeholder="VD: Bán thời trang nữ cao cấp, chuyên áo đầm và phụ kiện..."
              rows={3}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Số điện thoại</label>
              <input
                type="tel"
                value={business.phone}
                onChange={(e) => setBusiness({ ...business, phone: e.target.value })}
                placeholder="0901234567"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Website</label>
              <input
                type="url"
                value={business.website}
                onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <button
            onClick={handleSaveBusiness}
            disabled={!business.brand_name || !business.business_type || saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors"
          >
            {saving ? "Đang lưu..." : "Tiếp theo → Thông tin sản phẩm"}
          </button>
        </div>
      )}

      {/* Step 2: Products */}
      {step === "product" && (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 text-lg">
                  {products.length > 1 ? `Sản phẩm ${index + 1}` : "Thông tin sản phẩm / dịch vụ"}
                </h2>
                {products.length > 1 && (
                  <button
                    onClick={() => setProducts((p) => p.filter((_, i) => i !== index))}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tên sản phẩm / dịch vụ *</label>
                <input
                  type="text"
                  value={product.name ?? ""}
                  onChange={(e) => updateProduct(index, "name", e.target.value)}
                  placeholder="VD: Khóa học Toán 12, Áo Đầm Hè 2025..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mô tả sản phẩm</label>
                <textarea
                  value={product.description ?? ""}
                  onChange={(e) => updateProduct(index, "description", e.target.value)}
                  placeholder="Mô tả chi tiết về sản phẩm / dịch vụ..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    value={product.price ?? ""}
                    onChange={(e) => updateProduct(index, "price", e.target.value ? Number(e.target.value) : null)}
                    placeholder="499000"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Khách hàng mục tiêu</label>
                  <input
                    type="text"
                    value={product.target_audience ?? ""}
                    onChange={(e) => updateProduct(index, "target_audience", e.target.value)}
                    placeholder="VD: Học sinh lớp 12..."
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Điểm nổi bật (USP)</label>
                <input
                  type="text"
                  value={product.usp ?? ""}
                  onChange={(e) => updateProduct(index, "usp", e.target.value)}
                  placeholder="VD: Giáo viên 15 năm kinh nghiệm, tỷ lệ đậu 98%..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kênh bán hàng</label>
                <div className="flex flex-wrap gap-2">
                  {SALES_CHANNELS.map((ch) => (
                    <button
                      key={ch.value}
                      onClick={() => toggleChannel(index, ch.value)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                        (product.sales_channels ?? []).includes(ch.value)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setProducts((p) => [...p, { name: "", description: "", price: undefined, usp: "", target_audience: "", sales_channels: [] }])}
            className="w-full py-2.5 border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-500 rounded-xl text-sm font-medium transition-colors"
          >
            + Thêm sản phẩm khác
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("business")}
              className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              ← Quay lại
            </button>
            <button
              onClick={handleSaveProducts}
              disabled={products.every((p) => !p.name) || saving}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-colors"
            >
              {saving ? "Đang lưu..." : "Lưu thông tin"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
