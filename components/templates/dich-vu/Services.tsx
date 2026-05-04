'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const SERVICES = [
	{
		image:
			'https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=800&q=80',
		name: 'Chiến lược thương hiệu',
		tagline: 'Xác định vị thế trong 8 tuần',
		description:
			'Đặt nền móng dài hạn — định vị, tone giọng, hệ thống nhận diện và kế hoạch ra mắt.',
		deliverables: [
			'Workshop định vị 2 ngày',
			'Brand book đầy đủ',
			'Lộ trình 12 tháng',
		],
		price_from: 'Từ 80tr',
		featured: false,
		accent: 'text-blue-600',
	},
	{
		image:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
		name: 'Performance Marketing',
		tagline: 'Tăng doanh thu, giảm CAC',
		description:
			'Vận hành Meta Ads, Google Ads, TikTok — tối ưu theo ROAS hàng tuần với báo cáo minh bạch.',
		deliverables: [
			'Chiến lược kênh + ngân sách',
			'Dashboard real-time cho khách',
			'Tối ưu hằng tuần, báo cáo hằng tháng',
		],
		price_from: 'Từ 35tr/tháng',
		featured: true,
		accent: 'text-indigo-600',
	},
	{
		image:
			'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
		name: 'Content & Sản xuất',
		tagline: 'Nội dung chuẩn brand, lên đều đặn',
		description:
			'Đội sản xuất nội bộ — quay, dựng, viết. Bạn không phải lo về tần suất hay chất lượng.',
		deliverables: [
			'15 video / tháng (TikTok + Reels)',
			'30 bài viết social',
			'2 buổi quay studio / tháng',
		],
		price_from: 'Từ 45tr/tháng',
		featured: false,
		accent: 'text-cyan-600',
	},
	{
		image:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
		name: 'Tư vấn dữ liệu & CX',
		tagline: 'Hiểu khách, giữ khách, tăng LTV',
		description:
			'Audit dữ liệu hiện có, xây dựng customer journey và automation giữ chân khách hàng cũ.',
		deliverables: [
			'Audit data + customer journey',
			'Setup CRM + email automation',
			'KPI dashboard + huấn luyện đội',
		],
		price_from: 'Từ 50tr',
		featured: false,
		accent: 'text-violet-600',
	},
];

export default function Services() {
	return (
		<section id='services' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12'
				>
					<div className='max-w-xl'>
						<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
							Dịch vụ
						</span>
						<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
							4 dịch vụ trọng tâm — chọn đúng việc cần làm trước
						</h2>
						<p className='text-slate-500'>
							Mỗi dịch vụ đều có scope rõ ràng, deliverables cụ thể và đội phụ trách riêng.
						</p>
					</div>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					{SERVICES.map((s, i) => (
						<motion.article
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.06 }}
							className={`group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all ${
								s.featured ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
							}`}
						>
							{/* Image */}
							<div className='relative h-48 overflow-hidden bg-slate-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={s.image}
									alt={s.name}
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/5 to-transparent'
								/>
								{s.featured && (
									<span className='absolute top-4 right-4 inline-flex items-center gap-1 bg-amber-400 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md'>
										Phổ biến nhất
									</span>
								)}
								<span className='absolute bottom-4 left-4 inline-flex items-center bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm'>
									{s.price_from}
								</span>
							</div>

							{/* Content */}
							<div className='p-6'>
								<h3 className='font-heading font-bold text-slate-900 text-xl mb-1.5 leading-snug'>
									{s.name}
								</h3>
								<p className={`text-sm font-medium mb-3 ${s.accent}`}>{s.tagline}</p>
								<p className='text-sm text-slate-600 leading-relaxed mb-5'>
									{s.description}
								</p>

								<ul className='space-y-2 mb-5'>
									{s.deliverables.map((d, j) => (
										<li key={j} className='flex items-start gap-2 text-sm text-slate-600'>
											<Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${s.accent}`} strokeWidth={3} />
											{d}
										</li>
									))}
								</ul>

								<a
									href='#contact'
									className={`inline-flex items-center gap-1.5 text-sm font-semibold ${s.accent} hover:underline`}
								>
									Tư vấn dịch vụ này
									<ArrowRight className='w-4 h-4' />
								</a>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
