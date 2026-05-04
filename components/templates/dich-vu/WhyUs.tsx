'use client';

import { motion } from 'framer-motion';
import { Eye, Users, FileCheck, Layers } from 'lucide-react';

const REASONS = [
	{
		icon: Eye,
		title: 'Minh bạch tuyệt đối',
		description:
			'Bạn thấy mọi spend, mọi click, mọi báo cáo. Không có "đen lưng", không có chi phí ẩn.',
	},
	{
		icon: Users,
		title: 'Đội senior trực tiếp',
		description:
			'Người làm việc với bạn là người có 5+ năm kinh nghiệm — không phải intern hay freelancer.',
	},
	{
		icon: FileCheck,
		title: 'Hợp đồng theo KPI',
		description:
			'Cam kết kết quả bằng văn bản. Không đạt — chúng tôi chịu phí bổ sung, không phải bạn.',
	},
	{
		icon: Layers,
		title: 'Chuyển giao đầy đủ',
		description:
			'Sau dự án, bạn có toàn bộ tài liệu, quy trình, dashboard — không phụ thuộc agency mãi.',
	},
];

export default function WhyUs() {
	return (
		<section className='py-24 px-4 bg-slate-50 relative overflow-hidden'>
			<div
				aria-hidden
				className='absolute -right-40 top-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-200/20 blur-3xl pointer-events-none'
			/>
			<div className='container mx-auto max-w-6xl relative'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='max-w-2xl mb-14'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Vì sao chọn chúng tôi
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Khác biệt — không phải chiêu trò marketing
					</h2>
					<p className='text-slate-500'>
						Đây là 4 cam kết chúng tôi viết vào hợp đồng với mọi khách hàng.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					{REASONS.map(({ icon: Icon, title, description }, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.06 }}
							className='flex gap-5 bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center'>
								<Icon className='w-5 h-5 text-indigo-600' />
							</div>
							<div>
								<h3 className='font-heading font-bold text-slate-900 text-lg mb-1.5 leading-snug'>
									{title}
								</h3>
								<p className='text-slate-600 text-sm leading-relaxed'>
									{description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
