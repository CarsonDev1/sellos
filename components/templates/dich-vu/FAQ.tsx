'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
	{
		q: 'Chi phí khởi điểm là bao nhiêu?',
		a: 'Tuỳ scope dự án. Brand strategy bắt đầu từ 80 triệu, performance marketing từ 35 triệu/tháng. Tư vấn ban đầu hoàn toàn miễn phí — chúng tôi sẽ đề xuất giải pháp phù hợp với ngân sách của bạn.',
	},
	{
		q: 'Hợp đồng tối thiểu bao lâu?',
		a: 'Performance marketing tối thiểu 3 tháng (vì cần thời gian để học hệ thống và tối ưu). Brand strategy là dự án đơn lẻ 8-12 tuần. Content thường ký theo quý.',
	},
	{
		q: 'Đội nội bộ của chúng tôi có cần tham gia không?',
		a: 'Có, ít nhất 1 buổi/tuần. Chúng tôi không thay thế đội nội bộ — chúng tôi tăng tốc và nâng cấp năng lực cho đội. Sau dự án, đội nội bộ của bạn sẽ tự vận hành được.',
	},
	{
		q: 'Có cam kết kết quả không?',
		a: 'Có. Mọi hợp đồng đều có KPI cụ thể (CPA, ROAS, doanh thu, conversion rate). Nếu không đạt, chúng tôi chịu phí bổ sung tương ứng để bù đắp — chứ không phải bạn.',
	},
	{
		q: 'Quy mô doanh nghiệp nào phù hợp?',
		a: 'Doanh nghiệp đã có doanh thu ổn định (từ 5 tỷ/năm trở lên) muốn tăng tốc, hoặc startup đã pass product-market fit và sẵn sàng scale. Chúng tôi không phù hợp với doanh nghiệp mới khởi nghiệp dưới 6 tháng.',
	},
	{
		q: 'Sau khi kết thúc hợp đồng thì sao?',
		a: 'Bạn nhận toàn bộ tài liệu: brand book, dashboard, quy trình, tài khoản quảng cáo. Bạn có quyền tiếp tục với agency khác hoặc tự vận hành — không có phí ẩn, không có khoá tài sản.',
	},
];

export default function FAQ() {
	const [open, setOpen] = useState<number | null>(0);
	return (
		<section id='faq' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-3xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-12'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Câu hỏi thường gặp
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
						Bạn đang phân vân điều gì?
					</h2>
				</motion.div>

				<div className='space-y-3'>
					{FAQS.map((f, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 8 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.04 }}
							className={`bg-white rounded-xl border transition-colors ${
								open === i ? 'border-indigo-300 shadow-sm' : 'border-slate-200'
							}`}
						>
							<button
								onClick={() => setOpen(open === i ? null : i)}
								className='w-full flex items-center justify-between gap-4 px-5 py-4 text-left'
							>
								<span className='font-heading font-semibold text-slate-900 text-[15px] leading-snug'>
									{f.q}
								</span>
								<span
									className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
										open === i
											? 'border-indigo-300 bg-indigo-50 text-indigo-600'
											: 'border-slate-200 bg-slate-50 text-slate-500'
									}`}
								>
									{open === i ? (
										<Minus className='w-3.5 h-3.5' />
									) : (
										<Plus className='w-3.5 h-3.5' />
									)}
								</span>
							</button>
							{open === i && (
								<div className='px-5 pb-5 text-slate-600 text-sm leading-relaxed'>
									{f.a}
								</div>
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
