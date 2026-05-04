'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';

const HERO_IMG =
	'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80';

const TRUST_AVATARS = [
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
];

export default function Hero() {
	return (
		<section className='relative pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white'>
			<div
				aria-hidden
				className='absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-white'
			/>
			<div
				aria-hidden
				className='absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-200/40 via-blue-200/30 to-transparent blur-3xl pointer-events-none'
			/>

			<div className='container mx-auto max-w-7xl px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center'>
					{/* Left: Copy */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='space-y-7'
					>
						<div className='inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1.5 pr-4 py-1 text-sm shadow-sm'>
							<span className='inline-flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full'>
								<Sparkles className='w-3 h-3' />
								2026
							</span>
							<span className='text-slate-700'>
								Đã đồng hành cùng <strong className='text-slate-900'>150+ thương hiệu Việt</strong>
							</span>
						</div>

						<h1
							className='font-heading text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-slate-900 tracking-tight'
							style={{ lineHeight: '1.08' }}
						>
							Tăng tốc thương hiệu của bạn{' '}
							<span className='relative inline-block'>
								<span className='relative z-10 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent'>
									với chiến lược dữ liệu
								</span>
								<svg
									aria-hidden
									viewBox='0 0 200 8'
									className='absolute -bottom-1 left-0 w-full text-indigo-300/60'
								>
									<path
										d='M2 5 Q 50 0 100 4 T 198 3'
										stroke='currentColor'
										strokeWidth='3'
										fill='none'
										strokeLinecap='round'
									/>
								</svg>
							</span>
						</h1>

						<p className='text-slate-600 text-lg leading-relaxed max-w-xl'>
							ApexStudio là agency chiến lược + thực thi cho doanh nghiệp Việt muốn
							tăng trưởng nhanh và bền vững.{' '}
							<strong className='text-slate-900'>Tư vấn → Triển khai → Đo lường</strong>{' '}
							— minh bạch ở mỗi bước.
						</p>

						<div className='flex flex-col sm:flex-row gap-3'>
							<a
								href='#contact'
								className='inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 h-12 rounded-xl shadow-lg shadow-slate-900/15 transition-colors'
							>
								Đặt lịch tư vấn 30 phút
								<ArrowRight className='w-4 h-4' />
							</a>
							<a
								href='#case-studies'
								className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-7 h-12 rounded-xl transition-colors'
							>
								<Play className='w-4 h-4 text-indigo-600 fill-indigo-600' />
								Xem case study
							</a>
						</div>

						{/* Social proof */}
						<div className='flex flex-wrap items-center gap-4 pt-2'>
							<div className='flex -space-x-2'>
								{TRUST_AVATARS.map((src, i) => (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										key={i}
										src={src}
										alt=''
										className='w-9 h-9 rounded-full border-2 border-white object-cover'
									/>
								))}
							</div>
							<div className='leading-tight'>
								<div className='flex items-center gap-1 mb-0.5'>
									{Array.from({ length: 5 }).map((_, i) => (
										<Star key={i} className='w-3.5 h-3.5 text-amber-400' fill='currentColor' />
									))}
									<span className='text-sm font-semibold text-slate-700 ml-1'>4.9/5</span>
								</div>
								<p className='text-xs text-slate-500'>
									Từ 89 đánh giá của khách hàng B2B
								</p>
							</div>
						</div>
					</motion.div>

					{/* Right: Hero image with floating cards */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
						className='relative'
					>
						<div className='relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 aspect-[4/5] sm:aspect-[5/6]'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={HERO_IMG}
								alt='Đội ngũ làm việc'
								className='absolute inset-0 w-full h-full object-cover'
							/>
							<div
								aria-hidden
								className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent'
							/>

							{/* Top-left badge */}
							<div className='absolute top-6 left-6 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full pl-1 pr-3 py-1 shadow-md'>
								<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold'>
									✓
								</span>
								<span className='text-xs font-semibold text-slate-800'>
									Đang nhận dự án 2026
								</span>
							</div>
						</div>

						{/* Floating stat card 1 */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className='absolute -left-4 sm:-left-8 bottom-24 sm:bottom-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-[200px]'
						>
							<div className='flex items-center gap-3 mb-2'>
								<div className='w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth={2.5}
									>
										<path strokeLinecap='round' strokeLinejoin='round' d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
									</svg>
								</div>
								<div className='leading-tight'>
									<p className='font-heading font-bold text-slate-900 text-base'>+185%</p>
									<p className='text-xs text-slate-500'>Doanh thu trung bình</p>
								</div>
							</div>
							<div className='h-1.5 bg-slate-100 rounded-full overflow-hidden'>
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: '78%' }}
									transition={{ duration: 1.2, delay: 0.8 }}
									className='h-full bg-gradient-to-r from-emerald-500 to-teal-600'
								/>
							</div>
						</motion.div>

						{/* Floating stat card 2 */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							className='absolute -right-2 sm:-right-6 top-24 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-[180px]'
						>
							<p className='text-xs text-slate-500 mb-1'>Dự án đang chạy</p>
							<p className='font-heading font-bold text-slate-900 text-2xl mb-2 tracking-tight'>
								24
								<span className='text-base text-slate-400 font-medium'> active</span>
							</p>
							<div className='flex -space-x-1.5'>
								{['bg-rose-400', 'bg-amber-400', 'bg-blue-500', 'bg-emerald-500', 'bg-violet-500'].map((c, i) => (
									<div
										key={i}
										className={`w-5 h-5 rounded-full ${c} border-2 border-white`}
									/>
								))}
								<div className='w-5 h-5 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-600'>
									+19
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
