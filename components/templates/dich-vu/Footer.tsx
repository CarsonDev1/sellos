import Link from 'next/link';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-slate-950 text-slate-300 px-4 py-16'>
			<div className='container mx-auto max-w-6xl'>
				<div className='grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-slate-800'>
					<div>
						<Link href='/templates/dich-vu' className='flex items-center gap-2 mb-4'>
							<span className='inline-flex w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 items-center justify-center'>
								<span className='text-white font-bold text-base'>A</span>
							</span>
							<span className='font-heading font-bold text-white text-xl'>
								Apex<span className='text-indigo-400'>Studio</span>
							</span>
						</Link>
						<p className='text-slate-400 text-sm leading-relaxed mb-6 max-w-sm'>
							Agency chiến lược + thực thi cho doanh nghiệp Việt muốn tăng trưởng nhanh và bền vững.
						</p>

						<div className='space-y-2 text-sm'>
							<div className='flex items-start gap-3'>
								<MapPin className='w-4 h-4 mt-0.5 text-slate-500' />
								<span className='text-slate-400'>
									Tầng 12, Bitexco Tower, Q.1, TP.HCM
								</span>
							</div>
							<div className='flex items-center gap-3'>
								<Phone className='w-4 h-4 text-slate-500' />
								<span className='text-slate-400'>0901 234 567</span>
							</div>
							<div className='flex items-center gap-3'>
								<Mail className='w-4 h-4 text-slate-500' />
								<span className='text-slate-400'>hello@apexstudio.vn</span>
							</div>
						</div>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>
							Dịch vụ
						</h4>
						<ul className='space-y-2.5 text-sm'>
							{[
								'Chiến lược thương hiệu',
								'Performance Marketing',
								'Content & Sản xuất',
								'Tư vấn dữ liệu & CX',
							].map((s) => (
								<li key={s}>
									<a href='#services' className='text-slate-400 hover:text-white transition-colors'>
										{s}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>
							Công ty
						</h4>
						<ul className='space-y-2.5 text-sm'>
							{['Đội ngũ', 'Case studies', 'Tin tức', 'Tuyển dụng', 'Liên hệ'].map((s) => (
								<li key={s}>
									<a href='#' className='text-slate-400 hover:text-white transition-colors'>
										{s}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>
							Theo dõi
						</h4>
						<div className='flex flex-col gap-2 mb-6 text-sm'>
							{[
								{ label: 'LinkedIn', href: '#' },
								{ label: 'Facebook', href: '#' },
								{ label: 'YouTube', href: '#' },
							].map((s) => (
								<a
									key={s.label}
									href={s.href}
									className='inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors'
								>
									<Globe className='w-3.5 h-3.5' />
									{s.label}
								</a>
							))}
						</div>
						<p className='text-xs text-slate-500 leading-relaxed'>
							Giờ làm việc:
							<br />
							8:00 - 18:00, T2 - T6
						</p>
					</div>
				</div>

				<div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
					<p>© 2026 ApexStudio. All rights reserved.</p>
					<div className='flex gap-6'>
						<a href='#' className='hover:text-slate-300 transition-colors'>
							Chính sách bảo mật
						</a>
						<a href='#' className='hover:text-slate-300 transition-colors'>
							Điều khoản
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
