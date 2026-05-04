import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { syncProfile, isAdmin } from '@/lib/supabase/profile';
import GenerationToast from '@/components/dashboard/GenerationToast';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = await auth();
	if (!userId) redirect('/sign-in');

	const user = await currentUser();
	if (user) {
		await syncProfile({
			id: user.id,
			emailAddresses: user.emailAddresses,
			firstName: user.firstName,
			lastName: user.lastName,
			imageUrl: user.imageUrl,
		});
	}

	const admin = await isAdmin(userId);
	const fullName =
		[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
		user?.firstName ||
		'Tài khoản của bạn';
	const email = user?.emailAddresses?.[0]?.emailAddress ?? '';

	return (
		<div className='min-h-screen bg-slate-50'>
			<DashboardSidebar
				admin={admin}
				userTrigger={
					<UserButton
						appearance={{
							elements: { avatarBox: 'w-9 h-9' },
						}}
					/>
				}
				userName={fullName}
				userEmail={email}
			/>

			<div className='md:pl-64 flex flex-col min-h-screen'>
				<main className='flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 pt-16 md:pt-8'>
					<div className='max-w-7xl mx-auto'>{children}</div>
				</main>
			</div>

			<GenerationToast />
		</div>
	);
}
