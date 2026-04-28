'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/highlight';

const TEMPLATES = [
	{ icon: '📚', name: 'Khóa học', color: 'bg-blue-100 text-blue-700' },
	{ icon: '🛒', name: 'Shop online', color: 'bg-rose-100 text-rose-700' },
	{ icon: '💼', name: 'Dịch vụ', color: 'bg-violet-100 text-violet-700' },
	{ icon: '🎯', name: 'Coaching', color: 'bg-amber-100 text-amber-700' },
];

const AI_RESPONSE =
	'Tôi đang tạo landing page cho khóa học luyện thi THPT của bạn. Headline: "Chinh Phục Điểm 10 — Luyện Thi THPT Cùng Chuyên Gia"...';

export default function Hero() {
	const [typed, setTyped] = useState('');
	const [started, setStarted] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setStarted(true), 1200);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		if (!started) return;
		if (typed.length >= AI_RESPONSE.length) return;
		const t = setTimeout(() => setTyped(AI_RESPONSE.slice(0, typed.length + 1)), 28);
		return () => clearTimeout(t);
	}, [typed, started]);

	return (
		<section className='relative pt-24 pb-16 bg-white overflow-hidden'>
			{/* Subtle grid bg */}
			<div
				className='absolute inset-0 pointer-events-none opacity-40'
				style={{
					backgroundImage:
						'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
					backgroundSize: '40px 40px',
				}}
			/>

			<div className='relative container mx-auto px-4 max-w-7xl'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center'>
					{/* Left: Copy */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className='space-y-6'
					>
						{/* Badge */}
						<div className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 text-sm text-blue-700 font-medium'>
							<span className='text-blue-500'>✦</span>
							Nền tảng AI bán hàng all-in-one
						</div>

						{/* Headline */}
						<h1
							className='font-heading text-3xl sm:text-4xl xl:text-5xl font-bold tracking-normal text-slate-900'
							style={{ lineHeight: '1.4' }}
						>
							Hệ Thống Bán Hàng Chạy 24/7 — Xây Xong Trong <Highlight variant='blue'>7 Ngày</Highlight>,
							Không Cần Dev
						</h1>

						{/* Subheadline */}
						<p className='text-lg text-slate-600 leading-relaxed max-w-lg'>
							<strong className='text-slate-800 font-semibold'>
								Từ ý tưởng đến hệ thống bán hàng hoàn chỉnh — chỉ trong 7 ngày.
							</strong>
							<br />
							Chọn template đẹp, chat với AI ngay trên SellOS — landing page, chatbot, thanh toán, admin
							panel, email automation. Tất cả trong 1 nền tảng.
						</p>

						{/* CTAs */}
						<div className='flex flex-col sm:flex-row gap-3'>
							<Button
								asChild
								size='lg'
								className='bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-8 h-12 shadow-md shadow-blue-200'
							>
								<Link href='#pricing'>🚀 Bắt Đầu Miễn Phí</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-base px-8 h-12'
							>
								<Link href='#templates'>▶ Xem Template Mẫu</Link>
							</Button>
						</div>

						{/* Social proof */}
						<div className='flex flex-wrap items-center gap-3 pt-1 text-sm text-slate-500'>
							<span className='flex items-center gap-1.5'>
								<span className='text-green-500 font-semibold'>✓</span>
								200+ hệ thống đã ra mắt
							</span>
							<span className='text-slate-300'>·</span>
							<span className='flex items-center gap-1.5'>
								<span className='text-green-500 font-semibold'>✓</span>
								Xây trong 7 ngày
							</span>
							<span className='text-slate-300'>·</span>
							<span className='flex items-center gap-1.5'>
								<span className='text-green-500 font-semibold'>✓</span>
								Hoàn tiền 100%
							</span>
						</div>
					</motion.div>

					{/* Right: Platform Mockup */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
					>
						<div className='rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 overflow-hidden'>
							{/* Browser chrome */}
							<div className='flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200'>
								<span className='w-3 h-3 rounded-full bg-red-400' />
								<span className='w-3 h-3 rounded-full bg-yellow-400' />
								<span className='w-3 h-3 rounded-full bg-green-400' />
								<div className='flex-1 ml-2 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200'>
									app.sellos.vn/workspace
								</div>
							</div>

							{/* 3-panel layout */}
							<div className='grid grid-cols-[140px_1fr_1fr] h-[300px] sm:h-[340px]'>
								{/* Panel 1: Templates */}
								<div className='border-r border-slate-100 bg-slate-50 p-3 flex flex-col gap-1.5 overflow-hidden'>
									<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1'>
										Template
									</p>
									{TEMPLATES.map((t, i) => (
										<div
											key={i}
											className={`flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer text-xs font-medium transition-all ${
												i === 0
													? 'bg-blue-600 text-white shadow-sm'
													: 'hover:bg-white text-slate-600'
											}`}
										>
											<span>{t.icon}</span>
											<span className='truncate'>{t.name}</span>
										</div>
									))}
								</div>

								{/* Panel 2: Chat */}
								<div className='border-r border-slate-100 flex flex-col'>
									{/* Chat header */}
									<div className='px-3 py-2 border-b border-slate-100 flex items-center gap-2'>
										<div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold'>
											AI
										</div>
										<span className='text-xs font-semibold text-slate-700'>SellOS AI</span>
										<span className='ml-auto w-1.5 h-1.5 rounded-full bg-green-400' />
									</div>

									{/* Messages */}
									<div className='flex-1 p-3 space-y-2 overflow-hidden'>
										{/* User message */}
										<div className='flex justify-end'>
											<div className='bg-blue-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed'>
												Tôi bán khóa học luyện thi THPT, giá 499k, target học sinh lớp 12
											</div>
										</div>

										{/* AI message */}
										<div className='flex gap-2 items-end'>
											<div className='w-5 h-5 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-slate-500'>
												AI
											</div>
											<div className='bg-slate-100 text-slate-700 text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed'>
												{typed || ' '}
												{typed.length < AI_RESPONSE.length && started && (
													<span className='inline-block w-0.5 h-3 bg-blue-500 ml-0.5 animate-pulse align-middle' />
												)}
											</div>
										</div>
									</div>

									{/* Input */}
									<div className='px-3 pb-3'>
										<div className='flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2'>
											<span className='text-xs text-slate-400 flex-1'>Nhắn tin với AI...</span>
											<div className='w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center'>
												<span className='text-white text-[10px]'>↑</span>
											</div>
										</div>
									</div>
								</div>

								{/* Panel 3: Preview */}
								<div className='bg-slate-50 p-3 flex flex-col gap-2 overflow-hidden'>
									<p className='text-[10px] font-semibold text-slate-400 uppercase tracking-wider'>
										Preview
									</p>
									{/* Mini landing page wireframe */}
									<div className='bg-white rounded-lg border border-slate-200 p-2 flex-1 flex flex-col gap-1.5'>
										{/* Navbar */}
										<div className='h-2 bg-slate-100 rounded w-full' />
										{/* Hero */}
										<div className='bg-blue-50 rounded p-2 flex flex-col gap-1'>
											<div className='h-2 bg-blue-200 rounded w-4/5' />
											<div className='h-1.5 bg-blue-100 rounded w-3/5' />
											<div className='h-4 bg-blue-600 rounded w-2/5 mt-1' />
										</div>
										{/* Features */}
										<div className='grid grid-cols-3 gap-1'>
											{[1, 2, 3].map((i) => (
												<div key={i} className='bg-slate-100 rounded p-1 flex flex-col gap-0.5'>
													<div className='h-1.5 bg-slate-200 rounded' />
													<div className='h-1 bg-slate-200 rounded w-3/4' />
												</div>
											))}
										</div>
										{/* CTA */}
										<div className='h-4 bg-blue-500 rounded w-3/5 mx-auto' />
										{/* Generating badge */}
										<div className='flex items-center gap-1 mt-auto'>
											<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
											<span className='text-[8px] text-green-600 font-medium'>Đang tạo...</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
