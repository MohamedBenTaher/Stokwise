import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { QueryClient } from '@tanstack/react-query';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	authentication: Record<string, boolean>;
}>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<hr />
			<Outlet />
			<TanStackRouterDevtools position="bottom-left" />
		</>
	);
}
