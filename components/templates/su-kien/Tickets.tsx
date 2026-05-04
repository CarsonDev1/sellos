'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const TICKETS = [
	{
		name: 'Standard',
		tagline: 'Cho khách tham dự bình thường',
		price: 990_000,
		original_price: 1_490_000,
		seats_left: 'Còn 87 chỗ',
		features: [
			'Vé tham dự cả ngày',
			'Cafe sáng + lunch',
			'Tài liệu dạng số',
			'Quà tặng từ ban tổ chức',
		],
		featured: false,
	},
	{
		name: 'Premium',
		tagline: 'Cho người muốn networking sâu',
		price: 2_490_000,
		original_price: 3_490_000,
		seats_left: 'Còn 23 chỗ',
		features: [
			'Tất cả của Standard',
			'Chỗ ngồi VIP gần sân khấu',
			'Networking lounge cả ngày',
			'1 buổi gặp mentor 1-1 (30 phút)',
			'Túi swag premium',
		],
		featured: true,
	},
	{
		name: 'Platinum',
		tagline: 'Cho founder, CEO, nhà đầu tư',
		price: 7_990_000,
		original_price: 9_990_000,
		seats_left: 'Còn 8 chỗ',
		features: [
			'Tất cả của Premium',
			'Bữa tối VIP với diễn giả',
			'2 buổi gặp riêng diễn giả (60 phút)',
			'Quyền vào after-party',
			'Logo công ty hiển thị trên LED',
			'Recording toàn bộ session',
		],
		featured: false,
	},
];

function fmt(n: number) {
	return new Intl.NumberFormat('vi-VN').format(n) + 'đ';
}

export default function Tickets() {
	return (
		<section id='tickets' className='py-24 px-4 bg-gradient-to-b from-slate-50 to-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Hạng vé
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Chọn vé phù hợp với bạn
					</h2>
					<p className='text-slate-500'>
						Mua sớm — giảm 30% cho mọi hạng vé. Ưu đãi kết thúc 28/02/2026.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto'>
					{TICKETS.map((t, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.07 }}
							className={`relative rounded-2xl p-7 transition-all ${
								t.featured
									? 'bg-gradient-to-br from-slate-900 via-rose-950 to-purple-950 text-white shadow-2xl shadow-rose-500/20 -my-2 sm:-my-4 sm:scale-105'
									: 'bg-white border border-slate-200 hover:shadow-md'
							}`}
						>
							{t.featured && (
								<div className='absolute -top-3 left-1/2 -translate-x-1/2'>
									<span className='inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
										<Sparkles className='w-3 h-3' />
										Phổ biến nhất
									</span>
								</div>
							)}

							<div className='mb-6'>
								<h3
									className={`font-heading font-bold text-xl mb-1 ${
										t.featured ? 'text-white' : 'text-slate-900'
									}`}
								>
									{t.name}
								</h3>
								<p
									className={`text-sm ${
										t.featured ? 'text-white/70' : 'text-slate-500'
									}`}
								>
									{t.tagline}
								</p>
							</div>

							<div className='mb-6'>
								<div className='flex items-baseline gap-2 mb-1'>
									<span
										className={`font-heading font-bold text-3xl tracking-tight ${
											t.featured ? 'text-white' : 'text-slate-900'
										}`}
									>
										{fmt(t.price)}
									</span>
									<span
										className={`line-through text-sm ${
											t.featured ? 'text-white/40' : 'text-slate-400'
										}`}
									>
										{fmt(t.original_price)}
									</span>
								</div>
								<span
									className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
										t.featured
											? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
											: 'bg-rose-50 text-rose-700 border border-rose-200'
									}`}
								>
									<span className={`w-1.5 h-1.5 rounded-full ${t.featured ? 'bg-rose-300' : 'bg-rose-500'} animate-pulse`} />
									{t.seats_left}
								</span>
							</div>

							<ul className='space-y-2.5 mb-7'>
								{t.features.map((f, j) => (
									<li
										key={j}
										className={`flex items-start gap-2 text-sm ${
											t.featured ? 'text-white/85' : 'text-slate-600'
										}`}
									>
										<Check
											className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
												t.featured ? 'text-amber-300' : 'text-rose-600'
											}`}
											strokeWidth={3}
										/>
										{f}
									</li>
								))}
							</ul>

							<button
								className={`w-full font-bold py-3 rounded-xl transition-colors ${
									t.featured
										? 'bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-900 shadow-lg shadow-rose-500/30'
										: 'bg-slate-900 hover:bg-slate-800 text-white'
								}`}
							>
								Mua vé này
							</button>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
