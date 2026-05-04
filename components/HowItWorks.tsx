'use client';

import { motion, type Variants } from 'framer-motion';
import {
	ClipboardList,
	LayoutTemplate,
	MessagesSquare,
	Rocket,
	Clock,
} from 'lucide-react';

const STEPS = [
	{
		number: '01',
		icon: ClipboardList,
		title: 'Điền thông tin sản phẩm',
		description:
			'Điền tên sản phẩm, giá, ai là khách của bạn — vào 1 form duy nhất.',
		time: '5 phút',
	},
	{
		number: '02',
		icon: LayoutTemplate,
		title: 'Chọn mẫu website yêu thích',
		description:
			'Xem trước nhiều mẫu đẹp theo ngành. Ưng cái nào → bấm chọn cái đó.',
		time: '3 phút',
	},
	{
		number: '03',
		icon: MessagesSquare,
		title: 'AI dựng website cho bạn',
		description:
			'Bạn nhắn vài câu — AI viết nội dung, ghép hình, dựng trang. Bạn xem và chỉnh nếu cần.',
		time: '1–2 giờ/ngày',
	},
	{
		number: '04',
		icon: Rocket,
		title: 'Đưa lên mạng — nhận đơn',
		description:
			'Bấm 1 nút để đưa website lên. Có địa chỉ web riêng. Khách vào — đặt mua thật.',
		time: 'Dưới 5 phút',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function HowItWorks() {
	return (
		<section id='how-it-works' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center mb-14 max-w-2xl mx-auto'
				>
					<span className='inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-3'>
						4 bước đơn giản
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Đơn giản hơn bạn tưởng
					</h2>
					<p className='text-slate-500 text-base'>
						Tất cả gói gọn trong 1 trang web — không cần cài đặt phần mềm, không cần học gì.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative'
				>
					{/* Connector line for desktop */}
					<div
						aria-hidden
						className='hidden lg:block absolute top-[88px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent'
					/>

					{STEPS.map(({ number, icon: Icon, title, description, time }, i) => (
						<motion.div
							key={i}
							variants={item}
							className='relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-blue-200 transition-all'
						>
							<div className='flex items-center justify-between mb-5'>
								<div className='relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center'>
									<Icon className='w-6 h-6 text-blue-600' />
								</div>
								<span className='font-heading font-bold text-3xl text-slate-100 select-none leading-none'>
									{number}
								</span>
							</div>
							<h3 className='font-heading font-bold text-slate-900 text-lg mb-2 leading-snug'>
								{title}
							</h3>
							<p className='text-slate-500 text-sm leading-relaxed mb-4'>
								{description}
							</p>
							<span className='inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full'>
								<Clock className='w-3 h-3' />
								{time}
							</span>
						</motion.div>
					))}
				</motion.div>

				<motion.p
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5 }}
					className='text-center mt-10 text-slate-500 text-sm'
				>
					Tất cả diễn ra trong 1 trang web duy nhất.{' '}
					<span className='text-slate-700 font-medium'>
						Không cần biết code. Không cần mở 5 tab khác nhau.
					</span>
				</motion.p>
			</div>
		</section>
	);
}
