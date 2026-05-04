'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Award } from 'lucide-react';

const COACH_PHOTO =
	'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=85';

const STATS = [
	{ value: '300+', label: 'Khách đã đồng hành' },
	{ value: '10', label: 'Năm kinh nghiệm' },
	{ value: '94%', label: 'Đạt mục tiêu' },
	{ value: '1 tỷ+', label: 'Doanh thu khách tạo' },
];

const PROOF = [
	'Phương pháp 3 lớp đã kiểm chứng trên 300+ doanh nghiệp',
	'Hoàn tiền 100% nếu không đạt mục tiêu sau 3 tháng',
	'Coaching 1-1, không nhóm lớn — tập trung 100% vào bạn',
];

const LOGOS = ['Forbes 30U30', 'Shark Tank VN', 'VinaCapital', 'VnEconomy', 'Cafef'];

export default function CoachHero() {
	return (
		<section className='relative pt-28 pb-20 px-4 overflow-hidden bg-slate-950 text-white'>
			{/* Backdrop */}
			<div
				aria-hidden
				className='absolute inset-0 -z-10'
				style={{
					background:
						'radial-gradient(ellipse 60% 60% at 80% 0%, rgba(217,119,6,0.25), transparent 60%), radial-gradient(ellipse 70% 50% at 20% 100%, rgba(124,58,237,0.2), transparent 70%)',
				}}
			/>
			<div
				aria-hidden
				className='absolute inset-0 opacity-[0.05] pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
					backgroundSize: '48px 48px',
					maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)',
					WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)',
				}}
			/>

			<div className='container mx-auto max-w-7xl'>
				<div className='grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center'>
					{/* Left */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='space-y-7'
					>
						<div className='inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold text-amber-300 uppercase tracking-[0.15em]'>
							<Award className='w-3.5 h-3.5' />
							Top Business Coach Vietnam 2024
						</div>

						<h1
							className='font-heading font-bold text-white text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight'
							style={{ lineHeight: '1.08' }}
						>
							Từ startup loay hoay
							<br />
							đến doanh thu{' '}
							<span className='relative inline-block'>
								<span className='relative z-10 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent'>
									1 tỷ / tháng
								</span>
								<svg
									aria-hidden
									viewBox='0 0 200 8'
									className='absolute -bottom-2 left-0 w-full text-amber-400/50'
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

						<p className='text-slate-300 text-lg leading-relaxed max-w-lg'>
							Tôi đã giúp 300+ doanh nhân Việt thoát khỏi vòng lặp &ldquo;cố gắng mà không lớn được&rdquo;
							— với lộ trình cá nhân hóa và cam kết kết quả rõ ràng.
						</p>

						<ul className='space-y-2.5'>
							{PROOF.map((p) => (
								<li
									key={p}
									className='flex items-start gap-3 text-slate-300 text-sm'
								>
									<span className='inline-flex w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 items-center justify-center flex-shrink-0 mt-0.5'>
										<Check className='w-3 h-3 text-amber-400' strokeWidth={3} />
									</span>
									{p}
								</li>
							))}
						</ul>

						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<Link
								href='/templates/coaching/dat-lich'
								className='inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 font-bold px-7 h-12 rounded-xl shadow-lg shadow-amber-500/30 transition-all'
							>
								Đặt buổi tư vấn miễn phí
								<ArrowRight className='w-4 h-4' />
							</Link>
							<a
								href='#ket-qua'
								className='inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-7 h-12 rounded-xl transition-all'
							>
								Xem kết quả khách
							</a>
						</div>

						<p className='text-slate-500 text-xs'>
							Tư vấn 30 phút · Hoàn toàn miễn phí · Không ép mua
						</p>
					</motion.div>

					{/* Right — Coach photo */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.15 }}
						className='relative'
					>
						<div className='relative max-w-md mx-auto'>
							{/* Glow */}
							<div
								aria-hidden
								className='absolute -inset-6 bg-gradient-to-br from-amber-400/30 via-orange-400/20 to-rose-400/20 rounded-[2.5rem] blur-2xl'
							/>

							<div className='relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 aspect-[4/5]'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={COACH_PHOTO}
									alt='Nguyễn Trọng Khoa — Business Coach'
									className='absolute inset-0 w-full h-full object-cover'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent'
								/>

								{/* Bottom info */}
								<div className='absolute bottom-6 left-6 right-6 text-white'>
									<p className='font-heading font-bold text-2xl tracking-tight'>
										Nguyễn Trọng Khoa
									</p>
									<p className='text-amber-300 text-sm font-semibold mt-0.5'>
										Business Coach · 10+ năm kinh nghiệm
									</p>
								</div>

								{/* Top badge */}
								<div className='absolute top-5 left-5 inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full pl-1 pr-3 py-1 shadow-lg'>
									<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white'>
										<Check className='w-3.5 h-3.5' strokeWidth={3} />
									</span>
									<span className='text-xs font-semibold text-slate-800'>
										Đang nhận khách Q1/2026
									</span>
								</div>
							</div>

							{/* Floating: rating */}
							<motion.div
								initial={{ opacity: 0, x: -16 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5, duration: 0.5 }}
								className='absolute -left-4 sm:-left-8 top-32 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3 max-w-[200px]'
							>
								<div className='flex flex-col'>
									<div className='flex gap-0.5 mb-1'>
										{Array.from({ length: 5 }).map((_, i) => (
											<Star
												key={i}
												className='w-3 h-3 text-amber-400'
												fill='currentColor'
											/>
										))}
									</div>
									<p className='font-heading font-bold text-slate-900 text-lg leading-none'>
										4.9 / 5
									</p>
									<p className='text-xs text-slate-500 mt-0.5'>240+ đánh giá</p>
								</div>
							</motion.div>

							{/* Floating: result */}
							<motion.div
								initial={{ opacity: 0, x: 16 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.65, duration: 0.5 }}
								className='absolute -right-4 sm:-right-8 bottom-28 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-[200px]'
							>
								<p className='text-xs text-slate-500 mb-1'>Khách trung bình</p>
								<p className='font-heading font-bold text-slate-900 text-2xl tracking-tight leading-tight'>
									+3.2x
								</p>
								<p className='text-xs text-emerald-700 font-semibold mt-1'>
									Doanh thu sau 6 tháng
								</p>
							</motion.div>
						</div>
					</motion.div>
				</div>

				{/* Featured logos strip */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className='mt-16 pt-10 border-t border-white/10'
				>
					<p className='text-center text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-5'>
						Xuất hiện trên
					</p>
					<div className='flex flex-wrap items-center justify-center gap-x-10 gap-y-4'>
						{LOGOS.map((l) => (
							<span
								key={l}
								className='font-heading font-bold text-slate-500 hover:text-slate-300 text-lg sm:text-xl tracking-tight transition-colors'
								style={{ letterSpacing: '-0.02em' }}
							>
								{l}
							</span>
						))}
					</div>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.6 }}
					className='grid grid-cols-2 sm:grid-cols-4 gap-px mt-10 bg-white/10 rounded-2xl overflow-hidden'
				>
					{STATS.map((s) => (
						<div
							key={s.label}
							className='bg-slate-900/80 backdrop-blur-sm px-6 py-6 text-center'
						>
							<p className='font-heading font-bold text-3xl text-amber-400 tracking-tight'>
								{s.value}
							</p>
							<p className='text-slate-400 text-xs mt-1'>{s.label}</p>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
