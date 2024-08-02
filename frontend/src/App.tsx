import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/login';
import Dashboard from './pages/dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import GlobalStateContext from './context/globalStateContext';
import useGlobalState from './hooks/useGlobalState';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import Register from './pages/auth/register';
import ForgotLogin from './pages/auth/forgot';
import Reset from './pages/auth/reset';
import Confirm from './pages/auth/confirm';
import Profile from './pages/profile';
import Shell from './components/ui/shell';

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
			element: <Shell />,
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
						{
							path: 'profile',
							element: <Profile />,
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
