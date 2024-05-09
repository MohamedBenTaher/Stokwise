import { Link, createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/utils/validation/auth';
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
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Route = createFileRoute('/auth/login')({
	component: ({ className, ...props }: UserAuthFormProps) => {
		const queryClient = useQueryClient();
		const [isLoading, setIsLoading] = React.useState<boolean>(false);
		const form = useForm<z.infer<typeof loginFormSchema>>({
			resolver: zodResolver(loginFormSchema),
			defaultValues: {
				email: '',
				password: '',
			},
		});
		const loginUser = async (data: z.infer<typeof loginFormSchema>) => {
			const response = await api.auth.authControllerLogin(data).then((res) => {
				return res.data;
			});
			return response;
		};
		const loginMutation = useMutation({
			mutationFn: loginUser,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
			},
		});
		async function onSubmit() {
			setIsLoading(true);
			await form.handleSubmit(async (data) => {
				try {
					await loginMutation.mutateAsync(data);
				} catch (error) {
					console.error(error);
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
													<Link
														to="/auth/forgot"
														className="ml-auto inline-block text-sm underline"
													>
														Forgot your password?
													</Link>
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
									<Link to="/auth/register" className="underline">
										Sign up
									</Link>
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
	},
});
