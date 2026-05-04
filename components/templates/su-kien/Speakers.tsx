'use client';

import { motion } from 'framer-motion';

const SPEAKERS = [
	{
		photo:
			'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
		name: 'Nguyễn Hoàng Phương',
		title: 'Founder & CEO, NovaTech',
		topic: 'Xây dựng startup unicorn từ Việt Nam',
		tagBg: 'bg-rose-100 text-rose-700',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
		name: 'Trần Mai Anh',
		title: 'CMO, ShopeeFood Vietnam',
		topic: 'Tăng trưởng D2C trong kỷ nguyên AI',
		tagBg: 'bg-amber-100 text-amber-700',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
		name: 'Lê Quốc Hùng',
		title: 'Partner, VinaCapital Ventures',
		topic: 'Gọi vốn Series A cho startup Việt 2026',
		tagBg: 'bg-fuchsia-100 text-fuchsia-700',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
		name: 'Phạm Thuỳ Linh',
		title: 'Head of Brand, Highlands Coffee',
		topic: 'Local brand vs. global brand — chiến lược phòng thủ',
		tagBg: 'bg-indigo-100 text-indigo-700',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
		name: 'Đặng Văn Tài',
		title: 'CTO, MoMo',
		topic: 'AI agents thay đổi e-commerce như thế nào',
		tagBg: 'bg-emerald-100 text-emerald-700',
	},
	{
		photo:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
		name: 'Vũ Thị Hà',
		title: 'Founder, Coolmate',
		topic: 'Bài học sau 5 năm bán quần áo online',
		tagBg: 'bg-cyan-100 text-cyan-700',
	},
];

export default function Speakers() {
	return (
		<section id='speakers' className='py-24 px-4 bg-slate-50 relative overflow-hidden'>
			<div
				aria-hidden
				className='absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-200/40 to-amber-200/30 blur-3xl pointer-events-none'
			/>

			<div className='container mx-auto max-w-6xl relative'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12'
				>
					<div className='max-w-xl'>
						<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
							Diễn giả nổi bật
						</span>
						<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
							Học từ những người đang dẫn đầu ngành
						</h2>
					</div>
					<a
						href='#'
						className='text-sm font-semibold text-rose-600 hover:text-rose-700'
					>
						Xem 25+ diễn giả →
					</a>
				</motion.div>

				<div className='grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5'>
					{SPEAKERS.map((s, i) => (
						<motion.article
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.45, delay: i * 0.05 }}
							className='group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all'
						>
							<div className='relative aspect-[4/5] bg-slate-200 overflow-hidden'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={s.photo}
									alt={s.name}
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent'
								/>

								<div className='absolute bottom-4 left-4 right-4 text-white'>
									<span
										className={`inline-flex items-center text-[10px] font-semibold ${s.tagBg} px-2 py-1 rounded-full mb-3 backdrop-blur-sm`}
									>
										{s.topic}
									</span>
									<h3 className='font-heading font-bold text-lg leading-tight'>
										{s.name}
									</h3>
									<p className='text-white/80 text-xs mt-0.5'>{s.title}</p>
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
