'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';

const ATTENDEES = [
	{
		photo:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
		quote:
			'Tham dự lần đầu năm 2024 — kết nối được 3 nhà đầu tư, 1 người trong số đó dẫn round Series A của tôi 6 tháng sau.',
		name: 'Trịnh Hoàng Nam',
		role: 'Founder, EduTech Startup',
		result: 'Đóng Series A trị giá $2M',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
		quote:
			'Workshop về growth marketing cụ thể đến mức tôi mang về áp dụng ngay tuần sau. ROAS chiến dịch tháng đó tăng gấp đôi.',
		name: 'Phan Mỹ Linh',
		role: 'Marketing Manager, D2C Brand',
		result: 'ROAS từ 2.1 → 4.5',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
		quote:
			'Tôi đến để học, ra về với 8 hợp đồng B2B từ networking lounge. Vé đã hoàn vốn 80 lần.',
		name: 'Đỗ Quang Hải',
		role: 'CEO, B2B SaaS',
		result: '8 hợp đồng B2B mới',
	},
];

export default function PastAttendees() {
	return (
		<section className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Người tham dự kỳ trước
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
						Họ đã thay đổi sau Vietnam Summit
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{ATTENDEES.map((a, i) => (
						<motion.figure
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.07 }}
							className='bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col'
						>
							<div className='flex gap-0.5 mb-4'>
								{Array.from({ length: 5 }).map((_, j) => (
									<Star key={j} className='w-4 h-4 text-amber-400' fill='currentColor' />
								))}
							</div>

							<blockquote className='text-slate-700 text-[15px] leading-relaxed flex-1 mb-5'>
								&ldquo;{a.quote}&rdquo;
							</blockquote>

							<div className='inline-flex items-center gap-1.5 self-start text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full mb-4'>
								<TrendingUp className='w-3 h-3' />
								{a.result}
							</div>

							<div className='flex items-center gap-3 pt-4 border-t border-slate-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={a.photo}
									alt={a.name}
									className='w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0'
								/>
								<div className='leading-tight'>
									<p className='font-semibold text-slate-900 text-sm'>{a.name}</p>
									<p className='text-slate-500 text-xs mt-0.5'>{a.role}</p>
								</div>
							</div>
						</motion.figure>
					))}
				</div>
			</div>
		</section>
	);
}
