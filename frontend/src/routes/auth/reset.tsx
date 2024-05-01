import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/reset')({
	component: () => <div>Hello /auth/reset!</div>,
});
