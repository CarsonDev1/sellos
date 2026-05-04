'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const TEAM = [
	{
		photo:
			'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
		name: 'Nguyễn Minh Khôi',
		role: 'Founder & Strategy Director',
		bio: '12 năm xây thương hiệu cho các startup VN. Cựu Head of Marketing tại VinFast, MoMo.',
		credentials: ['12 năm kinh nghiệm', 'Cựu MoMo'],
	},
	{
		photo:
			'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
		name: 'Trần Thuý Vy',
		role: 'Head of Performance',
		bio: 'Quản lý ngân sách quảng cáo > 200 tỷ VNĐ. Chuyên Meta Ads, Google Ads, TikTok.',
		credentials: ['200 tỷ ad spend', 'Meta Certified'],
	},
	{
		photo:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
		name: 'Lê Đức Anh',
		role: 'Creative Director',
		bio: '10 năm kinh nghiệm sản xuất. Đã làm campaign cho Vinamilk, Shopee, Highlands.',
		credentials: ['10 năm sản xuất', 'Cannes Lions Finalist'],
	},
];

export default function Team() {
	return (
		<section id='team' className='py-24 px-4 bg-white'>
			<div className='container mx-auto max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='text-center max-w-2xl mx-auto mb-14'
				>
					<span className='inline-block text-xs font-semibold text-indigo-600 uppercase tracking-[0.15em] mb-3'>
						Đội ngũ
					</span>
					<h2 className='font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3'>
						Người làm việc trực tiếp với bạn
					</h2>
					<p className='text-slate-500'>
						Không có &ldquo;account manager trung gian&rdquo; — bạn làm việc trực tiếp với người ra quyết định.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
					{TEAM.map((m, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: i * 0.07 }}
							className='group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all'
						>
							{/* Photo */}
							<div className='relative aspect-[4/5] overflow-hidden bg-slate-100'>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={m.photo}
									alt={m.name}
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
								<div
									aria-hidden
									className='absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-transparent'
								/>

								{/* Credentials at bottom */}
								<div className='absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5'>
									{m.credentials.map((c, j) => (
										<span
											key={j}
											className='inline-flex items-center bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-slate-700 px-2 py-1 rounded-full'
										>
											{c}
										</span>
									))}
								</div>
							</div>

							{/* Info */}
							<div className='p-6'>
								<div className='flex items-start justify-between mb-1'>
									<h3 className='font-heading font-bold text-slate-900 text-lg'>
										{m.name}
									</h3>
									<button
										aria-label='Xem profile'
										className='text-slate-300 hover:text-indigo-600 transition-colors'
									>
										<ExternalLink className='w-4 h-4' />
									</button>
								</div>
								<p className='text-indigo-600 text-sm font-semibold mb-3'>{m.role}</p>
								<p className='text-slate-500 text-sm leading-relaxed'>{m.bio}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
