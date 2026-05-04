'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV = [
	{ href: '#about', label: 'Về sự kiện' },
	{ href: '#speakers', label: 'Diễn giả' },
	{ href: '#agenda', label: 'Lịch trình' },
	{ href: '#tickets', label: 'Mua vé' },
	{ href: '#venue', label: 'Địa điểm' },
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
			className={`fixed top-0 inset-x-0 z-50 transition-all ${
				scrolled
					? 'bg-slate-950/85 backdrop-blur-md border-b border-white/10'
					: 'bg-transparent'
			}`}
		>
			<div className='container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between'>
				<Link href='/templates/su-kien' className='flex items-center gap-2'>
					<span className='inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600 items-center justify-center shadow-md shadow-rose-500/30'>
						<Sparkles className='w-4 h-4 text-white' />
					</span>
					<span className='font-heading font-bold text-white text-lg tracking-tight'>
						Vietnam<span className='text-amber-300'>Summit</span>
					</span>
				</Link>

				<nav className='hidden lg:flex items-center gap-1'>
					{NAV.map((n) => (
						<a
							key={n.href}
							href={n.href}
							className='px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 font-medium transition-all'
						>
							{n.label}
						</a>
					))}
				</nav>

				<div className='flex items-center gap-3'>
					<a
						href='#tickets'
						className='hidden sm:inline-flex items-center bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-lg shadow-md shadow-rose-500/20 transition-all'
					>
						Mua vé ngay
					</a>
					<button
						className='lg:hidden p-2 -mr-2 text-white'
						onClick={() => setOpen(!open)}
						aria-label='Menu'
					>
						{open ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
					</button>
				</div>
			</div>

			{open && (
				<div className='lg:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md'>
					<nav className='px-4 py-3 flex flex-col gap-1'>
						{NAV.map((n) => (
							<a
								key={n.href}
								href={n.href}
								onClick={() => setOpen(false)}
								className='px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/5 font-medium'
							>
								{n.label}
							</a>
						))}
						<a
							href='#tickets'
							onClick={() => setOpen(false)}
							className='mt-2 bg-gradient-to-r from-amber-400 to-rose-500 text-slate-900 text-center font-bold px-4 py-2.5 rounded-lg'
						>
							Mua vé ngay
						</a>
					</nav>
				</div>
			)}
		</header>
	);
}
