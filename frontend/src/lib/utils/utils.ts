import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { routes } from '../constants';
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type NavigateFunction = (path: string) => void;

export const handleNavigate = (
	name: string,
	navigate: NavigateFunction,
): void => {
	if (name in routes) {
		navigate(routes[name]);
	} else {
		console.error(
			'error handleNavigate : Failed to find path of the given route name in route constants',
		);
	}
};
