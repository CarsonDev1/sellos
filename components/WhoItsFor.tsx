'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const FOR_LIST = [
	'Chủ shop online muốn bán hàng tự động — không phải lúc nào cũng cầm điện thoại',
	'Thầy cô / coach / freelancer muốn bán dịch vụ qua mạng',
	'Người làm 1 mình, không có team kỹ thuật',
	'Người mới bắt đầu bán hàng online, chưa có website',
];

const NOT_FOR_LIST = [
	'Doanh nghiệp lớn cần hệ thống quản lý phức tạp riêng',
	'Người muốn người khác làm hết — bạn vẫn phải đưa thông tin sản phẩm và bấm vài nút',
];

export default function WhoItsFor() {
	return (
		<section className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-5xl'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-14 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-slate-600 uppercase tracking-[0.15em] mb-3'>
						SellOS có dành cho bạn không?
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900'>
						Hợp với ai — không hợp với ai
					</h2>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='bg-gradient-to-br from-emerald-50/60 to-white rounded-2xl border-2 border-emerald-200 p-7'
					>
						<div className='flex items-center gap-2.5 mb-5'>
							<span className='w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center'>
								<Check className='w-5 h-5 text-emerald-700' strokeWidth={3} />
							</span>
							<h3 className='font-heading text-slate-900 text-lg font-bold'>
								Phù hợp nếu bạn là...
							</h3>
						</div>
						<ul className='space-y-3'>
							{FOR_LIST.map((item, i) => (
								<li key={i} className='flex items-start gap-3 text-sm text-slate-700 leading-relaxed'>
									<span className='flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center'>
										<Check className='w-3 h-3 text-emerald-700' strokeWidth={3} />
									</span>
									{item}
								</li>
							))}
						</ul>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='bg-slate-50 rounded-2xl border border-slate-200 p-7'
					>
						<div className='flex items-center gap-2.5 mb-5'>
							<span className='w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center'>
								<X className='w-5 h-5 text-slate-500' strokeWidth={3} />
							</span>
							<h3 className='font-heading text-slate-900 text-lg font-bold'>
								Không phù hợp nếu...
							</h3>
						</div>
						<ul className='space-y-3'>
							{NOT_FOR_LIST.map((item, i) => (
								<li key={i} className='flex items-start gap-3 text-sm text-slate-500 leading-relaxed'>
									<span className='flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center'>
										<X className='w-3 h-3 text-slate-500' strokeWidth={3} />
									</span>
									{item}
								</li>
							))}
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
