'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Play, Star, Clock, Users, Award } from 'lucide-react';

const HERO_IMG =
	'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85';

const HIGHLIGHTS = [
	{ icon: Clock, text: 'Học 1-2 giờ/ngày, theo nhịp của bạn' },
	{ icon: Users, text: 'Cộng đồng 1.200+ học viên đang học' },
	{ icon: Award, text: 'Chứng chỉ hoàn thành được công nhận' },
];

const STAT_AVATARS = [
	'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120&q=80',
	'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
];

export default function CourseHero() {
	return (
		<section className='relative pt-28 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-white'>
			<div
				aria-hidden
				className='absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white'
			/>
			<div
				aria-hidden
				className='absolute -top-40 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-transparent blur-3xl pointer-events-none'
			/>

			<div className='container mx-auto max-w-7xl px-4'>
				<div className='grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center'>
					{/* Left: Copy */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className='space-y-7'
					>
						<div className='inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full pl-1 pr-3 py-1 text-sm shadow-sm'>
							<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-white'>
								<Star className='w-3.5 h-3.5' fill='currentColor' />
							</span>
							<span className='text-amber-800 font-semibold'>4.9/5</span>
							<span className='text-amber-700 text-xs'>· 1.200+ học viên</span>
						</div>

						<h1
							className='font-heading text-4xl sm:text-5xl lg:text-[3.6rem] font-bold text-slate-900 tracking-tight'
							style={{ lineHeight: '1.08' }}
						>
							Bán hàng online từ 0 đến{' '}
							<span className='relative inline-block'>
								<span className='relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent'>
									đơn đầu tiên
								</span>
								<svg
									aria-hidden
									viewBox='0 0 200 8'
									className='absolute -bottom-1 left-0 w-full text-blue-300/60'
								>
									<path
										d='M2 5 Q 50 0 100 4 T 198 3'
										stroke='currentColor'
										strokeWidth='3'
										fill='none'
										strokeLinecap='round'
									/>
								</svg>
							</span>{' '}
							trong{' '}
							<span className='inline-block bg-blue-600 text-white px-3 py-0.5 rounded-xl tracking-tight align-baseline'>
								7 ngày
							</span>
						</h1>

						<p className='text-slate-600 text-lg leading-relaxed max-w-xl'>
							Khoá học thực chiến — bạn{' '}
							<strong className='text-slate-900'>làm thật, không chỉ xem video</strong>.
							Mỗi bài có bài tập, mỗi tuần ra một sản phẩm. Có người kèm khi cần.
						</p>

						{/* Highlight chips */}
						<div className='space-y-2.5'>
							{HIGHLIGHTS.map(({ icon: Icon, text }, i) => (
								<div key={i} className='flex items-center gap-3 text-slate-700 text-sm'>
									<span className='inline-flex w-7 h-7 rounded-full bg-blue-50 border border-blue-100 items-center justify-center flex-shrink-0'>
										<Icon className='w-3.5 h-3.5 text-blue-600' />
									</span>
									{text}
								</div>
							))}
						</div>

						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<a
								href='#gia'
								className='inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 h-12 rounded-xl shadow-lg shadow-blue-600/25 transition-colors'
							>
								Đăng ký học ngay
								<ArrowRight className='w-4 h-4' />
							</a>
							<a
								href='#chuong-trinh'
								className='inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-7 h-12 rounded-xl transition-colors'
							>
								<Play className='w-4 h-4 text-blue-600 fill-blue-600' />
								Xem chương trình
							</a>
						</div>

						<div className='flex flex-wrap items-center gap-4 pt-2'>
							<div className='flex -space-x-2'>
								{STAT_AVATARS.map((src, i) => (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										key={i}
										src={src}
										alt=''
										className='w-9 h-9 rounded-full border-2 border-white object-cover'
									/>
								))}
							</div>
							<div className='leading-tight text-sm text-slate-600'>
								<p>
									<span className='font-bold text-slate-900'>1.200+ học viên</span> đang học
								</p>
								<div className='flex items-center gap-1 mt-0.5'>
									<Check className='w-3.5 h-3.5 text-green-600' strokeWidth={3} />
									<span className='text-xs'>Hoàn tiền 100% trong 7 ngày</span>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Right: Course preview card with photo */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.15 }}
						className='relative'
					>
						<div className='absolute -inset-4 bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-violet-200/30 rounded-[2.5rem] blur-2xl -z-10' />

						<div className='relative bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-300/40 overflow-hidden'>
							{/* Course thumbnail with photo */}
							<div className='relative aspect-video bg-slate-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={HERO_IMG}
									alt='Khoá học bán hàng online'
									className='absolute inset-0 w-full h-full object-cover'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-slate-900/40'
								/>

								{/* Live badge */}
								<div className='absolute top-4 left-4 inline-flex items-center gap-1.5 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full'>
									<span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
									ĐANG TUYỂN SINH
								</div>

								{/* Play button */}
								<button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/95 hover:bg-white shadow-2xl flex items-center justify-center group transition-all hover:scale-105'>
									<Play
										className='w-6 h-6 text-blue-600 fill-blue-600 ml-1'
										strokeWidth={0}
									/>
								</button>

								{/* Course title */}
								<div className='absolute bottom-4 left-4 right-4 text-white'>
									<p className='text-xs text-blue-200 font-semibold mb-1 uppercase tracking-wider'>
										Khoá học flagship
									</p>
									<p className='font-heading font-bold text-xl tracking-tight leading-tight'>
										Bán hàng online — từ 0 đến đơn đầu
									</p>
								</div>
							</div>

							{/* Stats */}
							<div className='grid grid-cols-3 divide-x divide-slate-100'>
								{[
									{ value: '5', label: 'Module' },
									{ value: '38', label: 'Bài học' },
									{ value: '12h', label: 'Tổng thời lượng' },
								].map((s, i) => (
									<div key={i} className='py-4 text-center'>
										<p className='font-heading font-bold text-slate-900 text-xl tracking-tight'>
											{s.value}
										</p>
										<p className='text-xs text-slate-500 mt-0.5'>{s.label}</p>
									</div>
								))}
							</div>

							{/* Progress preview */}
							<div className='border-t border-slate-100 p-5 space-y-3'>
								<p className='text-[11px] font-semibold text-slate-400 uppercase tracking-wider'>
									Tiến độ học mẫu
								</p>
								{[
									{ name: 'Module 1: Hiểu khách hàng', percent: 100, status: 'Hoàn thành', color: 'green' },
									{ name: 'Module 2: Dựng landing page', percent: 60, status: 'Đang học', color: 'blue' },
									{ name: 'Module 3: Quảng cáo cơ bản', percent: 0, status: 'Khoá', color: 'slate' },
								].map((m, i) => (
									<div key={i} className='space-y-1.5'>
										<div className='flex items-center justify-between text-xs'>
											<span
												className={`font-medium ${
													m.percent === 0 ? 'text-slate-400' : 'text-slate-700'
												}`}
											>
												{m.name}
											</span>
											<span
												className={`font-semibold ${
													m.color === 'green'
														? 'text-emerald-600'
														: m.color === 'blue'
															? 'text-blue-600'
															: 'text-slate-400'
												}`}
											>
												{m.status}
											</span>
										</div>
										<div className='h-1.5 bg-slate-100 rounded-full overflow-hidden'>
											<motion.div
												initial={{ width: 0 }}
												animate={{ width: `${m.percent}%` }}
												transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
												className={`h-full rounded-full ${
													m.color === 'green'
														? 'bg-gradient-to-r from-emerald-400 to-green-500'
														: m.color === 'blue'
															? 'bg-gradient-to-r from-blue-500 to-indigo-500'
															: 'bg-slate-300'
												}`}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Floating instructor card */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
							className='absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 flex items-center gap-3 max-w-[260px]'
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src='https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80'
								alt='Instructor'
								className='w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm'
							/>
							<div className='leading-tight min-w-0'>
								<p className='text-xs text-slate-500'>Giảng viên</p>
								<p className='font-heading font-bold text-slate-900 text-sm truncate'>
									Đặng Hoàng Nam
								</p>
								<p className='text-xs text-blue-600 font-semibold mt-0.5'>
									Founder Shopee Seller Academy
								</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
