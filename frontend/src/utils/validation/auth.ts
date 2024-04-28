import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
});

export const registerFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
	firstname: z
		.string()
		.min(3, { message: 'First name must be at least 3 characters long' }),
	lastname: z
		.string()
		.min(3, { message: 'Last name must be at least 3 characters long' }),
});

export const forgotPasswordFormSchema = z.object({
	email: z.string().email(),
});

export const resetPasswordFormSchema = z.object({
	password: z.string().min(8),
});
