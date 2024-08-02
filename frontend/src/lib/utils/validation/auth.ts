import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
});

export const registerFormSchema = z
	.object({
		email: z.string().email({ message: 'Invalid email address' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' }),
		firstName: z
			.string()
			.min(3, { message: 'First name must be at least 3 characters long' }),
		lastName: z
			.string()
			.min(3, { message: 'Last name must be at least 3 characters long' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const forgotPasswordFormSchema = z.object({
	email: z.string().email(),
});

export const resetPasswordFormSchema = z.object({
	password: z.string().min(8),
});
