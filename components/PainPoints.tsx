'use client';

import { motion, type Variants } from 'framer-motion';
import { Highlight } from '@/components/ui/highlight';
import {
	Frown,
	Clock,
	Wallet,
	TrendingDown,
	Wrench,
	Moon,
} from 'lucide-react';

const PAINS = [
	{
		icon: Frown,
		title: 'Khách ghé qua rồi đi',
		desc: 'Sản phẩm tốt nhưng trang bán hàng nhìn tạm bợ — khách không tin để rút ví.',
	},
	{
		icon: Clock,
		title: 'Mỗi ngày 2–3 tiếng trả lời tin nhắn',
		desc: 'Trả lời cùng một câu hỏi cũ đến mệt — vẫn lỡ đơn vì không kịp tay.',
	},
	{
		icon: Wallet,
		title: 'Thuê người làm web: 8–15 triệu',
		desc: 'Chờ 3 tuần. Muốn sửa 1 chữ phải nhờ. Tiền rồi vẫn không thoải mái.',
	},
	{
		icon: TrendingDown,
		title: 'Quảng cáo tốn tiền nhưng ít đơn',
		desc: 'Khách bấm vào, không mua liền — sau đó mất luôn, không có cách giữ lại.',
	},
	{
		icon: Wrench,
		title: 'Mỗi việc một công cụ khác',
		desc: 'Trợ lý ảo một nơi, web một nơi, thanh toán một nơi — ghép mãi không xong.',
	},
	{
		icon: Moon,
		title: 'Đi ngủ là việc bán hàng dừng',
		desc: 'Không có gì chạy thay bạn lúc 3 giờ sáng — đơn rơi ra ngoài, không ai biết.',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 16 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PainPoints() {
	return (
		<section className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className='text-center mb-14 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Vấn đề bạn đang gặp
					</span>
					<h2
						className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'
						style={{ lineHeight: '1.25' }}
					>
						Bạn không thiếu cố gắng —{' '}
						<Highlight variant='rose'>thiếu là một hệ thống chạy giúp bạn</Highlight>
					</h2>
				</motion.div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
				>
					{PAINS.map(({ icon: Icon, title, desc }, i) => (
						<motion.div
							key={i}
							variants={item}
							className='group bg-white rounded-2xl border border-slate-200 p-6 hover:border-rose-200 hover:shadow-md transition-all'
						>
							<span className='inline-flex w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors'>
								<Icon className='w-5 h-5 text-rose-600' />
							</span>
							<h3 className='font-heading font-semibold text-slate-900 text-base mb-2 leading-snug'>
								{title}
							</h3>
							<p className='text-slate-500 text-sm leading-relaxed'>{desc}</p>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className='text-center mt-12'
				>
					<p className='inline-block text-slate-700 text-base bg-white border border-slate-200 rounded-full px-5 py-2.5 shadow-sm'>
						<span className='font-semibold text-slate-900'>SellOS</span> giải quyết cả 6 vấn đề này —{' '}
						<span className='text-blue-600 font-semibold'>trong 7 ngày.</span>
					</p>
				</motion.div>
			</div>
		</section>
	);
}
