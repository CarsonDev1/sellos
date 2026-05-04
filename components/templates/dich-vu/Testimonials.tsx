'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TESTIMONIALS = [
	{
		photo:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
		quote:
			'Đội Apex giúp chúng tôi cấu trúc lại toàn bộ phễu marketing. Sau 4 tháng, CAC giảm 35% và LTV tăng gấp đôi.',
		name: 'Phạm Hồng Phúc',
		role: 'CEO, Saigon Beauty Group',
		result: 'CAC -35%, LTV ×2',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
		quote:
			'Khác biệt lớn nhất là minh bạch — mỗi đồng spend đều có dashboard riêng. Tôi không cần hỏi, chỉ cần mở app xem.',
		name: 'Hoàng Quốc Bảo',
		role: 'Marketing Director, Tiki',
		result: 'Báo cáo real-time',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
		quote:
			'Đội ngũ làm việc như đối tác chứ không phải vendor. Họ challenge ý tưởng của chúng tôi — rất quý.',
		name: 'Đặng Thị Lan Anh',
		role: 'Founder, GreenLife Organic',
		result: 'Tỷ lệ tái mua 12% → 38%',
	},
];

export default function Testimonials() {
	return (
		<section className='py-24 px-4 bg-gradient-to-b from-slate-50 to-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Khách hàng nói gì
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
						Lời nói của những người đã làm cùng chúng tôi
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{TESTIMONIALS.map((t, i) => (
						<motion.figure
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.07 }}
							className='relative bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow'
						>
							<Quote className='absolute top-6 right-6 w-7 h-7 text-slate-100' />

							<div className='flex gap-0.5 mb-4'>
								{Array.from({ length: 5 }).map((_, j) => (
									<Star
										key={j}
										className='w-4 h-4 text-amber-400'
										fill='currentColor'
									/>
								))}
							</div>

							<blockquote className='text-slate-700 text-[15px] leading-relaxed mb-6'>
								&ldquo;{t.quote}&rdquo;
							</blockquote>

							<div className='flex items-center gap-3 pt-5 border-t border-slate-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={t.photo}
									alt={t.name}
									className='w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0'
								/>
								<div className='leading-tight flex-1 min-w-0'>
									<p className='font-semibold text-slate-900 text-sm truncate'>{t.name}</p>
									<p className='text-slate-500 text-xs truncate'>{t.role}</p>
								</div>
							</div>

							<div className='mt-4 inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full'>
								{t.result}
							</div>
						</motion.figure>
					))}
				</div>
			</div>
		</section>
	);
}
