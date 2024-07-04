import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import GlobalStateContext from './context/globalStateContext';
import useGlobalState from './hooks/useGlobalState';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import Navbar from './components/ui/navbar';
import Register from './pages/auth/register';
import ForgotLogin from './pages/auth/forgot';
import Reset from './pages/auth/reset';
import Confirm from './pages/auth/confirm';

// Modify the router in App.tsx
function App() {
	const globalState = useGlobalState();

	const router = createBrowserRouter([
		{
			path: '/auth',
			children: [
				{
					path: '/auth/login',
					element: <LoginPage />,
				},
				{
					path: '/auth/register',
					element: <Register />,
				},
				{
					path: '/auth/forgot',
					element: <ForgotLogin />,
				},
				{
					path: '/auth/reset',
					element: <Reset />,
				},
				{
					path: '/auth/confirm/email',
					element: <Confirm />,
				},
			],
		},

		{
			path: '/',
			element: <Navbar />,
			children: [
				{
					element: (
						<PrivateRoute>
							<Outlet />
						</PrivateRoute>
					),
					children: [
						{
							index: true,
							element: <Dashboard />,
						},
					],
				},
			],
		},
	]);

	return (
		<div style={{ padding: 0 }}>
			<React.StrictMode>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<ErrorBoundary>
						<GlobalStateContext.Provider value={globalState}>
							<RouterProvider router={router} />
						</GlobalStateContext.Provider>
					</ErrorBoundary>
					<ReactQueryDevtools initialIsOpen={false} />
				</ThemeProvider>
			</React.StrictMode>
		</div>
	);
}
export default App;
