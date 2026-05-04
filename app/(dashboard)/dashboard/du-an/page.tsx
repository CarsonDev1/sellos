import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, FolderOpen, Globe, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { getProfile } from '@/lib/supabase/profile';
import { getProjects } from '@/lib/supabase/projects';
import { TEMPLATES } from '@/lib/templates';
import PageHeader from '@/components/dashboard/PageHeader';

export const metadata = { title: 'Dự án của tôi — SellOS' };

export default async function DuAnPage() {
	const { userId } = await auth();
	if (!userId) redirect('/');

	const profile = await getProfile(userId);
	if (!profile) redirect('/dashboard');

	const projects = await getProjects(profile.id);
	const publishedCount = projects.filter((p) => p.published).length;

	return (
		<div>
			<PageHeader
				crumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Dự án của tôi' }]}
				title='Dự án của tôi'
				description={
					projects.length === 0
						? 'Bạn chưa có website nào — bấm tạo để bắt đầu trong vài phút.'
						: `${projects.length} website đã tạo · ${publishedCount} đang hiển thị công khai`
				}
				actions={
					<Link
						href='/dashboard/chon-template'
						className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 h-10 rounded-xl shadow-sm shadow-blue-600/20 transition-colors'
					>
						<Sparkles className='w-4 h-4' />
						Tạo website mới
					</Link>
				}
			/>

			{projects.length === 0 ? (
				<EmptyState />
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
					{projects.map((project) => {
						const tpl = TEMPLATES.find((t) => t.id === project.template_id);
						const isReady = project.status === 'active' && project.generated_content;
						return (
							<Link
								key={project.id}
								href={`/dashboard/du-an/${project.id}`}
								className='group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden transition-all flex flex-col'
							>
								{/* Preview banner */}
								<div
									className={`relative h-32 bg-gradient-to-br ${tpl?.color ?? 'from-slate-400 to-slate-600'} flex items-center justify-center overflow-hidden`}
								>
									<div
										aria-hidden
										className='absolute inset-0 opacity-15'
										style={{
											backgroundImage:
												'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
											backgroundSize: '14px 14px',
										}}
									/>
									<span className='relative font-heading font-bold text-white text-2xl tracking-tight px-4 text-center line-clamp-2'>
										{project.name}
									</span>
									{project.published && (
										<span className='absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500 text-white px-2 py-1 rounded-full shadow-sm'>
											<span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
											Đang hiển thị
										</span>
									)}
								</div>

								<div className='p-5 flex-1 flex flex-col'>
									<div className='flex items-start justify-between gap-2 mb-3'>
										<div className='min-w-0'>
											<h3 className='font-heading font-bold text-slate-900 text-base line-clamp-1'>
												{project.name}
											</h3>
											<p className='text-xs text-slate-500 mt-0.5'>
												{tpl?.name ?? project.template_id}
											</p>
										</div>
										<span
											className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${
												isReady
													? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
													: 'bg-amber-50 text-amber-700 border border-amber-200'
											}`}
										>
											{isReady ? 'Hoàn tất' : 'Đang tạo'}
										</span>
									</div>

									<div className='flex items-center justify-between text-xs text-slate-500 pt-3 mt-auto border-t border-slate-100'>
										<span className='inline-flex items-center gap-1.5'>
											<Clock className='w-3 h-3' />
											{new Date(project.created_at).toLocaleDateString('vi-VN')}
										</span>
										{isReady && (
											<span className='inline-flex items-center gap-1 text-blue-600 group-hover:gap-2 font-semibold transition-all'>
												Quản lý
												<ArrowRight className='w-3.5 h-3.5' />
											</span>
										)}
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

function EmptyState() {
	return (
		<div className='relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/40 px-6 py-16 sm:py-20'>
			<div
				aria-hidden
				className='absolute inset-0 opacity-30 pointer-events-none'
				style={{
					backgroundImage:
						'radial-gradient(circle at 1px 1px, rgba(99,102,241,0.2) 1px, transparent 0)',
					backgroundSize: '24px 24px',
					maskImage:
						'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)',
					WebkitMaskImage:
						'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)',
				}}
			/>
			<div className='relative max-w-md mx-auto text-center'>
				<div className='inline-flex w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm items-center justify-center mb-5'>
					<FolderOpen className='w-7 h-7 text-blue-600' />
				</div>
				<h3 className='font-heading font-bold text-slate-900 text-xl mb-2'>
					Chưa có website nào
				</h3>
				<p className='text-slate-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto'>
					Tạo website đầu tiên của bạn với AI — chỉ cần điền vài thông tin sản phẩm, AI dựng cho bạn trong vài phút.
				</p>
				<div className='flex flex-col sm:flex-row gap-3 items-center justify-center'>
					<Link
						href='/dashboard/chon-template'
						className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 h-11 rounded-xl shadow-md shadow-blue-600/20 transition-colors'
					>
						<Plus className='w-4 h-4' />
						Tạo website đầu tiên
					</Link>
					<Link
						href='/dashboard/thong-tin'
						className='inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-semibold px-4 h-11'
					>
						<Globe className='w-4 h-4' />
						Điền thông tin trước
					</Link>
				</div>
			</div>
		</div>
	);
}
