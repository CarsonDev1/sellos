'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
	{
		number: '01',
		image:
			'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=900&q=80',
		title: 'Trồng tại nông trại đối tác',
		description:
			'50+ nông trại tại Đà Lạt, Mộc Châu, Bến Tre — không thuốc trừ sâu, không phân hoá học. Chúng tôi đến tận nơi kiểm tra hàng tháng.',
		tag: 'Tại nông trại',
		duration: 'Theo mùa vụ',
	},
	{
		number: '02',
		image:
			'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80',
		title: 'Thu hoạch sáng sớm',
		description:
			'4-6 giờ sáng — thu hoạch đúng độ tươi. Phân loại ngay tại nông trại, loại bỏ sản phẩm không đạt chuẩn.',
		tag: 'Sáng sớm',
		duration: 'Trước 7:00',
	},
	{
		number: '03',
		image:
			'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
		title: 'Đóng gói & vận chuyển lạnh',
		description:
			'Rửa sạch bằng ozone, đóng gói hút chân không, vận chuyển bằng xe lạnh giữ nhiệt 4-8°C suốt quá trình.',
		tag: 'Trong ngày',
		duration: '7:00 - 11:00',
	},
	{
		number: '04',
		image:
			'https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?auto=format&fit=crop&w=900&q=80',
		title: 'Giao tận tay khách hàng',
		description:
			'Nhân viên giao trong 2 giờ tại TP.HCM. Nếu rau không tươi đúng chuẩn — chúng tôi đổi mới hoặc hoàn tiền ngay.',
		tag: 'Đến nhà bạn',
		duration: 'Trong 2 giờ',
	},
];

export default function FarmToTable() {
	return (
		<section className='py-24 px-4 bg-gradient-to-b from-white to-emerald-50/40 relative overflow-hidden'>
			<div
				aria-hidden
				className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-200/30 to-green-300/20 blur-3xl pointer-events-none'
			/>
			<div className='container mx-auto max-w-6xl relative'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-emerald-700 uppercase tracking-[0.15em] mb-3'>
						Quy trình từ nông trại đến bàn ăn
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-slate-900 mb-3 tracking-tight'>
						4 bước minh bạch — bạn biết rau đến từ đâu
					</h2>
					<p className='text-slate-500'>
						Mỗi sản phẩm đều có mã QR truy xuất nguồn gốc.
						Bạn quét — biết được nông trại, ngày trồng, ngày thu hoạch.
					</p>
				</motion.div>

				{/* Steps with alternating layout */}
				<div className='space-y-12 lg:space-y-20'>
					{STEPS.map((s, i) => {
						const isReverse = i % 2 === 1;
						return (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: '-50px' }}
								transition={{ duration: 0.6 }}
								className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
									isReverse ? 'lg:[direction:rtl]' : ''
								}`}
							>
								{/* Image */}
								<div className='relative lg:[direction:ltr]'>
									<div className='absolute -inset-4 bg-gradient-to-br from-emerald-200/40 to-amber-100/30 rounded-[2rem] blur-2xl -z-10' />
									<div className='relative rounded-3xl overflow-hidden shadow-xl shadow-emerald-100/50 aspect-[4/3]'>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={s.image}
											alt={s.title}
											className='absolute inset-0 w-full h-full object-cover'
										/>
										{/* Step number */}
										<div className='absolute top-5 left-5'>
											<div className='inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full pl-1 pr-4 py-1 shadow-md'>
												<span className='inline-flex w-7 h-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold'>
													{s.number}
												</span>
												<span className='text-xs font-semibold text-slate-700'>
													{s.tag}
												</span>
											</div>
										</div>
										{/* Duration */}
										<div className='absolute bottom-5 right-5 inline-flex items-center bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full'>
											{s.duration}
										</div>
									</div>
								</div>

								{/* Copy */}
								<div className='lg:[direction:ltr]'>
									<p className='font-heading text-7xl sm:text-8xl font-bold text-emerald-100 leading-none mb-3 tracking-tight select-none'>
										{s.number}
									</p>
									<h3 className='font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight'>
										{s.title}
									</h3>
									<p className='text-slate-600 text-base leading-relaxed mb-6'>
										{s.description}
									</p>
									{i < STEPS.length - 1 && (
										<div className='inline-flex items-center gap-2 text-sm text-emerald-700 font-semibold'>
											<span>Tiếp đến bước {STEPS[i + 1].number}</span>
											<ArrowRight className='w-4 h-4' />
										</div>
									)}
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Bottom outcome strip */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='mt-16 sm:mt-24 bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-2xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-6'
				>
					{[
						{ value: '24h', label: 'Từ thu hoạch đến bàn ăn' },
						{ value: '4-8°C', label: 'Vận chuyển lạnh giữ tươi' },
						{ value: '100%', label: 'Truy xuất QR — biết nông trại' },
					].map((s, i) => (
						<div
							key={i}
							className='text-center md:text-left md:border-l first:border-l-0 md:first:border-l-0 border-white/15 md:px-6 first:pl-0 md:first:pl-0'
						>
							<p className='font-heading font-bold text-4xl tracking-tight mb-1'>
								{s.value}
							</p>
							<p className='text-emerald-100 text-sm'>{s.label}</p>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
