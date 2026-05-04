'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, Train, Info, ExternalLink } from 'lucide-react';

const VENUE_PHOTO =
	'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1400&q=80';

export default function Venue() {
	return (
		<section id='venue' className='py-24 px-4 bg-slate-50'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-12'
				>
					<span className='inline-block text-xs font-semibold text-rose-600 uppercase tracking-[0.15em] mb-3'>
						Địa điểm
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						GEM Center — Trung tâm Sài Gòn
					</h2>
					<p className='text-slate-500'>
						Một trong những trung tâm hội nghị hiện đại nhất TP.HCM, ngay trung tâm Q.1.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5'>
					{/* Photo */}
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='relative rounded-2xl overflow-hidden border border-slate-200 bg-white'
					>
						<div className='relative h-[400px] overflow-hidden'>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={VENUE_PHOTO}
								alt='GEM Center'
								className='absolute inset-0 w-full h-full object-cover'
							/>
							<div
								aria-hidden
								className='absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent'
							/>

							{/* Pin */}
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
								<div className='relative'>
									<div className='absolute inset-0 -m-6 rounded-full bg-rose-500/30 animate-ping' />
									<div className='relative w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 border-4 border-white shadow-2xl flex items-center justify-center'>
										<MapPin className='w-5 h-5 text-white' fill='white' />
									</div>
								</div>
							</div>

							<div className='absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg'>
								<div className='flex items-start justify-between gap-3'>
									<div>
										<p className='font-heading font-bold text-slate-900 text-base'>
											GEM Center
										</p>
										<p className='text-slate-500 text-sm mt-0.5'>
											8 Nguyễn Bỉnh Khiêm, P. Đa Kao, Q.1, TP.HCM
										</p>
									</div>
									<a
										href='#'
										className='inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap'
									>
										<ExternalLink className='w-3 h-3' />
										Mở Maps
									</a>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Info */}
					<motion.div
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='space-y-3'
					>
						{[
							{
								icon: Train,
								title: 'Phương tiện công cộng',
								description:
									'Cách Bến Thành 800m. Xe bus tuyến 06, 18, 56 đỗ ngay trước cửa.',
							},
							{
								icon: Car,
								title: 'Bãi đỗ xe',
								description:
									'Bãi xe trong toà nhà, sức chứa 200 ô tô + 500 xe máy. Miễn phí cho người tham dự.',
							},
							{
								icon: Info,
								title: 'Lưu ý',
								description:
									'Vui lòng có mặt trước 30 phút để check-in. Mang theo CCCD và mã đặt vé.',
							},
						].map(({ icon: Icon, title, description }, i) => (
							<div
								key={i}
								className='flex gap-4 bg-white rounded-xl border border-slate-200 p-5'
							>
								<div className='flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center'>
									<Icon className='w-4 h-4 text-rose-600' />
								</div>
								<div>
									<h4 className='font-heading font-bold text-slate-900 text-sm mb-1'>
										{title}
									</h4>
									<p className='text-slate-500 text-xs leading-relaxed'>{description}</p>
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
