'use client';

import { motion } from 'framer-motion';
import {
	Package,
	Tag,
	Users,
	Image as ImageIcon,
	Sparkles,
	Globe,
	MessageCircle,
	CreditCard,
	BarChart3,
	ArrowRight,
} from 'lucide-react';
import { Highlight } from '@/components/ui/highlight';

const INPUTS = [
	{
		icon: Package,
		title: 'Bạn bán gì?',
		desc: 'Tên sản phẩm, mô tả ngắn gọn',
	},
	{
		icon: Tag,
		title: 'Giá bao nhiêu?',
		desc: 'Giá bán, có khuyến mãi không',
	},
	{
		icon: Users,
		title: 'Ai là khách?',
		desc: 'Khách của bạn là ai, gặp vấn đề gì',
	},
	{
		icon: ImageIcon,
		title: 'Hình ảnh sản phẩm',
		desc: 'Vài tấm ảnh là đủ — không cần thiết kế',
	},
];

const OUTPUTS = [
	{
		icon: Globe,
		title: 'Website bán hàng riêng',
		desc: 'Đẹp, mượt trên điện thoại, có địa chỉ web riêng. Khách vào — xem — đặt mua.',
		color: 'from-blue-500 to-indigo-600',
	},
	{
		icon: MessageCircle,
		title: 'Trợ lý trả lời khách 24/7',
		desc: 'Tự tư vấn, trả lời câu hỏi, chốt đơn — kể cả 3 giờ sáng khi bạn đang ngủ.',
		color: 'from-violet-500 to-fuchsia-600',
	},
	{
		icon: CreditCard,
		title: 'Nhận thanh toán tự động',
		desc: 'Khách bấm mua → tiền vào tài khoản. Không phải ngồi gõ chuyển khoản.',
		color: 'from-emerald-500 to-teal-600',
	},
	{
		icon: BarChart3,
		title: 'Trang quản lý đơn hàng',
		desc: 'Xem đơn mới, doanh thu, khách quay lại — trên 1 màn hình duy nhất.',
		color: 'from-amber-500 to-orange-600',
	},
];

export default function ValueFlow() {
	return (
		<section className='py-24 px-4 bg-white relative overflow-hidden'>
			<div className='container mx-auto max-w-6xl relative'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-16 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-3'>
						Cách SellOS hoạt động
					</span>
					<h2
						className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4'
						style={{ lineHeight: '1.25' }}
					>
						Bạn cho 4 thông tin —{' '}
						<Highlight variant='blue'>SellOS dựng cả hệ thống bán hàng</Highlight>
					</h2>
					<p className='text-slate-500 text-base'>
						Không cần biết code. Không cần thuê dev. Không cần ghép 5 tool.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-[1fr_auto_1.4fr] gap-8 lg:gap-6 items-stretch'>
					{/* INPUT column */}
					<motion.div
						initial={{ opacity: 0, x: -16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='relative'
					>
						<div className='rounded-2xl border border-slate-200 bg-slate-50/60 p-6 h-full'>
							<div className='flex items-center gap-2 mb-5'>
								<span className='inline-flex w-7 h-7 rounded-lg bg-white border border-slate-200 items-center justify-center text-xs font-bold text-slate-700'>
									1
								</span>
								<h3 className='font-heading text-lg font-bold text-slate-900'>
									Bạn cung cấp
								</h3>
							</div>
							<p className='text-sm text-slate-500 mb-5'>
								Điền vào 1 form duy nhất — khoảng 5 phút.
							</p>
							<div className='space-y-3'>
								{INPUTS.map(({ icon: Icon, title, desc }, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 8 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: 0.05 * i }}
										className='flex gap-3 bg-white rounded-xl border border-slate-200 p-3.5 hover:border-blue-200 hover:shadow-sm transition-all'
									>
										<span className='flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center'>
											<Icon className='w-4 h-4 text-blue-600' />
										</span>
										<div className='leading-tight'>
											<p className='text-sm font-semibold text-slate-900'>
												{title}
											</p>
											<p className='text-xs text-slate-500 mt-1 leading-relaxed'>
												{desc}
											</p>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</motion.div>

					{/* PROCESS arrow */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className='flex lg:flex-col items-center justify-center gap-3'
					>
						<div className='hidden lg:flex w-px h-10 bg-gradient-to-b from-transparent to-slate-200' />
						<div className='flex flex-col items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl px-4 py-5 shadow-lg shadow-blue-600/20 min-w-[110px]'>
							<Sparkles className='w-5 h-5' />
							<span className='text-xs font-semibold whitespace-nowrap'>SellOS</span>
							<span className='text-[10px] opacity-80'>tự dựng</span>
						</div>
						<div className='flex lg:hidden items-center'>
							<ArrowRight className='w-5 h-5 text-slate-400' />
						</div>
						<div className='hidden lg:flex w-px h-10 bg-gradient-to-t from-transparent to-slate-200' />
					</motion.div>

					{/* OUTPUT column */}
					<motion.div
						initial={{ opacity: 0, x: 16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className='rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-white p-6 h-full relative overflow-hidden'>
							<div
								aria-hidden
								className='absolute -top-8 -right-8 w-40 h-40 bg-blue-100/40 rounded-full blur-3xl'
							/>
							<div className='relative'>
								<div className='flex items-center gap-2 mb-5'>
									<span className='inline-flex w-7 h-7 rounded-lg bg-blue-600 text-white items-center justify-center text-xs font-bold'>
										2
									</span>
									<h3 className='font-heading text-lg font-bold text-slate-900'>
										Bạn nhận được
									</h3>
									<span className='ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full'>
										Sau 7 ngày
									</span>
								</div>
								<p className='text-sm text-slate-500 mb-5'>
									Một hệ thống bán hàng hoàn chỉnh, chạy thật, nhận đơn thật.
								</p>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
									{OUTPUTS.map(({ icon: Icon, title, desc, color }, i) => (
										<motion.div
											key={i}
											initial={{ opacity: 0, y: 8 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: 0.4, delay: 0.05 * i + 0.2 }}
											className='bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow'
										>
											<div
												className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-sm`}
											>
												<Icon className='w-5 h-5 text-white' />
											</div>
											<p className='text-sm font-semibold text-slate-900 leading-snug mb-1'>
												{title}
											</p>
											<p className='text-xs text-slate-500 leading-relaxed'>
												{desc}
											</p>
										</motion.div>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Outcome strip */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className='mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-sm'
				>
					<span className='text-slate-500'>
						Kết quả cuối cùng:
					</span>
					<span className='inline-flex items-center gap-2 bg-slate-900 text-white rounded-full px-4 py-2 font-medium'>
						<span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse' />
						Bán hàng 24/7 — kể cả khi bạn đang ngủ, đi du lịch, hay gặp khách
					</span>
				</motion.div>
			</div>
		</section>
	);
}
