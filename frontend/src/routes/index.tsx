import Navbar from '@/components/ui/navbar';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	beforeLoad: ({ context }) => {
		// if (!context.authentication.isAuthenticated) {
		// 	throw redirect({
		// 		to: '/auth/login',
		// 		search: {
		// 			auth: false,
		// 		},
		// 	});
		// }
		console.log('context', context);
	},
	component: () => (
		<>
			<Navbar />
			<div>Hello /! world</div>
		</>
	),
});
