"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CATEGORIES = [
  { icon: "🛒", label: "Bán hàng online" },
  { icon: "📱", label: "Quảng cáo" },
  { icon: "📧", label: "Email Marketing" },
  { icon: "💡", label: "Khởi nghiệp" },
  { icon: "📊", label: "Phân tích dữ liệu" },
  { icon: "🎨", label: "Thiết kế" },
  { icon: "🤖", label: "AI & Tự động hóa" },
  { icon: "💬", label: "Kỹ năng mềm" },
];

export default function CategoryNav() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-8 px-4 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                active === i
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
