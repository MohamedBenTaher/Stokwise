import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/confirm/email')({
	component: () => <div>Hello /auth/confirm/email!</div>,
});
