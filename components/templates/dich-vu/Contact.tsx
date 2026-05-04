'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, Phone, Mail } from 'lucide-react';

export default function Contact() {
	const [submitted, setSubmitted] = useState(false);
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setSubmitted(true);
	}

	return (
		<section
			id='contact'
			className='py-24 px-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 relative overflow-hidden'
		>
			<div
				aria-hidden
				className='absolute inset-0 pointer-events-none'
				style={{
					background:
						'radial-gradient(ellipse 50% 50% at 30% 30%, rgba(99,102,241,0.25), transparent 70%)',
				}}
			/>
			<div
				aria-hidden
				className='absolute inset-0 opacity-[0.04] pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
					backgroundSize: '48px 48px',
				}}
			/>

			<div className='container mx-auto max-w-5xl relative'>
				<div className='grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-12 items-start'>
					{/* Left: copy */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='space-y-7'
					>
						<span className='inline-block text-xs font-semibold text-indigo-300 uppercase tracking-[0.2em]'>
							Bắt đầu ngay
						</span>
						<h2
							className='font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight'
							style={{ lineHeight: '1.15' }}
						>
							Sẵn sàng tăng tốc{' '}
							<span className='bg-gradient-to-r from-indigo-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent'>
								cùng chúng tôi?
							</span>
						</h2>
						<p className='text-blue-100/80 text-lg leading-relaxed'>
							Đặt lịch tư vấn 30 phút — miễn phí, không cam kết mua. Chúng tôi sẽ nghe vấn đề của bạn và đề xuất giải pháp phù hợp.
						</p>

						<div className='space-y-3'>
							{[
								{ icon: Clock, label: 'Phản hồi trong 24 giờ làm việc' },
								{ icon: Check, label: 'Tư vấn miễn phí, không cam kết mua' },
								{ icon: Check, label: 'Đề xuất chi tiết bằng văn bản' },
							].map(({ icon: Icon, label }, i) => (
								<div key={i} className='flex items-center gap-3 text-blue-100'>
									<span className='w-7 h-7 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center'>
										<Icon className='w-3.5 h-3.5 text-indigo-200' strokeWidth={2.5} />
									</span>
									<span className='text-sm'>{label}</span>
								</div>
							))}
						</div>

						<div className='pt-6 border-t border-white/10 space-y-3'>
							<a
								href='tel:0901234567'
								className='flex items-center gap-3 text-blue-100 hover:text-white transition-colors'
							>
								<Phone className='w-4 h-4' />
								<span className='text-sm'>0901 234 567</span>
							</a>
							<a
								href='mailto:hello@apexstudio.vn'
								className='flex items-center gap-3 text-blue-100 hover:text-white transition-colors'
							>
								<Mail className='w-4 h-4' />
								<span className='text-sm'>hello@apexstudio.vn</span>
							</a>
						</div>
					</motion.div>

					{/* Right: form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='bg-white rounded-2xl shadow-2xl shadow-indigo-950/40 p-7 sm:p-8'
					>
						{submitted ? (
							<div className='text-center py-12'>
								<div className='w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4'>
									<Check className='w-7 h-7 text-emerald-600' strokeWidth={3} />
								</div>
								<h3 className='font-heading font-bold text-slate-900 text-xl mb-2'>
									Đã nhận yêu cầu của bạn!
								</h3>
								<p className='text-slate-500 text-sm'>
									Đội ngũ sẽ liên hệ trong 24 giờ làm việc.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-4'>
								<div>
									<label className='block text-sm font-semibold text-slate-700 mb-1.5'>
										Tên của bạn
									</label>
									<input
										type='text'
										required
										placeholder='Nguyễn Văn A'
										className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder-slate-400 text-sm transition'
									/>
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-semibold text-slate-700 mb-1.5'>
											Email
										</label>
										<input
											type='email'
											required
											placeholder='ban@congty.com'
											className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder-slate-400 text-sm transition'
										/>
									</div>
									<div>
										<label className='block text-sm font-semibold text-slate-700 mb-1.5'>
											Số điện thoại
										</label>
										<input
											type='tel'
											required
											placeholder='0901 234 567'
											className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder-slate-400 text-sm transition'
										/>
									</div>
								</div>
								<div>
									<label className='block text-sm font-semibold text-slate-700 mb-1.5'>
										Bạn quan tâm dịch vụ nào?
									</label>
									<select
										required
										defaultValue=''
										className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 text-sm transition bg-white'
									>
										<option value='' disabled>
											Chọn một dịch vụ
										</option>
										<option>Chiến lược thương hiệu</option>
										<option>Performance Marketing</option>
										<option>Content & Sản xuất</option>
										<option>Tư vấn dữ liệu & CX</option>
										<option>Chưa chắc — tư vấn giúp tôi</option>
									</select>
								</div>
								<div>
									<label className='block text-sm font-semibold text-slate-700 mb-1.5'>
										Nói thêm về dự án (không bắt buộc)
									</label>
									<textarea
										rows={3}
										placeholder='Doanh nghiệp của bạn, vấn đề đang gặp, mục tiêu...'
										className='w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-900 placeholder-slate-400 text-sm transition resize-none'
									/>
								</div>
								<button
									type='submit'
									className='w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-colors'
								>
									Gửi yêu cầu tư vấn
									<ArrowRight className='w-4 h-4' />
								</button>
								<p className='text-xs text-slate-400 text-center'>
									Bằng cách gửi, bạn đồng ý với chính sách bảo mật của chúng tôi.
								</p>
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
