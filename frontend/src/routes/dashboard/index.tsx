import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
	beforeLoad: ({ context }) => {
		if (!context.authentication.isAuthenticated) {
			throw redirect({
				to: '/auth/login',
				search: {
					auth: false,
				},
			});
		}
	},
	component: () => <div>Hello /dashboard/!</div>,
});
