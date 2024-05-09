import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordFormSchema } from '@/utils/validation/auth';
import { z } from 'zod';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/auth/forgot')({
	component: () => {
		const queryClient = useQueryClient();
		const [isLoading, setIsLoading] = React.useState<boolean>(false);
		const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
			resolver: zodResolver(forgotPasswordFormSchema),
			defaultValues: {
				email: '',
			},
		});
		const loginUser = async (
			data: z.infer<typeof forgotPasswordFormSchema>,
		) => {
			const response = await api.auth
				.authControllerForgotPassword(data)
				.then((res) => {
					return res.data;
				});
			return response;
		};
		const forgotPassowrdMutation = useMutation({
			mutationFn: loginUser,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
			},
		});
		async function onSubmit() {
			setIsLoading(true);
			await form.handleSubmit(async (data) => {
				try {
					await forgotPassowrdMutation.mutateAsync(data);
				} catch (error) {
					console.error(error);
				}
			})();
		}
		return (
			<div>
				<div className="grid gap-6 h-screen">
					<div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full">
						<div className="flex items-center justify-center py-12">
							<div className="mx-auto grid w-[350px] gap-6">
								<div className="grid gap-2 text-center">
									<h1 className="text-3xl font-bold">Forgot Password</h1>
									<p className="text-balance text-muted-foreground">
										Enter your email below to reset your password
									</p>
								</div>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-8"
									>
										<div className="grid gap-4">
											<div className="grid gap-2">
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
											</div>
											<Button
												type="submit"
												className="w-full"
												disabled={isLoading}
											>
												Send Reset Email
											</Button>
										</div>
									</form>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
