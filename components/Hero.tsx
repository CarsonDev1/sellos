'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/highlight';
import {
	ArrowRight,
	Check,
	Globe,
	MessageCircle,
	CreditCard,
	Sparkles,
} from 'lucide-react';

const TYPED_LINES = [
	'Bạn: Tôi bán khóa học luyện thi THPT, giá 499k',
	'SellOS: Đang dựng trang web bán khóa học...',
	'SellOS: Đã viết tiêu đề "Chinh phục điểm 10 — Luyện thi THPT cùng chuyên gia"',
	'SellOS: Đang gắn nút "Đăng ký ngay" và form thanh toán...',
	'SellOS: Trang web đã sẵn sàng tại link riêng của bạn ✓',
];

export default function Hero() {
	const [lineIdx, setLineIdx] = useState(0);
	const [typed, setTyped] = useState('');

	useEffect(() => {
		if (lineIdx >= TYPED_LINES.length) return;
		const target = TYPED_LINES[lineIdx];
		if (typed.length < target.length) {
			const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 22);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => {
			setLineIdx((i) => i + 1);
			setTyped('');
		}, 1100);
		return () => clearTimeout(t);
	}, [typed, lineIdx]);

	return (
		<section className='relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white'>
			{/* Soft radial glow */}
			<div
				aria-hidden
				className='absolute inset-x-0 top-0 h-[600px] pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.08), transparent 70%)',
				}}
			/>
			{/* Subtle grid */}
			<div
				aria-hidden
				className='absolute inset-0 pointer-events-none opacity-[0.35]'
				style={{
					backgroundImage:
						'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
					backgroundSize: '48px 48px',
					maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 70%)',
					WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 70%)',
				}}
			/>

			<div className='relative container mx-auto px-4 max-w-7xl'>
				<div className='grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 xl:gap-16 items-center'>
					{/* Left: Copy */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className='space-y-7'
					>
						<div className='inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1.5 pr-4 py-1 text-sm text-slate-700 shadow-sm'>
							<span className='inline-flex items-center gap-1 bg-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full'>
								<Sparkles className='w-3 h-3' />
								Mới
							</span>
							Tự tạo website bán hàng — không cần biết code
						</div>

						<h1
							className='font-heading text-[2.1rem] sm:text-5xl xl:text-[3.4rem] font-bold text-slate-900 tracking-tight'
							style={{ lineHeight: '1.15' }}
						>
							Có ngay một website{' '}
							<Highlight variant='blue'>bán hàng tự động</Highlight>{' '}
							<span className='text-slate-500 font-medium'>chỉ trong</span>{' '}
							<span className='text-blue-600'>7 ngày.</span>
						</h1>

						<p className='text-lg text-slate-600 leading-relaxed max-w-xl'>
							Bạn cho biết{' '}
							<span className='font-semibold text-slate-900'>bán gì, giá bao nhiêu, ai là khách</span>
							. SellOS dựng cho bạn một website đẹp, kèm trợ lý trả lời khách 24/7
							và trang quản lý đơn hàng — không cần thuê lập trình viên, không cần ghép tool.
						</p>

						{/* Outcome chips */}
						<div className='flex flex-wrap gap-2'>
							{[
								{ icon: Globe, label: 'Website bán hàng riêng' },
								{ icon: MessageCircle, label: 'Trợ lý chốt đơn 24/7' },
								{ icon: CreditCard, label: 'Nhận thanh toán tự động' },
							].map(({ icon: Icon, label }) => (
								<span
									key={label}
									className='inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-sm text-slate-700 shadow-sm'
								>
									<Icon className='w-3.5 h-3.5 text-blue-600' />
									{label}
								</span>
							))}
						</div>

						<div className='flex flex-col sm:flex-row gap-3 pt-2'>
							<Button
								asChild
								size='lg'
								className='bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base px-7 h-12 shadow-lg shadow-blue-600/25'
							>
								<Link href='#pricing' className='flex items-center gap-2'>
									Bắt đầu miễn phí
									<ArrowRight className='w-4 h-4' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-base px-7 h-12'
							>
								<Link href='/templates/khoa-hoc'>Xem website mẫu</Link>
							</Button>
						</div>

						<div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 pt-1'>
							<span className='flex items-center gap-1.5'>
								<Check className='w-4 h-4 text-green-600' strokeWidth={3} />
								Hơn 200 chủ shop đã dùng
							</span>
							<span className='flex items-center gap-1.5'>
								<Check className='w-4 h-4 text-green-600' strokeWidth={3} />
								Hoàn tiền nếu không dùng được
							</span>
						</div>
					</motion.div>

					{/* Right: live demo card */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
						className='relative'
					>
						{/* Decorative glow behind card */}
						<div
							aria-hidden
							className='absolute -inset-4 bg-gradient-to-br from-blue-200/40 via-indigo-200/30 to-transparent rounded-[2rem] blur-2xl'
						/>

						<div className='relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40 overflow-hidden'>
							{/* Window chrome */}
							<div className='flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200'>
								<span className='w-2.5 h-2.5 rounded-full bg-slate-300' />
								<span className='w-2.5 h-2.5 rounded-full bg-slate-300' />
								<span className='w-2.5 h-2.5 rounded-full bg-slate-300' />
								<div className='flex-1 ml-3 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono border border-slate-200 truncate'>
									sellos.vn/cua-ban
								</div>
							</div>

							{/* Body: chat + preview */}
							<div className='grid grid-cols-1 sm:grid-cols-[1fr_1fr]'>
								{/* Chat panel */}
								<div className='border-b sm:border-b-0 sm:border-r border-slate-100 flex flex-col min-h-[340px]'>
									<div className='px-4 py-3 border-b border-slate-100 flex items-center gap-2.5'>
										<div className='w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center'>
											<Sparkles className='w-3.5 h-3.5 text-white' />
										</div>
										<div className='flex flex-col leading-tight'>
											<span className='text-xs font-semibold text-slate-800'>SellOS đang dựng web</span>
											<span className='text-[10px] text-slate-400'>Bạn không cần làm gì thêm</span>
										</div>
										<span className='ml-auto inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full'>
											<span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
											Đang chạy
										</span>
									</div>

									<div className='flex-1 p-4 space-y-2.5 overflow-hidden text-xs'>
										{TYPED_LINES.slice(0, lineIdx).map((line, i) => (
											<LineRow key={i} line={line} />
										))}
										{lineIdx < TYPED_LINES.length && (
											<LineRow line={typed} typing />
										)}
									</div>
								</div>

								{/* Preview panel */}
								<div className='bg-slate-50 p-4 flex flex-col gap-3'>
									<div className='flex items-center justify-between'>
										<p className='text-[10px] font-semibold text-slate-500 uppercase tracking-wider'>
											Xem trước
										</p>
										<span className='text-[10px] text-slate-400'>website.cua-ban.vn</span>
									</div>
									<div className='bg-white rounded-xl border border-slate-200 p-3 flex-1 flex flex-col gap-2 shadow-sm'>
										<div className='flex items-center gap-1.5'>
											<div className='w-3 h-3 rounded bg-blue-600' />
											<div className='h-1.5 bg-slate-200 rounded w-12' />
											<div className='ml-auto h-1.5 bg-slate-100 rounded w-8' />
										</div>
										<div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 mt-1 space-y-1.5 border border-blue-100/50'>
											<div className='h-2 bg-slate-300 rounded w-4/5' />
											<div className='h-2 bg-slate-300 rounded w-3/5' />
											<div className='h-1.5 bg-slate-200 rounded w-2/3 mt-1.5' />
											<div className='h-5 bg-blue-600 rounded-md w-2/5 mt-2' />
										</div>
										<div className='grid grid-cols-3 gap-1.5 mt-1'>
											{[1, 2, 3].map((i) => (
												<div key={i} className='bg-slate-50 border border-slate-100 rounded-md p-1.5 space-y-1'>
													<div className='w-3 h-3 rounded bg-blue-100' />
													<div className='h-1 bg-slate-200 rounded' />
													<div className='h-1 bg-slate-100 rounded w-3/4' />
												</div>
											))}
										</div>
										<div className='mt-auto flex items-center gap-2 pt-2 border-t border-slate-100'>
											<MessageCircle className='w-3 h-3 text-blue-600' />
											<div className='h-1.5 bg-slate-200 rounded flex-1' />
											<div className='w-5 h-5 rounded-full bg-blue-600' />
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Floating stat card */}
						<div className='hidden sm:flex absolute -bottom-5 -left-5 items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl'>
							<div className='w-10 h-10 rounded-full bg-green-50 border border-green-200 flex items-center justify-center'>
								<Check className='w-5 h-5 text-green-600' strokeWidth={3} />
							</div>
							<div className='leading-tight'>
								<p className='text-sm font-semibold text-slate-900'>3 đơn đầu tiên</p>
								<p className='text-xs text-slate-500'>trong 24 giờ ra mắt</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

function LineRow({ line, typing }: { line: string; typing?: boolean }) {
	const isUser = line.startsWith('Bạn:');
	const text = line.replace(/^(Bạn:|SellOS:)\s*/, '');
	return (
		<div className={`flex gap-2 ${isUser ? 'justify-end' : ''}`}>
			{!isUser && (
				<div className='w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center'>
					<Sparkles className='w-2.5 h-2.5 text-white' />
				</div>
			)}
			<div
				className={`px-3 py-2 rounded-2xl max-w-[85%] leading-relaxed ${
					isUser
						? 'bg-blue-600 text-white rounded-tr-sm'
						: 'bg-slate-100 text-slate-700 rounded-tl-sm'
				}`}
			>
				{text || ' '}
				{typing && (
					<span className='inline-block w-0.5 h-3 bg-current ml-0.5 animate-pulse align-middle' />
				)}
			</div>
		</div>
	);
}
