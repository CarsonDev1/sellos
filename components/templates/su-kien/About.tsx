'use client';

import { motion } from 'framer-motion';

const HIGHLIGHTS = [
	{
		image:
			'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
		title: '25 diễn giả hàng đầu',
		description: 'Founders, CMOs, VC partner — chia sẻ thật, không bài tập PR.',
	},
	{
		image:
			'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
		title: '1.500+ người tham dự',
		description: 'Networking với cộng đồng startup, e-commerce cả nước.',
	},
	{
		image:
			'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
		title: '6 workshop chuyên sâu',
		description: 'Học cụ thể về AI, growth marketing, branding, fundraising.',
	},
	{
		image:
			'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
		title: 'Networking lounge VIP',
		description: 'Khu riêng cho VIP gặp gỡ diễn giả &amp; nhà đầu tư 1:1.',
	},
];

const STATS = [
	{ value: '1.500+', label: 'Khách dự kiến' },
	{ value: '25+', label: 'Diễn giả' },
	{ value: '5 năm', label: 'Tổ chức liên tục' },
];

export default function About() {
	return (
		<section id='about' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-16'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Về sự kiện
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4'>
						Một ngày — đủ để thay đổi cách bạn vận hành công ty
					</h2>
					<p className='text-slate-500 leading-relaxed'>
						Vietnam Summit 2026 quy tụ những người đang thực sự xây dựng và mở rộng doanh nghiệp tại Việt Nam.
						Không bài tập diễn thuyết. Không slide khô khan. Chỉ kinh nghiệm thật và kết nối thật.
					</p>
				</motion.div>

				{/* Stats */}
				<div className='grid grid-cols-3 max-w-3xl mx-auto rounded-2xl border border-slate-200 divide-x divide-slate-100 bg-gradient-to-br from-rose-50/40 to-amber-50/40 mb-14'>
					{STATS.map((s, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4, delay: i * 0.06 }}
							className='py-7 px-4 text-center'
						>
							<p className='font-heading font-bold text-3xl sm:text-4xl bg-gradient-to-br from-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight'>
								{s.value}
							</p>
							<p className='text-slate-500 text-sm mt-1'>{s.label}</p>
						</motion.div>
					))}
				</div>

				{/* Highlights with photos */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
					{HIGHLIGHTS.map(({ image, title, description }, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.45, delay: i * 0.06 }}
							className='group relative rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all'
						>
							<div className='relative aspect-[4/5] bg-slate-100 overflow-hidden'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={image}
									alt={title}
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-slate-900/0'
								/>
								<div className='absolute bottom-5 left-5 right-5 text-white'>
									<h3 className='font-heading font-bold text-base mb-1.5 leading-snug'>
										{title}
									</h3>
									<p className='text-white/85 text-xs leading-relaxed'>{description}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
