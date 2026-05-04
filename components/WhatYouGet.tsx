'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/ui/highlight';
import {
	Globe,
	MessageCircle,
	CreditCard,
	BarChart3,
	Mail,
	Check,
} from 'lucide-react';

export default function WhatYouGet() {
	return (
		<section className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-14 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-emerald-600 uppercase tracking-[0.15em] mb-3'>
						Bạn nhận được gì
					</span>
					<h2
						className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4'
						style={{ lineHeight: '1.25' }}
					>
						Sau 7 ngày, bạn có{' '}
						<Highlight variant='green'>đủ 5 thứ để bán hàng tự động</Highlight>
					</h2>
					<p className='text-slate-500 text-base'>
						Không phải bản demo. Hệ thống thật, chạy thật, nhận đơn thật từ khách thật.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className='grid grid-cols-1 lg:grid-cols-3 gap-4'
				>
					{/* Card 1: Website — featured */}
					<div className='lg:col-span-2 lg:row-span-2 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-all relative overflow-hidden group'>
						<div
							aria-hidden
							className='absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-50/70 to-transparent'
						/>
						<div className='relative'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20'>
									<Globe className='w-6 h-6 text-white' />
								</div>
								<span className='inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full'>
									Quan trọng nhất
								</span>
							</div>
							<h3 className='font-heading font-bold text-slate-900 text-2xl mb-3 leading-tight'>
								Website bán hàng riêng của bạn
							</h3>
							<p className='text-slate-600 text-base leading-relaxed mb-5 max-w-xl'>
								Đẹp như web do agency làm — nhưng do chính bạn dựng cùng AI.
								Chạy mượt trên điện thoại, có địa chỉ web riêng (ví dụ:{' '}
								<span className='font-mono text-slate-800'>sanphamcuaban.com</span>
								), khách vào xem là tin ngay.
							</p>
							<div className='flex flex-wrap gap-2'>
								{[
									'Có sẵn nhiều mẫu đẹp theo ngành',
									'Tự động viết nội dung theo sản phẩm',
									'Sửa được bất cứ lúc nào, không cần chờ ai',
								].map((f, i) => (
									<span
										key={i}
										className='inline-flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full'
									>
										<Check className='w-3 h-3 text-blue-600' strokeWidth={3} />
										{f}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Card 2: Chatbot */}
					<FeatureCard
						icon={MessageCircle}
						color='from-violet-500 to-fuchsia-600'
						glow='violet'
						title='Trợ lý ảo trả lời 24/7'
						desc='Tự tư vấn, trả lời câu hỏi, chốt đơn — kể cả 3 giờ sáng.'
					/>

					{/* Card 3: Payment */}
					<FeatureCard
						icon={CreditCard}
						color='from-emerald-500 to-teal-600'
						glow='emerald'
						title='Nhận tiền tự động'
						desc='Khách bấm "Mua" → tiền vào tài khoản. Có MoMo, chuyển khoản, SePay.'
					/>

					{/* Card 4: Admin */}
					<FeatureCard
						icon={BarChart3}
						color='from-amber-500 to-orange-600'
						glow='amber'
						title='Trang quản lý đơn hàng'
						desc='Xem đơn mới, doanh thu, khách quay lại — trên 1 màn hình.'
					/>

					{/* Card 5: Email automation */}
					<FeatureCard
						icon={Mail}
						color='from-rose-500 to-pink-600'
						glow='rose'
						title='Email tự gửi đúng lúc'
						desc='Xác nhận đơn → nhắc thanh toán → cảm ơn → xin đánh giá. Tự chạy.'
					/>
				</motion.div>
			</div>
		</section>
	);
}

type GlowKey = 'violet' | 'emerald' | 'amber' | 'rose';

const GLOW_CLASSES: Record<GlowKey, string> = {
	violet: 'shadow-violet-500/20',
	emerald: 'shadow-emerald-500/20',
	amber: 'shadow-amber-500/20',
	rose: 'shadow-rose-500/20',
};

function FeatureCard({
	icon: Icon,
	color,
	glow,
	title,
	desc,
}: {
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	glow: GlowKey;
	title: string;
	desc: string;
}) {
	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group'>
			<div
				className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg ${GLOW_CLASSES[glow]}`}
			>
				<Icon className='w-5 h-5 text-white' />
			</div>
			<h3 className='font-heading font-bold text-slate-900 text-base mb-1.5 leading-snug'>
				{title}
			</h3>
			<p className='text-slate-500 text-sm leading-relaxed'>{desc}</p>
		</div>
	);
}
