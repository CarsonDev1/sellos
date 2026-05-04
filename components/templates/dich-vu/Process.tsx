'use client';

import { motion, type Variants } from 'framer-motion';
import { Search, FileText, Rocket, BarChart3 } from 'lucide-react';

const STEPS = [
	{
		icon: Search,
		number: '01',
		title: 'Lắng nghe & khảo sát',
		description:
			'Chúng tôi gặp đội ngũ của bạn, audit hiện trạng — không bán dịch vụ vội.',
		duration: '1 tuần',
	},
	{
		icon: FileText,
		number: '02',
		title: 'Đề xuất chiến lược',
		description:
			'Bạn nhận được kế hoạch chi tiết với scope, timeline và KPI rõ ràng để cân nhắc.',
		duration: '1-2 tuần',
	},
	{
		icon: Rocket,
		number: '03',
		title: 'Triển khai cùng đội',
		description:
			'Đội senior của ApexStudio làm việc trực tiếp — không subcontract, không giao freelancer.',
		duration: '4-12 tuần',
	},
	{
		icon: BarChart3,
		number: '04',
		title: 'Đo lường & tối ưu',
		description:
			'Báo cáo hàng tuần. Chuyển giao toàn bộ tài liệu và quy trình cho đội nội bộ của bạn.',
		duration: 'Liên tục',
	},
];

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Process() {
	return (
		<section id='process' className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Quy trình làm việc
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Cách chúng tôi làm việc
					</h2>
					<p className='text-slate-500'>
						Mỗi giai đoạn có deliverable rõ ràng — bạn biết chính xác đang ở đâu và sắp tới làm gì.
					</p>
				</motion.div>

				<motion.div
					variants={container}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
				>
					<div
						aria-hidden
						className='hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-px bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200'
					/>

					{STEPS.map(({ icon: Icon, number, title, description, duration }, i) => (
						<motion.div
							key={i}
							variants={item}
							className='relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all'
						>
							<div className='flex items-center justify-between mb-5'>
								<div className='relative w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center'>
									<Icon className='w-5 h-5 text-indigo-600' />
								</div>
								<span className='font-heading font-bold text-3xl text-slate-100 select-none leading-none'>
									{number}
								</span>
							</div>

							<h3 className='font-heading font-bold text-slate-900 text-base mb-2 leading-snug'>
								{title}
							</h3>
							<p className='text-slate-500 text-sm leading-relaxed mb-4'>
								{description}
							</p>
							<span className='inline-flex items-center text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full'>
								{duration}
							</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
