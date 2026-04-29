"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  { year: "2019", label: "Thành lập", desc: "Bắt đầu từ một vườn rau 500m² tại Đà Lạt với 3 thành viên sáng lập." },
  { year: "2020", label: "Mở rộng", desc: "Kết nối 15 nông trại đối tác, ra mắt dịch vụ giao hàng tận nơi tại TP.HCM." },
  { year: "2022", label: "Chứng nhận", desc: "Đạt chứng nhận USDA Organic và EU Organic — đầu tiên tại Việt Nam." },
  { year: "2024", label: "Hôm nay", desc: "50+ nông trại, 500+ sản phẩm, 15,000+ gia đình tin dùng mỗi tuần." },
];

const TEAM = [
  {
    name: "Nguyễn Minh Tuấn",
    role: "Co-founder & CEO",
    photo: "https://randomuser.me/api/portraits/men/34.jpg",
    quote: "Chúng tôi tin rằng thực phẩm sạch không nên là đặc quyền của số ít.",
  },
  {
    name: "Lê Thị Thu Hà",
    role: "Co-founder & Head of Farming",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Mỗi củ cà rốt, mỗi bó rau đều được chăm sóc như chúng tôi trồng cho chính gia đình mình.",
  },
  {
    name: "Phạm Đức Long",
    role: "Head of Quality",
    photo: "https://randomuser.me/api/portraits/men/56.jpg",
    quote: "3 lớp kiểm định không phải con số — đó là cam kết với sức khỏe của bạn.",
  },
];

export default function Story() {
  return (
    <section id="cau-chuyen" className="py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-semibold mb-4">
            🌾 Câu chuyện của chúng tôi
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Từ Một Vườn Rau Nhỏ<br />
            <span className="text-green-600">Đến 15,000 Gia Đình</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Organica được sinh ra từ một câu hỏi đơn giản: &ldquo;Tại sao thực phẩm sạch lại khó tìm và đắt đỏ như vậy?&rdquo;
          </p>
        </motion.div>

        {/* Story image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-green-100/60">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900&q=85"
                alt="Nông trại hữu cơ Organica"
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-xl p-5 text-center"
            >
              <p className="font-heading font-bold text-3xl text-green-700">50+</p>
              <p className="text-slate-500 text-xs mt-0.5">Nông trại đối tác</p>
              <p className="text-slate-400 text-[11px]">Đà Lạt · Mộc Châu · Bến Tre</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-600 text-base leading-relaxed">
              Năm 2019, ba người bạn — một kỹ sư nông nghiệp, một chuyên gia dinh dưỡng và một kỹ sư phần mềm — cùng nhau đặt câu hỏi: tại sao người Việt phải chấp nhận ăn rau củ không rõ nguồn gốc?
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Họ bắt đầu với một vườn thử nghiệm 500m², kết nối trực tiếp với người nông dân, loại bỏ hoàn toàn trung gian. Kết quả: giá rẻ hơn siêu thị 20–30%, tươi hơn và hoàn toàn sạch.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Hôm nay, Organica là mạng lưới 50+ nông trại hữu cơ trải dài từ Đà Lạt đến Mộc Châu, cung cấp 500+ sản phẩm cho 15,000 gia đình mỗi tuần.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { icon: "🌱", label: "Minh bạch nguồn gốc" },
                { icon: "🤝", label: "Công bằng với nông dân" },
                { icon: "♻️", label: "Bền vững môi trường" },
                { icon: "❤️", label: "Sức khỏe cộng đồng" },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-2.5 p-3 bg-green-50 rounded-xl">
                  <span className="text-xl">{v.icon}</span>
                  <span className="text-sm font-semibold text-slate-700">{v.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-5 bg-slate-50 border border-slate-100 rounded-2xl"
              >
                <div className="text-2xl font-heading font-bold text-green-600 mb-1">{m.year}</div>
                <div className="text-sm font-bold text-slate-900 mb-1.5">{m.label}</div>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading text-2xl font-bold text-slate-900 text-center mb-8">Những Người Đứng Sau Organica</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-white shadow-md"
                />
                <p className="font-heading font-bold text-slate-900 text-base">{member.name}</p>
                <p className="text-green-600 text-xs font-semibold mt-0.5 mb-3">{member.role}</p>
                <p className="text-slate-500 text-sm italic leading-relaxed">&ldquo;{member.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
