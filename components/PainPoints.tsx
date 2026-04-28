'use client';

import { motion, type Variants } from 'framer-motion';
import { Highlight } from '@/components/ui/highlight';

const PAINS = [
	'Có sản phẩm tốt nhưng trang bán hàng kém — khách ghé vào rồi thoát, mua chỗ khác',
	'Mỗi ngày mất 2–3 tiếng trả lời cùng những câu hỏi cũ — kiệt sức mà vẫn lỡ đơn',
	'Thuê dev làm landing page: 8–15 triệu, chờ 3 tuần — muốn sửa 1 chữ cũng phải nhờ',
	'Đốt tiền ads nhưng 90% khách không mua ngay — không follow-up được, tiền mất toi',
	'Chatbot, email tự động, payment — mỗi thứ một tool khác nhau, setup mãi không xong',
	'Bạn tắt điện thoại đi ngủ là bán hàng dừng — không có gì chạy thay bạn lúc 3 giờ sáng',
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PainPoints() {
	return (
		<section className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-5xl'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className='text-center mb-12'
				>
					<h2
						className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'
						style={{ lineHeight: '1.5' }}
					>
						Không Phải Bạn Thiếu Nỗ Lực — <br className='hidden sm:block' />
						Bạn Đang Thiếu <Highlight variant='rose'>Hệ Thống</Highlight>
					</h2>
				</motion.div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='grid grid-cols-1 sm:grid-cols-2 gap-4'
				>
					{PAINS.map((pain, i) => (
						<motion.div
							key={i}
							variants={item}
							className='flex gap-4 p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-red-200 hover:shadow-md transition-all group'
						>
							<span className='flex-shrink-0 w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-500 text-sm font-bold group-hover:bg-red-100 transition-colors'>
								✕
							</span>
							<p className='text-slate-600 text-sm leading-relaxed pt-0.5'>{pain}</p>
						</motion.div>
					))}
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className='text-center mt-10 text-slate-700 text-base'
				>
					<span className='font-semibold text-slate-900'>SellOS</span> giải quyết hết 6 vấn đề trên —{' '}
					<span className='text-blue-600 font-semibold'>trong 7 ngày.</span>
				</motion.p>
			</div>
		</section>
	);
}
