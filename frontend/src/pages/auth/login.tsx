import * as React from 'react';
import { cn } from '@/lib/utils/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/lib/utils/validation/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import GlobalStateContext from '@/context/globalStateContext';
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export default function Login({ className, ...props }: UserAuthFormProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { setIsLoggedIn, setAccessToken } =
		React.useContext(GlobalStateContext);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const loginUser = async (
		data: z.infer<typeof loginFormSchema>,
	): Promise<void> => {
		try {
			const response = await api.auth.authControllerLogin(data);
			return response.data;
		} catch (error) {
			console.error('Login error:', error);
			throw new Error('Failed to login');
		}
	};
	const loginMutation = useMutation({
		mutationFn: loginUser,
		// Inside the onSuccess callback of loginMutation
		onSuccess: (response) => {
			if (response.tokens && response.tokens.token) {
				setIsLoggedIn(true);
				setAccessToken(response.tokens.token);
				queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
				navigate('/');
			} else {
				console.error('Login response does not include a valid token.');
			}
		},
		onError: (error) => {
			console.error('Login mutation error:', error);
		},
	});

	async function onSubmit() {
		setIsLoading(true);
		await form.handleSubmit(async (data) => {
			try {
				await loginMutation.mutateAsync(data);
			} catch (error) {
				console.error('Submission error:', error);
			} finally {
				setIsLoading(false);
			}
		})();
	}

	return (
		<div className={cn('grid gap-6 h-screen', className)} {...props}>
			<div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex items-center justify-center py-12"
					>
						<div className="mx-auto grid w-[350px] gap-6">
							<div className="grid gap-2 text-center">
								<h1 className="text-3xl font-bold">Login</h1>
								<p className="text-balance text-muted-foreground">
									Enter your email below to login to your account
								</p>
							</div>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>

											<FormControl>
												<Input
													placeholder="m@example.com"
													type="email"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This will be used to login to your account
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between items-center">
												<FormLabel>Password</FormLabel>
												<NavLink
													to="/auth/forgot"
													className="ml-auto inline-block text-sm underline"
												>
													Forgot your password?
												</NavLink>
											</div>
											<FormControl>
												<Input
													placeholder="password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This will be used to login to your account
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={isLoading}>
									Login
								</Button>
								<Button variant="outline" className="w-full">
									Login with Google
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{' '}
								<NavLink to="/auth/register" className="underline">
									Sign up
								</NavLink>
							</div>
						</div>
					</form>
				</Form>
				<div className="hidden bg-muted lg:block">
					<img
						src="../../src/assets/media/placeholder.svg"
						alt="Image"
						width="1920"
						height="1080"
						className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
			</div>
		</div>
	);
}
