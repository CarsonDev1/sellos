'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Target } from 'lucide-react';

const CASES = [
	{
		image:
			'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80',
		client: 'Highlands Coffee',
		industry: 'F&B / Chuỗi cửa hàng',
		challenge:
			'Doanh thu online ổn định nhưng không tăng. Chi phí quảng cáo Meta tăng 40% nhưng doanh thu chỉ tăng 8%.',
		solution:
			'Audit pixel, build lại structure campaign theo customer journey, chuyển 30% ngân sách sang TikTok Ads.',
		result_label: 'Tăng doanh thu trong 90 ngày',
		result_value: '+185%',
		result_icon: TrendingUp,
		tag: 'Performance Marketing',
		tagBg: 'bg-blue-100 text-blue-700',
	},
	{
		image:
			'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
		client: 'Ánh Dương Pharmacy',
		industry: 'Dược / Bán lẻ',
		challenge:
			'Mở rộng từ 4 lên 12 chi nhánh nhưng thương hiệu chưa đồng nhất, mỗi cửa hàng nhìn khác nhau.',
		solution:
			'Workshop định vị 2 ngày, brand book mới, hệ thống nhận diện áp dụng đồng bộ trong 6 tuần.',
		result_label: 'Giảm chi phí thiết kế nội bộ',
		result_value: '-62%',
		result_icon: TrendingDown,
		tag: 'Brand Strategy',
		tagBg: 'bg-violet-100 text-violet-700',
	},
	{
		image:
			'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
		client: 'GreenLife Organic',
		industry: 'Thực phẩm sạch / D2C',
		challenge:
			'Khách mua 1 lần rồi không quay lại. Tỷ lệ tái mua chỉ 12%, LTV thấp.',
		solution:
			'Setup CRM, phân khúc RFM, triển khai email + SMS automation 5 bước theo customer journey.',
		result_label: 'Tỷ lệ khách quay lại',
		result_value: '12% → 38%',
		result_icon: Target,
		tag: 'CX & Retention',
		tagBg: 'bg-cyan-100 text-cyan-700',
	},
];

export default function CaseStudies() {
	return (
		<section id='case-studies' className='py-24 px-4 bg-slate-50'>
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
							Case studies
						</span>
						<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
							Kết quả thật từ khách hàng thật
						</h2>
					</div>
					<a
						href='#contact'
						className='inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700'
					>
						Xem tất cả case study
						<ArrowRight className='w-4 h-4' />
					</a>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					{CASES.map((c, i) => {
						const Icon = c.result_icon;
						return (
							<motion.article
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.07 }}
								className='group relative rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all'
							>
								{/* Photo with overlay */}
								<div className='relative h-52 overflow-hidden bg-slate-100'>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={c.image}
										alt={c.client}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
									/>
									<div
										aria-hidden
										className='absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent'
									/>
									<span
										className={`absolute top-4 left-4 inline-flex text-[11px] font-semibold ${c.tagBg} px-2.5 py-1 rounded-full backdrop-blur-sm`}
									>
										{c.tag}
									</span>

									{/* Result over photo */}
									<div className='absolute bottom-4 left-4 right-4 text-white'>
										<div className='flex items-center gap-2 text-white/80 text-xs mb-1'>
											<Icon className='w-3.5 h-3.5' />
											{c.result_label}
										</div>
										<p className='font-heading font-bold text-4xl tracking-tight leading-none'>
											{c.result_value}
										</p>
									</div>
								</div>

								{/* Content */}
								<div className='p-6'>
									<h3 className='font-heading font-bold text-slate-900 text-lg leading-tight'>
										{c.client}
									</h3>
									<p className='text-slate-400 text-xs mb-4'>{c.industry}</p>

									<div className='space-y-3'>
										<div>
											<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1'>
												Vấn đề
											</p>
											<p className='text-slate-600 text-sm leading-relaxed'>{c.challenge}</p>
										</div>
										<div>
											<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1'>
												Giải pháp
											</p>
											<p className='text-slate-600 text-sm leading-relaxed'>{c.solution}</p>
										</div>
									</div>
								</div>
							</motion.article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
