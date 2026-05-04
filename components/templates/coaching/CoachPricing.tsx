'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Sparkles, Shield, Clock } from 'lucide-react';

const PLANS = [
	{
		name: 'Starter',
		tagline: 'Bắt đầu — học cùng nhóm nhỏ',
		price: '4.900.000',
		per: '/ tháng',
		duration: '4 tuần',
		sessions: '4 buổi',
		audience: 'Cho người mới muốn thử coaching',
		features: [
			{ text: 'Coaching nhóm 4 buổi / tháng', highlight: false },
			{ text: 'Tối đa 6 người / nhóm', highlight: false },
			{ text: 'Cộng đồng riêng + tài liệu đầy đủ', highlight: false },
			{ text: 'Check-in hàng tuần với coach', highlight: false },
			{ text: 'Review case study thực tế', highlight: false },
		],
		cta: 'Bắt đầu Starter',
		featured: false,
	},
	{
		name: 'Growth',
		tagline: 'Phổ biến — tăng tốc cá nhân hóa',
		price: '9.900.000',
		per: '/ tháng',
		duration: '12 tuần',
		sessions: '4 buổi 1-1 / tháng',
		audience: 'Cho người sẵn sàng nghiêm túc',
		features: [
			{ text: '4 buổi coaching 1-1 / tháng', highlight: true },
			{ text: 'Lộ trình 90 ngày cá nhân hoá', highlight: true },
			{ text: 'Hỗ trợ qua chat không giới hạn', highlight: false },
			{ text: 'Review chiến lược hàng tháng', highlight: false },
			{ text: 'Cam kết hoàn tiền nếu miss KPI', highlight: false },
			{ text: 'Ghi hình tất cả buổi coaching', highlight: false },
		],
		cta: 'Chọn gói Growth',
		featured: true,
	},
	{
		name: 'VIP',
		tagline: 'Toàn diện — cho founder nghiêm túc',
		price: '24.000.000',
		per: '/ tháng',
		duration: '6 tháng',
		sessions: '8 buổi 1-1 / tháng',
		audience: 'Cho doanh nhân muốn bứt phá',
		features: [
			{ text: '8 buổi coaching 1-1 / tháng', highlight: true },
			{ text: 'Hotline trực tiếp 24/7', highlight: true },
			{ text: '1 VIP Intensive day / quý', highlight: true },
			{ text: 'Kết nối với nhà đầu tư & đối tác', highlight: false },
			{ text: 'Quyền đặt lịch ưu tiên', highlight: false },
			{ text: 'Toàn bộ tính năng của Growth', highlight: false },
		],
		cta: 'Liên hệ VIP',
		featured: false,
	},
];

const TRUST = [
	{ icon: Shield, label: 'Hoàn tiền 100% nếu không đạt KPI' },
	{ icon: Clock, label: 'Tư vấn miễn phí 30 phút trước khi cam kết' },
	{ icon: Check, label: 'Hợp đồng minh bạch theo KPI' },
];

export default function CoachPricing() {
	return (
		<section id='gia' className='py-24 px-4 bg-gradient-to-b from-slate-50 to-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-amber-700 uppercase tracking-[0.15em] mb-3'>
						Chi phí
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4'>
						Đầu tư cho chính bạn —{' '}
						<span className='bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent'>
							ROI cao nhất từng có
						</span>
					</h2>
					<p className='text-slate-500'>
						Mọi gói đều có buổi tư vấn miễn phí trước khi cam kết — đảm bảo chúng ta phù hợp.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
					{PLANS.map((p, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.08 }}
							className={`relative rounded-2xl overflow-hidden flex flex-col ${
								p.featured
									? 'bg-gradient-to-br from-slate-900 via-amber-950 to-orange-950 text-white shadow-2xl shadow-amber-500/20 lg:-my-3'
									: 'bg-white border border-slate-200 hover:shadow-md transition-shadow'
							}`}
						>
							{p.featured && (
								<>
									<div
										aria-hidden
										className='absolute -top-32 -right-32 w-64 h-64 bg-amber-500/30 rounded-full blur-3xl pointer-events-none'
									/>
									<div className='absolute top-5 right-5 inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg'>
										<Sparkles className='w-3 h-3' />
										Phổ biến nhất
									</div>
								</>
							)}

							<div className='relative p-7 sm:p-8 flex flex-col flex-1'>
								<div className='mb-6'>
									<h3
										className={`font-heading font-bold text-2xl ${
											p.featured ? 'text-white' : 'text-slate-900'
										}`}
									>
										{p.name}
									</h3>
									<p
										className={`text-sm mt-1 ${
											p.featured ? 'text-amber-200' : 'text-amber-700'
										}`}
									>
										{p.tagline}
									</p>
								</div>

								<div className='mb-5'>
									<div className='flex items-baseline gap-1.5'>
										<span
											className={`font-heading font-bold text-4xl tracking-tight ${
												p.featured ? 'text-white' : 'text-slate-900'
											}`}
										>
											{p.price}₫
										</span>
										<span
											className={`text-sm ${
												p.featured ? 'text-white/60' : 'text-slate-400'
											}`}
										>
											{p.per}
										</span>
									</div>
									<div
										className={`flex flex-wrap gap-2 mt-3 text-xs font-medium ${
											p.featured ? 'text-amber-200' : 'text-slate-600'
										}`}
									>
										<span
											className={`px-2.5 py-1 rounded-full ${
												p.featured
													? 'bg-white/10 border border-white/15'
													: 'bg-slate-100 border border-slate-200'
											}`}
										>
											{p.duration}
										</span>
										<span
											className={`px-2.5 py-1 rounded-full ${
												p.featured
													? 'bg-white/10 border border-white/15'
													: 'bg-slate-100 border border-slate-200'
											}`}
										>
											{p.sessions}
										</span>
									</div>
								</div>

								<p
									className={`text-xs mb-6 ${
										p.featured ? 'text-white/60' : 'text-slate-400'
									}`}
								>
									{p.audience}
								</p>

								<ul className='space-y-2.5 mb-7 flex-1'>
									{p.features.map((f, j) => (
										<li
											key={j}
											className={`flex items-start gap-2.5 text-sm leading-relaxed ${
												p.featured ? 'text-white/85' : 'text-slate-600'
											}`}
										>
											<span
												className={`inline-flex w-5 h-5 flex-shrink-0 rounded-full items-center justify-center mt-0.5 ${
													p.featured
														? f.highlight
															? 'bg-amber-400 text-slate-900'
															: 'bg-white/10 text-amber-300'
														: f.highlight
															? 'bg-amber-500 text-white'
															: 'bg-amber-100 text-amber-700'
												}`}
											>
												<Check className='w-3 h-3' strokeWidth={3} />
											</span>
											{f.text}
										</li>
									))}
								</ul>

								<Link
									href='/templates/coaching/dat-lich'
									className={`w-full inline-flex items-center justify-center py-3.5 rounded-xl text-sm font-bold transition-colors ${
										p.featured
											? 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 shadow-lg shadow-amber-500/30'
											: 'bg-slate-900 hover:bg-slate-800 text-white'
									}`}
								>
									{p.cta}
								</Link>
							</div>
						</motion.div>
					))}
				</div>

				{/* Trust strip */}
				<div className='mt-12 pt-8 border-t border-slate-200'>
					<div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600'>
						{TRUST.map(({ icon: Icon, label }, i) => (
							<div key={i} className='flex items-center gap-2'>
								<span className='inline-flex w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 items-center justify-center'>
									<Icon className='w-3 h-3 text-emerald-600' strokeWidth={3} />
								</span>
								{label}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
