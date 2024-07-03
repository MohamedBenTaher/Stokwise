import { createContext } from 'react';

interface GlobalState {
	accessToken: string | undefined;
	setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	// Add other properties as needed
}

// Providing a default context value that matches the GlobalState interface
const defaultGlobalState: GlobalState = {
	accessToken: undefined,
	setAccessToken: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	// Initialize other properties as needed
};

const GlobalStateContext = createContext<GlobalState>(defaultGlobalState);

export default GlobalStateContext;
