import React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { registerFormSchema } from '@/utils/validation/auth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import api from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Route = createFileRoute('/auth/register')({
	component: ({ className, ...props }: UserAuthFormProps) => {
		const queryClient = useQueryClient();
		const [isLoading, setIsLoading] = React.useState<boolean>(false);
		const form = useForm<z.infer<typeof registerFormSchema>>({
			resolver: zodResolver(registerFormSchema),
			defaultValues: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				confirmPassword: '',
			},
		});
		const registerUser = async (data: z.infer<typeof registerFormSchema>) => {
			const response = await api.auth
				.authControllerRegister(data)
				.then((res) => {
					return res.data;
				});
			return response;
		};
		const createMutation = useMutation({
			mutationFn: registerUser,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
			},
		});
		async function onSubmit() {
			setIsLoading(true);
			await form.handleSubmit(async (data) => {
				try {
					await createMutation.mutateAsync(data);
				} catch (error) {
					console.error(error);
				}
			})();
			setIsLoading(false);
		}

		return (
			<div className={cn('grid gap-6 h-screen', className)} {...props}>
				<div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
					<div className="flex items-center justify-center py-12">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8"
							>
								<div className="mx-auto grid w-[350px] gap-6">
									<div className="grid gap-2 text-center">
										<h1 className="text-3xl font-bold">Register</h1>
										<p className="text-balance text-muted-foreground">
											Enter your details below to create an account
										</p>
									</div>
									<div className="grid gap-4">
										<div className="grid grid-cols-2 gap-2">
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input placeholder="first name" {...field} />
														</FormControl>
														<FormDescription>
															This is your first name
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input placeholder="last name" {...field} />
														</FormControl>
														<FormDescription>
															This is your last name
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-2">
											<FormField
												control={form.control}
												name="email"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Email</FormLabel>
														<FormControl>
															<Input
																placeholder="email"
																type="email"
																{...field}
															/>
														</FormControl>
														<FormDescription>
															This is your email address
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="grid gap-2">
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Password</FormLabel>
														<FormControl>
															<Input
																placeholder="password"
																type="password"
																{...field}
															/>
														</FormControl>
														<FormDescription>
															This is your password
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<div className="grid gap-2">
											<FormField
												control={form.control}
												name="confirmPassword"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Confirm Password</FormLabel>
														<FormControl>
															<Input
																placeholder="confirm password"
																type="password"
																{...field}
															/>
														</FormControl>
														<FormDescription>
															Confirm your password
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<Button
											type="submit"
											className="w-full"
											disabled={isLoading}
										>
											Register
										</Button>
										<Button variant="outline" className="w-full">
											Register with Google
										</Button>
									</div>
									<div className="mt-4 text-center text-sm">
										Don&apos;t have an account?{' '}
										<Link to="/auth/login" className="underline">
											Sign up
										</Link>
									</div>
								</div>
							</form>
						</Form>
					</div>

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
