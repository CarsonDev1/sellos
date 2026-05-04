'use client';

import { motion, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const PHASES = [
	{
		days: 'Ngày 1–2',
		title: 'Dựng website bán hàng',
		accent: 'blue',
		dotClass: 'bg-blue-500',
		ringClass: 'ring-blue-100',
		bgClass: 'bg-blue-50',
		textClass: 'text-blue-700',
		steps: [
			'Điền thông tin sản phẩm',
			'Chọn mẫu website đẹp có sẵn',
			'AI viết nội dung theo sản phẩm của bạn',
			'Đưa website lên mạng — có địa chỉ riêng',
		],
		output: 'Website của bạn đã chạy thật trên mạng',
	},
	{
		days: 'Ngày 3–4',
		title: 'Thu khách & theo dõi',
		accent: 'sky',
		dotClass: 'bg-sky-500',
		ringClass: 'ring-sky-100',
		bgClass: 'bg-sky-50',
		textClass: 'text-sky-700',
		steps: [
			'Gắn form thu thông tin khách quan tâm',
			'Đo hiệu quả quảng cáo (Facebook, Google)',
			'Kết nối Zalo & Messenger để khách dễ liên hệ',
			'Tự nhận thông báo khi có đơn mới',
		],
		output: 'Mỗi khách quan tâm đều được ghi lại — không lọt một ai',
	},
	{
		days: 'Ngày 5–6',
		title: 'Trợ lý ảo chốt đơn 24/7',
		accent: 'violet',
		dotClass: 'bg-violet-500',
		ringClass: 'ring-violet-100',
		bgClass: 'bg-violet-50',
		textClass: 'text-violet-700',
		steps: [
			'Chat với AI để dựng trợ lý ảo',
			'Dạy nó cách trả lời và chốt đơn',
			'Cho nó tự xử lý câu hỏi thường gặp',
			'Gắn vào website của bạn',
		],
		output: 'Trợ lý ảo đang tư vấn khách thay bạn — kể cả lúc bạn ngủ',
	},
	{
		days: 'Ngày 7',
		title: 'Ra mắt — nhận đơn thật',
		accent: 'emerald',
		dotClass: 'bg-emerald-500',
		ringClass: 'ring-emerald-100',
		bgClass: 'bg-emerald-50',
		textClass: 'text-emerald-700',
		steps: [
			'Kết nối nhận thanh toán (MoMo, SePay, chuyển khoản)',
			'Mở trang quản lý đơn hàng — xem doanh thu',
			'Cài chuỗi email tự gửi đúng lúc',
			'Kiểm tra toàn bộ — bấm "Ra mắt"',
		],
		output: 'Hệ thống chạy thật — sẵn sàng nhận đơn',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Roadmap() {
	return (
		<section id='roadmap' className='py-24 px-4 bg-slate-50 relative overflow-hidden'>
			<div className='container mx-auto max-w-5xl relative'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-14 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Lộ trình 7 ngày
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Từ ngày đầu đến ngày bán đơn đầu tiên
					</h2>
					<p className='text-slate-500 text-base'>
						Mỗi ngày chỉ 1–2 tiếng. Xong giai đoạn này mới qua giai đoạn tiếp theo — không vội, không kẹt.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='relative space-y-3'
				>
					{/* Vertical timeline */}
					<div
						aria-hidden
						className='absolute left-[27px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-200 via-violet-200 to-emerald-200 hidden sm:block'
					/>

					{PHASES.map((phase, i) => (
						<motion.div
							key={i}
							variants={item}
							className='relative flex gap-5 sm:gap-6'
						>
							{/* Timeline dot */}
							<div className='hidden sm:flex flex-shrink-0 relative'>
								<div
									className={`w-14 h-14 rounded-full bg-white border-2 ${phase.bgClass.replace(
										'bg-',
										'border-'
									)} ${phase.bgClass} flex items-center justify-center ring-4 ${phase.ringClass} relative z-10 shadow-sm`}
								>
									<span className={`text-xs font-bold ${phase.textClass}`}>
										{i + 1}
									</span>
								</div>
							</div>

							{/* Card */}
							<div className='flex-1 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow'>
								<div className='flex flex-col sm:flex-row sm:items-center gap-3 mb-5'>
									<span
										className={`inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${phase.bgClass} ${phase.textClass}`}
									>
										<span className={`w-1.5 h-1.5 rounded-full ${phase.dotClass}`} />
										{phase.days}
									</span>
									<h3 className='font-heading font-bold text-slate-900 text-xl leading-tight'>
										{phase.title}
									</h3>
								</div>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5'>
									{phase.steps.map((step, j) => (
										<div
											key={j}
											className='flex items-start gap-2 text-sm text-slate-600'
										>
											<CheckCircle2
												className={`w-4 h-4 flex-shrink-0 mt-0.5 ${phase.textClass}`}
												strokeWidth={2.5}
											/>
											{step}
										</div>
									))}
								</div>

								<div className={`flex items-center gap-2.5 pt-4 border-t border-slate-100`}>
									<ArrowRight className={`w-4 h-4 ${phase.textClass}`} />
									<span className='text-xs uppercase tracking-wider font-semibold text-slate-400'>
										Cuối ngày bạn có:
									</span>
									<span className={`text-sm font-semibold ${phase.textClass}`}>
										{phase.output}
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
