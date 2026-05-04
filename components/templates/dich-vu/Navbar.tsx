'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV = [
	{ href: '#services', label: 'Dịch vụ' },
	{ href: '#process', label: 'Quy trình' },
	{ href: '#case-studies', label: 'Dự án' },
	{ href: '#team', label: 'Đội ngũ' },
	{ href: '#contact', label: 'Liên hệ' },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
				scrolled
					? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
					: 'bg-transparent'
			}`}
		>
			<div className='container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between'>
				<Link href='/templates/dich-vu' className='flex items-center gap-2'>
					<span className='inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 items-center justify-center'>
						<span className='text-white font-bold text-sm'>A</span>
					</span>
					<span className='font-heading font-bold text-slate-900 text-lg tracking-tight'>
						Apex<span className='text-indigo-600'>Studio</span>
					</span>
				</Link>

				<nav className='hidden lg:flex items-center gap-1'>
					{NAV.map((n) => (
						<a
							key={n.href}
							href={n.href}
							className='px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all'
						>
							{n.label}
						</a>
					))}
				</nav>

				<div className='flex items-center gap-3'>
					<a
						href='#contact'
						className='hidden sm:inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors'
					>
						Đặt lịch tư vấn
					</a>
					<button
						className='lg:hidden p-2 -mr-2'
						onClick={() => setOpen(!open)}
						aria-label='Menu'
					>
						{open ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
					</button>
				</div>
			</div>

			{open && (
				<div className='lg:hidden border-t border-slate-200 bg-white'>
					<nav className='px-4 py-3 flex flex-col gap-1'>
						{NAV.map((n) => (
							<a
								key={n.href}
								href={n.href}
								onClick={() => setOpen(false)}
								className='px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 font-medium'
							>
								{n.label}
							</a>
						))}
						<a
							href='#contact'
							onClick={() => setOpen(false)}
							className='mt-2 bg-slate-900 text-white text-center font-semibold px-4 py-2.5 rounded-lg'
						>
							Đặt lịch tư vấn
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}
