import Link from 'next/link';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-slate-950 border-t border-white/10 text-slate-300 px-4 py-14'>
			<div className='container mx-auto max-w-6xl'>
				<div className='grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10'>
					<div>
						<Link
							href='/templates/su-kien'
							className='inline-flex items-center gap-2 mb-4'
						>
							<span className='inline-flex w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 items-center justify-center'>
								<Sparkles className='w-4 h-4 text-white' />
							</span>
							<span className='font-heading font-bold text-white text-xl'>
								Vietnam<span className='text-amber-300'>Summit</span>
							</span>
						</Link>
						<p className='text-slate-400 text-sm leading-relaxed mb-5 max-w-sm'>
							Hội nghị thường niên dành cho cộng đồng startup, e-commerce và marketers Việt Nam.
						</p>
						<p className='text-xs text-slate-500'>
							Tổ chức bởi <span className='text-slate-300 font-semibold'>SellOS Events</span>
						</p>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>
							Sự kiện
						</h4>
						<ul className='space-y-2.5 text-sm'>
							{['Về sự kiện', 'Diễn giả', 'Lịch trình', 'Mua vé'].map((s) => (
								<li key={s}>
									<a href='#' className='text-slate-400 hover:text-white transition-colors'>
										{s}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>Hỗ trợ</h4>
						<ul className='space-y-2.5 text-sm'>
							{['Câu hỏi thường gặp', 'Trở thành sponsor', 'Báo chí', 'Liên hệ'].map(
								(s) => (
									<li key={s}>
										<a
											href='#'
											className='text-slate-400 hover:text-white transition-colors'
										>
											{s}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					<div>
						<h4 className='font-heading font-bold text-white text-sm mb-4'>
							Liên hệ
						</h4>
						<ul className='space-y-2.5 text-sm'>
							<li className='flex items-start gap-2.5 text-slate-400'>
								<MapPin className='w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0' />
								GEM Center, Q.1, TP.HCM
							</li>
							<li className='flex items-center gap-2.5 text-slate-400'>
								<Phone className='w-4 h-4 text-slate-500' />
								1900 1234
							</li>
							<li className='flex items-center gap-2.5 text-slate-400'>
								<Mail className='w-4 h-4 text-slate-500' />
								hello@vietnamsummit.vn
							</li>
						</ul>
					</div>
				</div>

				<div className='pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500'>
					<p>© 2026 Vietnam Summit. All rights reserved.</p>
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
