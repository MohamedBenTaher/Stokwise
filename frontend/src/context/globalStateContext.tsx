import { createContext } from 'react';

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}
interface GlobalState {
	accessToken: string | undefined;
	setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	// Add other properties as needed
}

// Providing a default context value that matches the GlobalState interface
const defaultGlobalState: GlobalState = {
	accessToken: undefined,
	setAccessToken: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	user: {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
	},
	setUser: () => {},
};

const GlobalStateContext = createContext<GlobalState>(defaultGlobalState);

export default GlobalStateContext;
